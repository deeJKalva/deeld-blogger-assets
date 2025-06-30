(function () {
  const bgMusic = document.getElementById("bgMusic");

  function pauseAudio() {
    if (!bgMusic.paused) {
      bgMusic.pause();
    }
  }

  // Native video support
  const nativeVideos = document.querySelectorAll("video");
  nativeVideos.forEach(video => {
    video.addEventListener("play", pauseAudio);
  });

  // YouTube iframe detection
  const ytFrames = document.querySelectorAll("iframe[src*='youtube.com']");

  // YouTube postMessage-based control (optional detection workaround)
  window.addEventListener("message", function (e) {
    if (typeof e.data === "string" && e.data.includes("playerState")) {
      if (e.data.includes("\"playerState\":1")) {
        pauseAudio(); // YT playing
      }
    }
  });

  // YouTube fallback: listen for user interaction with iframe
  ytFrames.forEach(iframe => {
    iframe.addEventListener("mouseenter", function () {
      pauseAudio(); // assume intent to watch
    });
  });
})();