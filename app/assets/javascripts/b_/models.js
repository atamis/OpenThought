var Thought = Backbone.Model.extend({
  url: function() {
    var base = "thoughts"
    if (this.isNew()) return base + ".json";
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id + ".json";
  }
});

