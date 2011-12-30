App.init = function() {
  new App.Controllers.Thoughts();
  Backbone.history.start();
}

