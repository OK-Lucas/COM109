// Staff popup Jquery
$(document).ready(function () {

  
  $('.contact-btn').on('click', function (e) {
    e.stopPropagation();

    var email = $(this).data('email');
    $('#email-popup-address').text(email);
    $('#email-popup').fadeIn(200);
  });

  
  $('#email-popup-close').on('click', function (e) {
    e.stopPropagation();
    $('#email-popup').fadeOut(150);
  });

 
  $(document).on('click', function () {
    $('#email-popup').fadeOut(150);
  });

  /
  $('#email-popup').on('click', function (e) {
    e.stopPropagation();
  });

});
