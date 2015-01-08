var AddPollView = function() {

  this.back = function() {
    window.location.hash = '#home';
    app.addPollView = undefined;
    // I don't like this
    AddPollView.choices = undefined;
    AddPollView.deadline = undefined;
    AddPollView.people = undefined;
  };

  this.send = function() {
    var pollId;

    // Create poll
    // Missing deadline
    $.post('https://decision-prototype.herokuapp.com/polls', {
      title: $('.poll-data .new-poll-title').val(),
      description: $('.poll-data .new-poll-description').val(),
      status: 'new',
      creator_user_id: window.localStorage.user_id
    },
    function(response) {
      pollId = response.id;

      // Create Choices
      $.each(AddPollView.choices, function(index, object) {
        $.post('https://decision-prototype.herokuapp.com/choices', {
          value: object,
          poll_id: pollId
        },
        function(response) {
        });
      });

      // Create poll and user joins
      $.each(AddPollView.people, function(index, object) {
        $.post('https://decision-prototype.herokuapp.com/voters', {
          poll_id: pollId,
          user_id: object
        },
        function(response) {
        });
      });
    });

    window.location.hash = '#home';
    app.addPollView = undefined;
    AddPollView.choices = undefined;
    AddPollView.deadline = undefined;
    AddPollView.people = undefined;
  };

  this.bind = function() {
    this.el.off('click', '#add-poll-back-btn')
    this.el.off('click', '#add-poll-send-btn')
    this.el.on('click', '#add-poll-back-btn', this.back)
    this.el.on('click', '#add-poll-send-btn', this.send)
  };

  this.render = function() {
    this.el.html(AddPollView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
  };

  this.initialize(); 
}

AddPollView.template = Handlebars.compile($('#add-poll-tpl').html());
