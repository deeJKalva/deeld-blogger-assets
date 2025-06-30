(function () {
  const isMobile = () => window.innerWidth <= 768;

  function closeAllSubmenus(context = document) {
    context.querySelectorAll(".submenu.open").forEach(sub => sub.classList.remove("open"));
  }

  function toggleSubmenu(e, submenu) {
    e.preventDefault();
    const isOpen = submenu.classList.contains("open");

    // Close all siblings' submenus
    closeAllSubmenus(submenu.parentElement.parentElement);

    if (!isOpen) {
      submenu.classList.add("open");
    }
  }

  function setupMenuLogic() {
    const menuToggle = document.getElementById("hamburger");
    const mainMenu = document.getElementById("mainMenu");

    menuToggle.addEventListener("click", () => {
      const isMenuOpen = mainMenu.classList.toggle("active");
      menuToggle.textContent = isMenuOpen ? "←" : "MENU";
    });

    mainMenu.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const li = link.parentElement;
      const submenu = li.querySelector(".submenu");

      if (submenu) {
        toggleSubmenu(e, submenu);
      } else {
        document.getElementById("mainMenu").classList.remove("active");
        menuToggle.textContent = "MENU";
        closeAllSubmenus();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (isMobile()) setupMenuLogic();
  });

})();