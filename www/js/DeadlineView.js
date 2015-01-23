var DeadlineView = function() {

  //this.times = ['None', '10 minutes', '30 minutes', '1 hour', '2 hours', '1 day', '5 days'];
  this.times = [
    {id: 1, displayText: 'None', time: [], minutes: 0},
    {id: 2, displayText: '10 minutes', time: [10, 'minutes'], minutes: 10},
    {id: 3, displayText: '30 minutes', time: [30, 'minutes'], minutes: 30},
    {id: 4, displayText: '1 hour', time: [1, 'hours'], minutes: 60},
    {id: 5, displayText: '2 hours', time: [2, 'hours'], minutes: 120},
    {id: 6, displayText: '1 day', time: [1, 'day'], minutes: 1440},
    {id: 7, displayText: '5 days', time: [5, 'days'], minutes: 7200}
  ];

  this.ok = function() {
    var minutes = $("input[type='radio']:checked").data('time');
    AddPollView.deadline = minutes;
    window.location.hash = '#newpoll';
  };

  this.render = function() {
    this.el.html(DeadlineView.template());
    var list = this.el.find('#deadline-list');
    $.each(this.times, function(index, object) {
      list.append(DeadlineView.timetemplate(object));
    });
    // This doesn't work as expected
    if (AddPollView.deadline) {
      $("input[data-time='"+AddPollView.deadline+"']")[0].checked = true;
    }

    return this;
  };

  this.initialize = function() {
    this.el = $("<div data-view='deadline'/>");
    this.el.on('click', '#deadline-ok-btn', this.ok);
  };

  this.initialize();
}

DeadlineView.template = Handlebars.compile($('#deadline-tpl').html());
DeadlineView.timetemplate = Handlebars.compile($('#deadline-time-tpl').html());
