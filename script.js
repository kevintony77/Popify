const songList = {
    'Unforgettable': new Audio('./songs/French Montana - Unforgettable (Lyrics) ft. Swae Lee.mp3'),
    'Lose Yourself': new Audio('./songs/Eminem - Lose Yourself.mp3'),
    'Eye Of The Tiger': new Audio('./songs/Survivor - Eye Of The Tiger.mp3'),
    'I Was Made For Lovin\' You': new Audio('./songs/Kiss - I Was Made For Lovin\' You.mp3'),
    'Godzilla': new Audio('./songs/Eminem - Godzilla.mp3')
}
let playBar = document.querySelector('.song-durationBar');
let playStatus = false;
let songNames = Object.keys(songList);
let backBtn = document.querySelector('.back-btn');
let nextBtn = document.querySelector('.next-btn');
const playBtn = document.querySelector('.play-btn-div');
const songs = document.querySelector('.songs');
let currentSong;

for (let i = 0; i < songs.children.length; i++) {
    songs.children[i].addEventListener('click', (event) => {
        removePrevious()
        currentSong = event.currentTarget.children[1].children[0].innerText;
        playSong(currentSong);
    })
}
function randomSong() {
    currentSong = songNames[Math.floor(Math.random() * songNames.length)];
    playSong();
}
function playSong() {
    removePrevious()
    console.log('hi')
    playBar.value = 0;
    playBar.max = songList[currentSong].duration;
    songList[currentSong].addEventListener('ended', randomSong)
    songList[currentSong].play();
    playBtn.innerHTML = '<img src="./other-icons/pause.png">'
    playStatus = true;
    songList[currentSong].addEventListener('timeupdate', updateSlider)

}
function updateSlider() {
    playBar.value = songList[currentSong].currentTime;
}
function removePrevious() {
    if (playStatus) {
        songList[currentSong].currentTime = 0;
        songList[currentSong].pause();
        songList[currentSong].removeEventListener('timeupdate', updateSlider);
        playStatus = false;
        songList[currentSong].removeEventListener('ended', randomSong)
    }
}
nextBtn.addEventListener('click', () => {
    removePrevious()
    currentSong = songNames[songNames.indexOf(currentSong) + 1];
    playSong(currentSong)
})
backBtn.addEventListener('click', () => {
    removePrevious()
    currentSong = songNames[songNames.indexOf(currentSong) - 1];
    playSong(currentSong)
})
playBar.addEventListener('input', () => {
    songList[currentSong].currentTime = playBar.value;
});
playBtn.addEventListener('click', event => {
    if (playStatus) {
        songList[currentSong].pause();
        playBtn.innerHTML = '<img src="./other-icons/play-button.png">'
        playStatus = false;
    } else {
        songList[currentSong].play();
        playBtn.innerHTML = '<img src="./other-icons/pause.png">';
        playStatus = true;
    }
})