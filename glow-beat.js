(function () {
  const box = document.getElementById("playlistBox");
  const audio = document.getElementById("bgMusic");

  const colors = {
    bts: "#bcaaFF",
    svt: "#ffCCE5",
    bnd: "#ffe6b9",
    tws: "#add8e6",
    ive: "#ffb6c1",
    txt: "#86d5ff",
    solo: "#555555"
  };

  function getGroupFromClassList(classList) {
    const groups = Object.keys(colors);
    return groups.find(group => classList.contains(`${group}-theme`)) || "solo";
  }

  function updateGlow() {
    const group = getGroupFromClassList(box.classList);
    const color = colors[group];

    if (!audio.paused && !audio.ended) {
      box.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
    } else {
      box.style.boxShadow = "none";
    }
  }

  setInterval(updateGlow, 500);

  audio.addEventListener("pause", () => {
    box.style.boxShadow = "none";
  });
})();