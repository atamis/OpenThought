// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

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


