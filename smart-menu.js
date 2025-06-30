(function () {
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) return; // Only apply for mobile

  const menuToggle = document.getElementById("hamburger");
  const menuContainer = document.getElementById("mainMenu");
  const navStack = []; // Stack to keep track of menu levels

  function renderMenuItems(container, items) {
    container.innerHTML = "";
    items.forEach(item => container.appendChild(item));
  }

  function goBack() {
    if (navStack.length > 0) {
      const prev = navStack.pop();
      renderMenuItems(menuContainer, prev);
      updateToggleLabel(navStack.length === 0);
    }
  }

  function updateToggleLabel(isRoot) {
    menuToggle.textContent = isRoot ? "MENU" : "←";
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    const originalTabs = Array.from(menuContainer.children);
    updateToggleLabel(true);

    // MENU / ← toggle button
    menuToggle.addEventListener("click", () => {
      if (navStack.length === 0) {
        // Show top level
        menuContainer.classList.toggle("active");
      } else {
        // Go back
        goBack();
      }
    });

    // Delegate click events for nav items
    menuContainer.addEventListener("click", (e) => {
      const link = e.target.closest("li > a");
      if (!link) return;
      const li = link.parentElement;
      const submenu = li.querySelector(".submenu");

      if (submenu) {
        e.preventDefault();
        const currentMenu = Array.from(menuContainer.children);
        navStack.push(currentMenu); // Save current state

        // Render submenu as main
        const submenuItems = Array.from(submenu.children).map(item => item.cloneNode(true));

        // Add back arrow
        const backItem = document.createElement("li");
        const backLink = document.createElement("a");
        backLink.textContent = "← Back";
        backLink.href = "#";
        backItem.appendChild(backLink);
        submenuItems.unshift(backItem);

        // Back click listener
        backLink.addEventListener("click", (e) => {
          e.preventDefault();
          goBack();
        });

        renderMenuItems(menuContainer, submenuItems);
        updateToggleLabel(false);
      } else {
        // Normal link: collapse menu
        menuContainer.classList.remove("active");
        navStack.length = 0;
        updateToggleLabel(true);
      }
    });

    // Reset menu when navigating to new page
    window.addEventListener("beforeunload", () => {
      navStack.length = 0;
      menuContainer.classList.remove("active");
      updateToggleLabel(true);
    });
  });
})();