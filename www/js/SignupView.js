var SignupView = function() {

  this.render = function() {
    this.el.html(SignupView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
  };

  this.initialize();
}

SignupView.template = Handlebars.compile($('#signup-tpl').html());
