var MessageModule = App.module("MessageModule", function (Mod, App, Backbone, Marionette, $, _) {
    var MessageView = Marionette.ItemView.extend({
        template: "#notify",
    });

    var Controller = Marionette.Controller.extend({
        initialize: function (options) {
            this.region = options.region;
        },

        show: function (model) {
            var view = new MessageView({
                model: model
            });
            this.region.show(view);
        }
    });

    Mod.addInitializer(function () {
        Mod.controller = new Controller({
            region: App.messages
        });
        Mod.controller.show();
    });

});

MessageModule.addInitializer(function (args) {
    App.vent.on("notify", function (message) {
        var model = new Backbone.Model({
            message: message
        });
        console.log(message);
        this.region.show(model);
    });
});