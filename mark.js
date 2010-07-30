function $(id){ return document.getElementById(id); }
function create(element){ return document.createElement(element); }
function noop(){};
var log = typeof(console) != "undefined" ? console.log : noop;

function values(obj) {
    var values = [];
    for(key in obj) {
        values.push(obj[key]);
    }
    return values;
}

function keys(obj) {
    var keys = [];
    for (key in obj) {
        keys.push(key);
    }
    return keys
}

function hasattr(obj, attr) {
    return !(typeof(obj[attr]) == "undefined");
}


function mark(report_name) {
    this.reports = [];
    this.registry = {};
    this.report_name

    // Optional use of local storage to save benchmark results over time.
    if (typeof(store) != "undefined") {
        this.has_storage = true;
        this.report_name = report_name
        var reports = store.get(this.report_name);
        this.reports = reports == null ? this.reports : reports;
    }

    this.register = function(benchmark) {
        var name = hasattr(benchmark, "name") ? benchmark.name : keys(this.report.benchmarks).length;
        this.registry[name] = benchmark;
    }

    this.run = function() {
        this.report = {benchmarks: {}};
        for (benchmark in this.registry) {
            this.run_benchmark(this.registry[benchmark])
        }
        if (this.has_storage) {
            this.reports.push(this.report);
            store.set(this.report_name, this.reports);
        }
    }

    this.run_benchmark = function(benchmark) {
        hasattr(benchmark, "setUp") ? benchmark.setUp() : noop();
        if (hasattr(benchmark, "run")) {
            var startTime = new Date();
            benchmark.run();
            var endTime = new Date();

            var name = hasattr(benchmark, "name") ? benchmark.name : keys(this.report.benchmarks).length;
            this.report.benchmarks[name] = endTime - startTime;
        }
        hasattr(benchmark, "tearDown") ? benchmark.tearDown() : noop();
    }

    this.format_time = function(msec) {
        return (msec / 1000.0).toFixed(3) + " sec";
    }

    this.min = function(name) {
        min = this.reports[0].benchmarks[name];
        for (var i = 0; i < this.reports.length; i++) {
            var benchmark = this.reports[i].benchmarks[name];
            min = benchmark < min ? benchmark : min;
        }
        return this.format_time(min);
    }

    this.max = function(name) {
        max = this.reports[0].benchmarks[name];
        for (var i = 0; i < this.reports.length; i++) {
            var benchmark = this.reports[i].benchmarks[name];
            max = benchmark > max ? benchmark : max;
        }
        return this.format_time(max);
    }

    this.ave = function(name) {
        var sum = 0;
        for (var i = 0; i < this.reports.length; i++) {
            sum += this.reports[i].benchmarks[name];
        }
        return this.format_time(sum / this.reports.length);
    }

    this.printResults = function() {
        function create_field(value, header) {
            var field_tag = header ? "th" : "td";
            var field = create(field_tag);
            field.innerHTML = value;
            tr.appendChild(field);
        }
        var table = create("table");

        // Display the number of trials
        var thead = create("thead");
        var tr = create("tr");
        create_field("Trials: " + this.reports.length, true);
        thead.appendChild(tr);
        table.appendChild(thead);

        // Display the header fields for the benchmark results
        var tbody = create("tbody");
        tr = create("tr");
        create_field("Benchmark", true);
        create_field("Time", true);
        create_field("Min Time", true);
        create_field("Max Time", true);
        create_field("Ave Time", true);
        tbody.appendChild(tr);

        // Create the result rows for each benchmark
        for (benchmark in this.report.benchmarks) {
            tr = create("tr");
            create_field(benchmark);
            create_field(this.format_time(this.report.benchmarks[benchmark]));
            create_field(this.min(benchmark));
            create_field(this.max(benchmark));
            create_field(this.ave(benchmark));
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        document.body.appendChild(table);

        // Display the helper buttons
        var self = this;
        var clear_button = create("button");
        clear_button.onclick = function() {
            store.remove(self.report_name);
            self.reports = [];
            thead.childNodes[0].childNodes[0].innerHTML = "Trials: 0";
        }
        clear_button.innerHTML = "Clear Reports";
        document.body.appendChild(clear_button);
        var rerun_button = create("button");
        rerun_button.onclick = function() {
            document.body.removeChild(clear_button);
            document.body.removeChild(rerun_button);
            document.body.removeChild(table);
            self.run();
            self.printResults();
        }
        rerun_button.innerHTML = "Run Benchmarks";
        document.body.appendChild(rerun_button);
    }
}
