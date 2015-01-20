var tf = new TestFlight();
tf.takeOff(win, fail, "77792271-b5ce-4562-ae53-a087828a965c");

/*
     Add custom environment information
     If you want to track a user name from your application you can add it here

     @param successCallback function
     @param failureCallback function
     @param key string
     @param information string
     */
    tf.addCustomEnvironmentInformation(successCallback, failureCallback, 'key', 'information');

    /*
     Starts a TestFlight session

     @param successCallback function
     @param failureCallback function
     @param appToken string
     */
    tf.takeOff(successCallback, failureCallback, 'appToken');

    /*
     Sets custom options

     @param successCallback function
     @param failureCallback function
     @param options object i.e { reinstallCrashHandlers : true }
     */
    tf.setOptions(successCallback, failureCallback, options);

    /*
     Track when a user has passed a checkpoint after the flight has taken off. Eg. passed level 1, posted high score

     @param successCallback function
     @param failureCallback function
     @param checkpointName string
     */
    tf.passCheckpoint(successCallback, failureCallback, 'checkpointName');

    /*
     Send log message to testflight servers...

     @param successCallback function
     @param failureCallback function
     @param message string
     */
    tf.remoteLog(successCallback, failureCallback, 'message');

    /*
     Send log message to testflight servers... (async).
     Note that you might lose logs in a crash.

     @param successCallback function
     @param failureCallback function
     @param message string
     */
    tf.remoteLogAsync(successCallback, failureCallback, 'message');

    /*
      Submits custom feedback to the site. Sends the data in feedback to the site. 
      This is to be used as the method to submit feedback from custom feedback forms.

      @param successCallback function
      @param failureCallback function
      @param feedback Your users feedback, method does nothing if feedback is nil
    */
    tf.submitFeedback(successCallback, failureCallback, 'feedback');

    /*
     Manually start a session.

      @param successCallback function
      @param failureCallback function
    */
    tf.manuallyStartSession(successCallback, failureCallback);

    /*
      Manually end a session.

      @param successCallback function
      @param failureCallback function
    */
    tf.manuallyEndSession(successCallback, failureCallback);