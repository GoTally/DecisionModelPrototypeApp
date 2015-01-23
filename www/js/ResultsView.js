var ResultsView = function(pollId) {

  this.render = function() {
    this.el.html(ResultsView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $("<div data-view='results'/>");
  };

  this.initialize();
}

ResultsView.template = Handlebars.compile($('#results-tpl').html());
