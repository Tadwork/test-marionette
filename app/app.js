var Marionette = require('backbone.marionette')
var Backbone = require('backbone')
var App = new Marionette.Application();

var myModule = App.module("kathrin", function(myModule, App, Backbone, Marionette, $, _){
    // Private Data And Functions
    var privateData = "fun with marionette!";

    var privateFunction = function(){
        console.log(privateData);
    }

    // Public Data And Functions
    myModule.someData = "public data";

    myModule.someFunction = function(){
        privateFunction();
        console.log(myModule.someData);
    }
});

App.on('initialize:before', function(options) {
  options.anotherThing = true; // Add more data to your options
});
App.on('initialize:after', function(options) {
  console.log('Initialization Finished');
});
App.on('start', function(options) {
  Backbone.history.start(); // Great time to do this
});

// // Create a region. It will control what's in the #container element.
// var region = new Backbone.Marionette.Region({
//   el: "#container"
// });

// // Add a view to the region. It will automatically render immediately.
// region.show(new MyView());
var AppLayout = Marionette.Layout.extend({
  template:  require('./main.layout.html'),

//   regions: {
//     menu: "#menu",
//     content: "#content"
//   }
});

App.addRegions({
  mainRegion: "#container"
});

var layout = new AppLayout();
App.mainRegion.show(layout);
App.kathrin.someFunction();
