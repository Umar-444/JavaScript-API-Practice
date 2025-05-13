
window.addEventListener('scroll', function() {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var rect = section.getBoundingClientRect();
      
      if (rect.top <= 0 && rect.bottom >= 0) {
        section.classList.add('fixed'); // Add the 'fixed' class to the currently visible section
      } else{
        section.classList.remove('fixed'); // Remove the 'fixed' class from other sections
      }
    }
  });