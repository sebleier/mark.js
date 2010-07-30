function printResults() {
    var table = document.createElement("table");
    table.setAttribute("class", "tests");
    var tbody = document.createElement("tbody");
    var tr;
    var status;
    var msg;
    for( var i = 0; i < unittest.tests.length; i++) {
        tr = document.createElement("tr");

        // Add status
        status = document.createElement("td");
        status.innerHTML = unittest.tests[i].status ? "PASS": "FAIL";
        status.setAttribute("class", unittest.tests[i].status ? "pass": "fail");
        tr.appendChild(status);

        // Add message
        msg = document.createElement("td");
        msg.innerHTML = unittest.tests[i].msg;
        msg.setAttribute("class", "msg");
        tr.appendChild(msg);

        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.body.appendChild(table);
}
printResults();
