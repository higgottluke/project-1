/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

(function (window) {
  'use strict';

  //Constants
  var SERVER_URL = 'http://localhost:3002/';

  //Global variables
  var App = window.App;
  // var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var PostOrganizer = App.PostOrganizer;
  var PostList = App.PostList;

  //Object Instantiations
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var postOrganizer = new PostOrganizer(remoteDS);
  window.postOrganizer = postOrganizer;
  var postList = new PostList('[data-employer-list="list"]');
  postList.addClickHandler(postList);

  //Event Handlers
  postOrganizer.printPosts(postList.addPost.bind(postList));

})(window);
