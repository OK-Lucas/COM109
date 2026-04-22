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

// ----- Workout Quiz -----
$(document).ready(function () {

  if (!$('#quizForm').length) return;

  function reduceMotion() {
    return $('body').hasClass('acc-reduce-motion');
  }

  function setError($group, $err, msg) {
    $group.addClass('has-error').removeClass('is-valid');
    $err.text(msg);
  }

  function setValid($group, $err) {
    $group.removeClass('has-error').addClass('is-valid');
    $err.text('');
  }

  function validateField(id) {
    var $group = $('#fg-' + id);
    var $err   = $('#err-' + id);
    var val    = $('#quiz-' + id.charAt(0).toUpperCase() + id.slice(1)).val() ||
                 $('#quiz' + id.charAt(0).toUpperCase() + id.slice(1)).val();

    // Use the correct select ID directly
    val = $('#quizGoal, #quizIntensity, #quizPreference').filter('[id="quiz' + id.charAt(0).toUpperCase() + id.slice(1) + '"]').val();

    if (!val) {
      setError($group, $err, 'Please make a selection.');
      return false;
    }
    setValid($group, $err);
    return true;
  }

  function getRecommendation(goal, intensity, preference) {
    // Build a recommendation based on the three selections
    if (goal === 'improve-flexibility' || (goal === 'general-fitness' && intensity === 'low')) {
      if (preference === 'calm') {
        return {
          name: 'Yoga',
          reason: 'Yoga is perfect for improving flexibility in a calm, focused environment. It builds body awareness and promotes relaxation alongside physical progress.'
        };
      }
      return {
        name: 'Pilates',
        reason: 'Pilates will help you build flexibility and core strength at a measured pace, ideal for your goal and preference.'
      };
    }

    if (goal === 'build-strength') {
      if (preference === 'solo' || intensity === 'high') {
        return {
          name: 'Personal Training',
          reason: 'One-on-one Personal Training gives you focused, expert coaching to build strength safely and efficiently at a high intensity tailored to you.'
        };
      }
      return {
        name: 'Strength Training',
        reason: 'Our Strength Training classes are designed to build muscle and power in a structured group setting — a great match for your goal.'
      };
    }

    if (goal === 'boost-endurance' || (goal === 'lose-weight' && intensity === 'high')) {
      if (preference === 'fast' || preference === 'group') {
        return {
          name: 'HIIT',
          reason: 'HIIT (High-Intensity Interval Training) is the most effective way to boost endurance and burn calories fast in an energetic group environment.'
        };
      }
      return {
        name: 'Cardio',
        reason: 'Our Cardio classes will steadily build your endurance and support weight loss at a pace that suits your preference.'
      };
    }

    if (goal === 'lose-weight' && intensity !== 'high') {
      return {
        name: 'Cardio',
        reason: 'Cardio is a reliable and enjoyable way to lose weight at a manageable intensity, keeping you consistent and motivated.'
      };
    }

    if (preference === 'solo') {
      return {
        name: 'Personal Training',
        reason: 'Personal Training gives you a fully tailored programme, one-on-one with an expert coach — ideal for your solo training preference.'
      };
    }

    // Default
    return {
      name: 'HIIT',
      reason: 'HIIT is a versatile, high-energy class that supports a wide range of fitness goals and works well for most training preferences.'
    };
  }

  // Live validation on change
  $('#quizGoal').on('change', function () {
    var val = $(this).val();
    var $group = $('#fg-goal');
    var $err   = $('#err-goal');
    if (!val) { setError($group, $err, 'Please make a selection.'); }
    else       { setValid($group, $err); }
  });

  $('#quizIntensity').on('change', function () {
    var val = $(this).val();
    var $group = $('#fg-intensity');
    var $err   = $('#err-intensity');
    if (!val) { setError($group, $err, 'Please make a selection.'); }
    else       { setValid($group, $err); }
  });

  $('#quizPreference').on('change', function () {
    var val = $(this).val();
    var $group = $('#fg-preference');
    var $err   = $('#err-preference');
    if (!val) { setError($group, $err, 'Please make a selection.'); }
    else       { setValid($group, $err); }
  });

  // Submit
  $('#quizForm').on('submit', function (e) {
    e.preventDefault();

    var goal       = $('#quizGoal').val();
    var intensity  = $('#quizIntensity').val();
    var preference = $('#quizPreference').val();

    var goalOk = true, intensityOk = true, preferenceOk = true;

    if (!goal) {
      setError($('#fg-goal'), $('#err-goal'), 'Please make a selection.');
      goalOk = false;
    }
    if (!intensity) {
      setError($('#fg-intensity'), $('#err-intensity'), 'Please make a selection.');
      intensityOk = false;
    }
    if (!preference) {
      setError($('#fg-preference'), $('#err-preference'), 'Please make a selection.');
      preferenceOk = false;
    }

    if (!goalOk || !intensityOk || !preferenceOk) {
      $('#quizForm .has-error select').first().focus();
      return;
    }

    // Get readable labels from selected option text
    var goalLabel       = $('#quizGoal option:selected').text();
    var intensityLabel  = $('#quizIntensity option:selected').text();
    var preferenceLabel = $('#quizPreference option:selected').text();

    var result = getRecommendation(goal, intensity, preference);

    // Populate result panel
    $('#resultTitle').text('We recommend: ' + result.name);
    $('#resultExplanation').text(result.reason);

    var $summary = $('#resultSummary').empty();
    var choices = [
      { label: 'Primary Goal',        value: goalLabel },
      { label: 'Preferred Intensity', value: intensityLabel },
      { label: 'Training Preference', value: preferenceLabel }
    ];
    choices.forEach(function (item) {
      var $li = $('<li>');
      $('<strong>').text(item.label + ':').appendTo($li);
      $('<span>').text(' ' + item.value).appendTo($li);
      $summary.append($li);
    });

    // Reveal result panel
    var $panel = $('#quizResult');
    $panel.css('display', 'block');

    if (reduceMotion()) {
      $panel.css({ opacity: 1, transform: 'none' });
    } else {
      $panel.addClass('result-visible');
    }

    $('html, body').animate({
      scrollTop: $panel.offset().top - 40
    }, 350);
  });

});

// ==================== END HOME.HTML ====================


// ==================== CLASSES.HTML ====================

// ----- Timetable Data -----
var TIMETABLE = [
  {
    day: "Monday",
    classes: [
      { time: "09:20 – 09:40", name: "Strengthen - Lucas" },
      { time: "09:40 – 10:00", name: "Endurance- Aodhan" },
      { time: "10:00 – 10:20", name: "Performance - Lucas" }
    ]
  },
  {
    day: "Tuesday",
    classes: [
      { time: "09:00 – 09:25", name: "Recovery - Kaden" },
      { time: "09:25 – 09:50", name: "Yoga - Kaden" },
      { time: "09:45 – 10:05", name: "Pilates- Kaden" }
    ]
  },
  {
    day: "Wednesday",
    classes: [
      { time: "09:00 – 09:30", name: "Dumbbell - Lucas" },
      { time: "09:30 – 10:00", name: "Circuit training - Lucas" },
      { time: "10:00 – 10:15", name: "Weight Lifting - Lucas" },
      { time: "10:15 – 10:30", name: "Foundation Classes - Lucas" }
    ]
  },
  {
    day: "Thursday",
    classes: [
      { time: "09:00 – 09:20", name: "Hydrox- Aodhan" },
      { time: "09:20 – 09:40", name: "Physio- Kaden" },
      { time: "09:40 – 10:00", name: "Bikes - Aodhan" }
    ]
  },
  {
    day: "Friday",
    classes: [
      { time: "09:00 – 09:30", name: "Weights- Lucas" },
      { time: "09:30 – 10:00", name: "Deadlifts - Lucas" },
      { time: "10:00 – 10:30", name: "Lunges- Lucas" }
    ]
  },
  {
    day: "Saturday",
    classes: [
      { time: "09:00 – 09:40", name: "Band Resistances- Kaden" },
      { time: "09:40 – 10:10", name: "Pushups- Aodhan" }
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
