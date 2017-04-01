/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

(function (window) {
  'user strict';

  var App = window.App || {};
  var $ = window.jQuery;

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
  };

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

    $span.append($('<i></i>', {
      'class': 'fa fa-star',
      'aria-hidden': 'true'
    }));

    $span.append($('<i></i>', {
      'class': 'fa fa-star',
      'aria-hidden': 'true'
    }));

    $div3.append($span);
    $div2.append($div3);
    $div1.append($div2);
    $div.append($div1);

    //*** BEGIN *** //

    //FIXME: the code inbetween this begin and end should be dynamic

    var $div4 = $('<div></div>', {
      'class': 'panel-body',
      'data-employer-list': 'comments',
      'id': 'comments_for_post_' + post.id
    });

    var $ul = $('<ul></ul>', {
      'class': 'list-group'
    });

    var $li1 = $('<li></li>', {
      'class': 'list-group-item',
      'id': post.id
    });
    $li1.append('This is a test comment');

    $ul.append($li1);
    $div4.append($ul);
    $div.append($div4);

    //***  END  *** //

    $li.append($div);

    this.$element = $li;
  }

  App.PostList = PostList;
  window.App = App;
})(window);
