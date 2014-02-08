var DocumentModule = App.module("DocumentModule", function (Mod, App, Backbone, Marionette, $, _) {
    var DocumentView = Marionette.ItemView.extend({
        template: "#Document",
    });

    var DocumentsView = Marionette.CollectionView.extend({
        itemView: DocumentView
    });

    
});

DocumentModule.addInitializer(function () {
    console.log('inited documents module');

    var FileModel = Backbone.Model.extend();

    var FileCollection = Backbone.Collection.extend({
        model: FileModel,
        url: "/files"
    });

    var files = new FileCollection();
    files.on('add', function (model) {
        model.save();
    });

    App.vent.on('upload-document', function (message) {
        var model = new FileModel({ file: message.file, id: uuid.v4() });
        files.add(model);
    });

});