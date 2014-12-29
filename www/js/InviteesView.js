var InviteesView = function(pollId) {

  this.render = function() {
    this.el.html(InviteesView.template());

    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
  };

  this.initialize();
}

InviteesView.template = Handlebars.compile($('#invitees-tpl').html());
InviteesView.inviteetemplate = Handlebars.compile($('#invitees-entry-tpl').html());
