var SignupView = function() {

  this.createUser = function(event) {
    var first_name = $('.first-name-input').val()
    var last_name = $('.last-name-input').val();
    var age = parseInt($('.age-input').val());
    var gender = $('.button-bar__item')[0].children[0].checked ? 'Male' : 'Female'; // oh dear...

    if (!first_name && !last_name) {
      app.showAlert('Must have valid first and last name');
      return;
    }

    //$.post('http://localhost:3000/users', {
    $.post('https://decision-prototype.herokuapp.com/users', {
        first_name: first_name,
        last_name: last_name
    },
    function(response) {
      console.log(response);
      app.showAlert('New user created');
    });
  };

  this.render = function() {
    this.el.html(SignupView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
    this.el.on('click', '.signup-button', this.createUser);
  };

  this.initialize();
}

SignupView.template = Handlebars.compile($('#signup-tpl').html());
