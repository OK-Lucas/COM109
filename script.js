$(document).ready(function () {

  // Open popup when a Contact button is clicked
  $('.contact-btn').on('click', function (e) {
    e.stopPropagation();

    var email = $(this).data('email');
    $('#email-popup-address').text(email);
    $('#email-popup').fadeIn(200);
  });

  // Close popup when the X button is clicked
  $('#email-popup-close').on('click', function (e) {
    e.stopPropagation();
    $('#email-popup').fadeOut(150);
  });

  // Close popup when clicking anywhere else on the page
  $(document).on('click', function () {
    $('#email-popup').fadeOut(150);
  });

  // Prevent clicks inside the popup from closing it
  $('#email-popup').on('click', function (e) {
    e.stopPropagation();
  });

});
