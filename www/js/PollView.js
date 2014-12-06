var PollView = function(pollId) {

  this.back = function() {
    window.location.hash = '#home';
  };

  this.submit = function() {
    // Send selections to server
    window.location.hash = '#home';
  };

  this.render = function() {
    this.el.html(PollView.template());
    // Get data from server
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
    this.el.on('click', '#poll-back-btn', this.back);
    this.el.on('click', '#poll-submit-btn', this.submit);
  };

  this.initialize();
}

PollView.template = Handlebars.compile($('#poll-tpl').html());
