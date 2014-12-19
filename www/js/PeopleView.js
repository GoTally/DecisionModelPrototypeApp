var PeopleView = function() {

  this.ok = function() {
    AddPollView.people = [];
    var people = $("#people-list input[type='checkbox']:checked")
    $.each(people, function(index, object) {
      AddPollView.people.push($(object).data('user-id'));
    });
    window.location.hash= '#newpoll';
  };

  this.render = function() {
    this.el.html(PeopleView.template());

    $.ajax({
      url: 'https://decision-prototype.herokuapp.com/users',
      dataType: 'jsonp',
      success: function(response) {
        $.each(response, function(index, object) {
          $('#people-list').append(PeopleView.persontemplate(object));
        });
      }
    })

    // This doesn't work as expected
    if (AddPollView.people) {
      $.each(AddPollView.people, function(index, object) {
        $("#people-list input[data-user-id='"+object+"']")[0].checked = true;
      });
    }

    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
    this.el.on('click', '#people-ok-btn', this.ok);
  };

  this.initialize();
}

PeopleView.template = Handlebars.compile($('#people-tpl').html());
PeopleView.persontemplate = Handlebars.compile($('#person-entry-tpl').html());
