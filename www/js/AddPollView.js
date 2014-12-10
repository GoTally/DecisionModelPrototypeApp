var AddPollView = function() {

  this.back = function() {
    window.location.hash = '#home';
  };

  this.send = function() {
    app.showAlert('Send data to server');
  };

  this.render = function() {
    this.el.html(AddPollView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
    this.el.on('click', '#add-poll-back-btn', this.back)
    this.el.on('click', '#add-poll-send-btn', this.send)
  };

  this.initialize(); 
}

AddPollView.template = Handlebars.compile($('#add-poll-tpl').html());
