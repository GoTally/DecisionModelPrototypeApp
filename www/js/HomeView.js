var HomeView = function() {

  this.sort = function() {
    console.log('Sort existing polls');
  };

  this.add = function() {
    console.log('Start new poll');
  };

  this.render = function() {
    this.el.html(HomeView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
    this.el.on('click', '.navigation-bar__left', this.sort);
    this.el.on('click', '.navigation-bar__right', this.add);
  };

  this.initialize();
}

HomeView.template = Handlebars.compile($('#home-tpl').html());
