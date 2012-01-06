var render_thought = function(thought) {
  var body = thought.body.replace(/#([a-zA-Z]+)/g, function(match) {
    var tag = match.substr(1)
    return '<a href="/tags/' + tag + '">' + tag + '</a>';
  });
  return '<tr id="' + thought.id +
    '"><td>' + body +
    '<a href="#" class="delete">D</a><span>' +
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

var populate_table = function(selector, callback) {
  $.get('/thoughts.json', function(body) {
    for(i in body) {
      add_thought(selector, body[i]);
    }
    callback();
  })
}


