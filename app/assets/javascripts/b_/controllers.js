App.Controllers.Thoughts = Backbone.Router.extend({
    routes: {
        "thoughts/:id":             "edit",
        "":                         "index",
        "new":                      "new_thought"
    },
    
    edit: function(id) {
        var doc = new Thought({ id: id });
        doc.fetch({
            success: function(model, resp) {
                new App.Views.Edit({ model: doc });
            },
            error: function() {
                new Error({ message: 'Could not find that thought.' });
                window.location.hash = '#';
            }
        });
    },
    
    index: function() {
        $.getJSON('/thoughts.json', function(data) {
            if(data) {
                var thoughts = _(data).map(function(i) { return new Thought(i); });
                new App.Views.Index({ thoughts: thoughts });
            } else {
                new Error({ message: "Error loading thoughts." });
            }
        });
    },
    
    new_thought: function() {
        new App.Views.Edit({ model: new Thought() });
    }
});

