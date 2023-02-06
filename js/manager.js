let channels_list;
let current_channel = 0;
let last_channel = 0;
let is_full_screen = false;
let is_play = false;
let is_mute = true;
const outsideCard = "rgba(22, 31, 21, 0.685)";
const insideCard = "rgba(190, 198, 189, 0.791)";

window.onload = async () => {
    await fetch('https://cdn-media.brightline.tv/training/demo.json')
        .then((response) => response.json())
        .then((json) => {
            channels_list = json;
        });
        channels_list !== undefined ? loadScrollArea(channels_list.streams) : alert("ERROR: 404 Not Found");
};

const loadScrollArea = (pChannelData) => {
    pChannelData.forEach(function (channel, i) {
        if(channel.hasOwnProperty('name') && channel.hasOwnProperty('mediaFile')){
            let test_video = document.createElement('video');
            test_video.src = channel.mediaFile;
            test_video.oncanplay = () => {

                let video_box = document.createElement("div");
                video_box.id = i;
                video_box.classList = 'video-card';

                let video_label = document.createElement('label');
                video_label.innerHTML = channel.name;
                video_label.classList = 'video-label';

                let video_preview = document.createElement("video");
                video_preview.src = channel.mediaFile;
                video_preview.classList = 'miniature-video';

                if(document.getElementById("preview-channels").childNodes.length == 0){
                    document.getElementById('tv').addEventListener('ended', endVideo, false);
                    document.getElementById('tv').src = channel.mediaFile;
                    document.getElementById('tv-label').innerHTML = channel.name;
                    video_box.style.backgroundColor = insideCard;
                }

                video_box.appendChild(video_preview);
                video_box.appendChild(video_label);
                document.getElementById("preview-channels").appendChild(video_box);
            }
        }
    });
}

const changeChannel = () => {
    basicMode();
    switchCards(current_channel);
    switchCards(last_channel);
}

const switchCards =(pIndexData)=>{
    var card = document.getElementById("preview-channels").childNodes[pIndexData];
    if(pIndexData == current_channel){
        card.style.backgroundColor = insideCard;
        card.scrollIntoView();
        document.getElementById('tv-label').innerHTML =channels_list.streams[card.id].name;
        document.getElementById('tv').src = channels_list.streams[card.id].mediaFile;
    }else{
        card.style.backgroundColor = outsideCard;
        last_channel= current_channel;
    }
}

const basicMode = () =>{
    is_play = false;
    is_mute = true;
}

const endVideo = () => {
    basicMode();
    if(is_full_screen){
        is_full_screen = false;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

const fullScreen = (video) => {
    is_full_screen = true;
    is_play = true;
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

const exitFullscreen = () => {
    if(is_full_screen){
        is_full_screen = false;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

document.addEventListener('keydown', (event) => {
    const tv = document.getElementById('tv');
    const maxChannelNum = document.getElementById("preview-channels").childNodes.length;
    if(maxChannelNum == 0) {
        event.preventDefault();
        return;
    }
    switch (event.keyCode) {
        case 8://Backspace
            exitFullscreen();
            break;
        case 38://ArrowUp
            is_play = true;
            tv.muted = false;
            tv.play();
            break;
        case 40://ArrowDown
            tv.pause();
            basicMode();
            break;
        case 39://ArrowRight
            if(current_channel+1 < maxChannelNum){
                current_channel++;
                changeChannel();
            }
            break;
        case 37://ArrowLeft
            if(current_channel-1 >= 0){
                current_channel--;
                changeChannel();
            }
            break;
        case 13://Enter
            if(!is_full_screen){
                tv.muted = false;
                fullScreen(tv);
                tv.play();
            }
            break;
        case 77://KeyM
            if(is_play){
                tv.muted = is_mute;
                is_mute = !is_mute;
            }
            break;
        default:
            event.preventDefault();
    }
}, false);

