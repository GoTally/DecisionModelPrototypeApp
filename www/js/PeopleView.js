var PeopleView = function() {

  this.render = function() {
    this.el.html(PeopleView.template());
    return this;
  };

  this.initialize = function() {
    this.el = $('<div/>');
  };

  this.initialize();
}

PeopleView.template = Handlebars.compile($('#people-tpl').html());
PeopleView.persontemplate = Handlebars.compile($('#person-entry-tpl').html());
