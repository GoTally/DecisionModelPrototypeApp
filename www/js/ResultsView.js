var ResultsView = function(pollId) {

  this.back = function() {
    window.location.hash = '#poll/' + pollId;
  };

  this.render = function() {
    this.el.html(ResultsView.template());

    $.ajax({
      url: 'https://decision-prototype.herokuapp.com/choices',
      data: {poll_id: pollId},
      dataType: 'jsonp',
      success: function(response) {
        var choices = response.sort(function(a,b) {
          return parseInt(b.votes_count) - parseInt(a.votes_count);
        });
        $.each(choices, function(index, object) {
          $('#results-list').append(ResultsView.resulttemplate(object));
        });
      }
    });
    return this;
  };

  this.initialize = function() {
    this.el = $("<div data-view='results'/>");
    this.el.on('click', '#back-results-btn', this.back);
  };

  this.initialize();
}

ResultsView.template = Handlebars.compile($('#results-tpl').html());
ResultsView.resulttemplate = Handlebars.compile($('#result-entry-tpl').html());
