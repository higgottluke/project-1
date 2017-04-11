/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addCommentHandler = function (id) {
    this.$formElement.on('click', function (event) {
      console.log('Adding comment for ' + id + ': ' + event);

      //At this point a dialog should be popped up in order to collect
      //the comment from the user.  Once received the data should be written
      //to the database and inserted into the DOM via AJAX.
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
