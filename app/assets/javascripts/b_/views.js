App.Views.Index = Backbone.View.extend({
    initialize: function() {
        this.thoughts = this.options.thoughts;
        this.render();
    },
    
    render: function() {
        if(this.thoughts.length > 0) {
            var out = "<h3><a href='#new'>Create New</a></h3><ul>";
            _(this.thoughts).each(function(item) {
              console.log(item);
                out += "<li><a href='#thoughts/" + item.attributes._id + "'>" + item.escape('thought') + "</a></li>";
            });
            out += "</ul>";
        } else {
            out = "<h3>No thoughts! <a href='#new'>Create one</a></h3>";
        }
        $(this.el).html(out);
        $('#app').html(this.el);
    }
});

App.Views.Edit = Backbone.View.extend({
    events: {
        "submit form": "save"
    },
    
    initialize: function() {
        this.render();
    },
    
    save: function() {
        var self = this;
        var msg = this.model.isNew() ? 'Successfully created!' : "Saved!";
        
        this.model.save({ thought: this.$('[name=thought]').val(), body: this.$('[name=body]').val() }, {
            success: function(model, resp) {
                new App.Views.Notice({ message: msg });
                
                self.model = model;
                self.render();
                self.delegateEvents();

                Backbone.history.saveLocation('thoughts/' + model.id);
            },
            error: function() {
                new App.Views.Error();
            }
        });
        
        return false;
    },
    
    render: function() {
        var out = '<form>';
        
        //out += "<label name='simple_thought'>Body</label>";
        out += "<textarea name='thought'>" + (this.model.escape('thought') || '') + "</textarea>";
        
        var submitText = this.model.isNew() ? 'Create' : 'Save';
        
        out += "<button>" + submitText + "</button>";
        out += "</form>";

        $(this.el).html(out);
        $('#app').html(this.el);
        
        this.$('[name=thought]').val(this.model.get('thought')); // use val, for security reasons
    }
});

