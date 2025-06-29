(function () {
  const audio = document.getElementById("bgMusic");
  let shuffle = localStorage.getItem("shuffle") === "true";
  let loop = localStorage.getItem("loop") === "true";

  const shuffleBtn = document.createElement("button");
  shuffleBtn.textContent = shuffle ? "🔀 Shuffle ON" : "▶️ Shuffle OFF";

  const loopBtn = document.createElement("button");
  loopBtn.textContent = loop ? "🔁 Loop ON" : "🔁 Loop OFF";

  [shuffleBtn, loopBtn].forEach(btn => {
    btn.style.margin = "0.2em";
    btn.style.padding = "0.3em 0.8em";
    btn.style.borderRadius = "6px";
    btn.style.border = "1px solid #666";
    btn.style.background = "#222";
    btn.style.color = "#fff";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "0.9em";
  });

  document.getElementById("playlistBox").appendChild(shuffleBtn);
  document.getElementById("playlistBox").appendChild(loopBtn);

  shuffleBtn.onclick = function () {
    shuffle = !shuffle;
    localStorage.setItem("shuffle", shuffle);
    shuffleBtn.textContent = shuffle ? "🔀 Shuffle ON" : "▶️ Shuffle OFF";
  };

  loopBtn.onclick = function () {
    loop = !loop;
    audio.loop = loop;
    localStorage.setItem("loop", loop);
    loopBtn.textContent = loop ? "🔁 Loop ON" : "🔁 Loop OFF";
  };

  // Load saved loop state
  audio.loop = loop;

  // Autoplay shuffle logic if on homepage and loop is off
  if (location.hostname === "bangbangconarmy.blogspot.com" && location.pathname === "/" && shuffle) {
    const playlist = document.querySelectorAll("#playlistList li");
    if (playlist.length > 0) {
      const index = Math.floor(Math.random() * playlist.length);
      playlist[index].click();
    }
  }
})();
