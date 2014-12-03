var LoginView = function() {

  this.login = function() {
    var first_name = $('.login-form .first-name-input').val();
    var last_name = $('.login-form .last-name-input').val();

    if (!first_name && !last_name) {
      app.showAlert('Must have valid first and last name to log in');
      return;
    }

    $.ajax({
      url: 'http://decision-prototype.herokuapp.com/users',
      dataType: 'jsonp',
      data: {
        first_name: first_name,
        last_name: last_name
      },
      success: function(response) {
        if(response.length) {
          // Maybe save to local or session storage
          app.user_id = response[0].id;
          window.location.hash = '#home';
          return;
        }
        app.showAlert('Problem logging in. Try again.');
      }
    });
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
