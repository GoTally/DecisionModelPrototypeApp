var AddPollView = function() {

  this.back = function() {
    window.location.hash = '#home';
    app.addPollView = undefined;
  };

  this.send = function() {
    var pollId;

    // Create poll
    // Missing deadline
    $.post('https://decision-prototype.herokuapp.com/polls', {
      title: $('.poll-data .new-poll-title').val(),
      description: $('.poll-data .new-poll-description').val(),
      status: 'new',
      type: 'new',
      creator_user_id: app.user_id
    },
    function(response) {
      pollId = response.id;
    });

    // Create Choices
    $.each(AddPollView.choices, function(index, object) {
      $.post('https://decision-prototype.herokuapp.com/polls', {
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

    window.location.hash = '#home';
    app.addPollView = undefined;
  };

  this.render = function() {
    this.el.html(AddPollView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
    this.el.on('click', '#add-poll-back-btn', this.back)
    this.el.on('click', '#add-poll-send-btn', this.send)
  };

  this.initialize(); 
}

AddPollView.template = Handlebars.compile($('#add-poll-tpl').html());
