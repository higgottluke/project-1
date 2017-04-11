/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

(function (window) {
  'user strict';

  var App = window.App || {};
  var $ = window.jQuery;
  var FormHandler = App.FormHandler;

  function PostList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  PostList.prototype.addClickHandler = function () {
    this.$element.on('click', '[data-employer-list="item"]', function () {
      var id = $(this).attr('id');
      console.log('Clicked on ' + id);
      $('#comments_for_post_' + id).toggle();
    });
  };

  PostList.prototype.addPost = function (post) {
    // Remove any existing rows that match the id
    this.removePost(post.id);

    // Create a new instance of a row, using the post info
    var rowElement = new Row(post);

    // Add the new row instance's $element property to the list
    this.$element.append(rowElement.$element);

    var formHandler = new FormHandler('[data-comment="add_comment_' + post.id + '"]');
    formHandler.addCommentHandler(post.id);
  };

  PostList.prototype.addComment = function (comment) {
    console.log('Adding comment ' + comment.id + ' to post ' + comment.postId);

    var $newComment = $('<li></li>', {
      'class': 'list-group-item',
      'id': comment.id
    }).append(comment.body);

    this.$element
      .find('[id=comments_for_post_' + comment.postId + ']')
      .closest('[data-employer-list="comments"]')
      //TODO: We should update this to use a data attribute instead of class
      .find('[class="list-group"]')
      .append($newComment);
  };

  PostList.prototype.addTag = function (postId, tag) {
    console.log('Adding tag "' + tag.body + '" to post ' + postId);

    var $newTag = $('<span></span>', {
      'class': tag.class
    }).append(tag.body);

    this.$element
      .find('[id=' + postId + ']')
      .closest('[data-employer-list="item"]')
      //TODO: We should update this to use a data attribute instead of class
      .find('[class="tags pull-right"]')
      .append($newTag);
  };

  //FIXME: This method may not work.  Need to test.
  PostList.prototype.removePost = function (id) {
    this.$element
      .find('[value="' + id + '"]')
      .closest('[data-employer-list="item"]')
      .remove();
  };

  function Row(post) {
    var $li = $('<li></li>');

    var $div = $('<div></div>', {
      'class': 'panel panel-default'
    });

    var $div1 = $('<div></div>', {
      'data-employer-list': 'item',
      'class': 'panel-heading',
      'id': post.id
    });

    var $h4 = $('<h4></h4)');
    $h4.append(post.name);
    $div1.append($h4);

    var $p = $('<p></p>', {
      'class': 'list-group-item-text'
    });
    $p.append(post.title);
    $div1.append($p);

    var $div2 = $('<div></div>', {
      'class': 'row'
    });

    var $div3 = $('<div></div>', {
      'class': 'col-xs-2'
    });

    var $span = $('<span></span>', {
      'class': 'pull-left stars'
    });

    var count;
    for(count = 0; count < post.stars; count++){
      $span.append($('<i></i>', {
        'class': 'fa fa-star',
        'aria-hidden': 'true'
      }));
    }

    var $div5 = $('<div></div>', {
      'class': 'col-xs-10 col-offset-1'
    });

    var $div6 = $('<div></div>', {
      'class': 'tags pull-right'
    });

    $div5.append($div6);
    $div3.append($span);
    $div2.append($div3);
    $div2.append($div5);
    $div1.append($div2);
    $div.append($div1);

    var $div4 = $('<div></div>', {
      'class': 'panel-body',
      'data-employer-list': 'comments',
      'id': 'comments_for_post_' + post.id
    });

    var $ul = $('<ul></ul>', {
      'class': 'list-group'
    });

    var $textArea = $('<textarea></textarea>', {
      'id': 'comment_for_post_' + post.id,
      'rows': '1',
      'cols': '95%',
      'placeholder': 'Write your comment here'
    });

    var $addComment = $('<button></button>', {
      'class': 'btn btn-primary',
      'data-toggle': 'modal',
      'data-comment-post-id': post.id,
      'data-comment': 'add_comment_' + post.id
    });
    $addComment.append('Add Comment');

    $div4.append($ul);
    $div4.append($textArea);
    $div4.append($addComment);
    $div.append($div4);
    $li.append($div);

    this.$element = $li;
  }

  App.PostList = PostList;
  window.App = App;
})(window);
