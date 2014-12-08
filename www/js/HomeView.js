var HomeView = function() {

  this.sort = function() {
    console.log('Sort existing polls');
    app.showAlert('Sort');
  };

  this.add = function() {
    console.log('Start new poll');
    app.showAlert('Add');
  };

  this.render = function() {
    this.el.html(HomeView.template());
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
    // Make API call to server and get polls with user ID
    /*$.get(url, { polls: true }, function(response) {
      app.showAlert(response.polls);
      $('.poll-list').html(HomeView.litemplate(response.polls));
    });*/

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
