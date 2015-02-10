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

