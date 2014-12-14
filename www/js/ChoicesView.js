var ChoicesView = function() {

  this.render = function() {
    this.el.html(ChoicesView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
  };

  this.initialize();
}

ChoicesView.template = Handlebars.compile($('#choices-tpl').html());
