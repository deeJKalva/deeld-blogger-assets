(function () {
  const isMobile = () => window.innerWidth <= 768;

  // Avoid audio play error if src is not ready
  const safePlay = () => {
    const audio = document.getElementById("bgMusic");
    if (audio && audio.src && !audio.paused) {
      audio.play().catch(() => {}); // prevent NotSupportedError
    }
  };

  function closeAllSubmenus(context = document) {
    context.querySelectorAll(".submenu.open").forEach(sub => sub.classList.remove("open"));
  }

  function toggleSubmenu(e, submenu) {
    e.preventDefault();
    const isOpen = submenu.classList.contains("open");

    // Close all siblings' submenus at the same level
    closeAllSubmenus(submenu.parentElement.parentElement);

    if (!isOpen) {
      submenu.classList.add("open");
    }

    safePlay(); // optional safeguard if music is paused/playing
  }

  function setupMobileMenu() {
    const menuToggle = document.getElementById("hamburger");
    const mainMenu = document.getElementById("mainMenu");

    menuToggle.addEventListener("click", () => {
      const isOpen = mainMenu.classList.toggle("active");
      menuToggle.textContent = isOpen ? "←" : "MENU";
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

    window.addEventListener("beforeunload", () => {
      mainMenu.classList.remove("active");
      menuToggle.textContent = "MENU";
      closeAllSubmenus();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (isMobile()) setupMobileMenu();
  });
})();