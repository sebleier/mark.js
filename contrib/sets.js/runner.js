function loadScript(file) {
    script = document.createElement("script");
    script.setAttribute("src", file);
    script.setAttribute("type","text/javascript");
    document.getElementsByTagName("head")[0].appendChild(script);
}

function isArray(testObject) {
    return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
}

function runtests(files) {
    if (!isArray(files)) {
        files = [files];
    }
    loadScript("unittest.js");
    for (var i = 0; i < files.length; i++) {
        loadScript(files[i]);
        loadScript("test_"+files[i]);
    }
    loadScript("cleanup.js");
}
