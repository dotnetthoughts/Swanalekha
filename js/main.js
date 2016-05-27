(function () {
    'use strict';
    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
            } else {
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                var editor = document.getElementById("editor");
                editor.addEventListener("cut", disableContextOperations, false);
                editor.addEventListener("copy", disableContextOperations, false);
                editor.addEventListener("paste", disableContextOperations, false);
                swanalekha(editor, { enabled: true });
            }));
        }
    };
    app.oncheckpoint = function (args) {

    };
    function disableContextOperations(event) {
        event.preventDefault();
    }
    app.start();
}());
