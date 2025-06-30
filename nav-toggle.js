(function() {
  var toggle = document.getElementById("hamburger");
  var menu = document.getElementById("mainMenu");
  toggle.addEventListener("click", function() {
    menu.classList.toggle("active");
  });

  var isMobile = window.innerWidth <= 768;
  if (isMobile) {
    var links = document.querySelectorAll("li > a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function(e) {
        var parent = this.parentElement;
        if (parent.querySelector(".submenu")) {
          e.preventDefault();
          parent.classList.toggle("open");
        }
      });
    }
  }
})();