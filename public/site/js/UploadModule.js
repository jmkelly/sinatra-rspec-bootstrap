App.module("UploadModule", function (Mod, App, Backbone, Marionette, $, _) {


    var UploadView = Marionette.ItemView.extend({
        template: "#uploadFormTemplate",
        triggers: {
            "change #fakefileBtn": "fakefileBtn:change",
            "click #fileBtn": "fileBtn:click"
        }
    });

    var Controller = Marionette.Controller.extend({

        initialize: function (options) {
            this.region = options.region;
            console.log('init upload controller');
        },

        show: function () {
            var model = new Backbone.Model();
            var view = new UploadView();

            view.on("fileUpload:click", function (args) {
                App.vent.trigger("notify", "button clicked");
            });

            view.on("fileBtn:click", function (args) {
                $("#fakefileBtn").trigger('click');
            });

            view.on("fakefileBtn:change", getFiles);

            function getFiles(e) {
                //var fileElem = document.getElementById("fakefileBtn");
                //var files = fileElem.files
                var files = $('#fakefileBtn')[0].files
                if (files.length > 0) {
                    //broadcast each file in a message
                    for (var i = 0; i < files.length; i++) {
                        var message = {};
                        message.file = files[i];
                        App.vent.trigger('upload-document', message);
                    }
                } else {
                    App.vent.trigger('notify', 'No files selected!');
                }
            }

            this.region.show(view);
        }

    });

    Mod.addInitializer(function () {
        Mod.controller = new Controller({
            region: App.mainRegion
        });
        Mod.controller.show();
    });
});