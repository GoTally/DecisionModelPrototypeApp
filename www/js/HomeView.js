var HomeView = function() {

  this.sort = function() {
    console.log('Sort existing polls');
    app.showAlert('Sort');
  };

  this.add = function() {
    window.location.hash = '#newpoll';
  };

  this.logout = function() {
    window.localStorage.removeItem('user_id');
    window.location.hash = '#';
  };

  this.render = function() {
    this.el.html(HomeView.template());
    var url = 'https://decision-prototype.herokuapp.com/users/'+window.localStorage.user_id;

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
    this.el.on('click', '#home-logout-btn', this.logout);
    this.el.on('click', '#home-add-btn', this.add);
  };

  this.initialize();
}

HomeView.template = Handlebars.compile($('#home-tpl').html());
HomeView.polltemplate = Handlebars.compile($('#home-poll-tpl').html());
