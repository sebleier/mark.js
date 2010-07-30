function Test(status, msg, errorInfo) {
    this.status = status;
    this.msg = msg;
    this.errorInfo = errorInfo;
}

function unitTest() {
    this.tests = [];

    this.assert = function(expr, msg) {
        var errorInfo = expr ? '' : (new Error());
        this.tests.push(new Test(expr, msg, errorInfo));
    }

    this.assertEqual = function(a, b, msg) {
        var errorInfo = a == b ? '' : (new Error());
        this.tests.push(new Test(a == b, msg, errorInfo));
    }

    this,assertListsEqual = function(a, b, msg, strict) {
        if (typeof(strict) == "undefined") {
            strict = false
        }
        if(a.length != b.length) {
            return this.assert(false, msg);
        }
        if (!strict) {
            a.sort();
            b.sort();
        }
        for (var i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return this.assert(false, msg);
            }
        }
        return this.assert(true, msg);
    }
}

// wrapper functions to keep data in unittest instance
var unittest = new unitTest();

function assert(expr, msg) {
    unittest.assert(expr, msg);
}

function assertEqual(a, b, msg) {
    unittest.assertEqual(a, b, msg);
}

function assertListsEqual(a, b, msg) {
    unittest.assertListsEqual(a, b, msg);
}
