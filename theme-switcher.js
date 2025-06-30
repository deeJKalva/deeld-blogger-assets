(function () {
  const html = document.documentElement;
  const storedPref = localStorage.getItem("themeMode");

  function applyTheme(mode) {
    html.setAttribute("data-theme", mode);
    localStorage.setItem("themeMode", mode);
    toggleBtn.textContent = mode === "dark" ? "🌙 Dark" : "☀️ Light";
  }

  function getSystemTimeMode() {
    const hour = new Date().getHours();
    return (hour >= 18 || hour <= 5) ? "dark" : "light";
  }

  const toggleBtn = document.createElement("button");
  toggleBtn.style.position = "fixed";
  toggleBtn.style.bottom = "1em";
  toggleBtn.style.left = "1em";
  toggleBtn.style.zIndex = 999;
  toggleBtn.style.padding = "0.4em 0.7em";
  toggleBtn.style.background = "#333";
  toggleBtn.style.color = "#fff";
  toggleBtn.style.border = "1px solid #555";
  toggleBtn.style.borderRadius = "5px";
  toggleBtn.style.cursor = "pointer";

  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", function () {
    const current = html.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  const initialTheme = storedPref || getSystemTimeMode();
  applyTheme(initialTheme);
})();