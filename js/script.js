( function () {
  console.log("hello, it's me");
  addAllClickHandlers();
}) (window);

function addAllClickHandlers() {
  $listitems = $('[data-employer-list="item"]');
  console.log($listitems);
  $listitems.each(function () {
    addClickHandler(this);
  });
}
function addClickHandler(item) {
  $(item).on('click', function (event) {
    event.preventDefault();
    //console.log(event.currentTarget);
    //console.log(event.currentTarget.childNodes[1].childNodes[3]);
    $(event.currentTarget.parentElement.childNodes[3]).toggle();
  });
}
