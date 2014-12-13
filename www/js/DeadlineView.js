var DeadlineView = function() {

  this.render = function() {
    this.el.html(DeadlineView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
  };

  this.initialize();
}

DeadlineView.template = Handlebars.compile($('#deadline-tpl').html());
