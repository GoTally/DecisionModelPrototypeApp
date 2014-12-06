var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.route();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        // Routing
        $(window).on('hashchange', $.proxy(this.route, this));
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    showAlert: function(message) {
      if (navigator.notification) {
        navigator.notification.alert(message, null);
      } else {
        alert(message);
      }
    },

    route: function() {
      var hash = window.location.hash;
      var signupHash = /#signup/;
      var homeHash = /#home/;
      var pollHash = /#poll\/\d+/;

      if(!hash) {
        if (!this.loginView) {
          this.loginView = new LoginView().render();
        }
        this.slidePage(this.loginView);
        return;
      }

      if (hash.match(signupHash)) {
        this.slidePage(new SignupView().render());
      } else if (hash.match(homeHash)) {
        if (!this.homeView) {
          this.homeView = new HomeView().render();
        }
        this.slidePage(this.homeView);
      } else if (hash.match(pollHash)) {
        var pollId = hash.split('/')[1];
        this.slidePage(new PollView(pollId).render());
      }
    },

    slidePage: function(page) {
      var self = this;
      var currentPageDest;

      if (!this.currentPage) {
        $(page.el).attr('class', 'page stage-center');
        $('body').append(page.el);
        this.currentPage = page;
        return;
      }

      $('.stage-right, .stage-left').not('loginView').remove();

      if (page == app.loginView) {
        $(page.el).attr('class', 'page stage-left');
        currentPageDest = 'stage-right';
      } else {
        $(page.el).attr('class', 'page stage-right');
        currentPageDest = 'stage-left';
      }

      $('body').append(page.el);

      setTimeout(function() {
        $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
        $(page.el).attr('class', 'page stage-center transition');
        self.currentPage = page;
      });
    }
};

app.initialize();
