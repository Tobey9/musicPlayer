const music = document.querySelector("audio");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const durationEl = document.getElementById("duration");
const currentTimeEl = document.getElementById("current-time");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const image = document.querySelector("img");
let isPlaying = false;
let songIndex = 0;

const songs = [
  {
    name: "Castle Of Glass",
    artist: "Linkin Park",
    source: "castle-of-glass",
    image: "image-1",
  },
  {
    name: "Face Down",
    artist: "The Red Jumpsuit Apparatus",
    source: "Face-down",
    image: "image-2",
  },
  {
    name: "Halfway Right",
    artist: "Linkin Park",
    source: "Halfway-right",
    image: "image-3",
  },
  {
    name: "Medicine",
    artist: "Bring Me The Horizon",
    source: "Medicine",
    image: "image-4",
  },
  { name: "Running", artist: "NF", source: "Running", image: "image-5" },
  {
    name: "Snuff",
    artist: "Slipknot",
    source: "Snuff",
    image: "image-6",
  },
  {
    name: "Space Bound",
    artist: "Eminem",
    source: "Space-Bound",
    image: "image-7",
  },
  {
    name: "White Lies",
    artist: "Dream State",
    source: "White-lies",
    image: "image-8",
  },
  {
    name: "You're Going Down",
    artist: "Sick Puppies",
    source: "You're-going-down",
    image: "image-9",
  },
];

function playAudio() {
  isPlaying = true;
  play.classList.replace("fa-play", "fa-pause");
  play.setAttribute("title", "pause");
  music.play();
}

function pauseAudio() {
  isPlaying = false;
  play.classList.replace("fa-pause", "fa-play");
  play.setAttribute("title", "play");
  music.pause();
}

function loadSong(song) {
  artist.textContent = song.artist;
  title.textContent = song.name;
  music.src = `music/${song.source}.mp3`;
  image.src = `img/${song.image}.jpg`;
}

const onload = loadSong(songs[songIndex]);

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playAudio();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playAudio();
}

function updateProgressBar(e) {
  console.log(e);
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update Progress Bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinute = Math.floor(currentTime / 60);
    let currentSecond = Math.floor(currentTime % 60);
    if (currentSecond < 10) {
      currentSecond = `0${currentSecond}`;
    }
    currentTimeEl.textContent = `${currentMinute}:${currentSecond}`;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  
  music.currentTime = (clickX / width) * duration
  playAudio()
}

play.addEventListener("click", () => {
  isPlaying ? pauseAudio() : playAudio();
});

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
music.addEventListener('ended', nextSong)
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
