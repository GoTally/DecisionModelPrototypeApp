var HomeView = function() {

  this.sort = function() {
    console.log('Sort existing polls');
  };

  this.add = function() {
    console.log('Start new poll');
  };

  this.render = function() {
    this.el.html(HomeView.template());
    // Make API call to server and get polls with user ID
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
