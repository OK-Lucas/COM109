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

// ===== FLIP CARD FEATURE =====
$(document).ready(function () {

  // Flip to back
  $('.btn-flip').on('click', function (e) {
    e.stopPropagation();
    $(this).closest('.team-card').addClass('is-flipped');
  });

  // Flip back to front
  $('.btn-flip-back').on('click', function (e) {
    e.stopPropagation();
    $(this).closest('.team-card').removeClass('is-flipped');
  });

});
// ===== END FLIP CARD FEATURE =====


// Classes Timetable start

var TIMETABLE = [
  {
    day: "Monday",
    classes: [
      { time: "09:20 – 09:40", name: "Push Ups" },
      { time: "09:40 – 10:00", name: "Med Ball Slam" },
      { time: "10:00 – 10:20", name: "Kneeling DB Press" }
    ]
  },
  {
    day: "Tuesday",
    classes: [
      { time: "09:00 – 09:25", name: "CMJ" },
      { time: "09:25 – 09:50", name: "Band Assisted Pogos" },
      { time: "09:45 – 10:05", name: "Barbell Bench Press" }
    ]
  },
  {
    day: "Wednesday",
    classes: [
      { time: "09:00 – 09:30", name: "Copenhagen" },
      { time: "09:30 – 10:00", name: "Wall Sit" },
      { time: "10:00 – 10:15", name: "Paloff Press" },
      { time: "10:15 – 10:30", name: "Plank" }
    ]
  },
  {
    day: "Thursday",
    classes: [
      { time: "09:00 – 09:20", name: "Hanging Leg Raise" },
      { time: "09:20 – 09:40", name: "Hexbar Deadlift" },
      { time: "09:40 – 10:00", name: "Hang Clean" }
    ]
  },
  {
    day: "Friday",
    classes: [
      { time: "09:00 – 09:30", name: "Bikes" },
      { time: "09:30 – 10:00", name: "Broad Jumps" },
      { time: "10:00 – 10:30", name: "Lateral Rebound from Plate" }
    ]
  },
  {
    day: "Saturday",
    classes: [
      { time: "09:00 – 09:40", name: "Hamstring Curls" },
      { time: "09:40 – 10:10", name: "Rockback Jumps" }
    ]
  },
  {
    day: "Sunday",
    classes: [] // empty = rest day
  }
];

function getTodayIndex() {
  var d = new Date().getDay(); // 0=Sun, 1=Mon ... 6=Sat
  return (d + 6) % 7;         // shift to 0=Mon ... 6=Sun
}

function buildScheduleHTML(entry) {
  if (!entry.classes || entry.classes.length === 0) {
    return '<p class="rest-day">🛌 Rest day – recover and recharge!</p>';
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
  var currentIndex = getTodayIndex();

  renderDay(currentIndex);

  $("#prevDayBtn").on("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      renderDay(currentIndex);
    }
  });

  $("#nextDayBtn").on("click", function () {
    if (currentIndex < TIMETABLE.length - 1) {
      currentIndex++;
      renderDay(currentIndex);
    }
  });
});

// Classes Timetable end

// ===== ACTIVE NAV LINK =====
var links = document.querySelectorAll('.nav-links a');
links.forEach(function (link) {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
// ===== END ACTIVE NAV LINK =====

// ===== SLIDESHOW =====
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

  // Build dot indicators
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

  // Keyboard support
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { prev(); resetAuto(); }
    if (e.key === 'ArrowRight') { next(); resetAuto(); }
  });

  startAuto();
})();
// ===== END SLIDESHOW =====