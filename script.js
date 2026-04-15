// Highlight the current page link in the navbar
const links = document.querySelectorAll('.nav-links a');

links.forEach(function(link) {
  if (link.href === window.location.href) {
    link.style.color = 'white';
    link.style.fontWeight = 'bold';
  }
});
