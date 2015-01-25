var PollView = function(pollId) {

  this.back = function() {
    window.location.hash = '#home';
  };

  this.submit = function() {
    $('.poll-choice-list li').each(function(index, object) {
      if ($(object).find('input').is(':checked')) {
        $.post('https://decision-prototype.herokuapp.com/votes', {
          choice_id: $(object).data('choice-id'),
          user_id: window.localStorage.user_id,
          poll_id: $('.poll-info').data('poll-id')
        }, function(response) {
          console.log(response);
        });
      }
    });
    window.location.hash = '#home';
    app.showAlert('Your votes were successfully submitted!');
  };

  this.results = function() {
    window.location.hash = '#results/' + pollId;
  };

  this.displayPoll = function(response) {
    var self = this;
  };

  this.render = function() {
    var self = this;
    var poll, choices, votes;

    $.ajax({
      url: 'https://decision-prototype.herokuapp.com/polls/'+pollId,
      dataType: 'jsonp',
      data: {choices: true},
      success: function(response) {
        poll = response;
        poll.timeLeftMessage = getTimeLeftMessage(poll.created_at, poll.duration);
        self.el.html(PollView.template(poll));
        // More gross
        if (poll.timeLeftMessage == 'Voting has ended') { 
          $('.poll-title.poll-vote').html('');
          $('#poll-submit-btn').addClass('disabled');
          return;
        }
        // Check for existing votes
        $.ajax({
          url: 'https://decision-prototype.herokuapp.com/votes',
          data: {poll_id: pollId, user_id: window.localStorage.user_id},
          success: function(response) {
            votes = response;
            choices = poll.choices
            $.each(choices, function(index, object) {
              if (votes.length) {
                var vote = findVoteFromChoice(votes, object.id);
                object.voted = (vote === undefined ? 'not-voted' : 'voted');
                $('.poll-choice-list').append(PollView.votetemplate(object));
              } else {
                $('.poll-choice-list').append(PollView.choicetemplate(object));
              }
            });
            if (votes.length) {
              $('.poll-title.poll-vote').html('Your Votes');
              $('#poll-submit-btn').addClass('disabled');
            }
          }
        });
      }
    });
    return self;
  };

  findVoteFromChoice = function(votes, choiceId) {
    var vote;
    $.each(votes, function(index, object) {
      if (choiceId == object.choice_id) { 
        vote = object;
      }
    });
    return vote;
  };

  getTimeLeftMessage = function(created_at, duration) {
    if (!duration) { return 'No time constraint'; }

    var expirationDate = moment(created_at).add(duration, 'minutes');
    if (!expirationDate.isAfter(moment())) {
      return 'Voting has ended';
    }
    return 'Voting will close ' + expirationDate.fromNow();
  };

  this.initialize = function() {
    this.el = $("<div data-view='poll'/>");
    this.el.on('click', '#poll-back-btn', this.back);
    this.el.on('click', '#poll-submit-btn', this.submit);
    this.el.on('click', '#results-btn', this.results);
  };

  this.initialize();
}

PollView.template = Handlebars.compile($('#poll-tpl').html());
PollView.choicetemplate = Handlebars.compile($('#poll-choice-tpl').html());
PollView.votetemplate = Handlebars.compile($('#poll-vote-tpl').html());
