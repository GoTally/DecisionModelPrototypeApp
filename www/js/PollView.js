var PollView = function(pollId) {

  this.back = function() {
    window.location.hash = '#home';
  };

  this.submit = function() {
    $('.poll-choice-list li').each(function(index, object) {
      if ($(object).find('input').is(':checked')) {
        $.post('https://decision-prototype.herokuapp.com/votes', {
          choice_id: $(object).data('choice-id'),
          user_id: app.user_id
        }, function(response) {
            console.log(response);
        });
      }
    });
    window.location.hash = '#home';
    app.showAlert('Your votes were successfully submitted!');
  };

  this.render = function() {
    var self = this;
    $.ajax({
      url: 'https://decision-prototype.herokuapp.com/polls/'+pollId,
      dataType: 'jsonp',
      data: {choices: true},
      success: function(response) {
        self.el.html(PollView.template(response));
        $.each(response.choices, function(index, object) {
          $('.poll-choice-list').append(PollView.choicetemplate(object));
        });
      }
    });
    return this;
  };

  this.initialize = function() {
    this.el = $("<div data-view='poll'/>");
    this.el.on('click', '#poll-back-btn', this.back);
    this.el.on('click', '#poll-submit-btn', this.submit);
  };

  this.initialize();
}

PollView.template = Handlebars.compile($('#poll-tpl').html());
PollView.choicetemplate = Handlebars.compile($('#poll-choice-tpl').html());
