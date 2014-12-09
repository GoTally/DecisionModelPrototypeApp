var AddPollView = function() {

  this.render = function() {
    this.el.html(AddPollView.template());
  };

  this.initialize = function() {
    this.el = $('<div/>');
  };
}

AddPollView.template = Handlebars.compile($('#add-poll-tpl').html());
