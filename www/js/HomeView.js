var HomeView = function() {

  this.render = function() {
    this.el.html(HomeView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
  };

  this.initialize();
}

HomeView.template = Handlebars.compile($('#home-tpl').html());
