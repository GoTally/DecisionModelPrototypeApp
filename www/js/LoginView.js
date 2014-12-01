var LoginView = function() {

  this.login = function() {
    console.log('log in or create user');
  };

  this.render = function() {
    this.el.html(LoginView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
    this.el.on('click', '.login-button', this.login);
  };

  this.initialize();
}

LoginView.template = Handlebars.compile($('#login-tpl').html());
