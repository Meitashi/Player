const nowPlaying = document.querySelector(".now-playing");
const musicArt = document.querySelector(".img");
const musicName = document.querySelector(".music-name");
const musicArtist = document.querySelector(".artist");

const prevBtn = document.querySelector(".prevButton");
const pauseBtn = document.querySelector(".pauseBtn");
const nextBtn = document.querySelector(".nextButton");

const musicLine = document.querySelector(".music-line");
const volume = document.querySelector(".volum-slider");
const curTime = document.querySelector(".current-time");
const totDuraction = document.querySelector(".total-duraction");
const track = document.createElement("audio");

let index = 0;
let updateTimer;
let isPlaying = false;

const musicList = [
    {
        img: `img/first.jfif`,
        name: 'Kiss me',
        artist: 'ROY BEE',
        music: 'music/first.mp3'
    },
    {
        img: 'img/second.jfif',
        name: 'How do you do',
        artist: 'Nightcore II',
        music: 'music/second.mp3'
    },
    {
        img: 'img/third.jfif',
        name: 'METAMORPHOSIS 3',
        artist: 'zxcursed',
        music: 'music/third.mp3'
    }
];

loadTrack(index);

function loadTrack(index){
    clearInterval(updateTimer);
    reset();

    track.src = musicList[index].music;
    track.load();
    
    musicArt.style.backgroundImage = "url(" + musicList[index].img + ")";
    musicName.textContent = musicList[index].name;
    musicArtist.textContent = musicList[index].artist;
    nowPlaying.textContent = "Playing music " + (index + 1) + " of " + musicList.length;

    updateTimer = setInterval(setUpdate, 1000);
    track.addEventListener('ended', nextTrack)
}

function playTrack(){
    if(musicLine){
        track.play(Audio);
        isPlaying = true;
        
    }
}

function playpauseTrack(){
    if(musicLine){
        isPlaying ? pauseTrack() : playTrack()
    }
}

function nextTrack(){
    if(musicLine){
        if(index < musicList.length - 1){
            index += 1;
        }else{
            index = 0;
        };
        loadTrack(index);
        playTrack();
    }
};

function pauseTrack(){
    if(musicLine){
        track.pause(Audio);
        isPlaying = false;
    }
}

function prevTrack(){
    if(musicLine){
        if(index > 0){
            index -= 1;
        }else{
            index = musicList.length - 1;
        };
        loadTrack(index);
        playTrack();
    }
};

function reset(){
    if(curTime && totDuraction){
        curTime.textContent = "00:00";
        totDuraction.textContent = "00:00"
    }
    if(musicLine){
        musicLine.value = 0;
    }
}

function setVolume(){
    if(musicLine && volume){
        track.volume = volume.value / 100;
    }
}

function seekTo(){
    if(musicLine && track){
        let seekto = track.duration * (musicLine.value / 100);
        track.currentTime = seekto;
    }
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(track.duration)){
        seekPosition = track.currentTime * (100 / track.duration);
        musicLine.value = seekPosition;

        let currentMinutes = Math.floor(track.currentTime / 60);
        let currentSeconds = Math.floor(track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(track.duration / 60);
        let durationSeconds = Math.floor(track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curTime.textContent = currentMinutes + ":" + currentSeconds;
        totDuraction.textContent = durationMinutes + ":" + durationSeconds;
    }
}