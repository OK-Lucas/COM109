// ============================================================
//  script.js  —  Pulse Studio
// ============================================================


// ==================== GLOBAL ====================

// ----- Active Nav Link -----
var links = document.querySelectorAll('.nav-links a');
links.forEach(function (link) {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// ----- Accessibility Menu -----
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

// ==================== END GLOBAL ====================


// ==================== STAFF.HTML ====================

// ----- Contact Email Popup -----
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

// ----- Flip Card -----
$(document).ready(function () {

  $('.btn-flip').on('click', function (e) {
    e.stopPropagation();
    $(this).closest('.team-card').addClass('is-flipped');
  });

  $('.btn-flip-back').on('click', function (e) {
    e.stopPropagation();
    $(this).closest('.team-card').removeClass('is-flipped');
  });

});

// ==================== END STAFF.HTML ====================


// ==================== HOME.HTML ====================

// ----- Slideshow -----
(function () {
  var track = document.getElementById('slideshowTrack');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var dotsContainer = document.getElementById('slideDots');
  if (!track) return;

  var slides = track.querySelectorAll('.slide');
  var total = slides.length;
  var current = 0;
  var autoTimer = null;

  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); resetAuto(); });
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsContainer.querySelectorAll('.slide-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() { autoTimer = setInterval(next, 5000); }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  prevBtn.addEventListener('click', function () { prev(); resetAuto(); });
  nextBtn.addEventListener('click', function () { next(); resetAuto(); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { prev(); resetAuto(); }
    if (e.key === 'ArrowRight') { next(); resetAuto(); }
  });

  startAuto();
})();

// ----- Taster Session Form -----
$(document).ready(function () {

  // Guard: only run on the Home page where the form exists
  if (!$('#tasterForm').length) return;

  // Helper: check whether reduce-motion is active
  function reduceMotion() {
    return $('body').hasClass('acc-reduce-motion');
  }

  // Helper: set a field as invalid with an error message
  function setError($group, $errSpan, message) {
    $group.addClass('has-error').removeClass('is-valid');
    $errSpan.text(message);
  }

  // Helper: set a field as valid, clear error message
  function setValid($group, $errSpan) {
    $group.removeClass('has-error').addClass('is-valid');
    $errSpan.text('');
  }

  // Validate a single field; returns true if valid
  function validateField(fieldId) {
    var $group   = $('#fg-' + fieldId);
    var $errSpan = $('#err-' + fieldId);

    if (fieldId === 'name') {
      var name = $('#tasterName').val().trim();
      if (name === '') {
        setError($group, $errSpan, 'Please enter your full name.');
        return false;
      } else if (name.length < 2) {
        setError($group, $errSpan, 'Name must be at least 2 characters.');
        return false;
      }
      setValid($group, $errSpan);
      return true;
    }

    if (fieldId === 'email') {
      var email = $('#tasterEmail').val().trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '') {
        setError($group, $errSpan, 'Please enter your email address.');
        return false;
      } else if (!emailPattern.test(email)) {
        setError($group, $errSpan, 'Please enter a valid email address.');
        return false;
      }
      setValid($group, $errSpan);
      return true;
    }

    if (fieldId === 'class') {
      var selectedClass = $('#tasterClass').val();
      if (!selectedClass) {
        setError($group, $errSpan, 'Please select a preferred class.');
        return false;
      }
      setValid($group, $errSpan);
      return true;
    }

    if (fieldId === 'message') {
      var message = $('#tasterMessage').val().trim();
      if (message === '') {
        setError($group, $errSpan, 'Please share your fitness goal or a short message.');
        return false;
      } else if (message.length < 10) {
        setError($group, $errSpan, 'Message must be at least 10 characters.');
        return false;
      }
      setValid($group, $errSpan);
      return true;
    }

    return true;
  }

  // Live validation: re-validate on input/change to give immediate feedback
  $('#tasterName').on('input', function () { validateField('name'); });
  $('#tasterEmail').on('input', function () { validateField('email'); });
  $('#tasterClass').on('change', function () { validateField('class'); });
  $('#tasterMessage').on('input', function () { validateField('message'); });

  // Form submit handler
  $('#tasterForm').on('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    var nameOk    = validateField('name');
    var emailOk   = validateField('email');
    var classOk   = validateField('class');
    var messageOk = validateField('message');

    if (!nameOk || !emailOk || !classOk || !messageOk) {
      $('#tasterForm .has-error input, #tasterForm .has-error select, #tasterForm .has-error textarea')
        .first().focus();
      return;
    }

    // All valid — collect values
    var submittedName    = $('#tasterName').val().trim();
    var submittedEmail   = $('#tasterEmail').val().trim();
    var submittedClass   = $('#tasterClass').val();
    var submittedMessage = $('#tasterMessage').val().trim();

    // Build confirmation list items (safely escaped via jQuery)
    var fields = [
      { label: 'Name',            value: submittedName },
      { label: 'Email',           value: submittedEmail },
      { label: 'Preferred Class', value: submittedClass },
      { label: 'Your Message',    value: submittedMessage }
    ];

    var $list = $('#confirmList').empty();
    fields.forEach(function (field) {
      var $li = $('<li>');
      $('<strong>').text(field.label + ':').appendTo($li);
      $('<span>').text(' ' + field.value).appendTo($li);
      $list.append($li);
    });

    // Hide the form, then reveal the confirmation panel with animation
    $('#tasterForm').slideUp(280, function () {
      var $panel = $('#tasterConfirmation');
      $panel.css('display', 'block');   // make visible before animating

      if (reduceMotion()) {
        // Reduced motion: show everything instantly with no CSS animation
        $panel.css({ opacity: 1, transform: 'none' });
        $list.find('li').css({ opacity: 1, transform: 'none' });
      } else {
        // Trigger the panel entrance keyframe
        $panel.addClass('confirm-visible');

        // Stagger each list item after the panel appears
        $list.find('li').each(function (i, el) {
          var delay = 380 + (i * 90); // start after panel animation (450ms) minus a bit
          setTimeout(function () {
            $(el).addClass('confirm-item-visible');
          }, delay);
        });
      }

      // Scroll smoothly to the confirmation panel
      $('html, body').animate({
        scrollTop: $panel.offset().top - 40
      }, 350);
    });
  });

});

// ==================== END HOME.HTML ====================


// ==================== CLASSES.HTML ====================

// ----- Timetable Data -----
var TIMETABLE = [
  {
    day: "Monday",
    classes: [
      { time: "09:20 - 09:40", name: "Push Ups" },
      { time: "09:40 - 10:00", name: "Med Ball Slam" },
      { time: "10:00 - 10:20", name: "Kneeling DB Press" }
    ]
  },
  {
    day: "Tuesday",
    classes: [
      { time: "09:00 - 09:25", name: "CMJ" },
      { time: "09:25 - 09:50", name: "Band Assisted Pogos" },
      { time: "09:45 - 10:05", name: "Barbell Bench Press" }
    ]
  },
  {
    day: "Wednesday",
    classes: [
      { time: "09:00 - 09:30", name: "Copenhagen" },
      { time: "09:30 - 10:00", name: "Wall Sit" },
      { time: "10:00 - 10:15", name: "Paloff Press" },
      { time: "10:15 - 10:30", name: "Plank" }
    ]
  },
  {
    day: "Thursday",
    classes: [
      { time: "09:00 - 09:20", name: "Hanging Leg Raise" },
      { time: "09:20 - 09:40", name: "Hexbar Deadlift" },
      { time: "09:40 - 10:00", name: "Hang Clean" }
    ]
  },
  {
    day: "Friday",
    classes: [
      { time: "09:00 - 09:30", name: "Bikes" },
      { time: "09:30 - 10:00", name: "Broad Jumps" },
      { time: "10:00 - 10:30", name: "Lateral Rebound from Plate" }
    ]
  },
  {
    day: "Saturday",
    classes: [
      { time: "09:00 - 09:40", name: "Hamstring Curls" },
      { time: "09:40 - 10:10", name: "Rockback Jumps" }
    ]
  },
  {
    day: "Sunday",
    classes: [] // rest day
  }
];

// ----- Timetable Render -----
function getTodayIndex() {
  var d = new Date().getDay(); // 0=Sun, 1=Mon ... 6=Sat
  return (d + 6) % 7;         // shift to 0=Mon ... 6=Sun
}

function buildScheduleHTML(entry) {
  if (!entry.classes || entry.classes.length === 0) {
    return '<p class="rest-day">Rest day - recover and recharge!</p>';
  }
  var items = entry.classes.map(function (c) {
    return "<li><strong>" + c.time + "</strong>: " + c.name + "</li>";
  });
  return "<ul>" + items.join("") + "</ul>";
}

function renderDay(index) {
  var entry = TIMETABLE[index];
  var today = getTodayIndex();
  var isToday    = index === today;
  var isTomorrow = index === (today + 1) % 7;

  $("#currentDayName").text(entry.day);
  $("#currentDayBadge").text(isToday ? "Today" : isTomorrow ? "Tomorrow" : "");

  if (!isToday && !isTomorrow) {
    $("#currentDayBadge").hide();
  } else {
    $("#currentDayBadge").show();
  }

  $("#prevDayBtn").prop("disabled", index === 0);
  $("#nextDayBtn").prop("disabled", index === TIMETABLE.length - 1);

  var $display = $("#dayScheduleDisplay");
  $display.removeClass("day-schedule");
  void $display[0].offsetWidth; // force reflow so animation re-triggers
  $display.addClass("day-schedule").html(buildScheduleHTML(entry));
}

$(function () {
  if (!document.getElementById('dayScheduleDisplay')) return;

  var currentIndex = getTodayIndex();
  renderDay(currentIndex);

  $("#prevDayBtn").on("click", function () {
    if (currentIndex > 0) { currentIndex--; renderDay(currentIndex); }
  });

  $("#nextDayBtn").on("click", function () {
    if (currentIndex < TIMETABLE.length - 1) { currentIndex++; renderDay(currentIndex); }
  });
});

// ==================== END CLASSES.HTML ====================