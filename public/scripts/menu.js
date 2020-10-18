$(document).ready(function() {
  let removeBtn = $('.remove-btn');
  removeBtn.each(function(index) {
    $(this).on('click', function(event) {
      const buttonClicked = event.target;
      console.log(buttonClicked);
    })
  })
});



