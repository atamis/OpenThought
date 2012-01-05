var render_thought = function(thought) {
    return '<tr id="' + thought.id +
      '"><td>' + thought.body + '</td></tr>';
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
}

var populate_table = function(selector) {
  $.get('/thoughts.json', function(body) {
    for(i in body) {
      add_thought(selector, body[i]);
    }
  })
}


