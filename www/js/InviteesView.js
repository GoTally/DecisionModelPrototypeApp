var InviteesView = function(pollId) {

  this.back = function() {
    window.location.hash = '#poll/' + pollId;
  };

  this.render = function() {
    var self = this;

    $.ajax({
      url: 'https://decision-prototype.herokuapp.com/polls/'+pollId,
      dataType: 'jsonp',
      data:{invitees: true},
      success: function(response) {
        self.el.html(InviteesView.template());
        $.each(response.invitees, function(index, object) {
          $('.invitees-list').append(InviteesView.inviteetemplate(object));
        });
      }
    });

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
