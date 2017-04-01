/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

(function (window) {
  'use strict';
  var App = window.App || {};

  function PostOrganizer(db) {
    this.db = db;
  }

  PostOrganizer.prototype.createPost = function (post) {
    console.log('Adding post for ' + post);
    return this.db.add(post.id, post);
  };

  PostOrganizer.prototype.removePost = function (postId) {
    console.log('Removing post for ' + postId);
    return this.db.remove(postId);
  };

  PostOrganizer.prototype.addComment = function (postId, comment) {
    console.log('Adding comment to post ' + postId);
    //TODO: Implement
  };

  PostOrganizer.prototype.addTag = function (postId, tag) {
    console.log('Adding tag to post ' + postId);
  };

  //TODO: there's probably a cleaner way to do this
  PostOrganizer.prototype.printPosts = function (printPost, printComments, printTags) {
    //First, render all the posts.
    return this.db.getAll('posts')
      .then(function (posts) {
        var postIdArray = Object.keys(posts);

        console.log('All posts:');

        postIdArray.forEach(function (id) {
          console.log(posts[id]);
          if (printPost) {
            printPost(posts[id]);
          }
        }.bind(this));

        //Second, render all the comments
        return this.db.getAll('comments')
          .then(function (comments) {
            var commentIdArray = Object.keys(comments);
            console.log('All comments:');
            commentIdArray.forEach(function (id) {
              console.log(comments[id]);
              if (printComments) {
                printComments(comments[id]);
              }
            }.bind(this));

            //Third, render all the tags
            return this.db.getAll('tags')
              .then(function (tags) {
                console.log(tags);
                console.log('All tags:');

                postIdArray.forEach(function (id) {
                  console.log('Adding tags to post ' + posts[id].id);

                  var i;
                  for(i = 0; i < posts[id].tag_ids.length; i++) {
                    var tag = tags[posts[id].tag_ids[i] - 1];
                    if (printTags) {
                      printTags(posts[id].id, tag);
                    }
                  }
                }.bind(this));
              }.bind(this));
          }.bind(this));
      }.bind(this));
  };

  App.PostOrganizer = PostOrganizer;
  window.App = App;

})(window);
