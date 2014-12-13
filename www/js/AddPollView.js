var AddPollView = function() {

  this.back = function() {
    window.location.hash = '#home';
  };

  this.send = function() {
    app.showAlert('Send data to server');
  };

  this.deadline = function() {
  };

  this.choices = function() {
  };

  this.people = function() {
  };

  this.render = function() {
    this.el.html(AddPollView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
    this.el.on('click', '#add-poll-back-btn', this.back)
    this.el.on('click', '#add-poll-send-btn', this.send)
    this.el.on('click', '#add-poll-deadline', this.deadline)
    this.el.on('click', '#add-poll-choices', this.choices)
    this.el.on('click', '#add-poll-people', this.people)
  };

  this.initialize(); 
}

AddPollView.template = Handlebars.compile($('#add-poll-tpl').html());
