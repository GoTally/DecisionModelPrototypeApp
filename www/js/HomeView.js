var HomeView = function() {

  this.sort = function() {
    console.log('Sort existing polls');
    app.showAlert('Sort');
  };

  this.add = function() {
    window.location.hash = '#newpoll';
  };

  this.render = function() {
    this.el.html(HomeView.template());
    //app.user_id = 4; // For local dev
    var url = 'https://decision-prototype.herokuapp.com/users/'+app.user_id;

    $.ajax({
      url: url,
      dataType: 'jsonp',
      data: {polls: true},
      success: function(response) {
        $.each(response.polls, function(index, object) {
          $('.poll-list').append(HomeView.polltemplate(object));
        });
      }
    });

    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
    this.el.on('click', '#home-sort-btn', this.sort);
    this.el.on('click', '#home-add-btn', this.add);
  };

  this.initialize();
}

HomeView.template = Handlebars.compile($('#home-tpl').html());
HomeView.polltemplate = Handlebars.compile($('#home-poll-tpl').html());
