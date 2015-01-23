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
      var signupHash = /#signup\/?/;
      var homeHash = /#home\/?/;
      var pollHash = /#poll\/\d+\/?$/;
      var inviteesHash = /#poll\/\d+\/invitees\/?/;
      var newPollHash = /#newpoll\/?/;
      var deadlineHash = /#deadline\/?/;
      var choicesHash = /#choices\/?/;
      var peopleHash = /#people\/?/;
      var resultsHash = /#results\/?/;

      // Just a bit faster for rendering LoginView
      if(!hash) {
        this.slidePage(new LoginView().render());
        return;
      }

      if (hash.match(signupHash)) {
        this.slidePage(new SignupView().render());
      } else if (hash.match(homeHash)) {
        this.slidePage(new HomeView().render());
      } else if (hash.match(pollHash)) {
        var pollId = hash.split('/')[1];
        this.slidePage(new PollView(pollId).render());
      } else if (hash.match(inviteesHash)) {
        var pollId = hash.split('/')[1];
        this.slidePage(new InviteesView(pollId).render());
      } else if (hash.match(newPollHash)) {
        if (!this.addPollView) {
          this.addPollView = new AddPollView().render();
        }
        this.slidePage(this.addPollView);
        this.addPollView.bind();
      } else if (hash.match(deadlineHash)) {
        this.slidePage(new DeadlineView().render());
      } else if (hash.match(choicesHash)) {
        this.slidePage(new ChoicesView().render());
      } else if (hash.match(peopleHash)) {
        this.slidePage(new PeopleView().render());
      } else if (hash.match(resultsHash)) {
        var pollId = hash.split('/')[1];
        this.slidePage(new ResultsView().render());
      } else {
        this.slidePage(new LoginView().render());
      }
    },

    // EH...
    slidePageVert: function(page) {
      var self = this;
      $(page.el).attr('class', 'page bg stage-bottom');
      $('body').append(page.el);

      setTimeout(function() {
        $(page.el).removeClass('stage-bottom');
        $(page.el).addClass('stage-center transition');
      });
      setTimeout(function() {
        $(self.currentPage.el).hide();
        self.currentPage = page;
      }, 375);
    },

    slidePage: function(page) {
      var self = this;

      // Empty Stage
      // This should only be for LoginView
      if (!this.currentPage) {
        $(page.el).addClass('page stage-center');
        $('body').append(page.el);
        this.currentPage = page;
        return;
      }
      
      // Check for page on stage
      // We assume the target page is on stage-left,
      // this may not be the case but I'm simplifying
      if ($('.stage-left').data('view') == page.el.data('view')) {
        // Clear left and right stage
        $('.stage-right').remove();
        $('.stage-left').remove();
        // Add target view html to window
        $('body').append(page.el);
        $(page.el).attr('class', 'page stage-center');

        setTimeout(function() {
          $(self.currentPage.el).attr('class', 'page transition stage-right');
          self.currentPage = page;
        });
      } else {
        // Clear left and right stage
        $('.stage-right').remove();
        $('.stage-left').remove();

        // Move new page to stage-right
        $(page.el).attr('class', 'page bg stage-right');
        // Appen new page html to body
        $('body').append(page.el);

        // Transition new page to stage-center
        setTimeout(function() {
          $(page.el).removeClass('stage-right');
          $(page.el).addClass('stage-center transition');
        });
        setTimeout(function() {
          $(self.currentPage.el).attr('class', 'page stage-left');
          self.currentPage = page;
        }, 375);
      }
    }
};

app.initialize();
