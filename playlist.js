(function () {
  const playlist = [
    {
      name: "BTS - Example",
      group: "bts",
      url: "https://example.com/bts.mp3",
      lyrics: [{ time: 0, text: "Intro" }, { time: 95.15, text: "01:35.15 line" }]
    },
    {
      name: "IVE - Example",
      group: "ive",
      url: "https://example.com/ive.mp3",
      lyrics: []
    },
    {
      name: "TXT - Example",
      group: "txt",
      url: "https://example.com/txt.mp3",
      lyrics: []
    },
    {
      name: "IU - Soloist",
      group: "solo",
      url: "https://example.com/iu.mp3",
      lyrics: []
    }
  ];

  const audio = document.getElementById("bgMusic");
  const playlistList = document.getElementById("playlistList");
  const volumeControl = document.getElementById("volumeControl");
  const lyricsDisplay = document.getElementById("lyricsDisplay");
  const playlistBox = document.getElementById("playlistBox");

  function updateVisualTheme(group) {
    playlistBox.className = "";
    playlistBox.classList.add(group + "-theme");
  }

  function updateLyrics(lyrics) {
    clearInterval(window.lyricsTimer);
    lyricsDisplay.innerHTML = "";
    lyrics.forEach(function (line) {
      const div = document.createElement("div");
      div.textContent = line.text;
      div.dataset.time = line.time;
      div.className = "lyric-line";
      lyricsDisplay.appendChild(div);
    });
    window.lyricsTimer = setInterval(function () {
      const now = audio.currentTime;
      const lines = Array.prototype.slice.call(document.querySelectorAll(".lyric-line"));
      var index = 0;
      while (index !== lines.length) {
        const el = lines[index];
        const next = lines[index + 1];
        const startTime = parseFloat(el.dataset.time);
        const nextTime = next ? parseFloat(next.dataset.time) : 999999;
        var active = false;
        if (!(now < startTime)) {
          if (!next || now < nextTime) {
            active = true;
          }
        }
        el.classList.toggle("active", active);
        index++;
      }
    }, 500);
  }

  function setTrack(index) {
    const track = playlist[index];
    audio.src = track.url;
    audio.play();
    updateLyrics(track.lyrics || []);
    updateVisualTheme(track.group);
  }

  function autoplayIfHome() {
    if (location.hostname === "bangbangconarmy.blogspot.com" && location.pathname === "/") {
      const random = Math.floor(Math.random() * playlist.length);
      setTrack(random);
    }
  }

  playlist.forEach(function (song, index) {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.onclick = function () {
      setTrack(index);
    };
    playlistList.appendChild(li);
  });

  volumeControl.addEventListener("input", function () {
    audio.volume = volumeControl.value;
  });

  autoplayIfHome();
})();
