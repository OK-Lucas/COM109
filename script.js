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

  
  $('#email-popup').on('click', function (e) {
    e.stopPropagation();
  });

});
// ===== ACCESSIBILITY MENU =====
$(document).ready(function () {

  $('#access-toggle').on('click', function (e) {
    e.stopPropagation();
    var isOpen = $('#access-panel').is(':visible');
    if (isOpen) {
      $('#access-panel').fadeOut(150).attr('aria-hidden', 'true');
      $(this).attr('aria-expanded', 'false').attr('aria-label', 'Open accessibility options');
    } else {
      $('#access-panel').fadeIn(150).attr('aria-hidden', 'false');
      $(this).attr('aria-expanded', 'true').attr('aria-label', 'Close accessibility options');
    }
  });

  $(document).on('click', function () {
    $('#access-panel').fadeOut(150).attr('aria-hidden', 'true');
    $('#access-toggle').attr('aria-expanded', 'false').attr('aria-label', 'Open accessibility options');
  });

  $('#access-panel').on('click', function (e) { e.stopPropagation(); });

  $('#acc-font-size').on('click', function () {
    $('body').toggleClass('acc-large-text');
    $(this).toggleClass('active');
    $(this).attr('aria-pressed', $(this).hasClass('active').toString());
  });

  $('#acc-contrast').on('click', function () {
    $('body').toggleClass('acc-high-contrast');
    $(this).toggleClass('active');
    $(this).attr('aria-pressed', $(this).hasClass('active').toString());
  });

  $('#acc-dyslexia').on('click', function () {
    $('body').toggleClass('acc-dyslexia');
    $(this).toggleClass('active');
    $(this).attr('aria-pressed', $(this).hasClass('active').toString());
  });

  $('#acc-motion').on('click', function () {
    $('body').toggleClass('acc-reduce-motion');
    $(this).toggleClass('active');
    $(this).attr('aria-pressed', $(this).hasClass('active').toString());
  });

  $('#acc-reset').on('click', function () {
    $('body').removeClass('acc-large-text acc-high-contrast acc-dyslexia acc-reduce-motion');
    $('.access-option').removeClass('active').attr('aria-pressed', 'false');
  });

});
// ===== END ACCESSIBILITY MENU =====