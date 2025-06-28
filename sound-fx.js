(function () {
  const hoverSound = new Audio("https://cdn.jsdelivr.net/gh/DeeJAssets/sfx/hover_ui.mp3");
  const clickSound = new Audio("https://cdn.jsdelivr.net/gh/DeeJAssets/sfx/click_ui.mp3");

  hoverSound.volume = 0.6;
  clickSound.volume = 0.9;

  let muted = localStorage.getItem("sfxMuted") === "true";

  function playHoverSound() {
    if (!muted) hoverSound.cloneNode().play();
  }

  function playClickSound() {
    if (!muted) clickSound.cloneNode().play();
  }

  function applySFXListeners() {
    const clickable = document.querySelectorAll("a, button, .menu-toggle, .submenu li");
    clickable.forEach(el => {
      el.addEventListener("mouseenter", playHoverSound);
      el.addEventListener("click", playClickSound);
    });
  }

  function setupMuteToggle() {
    const muteBtn = document.createElement("button");
    muteBtn.textContent = muted ? "🔇 SFX" : "🔊 SFX";
    muteBtn.style.position = "fixed";
    muteBtn.style.bottom = "1em";
    muteBtn.style.right = "1em";
    muteBtn.style.zIndex = 999;
    muteBtn.style.background = "#333";
    muteBtn.style.color = "#fff";
    muteBtn.style.border = "1px solid #555";
    muteBtn.style.borderRadius = "5px";
    muteBtn.style.padding = "0.4em 0.7em";
    muteBtn.style.cursor = "pointer";
    document.body.appendChild(muteBtn);

    muteBtn.addEventListener("click", function () {
      muted = !muted;
      localStorage.setItem("sfxMuted", muted.toString());
      muteBtn.textContent = muted ? "🔇 SFX" : "🔊 SFX";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applySFXListeners();
    setupMuteToggle();
  });
})();
