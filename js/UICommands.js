WinJS.Namespace.define("UICommands", {
    helpCommand: WinJS.UI.eventHandler(function (ev) {
        var uri = new Windows.Foundation.Uri("https://github.com/dotnetthoughts/Swanalekha/blob/master/help/index.md");
        Windows.System.Launcher.launchUriAsync(uri);
    }),
    aboutCommand: WinJS.UI.eventHandler(function (ev) {
        var contentDialog = document.querySelector(".win-contentdialog").winControl;
        contentDialog.show();
    }),
    shareCommand: WinJS.UI.eventHandler(function (ev) {
        var editor = document.getElementById("editor");
        var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
        dataTransferManager.addEventListener("datarequested", function (e) {
            var request = e.request;
            request.data.properties.title = "Share";
            request.data.setText(editor.value);
        });
        Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
    }),
    changeFontSizeCommand: WinJS.UI.eventHandler(function (ev) {
        var editor = document.getElementById("editor");
        var currentFontSize = editor.style.fontSize || "medium";
        var fontSizes = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
        for (var i = 0; i < fontSizes.length; i++) {
            if (fontSizes[i] === currentFontSize) {
                if (i + 1 < fontSizes.length) {
                    editor.style.fontSize = fontSizes[i + 1];
                    break;
                } else {
                    editor.style.fontSize = fontSizes[0];
                    break;
                }
            }
        }
    }),
    clearCommand: WinJS.UI.eventHandler(function (ev) {
        var editor = document.getElementById("editor");
        editor.value = "";
    }),
    saveCommand: WinJS.UI.eventHandler(function (ev) {
        var command = ev.currentTarget;
        if (command.winControl) {
            var savePicker = new Windows.Storage.Pickers.FileSavePicker();
            savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
            savePicker.fileTypeChoices.insert("Plain Text", [".txt"]);
            savePicker.suggestedFileName = "New Document";
            savePicker.pickSaveFileAsync().then(function (file) {
                if (file) {
                    Windows.Storage.CachedFileManager.deferUpdates(file);
                    var editor = document.getElementById("editor");
                    Windows.Storage.FileIO.writeTextAsync(file, editor.value).done(function () {
                        Windows.Storage.CachedFileManager.completeUpdatesAsync(file).done(function (updateStatus) {
                            if (updateStatus === Windows.Storage.Provider.FileUpdateStatus.complete) {
                                WinJS.log && WinJS.log("File " + file.name + " was saved.", "Swanalekha", "status");
                            } else {
                                WinJS.log && WinJS.log("File " + file.name + " couldn't be saved.", "Swanalekha", "status");
                            }
                        });
                    });
                } else {
                    WinJS.log && WinJS.log("Operation cancelled.", "Swanalekha", "status");
                }
            });
        }
    })
});

WinJS.UI.processAll();