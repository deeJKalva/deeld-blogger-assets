(function () {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => link.setAttribute('tabindex', '0'));

  document.addEventListener('keydown', function (e) {
    const focused = document.activeElement;
    const all = Array.from(navLinks);
    const idx = all.indexOf(focused);

    if (idx === -1) return;

    switch (e.key) {
      case "ArrowDown":
        if (focused.parentElement.querySelector("ul")) {
          const submenuLinks = focused.parentElement.querySelectorAll("ul a");
          if (submenuLinks.length > 0) submenuLinks[0].focus();
        }
        break;
      case "ArrowUp":
        const parentUl = focused.closest("ul");
        if (parentUl && parentUl.previousElementSibling && parentUl.previousElementSibling.tagName === "A") {
          parentUl.previousElementSibling.focus();
        }
        break;
      case "ArrowRight":
        if (all[idx + 1]) all[idx + 1].focus();
        break;
      case "ArrowLeft":
        if (all[idx - 1]) all[idx - 1].focus();
        break;
      case "Escape":
        focused.blur();
        break;
    }
  });
})();