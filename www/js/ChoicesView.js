var ChoicesView = function() {

  this.ok = function() {
    AddPollView.choices = [];
    var choices = $('#choices-list .list__item div span');
    $.each(choices, function(index, object) {
      AddPollView.choices.push($(object).text());
    });
    window.location.hash = '#newpoll';
  };

  this.addChoice = function() {
    var newChoice = $('.add-choice-input').val();
    $('#choices-list').append(ChoicesView.entrytemplate(newChoice));
    $('.add-choice-input').val('');
  };

  this.deleteChoice = function() {
    $(this).parent().remove();
  };

  this.render = function() {
    this.el.html(ChoicesView.template());

    // This doesn't work as expected
    if (AddPollView.choices) {
      $.each(AddPollView.choices, function(index, object) {
        $('#choices-list').append(ChoicesView.entrytemplate(object));
      });
    }

    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
    this.el.on('click', '#choices-ok-btn', this.ok);
    this.el.on('click', '.add-choice-btn', this.addChoice);
    this.el.on('click', '.delete-choice-btn', this.deleteChoice);
  };

  this.initialize();
}

ChoicesView.template = Handlebars.compile($('#choices-tpl').html());
ChoicesView.entrytemplate = Handlebars.compile($('#choices-entry-tpl').html());
