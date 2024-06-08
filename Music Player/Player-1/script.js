// const title = document.querySelector(".title");
// const prev = document.querySelector(".prev");
// const next = document.querySelector(".next");
// const audio = document.querySelector("audio");
// const playPause = document.querySelector(".playPause");

// const songList = [
//   {
//     path: "./music/NeonBlade.mp3",
//     songName: "Neon Blade",
//   },
//   {
//     path: ".music/Demons In My Soul.mp3",
//     songName: "Demons In My Soul",
//   },
//   {
//     path: "music/GigaChad Theme.mp3",
//     songName: "GigaChad Theme",
//   },
//   {
//     path: "music/Murder In My Mind.mp3",
//     songName: "Murder In My  Mind",
//   },
// ];

// let song_playing = false;

// function playSong() {
//   song_playing = true;
//   playPause.classList.add("active");
//   audio.play();
//   console.log(audio.currentTime)
//   console.log(audio.duration)
// }

// function pauseSong() {
//   song_playing = false;
//   playPause.classList.remove("active");
//   audio.pause();
// }

// playPause.addEventListener("click", () => {
//   if (song_playing) {
//     pauseSong();
//   } else {
//     playSong();
//   }
// });

// function loadsong(songList) {
//   title.textContent = songList.songName;
//   audio.src = songList.path;
// }

// let i = 0;

// loadsong(songList[i]);

// function prevSong() {
//   console.log("Dsds");
//   i--;
//   if (i < 0) {
//     i = songList.length - 1;
//   }
//   loadsong(songList[i]);
// }

// function nextSong() {
//   i++;
//   if (i > songList.length - 1) {
//     i = 0;
//   }
//   loadsong(songList[i]);
// }

// prev.addEventListener("click", prevSong);
// next.addEventListener("click", nextSong);

const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: "./music/NeonBlade.mp3",
        displayName: 'The Charmer\'s Call',
        cover: 'https://images4.alphacoders.com/133/1332281.jpeg',
        artist: 'Hanu Dixit',
    },
    {
        path: "music/Murder In My Mind.mp3",
        displayName: 'You Will Never See Me Coming',
        cover: 'https://images4.alphacoders.com/133/1332281.jpeg',
        artist: 'NEFFEX',
    },
    {
        path: "music/GigaChad Theme.mp3",
        displayName: 'Intellect',
        cover: 'https://images4.alphacoders.com/133/1332281.jpeg',
        artist: 'Yung Logos',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    console.log(width)
    console.log(clickX)
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);