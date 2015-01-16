var LoginView = function() {

  this.login = function() {
    var first_name = $('.login-form .first-name-input').val();
    var last_name = $('.login-form .last-name-input').val();

    if (!first_name || !last_name) {
      app.showAlert('Must have valid first and last name to log in');
      return;
    }

    $.get('https://decision-prototype.herokuapp.com/users', {
        first_name: first_name,
        last_name: last_name
      },
      function(response) {
        if(response.length) {
          window.localStorage.user_id = response[0].id;
          window.location.hash = '#home';
          return;
        }
        app.showAlert('Could not log in. Try again.');
    });
  };

  this.signup = function() {
    window.location.hash = '#signup';
  };

  this.render = function() {
    this.el.html(LoginView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $("<div data-view='login'/>");
    this.el.on('click', '#login-btn', this.login);
    this.el.on('click', '#goto-signup-btn', this.signup);
  };

  this.initialize();
}

LoginView.template = Handlebars.compile($('#login-tpl').html());
