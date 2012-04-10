
var render_thought = function(thought) {
  var body = thought.body.replace(/#([a-zA-Z]+)/g, function(match) {
      var tag = match.substr(1)
      return '<a class="tag" href="/tags/' + tag + '">' + tag + '</a>';
  });
  return '<tr id="' + thought.id +
    '"><td><div class="thought_text">' + marked(body.replace(/\n/g, "\n\n")) +
    '</div><a href="#" class="delete">D</a><span class="date">' +
    thought.created_at
    + '</span></td></tr>';
}
var create_thought = function(body, callback) {
  $.post(
    '/thoughts',
    body,
    function(body, status) { callback(body); }
  )
}

var get_thought = function(id, callback) {
  $.get('/thoughts/' + id + '.json', callback);
}

var add_thought = function(selector, thought) {
  $(selector).prepend(render_thought(thought));
  $("#"+thought.id + " a").hide().fadeIn("slow");
  enable_delete("#"+thought.id + " a.delete");
}

var enable_delete = function(selector) {
  $(selector).click(function() {
    var thought = this;
    if($(thought).hasClass("dialog")) {
      // Already set up a delete dialog
    } else {
      $(thought).addClass("dialog")
      console.log(thought)
      smoke.confirm('Are you sure you want to delete that thought?', function(e){
        if (e){
          $.ajax({url:'/thoughts/' + $(thought).parent().parent().attr("id"),
            type: 'delete',
            complete: function(body) {
              $(thought).parent().parent().fadeOut("slow", function() {
                $(this).remove();
              });
          }});
        }
      });
    }
  });
}

var trunc = function(str, n){
  return str.substr(0,n-1)+(str.length>n?'...':'');
};

var populate_table = function(selector, url, callback) {
  console.log('hi');
  $.get(url, function(body) {
    for(i in body) {
      add_thought(selector, body[i]);
    }
    $(".thought_text a:not(.tag)").each(function(i, el) { $(el).text(trunc($(el).text(), 25)) })
    /*$(selector).linkify({
      handleLinks: function(links) {
        console.log(links);
        links.attr({ target: "_blank" });
      },
      changeName: function(name) {
        console.log(name);
        return "test";
      }
    });*/
    callback();
  })
}

var render_tag = function(tag) {
  return '<a href="/tags/' + tag.name + '">'
  + tag.name + ': '+ tag.count + '</a>';
}

var populate_tags = function(selector) {
  $.get('/tags.json', function(body) {
    $(selector).append('<p><a href="/thoughts">All</a></p>');
    for (i in body) {
      $(selector).append('<p>' + render_tag(body[i])
                        + '</p>');
    }
  });
}

