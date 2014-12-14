var DeadlineView = function() {

  this.times = ['None', '10 minutes', '30 minutes', '1 hour', '2 hours'];

  this.ok = function() {
    var selectedTime = $("input[type='radio']:checked").data('time');
    AddPollView.deadline = selectedTime;
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
    this.el = $('<div/>');
    this.el.on('click', '#deadline-ok-btn', this.ok);
  };

  this.initialize();
}

DeadlineView.template = Handlebars.compile($('#deadline-tpl').html());
DeadlineView.timetemplate = Handlebars.compile($('#deadline-time-tpl').html());
