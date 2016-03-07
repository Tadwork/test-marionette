var Marionette = require('backbone.marionette')
var Backbone = require('backbone')
var App = new Marionette.Application();
var _ = require('underscore');

var kathrinModule = App.module("kathrin", function(kathrinModule, App, Backbone, Marionette, $, _){
    // Private Data And Functions
    var privateData = "fun with marionette!";

    var privateFunction = function(){
        console.log(privateData);
    }

    // Public Data And Functions
    kathrinModule.someData = "public kathrinModule data";

    kathrinModule.someFunction = function(){
        privateFunction();
        console.log(kathrinModule.someData);
    }
});

//collections silly business
var GridRow = Backbone.Marionette.ItemView.extend({
  template: requireTemplate('./main.catItem.html'),
  tagName: 'p',
  className: "grid-view-class"
});

var GridView = Backbone.Marionette.CompositeView.extend({

  itemView: GridRow,
  itemViewContainer: "#gridID",
  template: requireTemplate('./main.gridTemplate.html')
});



var gridView;


//cat silly business

var CatModel = Backbone.Model.extend({});
var AllTheCats = Backbone.Collection.extend({
  model: CatModel
});

var UserCollection = Backbone.Collection.extend({
  model: CatModel
});

var CatListView = Backbone.Marionette.ItemView.extend({
  template: requireTemplate('./main.catItem.html'),
  tagName: "div",
  className: "cat-listing-item"
});

var CatListCollectionView = Backbone.Marionette.CollectionView.extend({

  tagName: "div",
  id: "cat-collection-view",
  className: "test-class-to-add",
  template: requireTemplate('./main.catList.html'),
  itemView: CatListView,
});


App.on('initialize:before', function(options) {
  options.anotherThing = true; // Add more data to your options
});

App.on('initialize:after', function(options) {
  console.log('Initialization Finished');
});

App.on('start', function(options) {
  var catView = new CatListCollectionView({
    collection: options.cats
  });

  var userCollection = new UserCollection(options.cats);

  console.log("what's up here with this?", options.cats)

  this.catRegion.show(catView);


  gridView = new GridView({
    collection: options.cats
  });

  gridView.render();
  this.collectionRegion.show(gridView);

  var layout = new AppLayout();
  this.mainRegion.show(layout);
  Backbone.history.start(); // Great time to do this
});

// // Create a region. It will control what's in the #container element.
// var region = new Backbone.Marionette.Region({
//   el: "#container"
// });

// Add a view to the region. It will automatically render immediately.
// region.show(new MyView());
function requireTemplate(src){
    return _.template( require(src));
}
var AppLayout = Marionette.Layout.extend({
  template:  requireTemplate('./main.layout.html'),

//   regions: {
//     menu: "#menu",
//     content: "#content"
//   }
});

App.addRegions({
  mainRegion: "#container",
  catRegion: "#catRegion",
  collectionRegion: "#catCollectionRegion"
});

App.addInitializer(function(options){
  console.log("what is up with this?")
});

//======================= START THE APP =======================//

var cats = new AllTheCats([
    { name: 'cat-tool'},
    { name: 'cat-control'},
    { name: 'cat-model'}
  ]);

App.start({cats: cats});


// App.kathrin.someFunction();
