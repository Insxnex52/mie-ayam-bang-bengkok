$('.js-open-envelope').on('click', function (event) {
  event.preventDefault();
  var $self = $(this);
  $self.find('.envelope').removeClass('tossing').addClass('open');
  $self.find('.heart use').attr("xlink:href", "#icon-heart-broken");
  $self.find('.envelope__card').addClass('open');
});

const audio = document.getElementById('myAudio');
    const btn = document.getElementById('toggleBtn');
    const icon = document.getElementById('icon');
    const seekBar = document.getElementById('seekBar');
    const timeDisplay = document.getElementById('timeDisplay');

    // SVGs for play and pause
    const playSVG = `<svg viewBox="0 0 32 32"><polygon points="8,4 28,16 8,28" fill="#e08282"/></svg>`;
    const pauseSVG = `<svg viewBox="0 0 32 32"><rect x="8" y="6" width="6" height="20" fill="#e08282"/><rect x="18" y="6" width="6" height="20" fill="#e08282"/></svg>`;

    function formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return m + ":" + (s < 10 ? "0" : "") + s;
    }

    btn.addEventListener('click', function() {
      if (audio.paused) {
        audio.play();
        icon.innerHTML = pauseSVG;
      } else {
        audio.pause();
        icon.innerHTML = playSVG;
      }
    });

    audio.addEventListener('loadedmetadata', function() {
      seekBar.max = Math.floor(audio.duration);
      timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
    });

    audio.addEventListener('timeupdate', function() {
      seekBar.value = Math.floor(audio.currentTime);
      timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });

    seekBar.addEventListener('input', function() {
      audio.currentTime = seekBar.value;
    });

    audio.addEventListener('ended', function() {
      icon.innerHTML = playSVG;
    });

function updateSeekbarDuration() {
    if (!isNaN(audio.duration) && audio.duration > 0) {
        seekBar.max = Math.floor(audio.duration);
        timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    }
}

audio.addEventListener('loadedmetadata', updateSeekbarDuration);
audio.addEventListener('durationchange', updateSeekbarDuration);

audio.addEventListener('timeupdate', function() {
    seekBar.value = Math.floor(audio.currentTime);
    // Update duration if it increased
    if (seekBar.max != Math.floor(audio.duration) && !isNaN(audio.duration)) {
        seekBar.max = Math.floor(audio.duration);
    }
    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

// On page unload
window.addEventListener('beforeunload', function() {
    localStorage.setItem('audioTime', audio.currentTime);
});

// On page load
window.addEventListener('DOMContentLoaded', function() {
    const savedTime = localStorage.getItem('audioTime');
    if (savedTime) {
        audio.currentTime = savedTime;
        audio.play();
    }
});