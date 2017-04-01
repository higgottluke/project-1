/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

(function (window) {
  'use strict';
  var App = window.App || {};

  function PostOrganizer(db) {
    this.db = db;
  }

  PostOrganizer.prototype.createPost = function (post) {
    console.log('Adding post for ' + post);
    return this.db.add(post.emailAddress, post);
  };

  PostOrganizer.prototype.removePost = function (postID) {
    console.log('Removing post for ' + postID);
    return this.db.remove(postID);
  };

  PostOrganizer.prototype.printPosts = function (printFn) {
    return this.db.getAll('posts')
      .then(function (posts) {
        var employerIdArray = Object.keys(posts);

        console.log('All posts:');

        employerIdArray.forEach(function (id) {
          console.log(posts[id]);
          if (printFn) {
            printFn(posts[id]);
          }
        }.bind(this));
      }.bind(this));
  };

  App.PostOrganizer = PostOrganizer;
  window.App = App;

})(window);
