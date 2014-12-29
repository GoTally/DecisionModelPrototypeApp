var InviteesView = function(pollId) {

  this.back = function() {
    window.location.hash = '#poll/' + pollId;
  };

  this.render = function() {
    this.el.html(InviteesView.template());

    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
    this.el.on('click', '#invitees-back-btn', this.back);
  };

  this.initialize();
}

InviteesView.template = Handlebars.compile($('#invitees-tpl').html());
InviteesView.inviteetemplate = Handlebars.compile($('#invitees-entry-tpl').html());
