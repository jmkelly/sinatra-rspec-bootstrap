var DocumentModule = App.module("SearchModule", function (Mod, App, Backbone, Marionette, $, _) {
    var SearchView = Marionette.ItemView.extend({
        template: "#uploadFormTemplate"
    });
});

DocumentModule.addInitializer(function () {
    console.log('inited search module');

    var FileModel = Backbone.Model.extend();

    var FileCollection = Backbone.Collection.extend({
        model: FileModel,
        url: "/files",
    });

    App.vent.on('search:documents', function (message) {
        //        var model = new FileModel({ file: message.file, id: uuid.v4() });
        //        files.add(model);
    });

});