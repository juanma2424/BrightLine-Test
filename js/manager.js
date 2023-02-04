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
//         channels_list = { "streams": [ 
//             {
//                 "name": "Scrollable Carousel - Vizzy",
//                 "mediaFile": "https://3860af3e8e3fbfdb.mediapackage.us-east-2.amazonaws.com/out/v1/791e60d1176b4746aabf4e580a1c0611/index.m3u8"
//             },
//             { "name": "Scrollable Carousel - BMW Mini1",
//                                  "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
//                                 },
//                                 { "name": "Scrollable Carousel - BMW Mini2",
//                                  "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
//                                 },
//                                 { "name": "Scrollable Carousel - BMW Mini3",
//                                  "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
//                                 },
//                                 { "name": "Scrollable Carousel - BMW Mini4",
//                                 "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
//                                },
//                                { "name": "Scrollable Carousel - BMW Mini5",
//                                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
//                               },
//                               { "name": "Scrollable Carousel - BMW Mini6",
//                               "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
//                              },
//                              { "name": "Scrollable Carousel - BMW Mini7",
//                              "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
//                             },
//                             { "name": "Scrollable Carousel - BMW Mini8",
//                             "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
//                            },
//                            { "name": "Scrollable Carousel - BMW Mini9",
//                            "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
//                           },
//                           { "name": "Scrollable Carousel - BMW Mini10",
//                           "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
//                          },

                               
//                                 {
//                                     "name": "Scrollable Carousel - Vizzy",
//                                     "mediaFile": "https://3860af3e8e3fbfdb.mediapackage.us-east-2.amazonaws.com/out/v1/791e60d1176b4746aabf4e580a1c0611/index.m3u8"
//                                 }
//                             ]
//   }
        channels_list !== undefined ? loadBanner(channels_list.streams) : alert("ERROR: 404 Not Found")
};

const basicMode = () =>{
    is_play = false;
    is_mute = true;
}

const endVideo = () => {
    basicMode()
    if(is_full_screen){
        is_full_screen = false
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
    is_full_screen = true
    is_play = true;
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

const loadBanner = (pChannelData) => {
    pChannelData.forEach(function (channel, i) {
        if(channel.hasOwnProperty('name') && channel.hasOwnProperty('mediaFile')){
            let test_video = document.createElement('video');
            test_video.src = channel.mediaFile;
            test_video.oncanplay = () => {

                let video_box = document.createElement("div");
                video_box.id = i;
                video_box.classList = 'video-card'

                let video_label = document.createElement('label');
                video_label.innerHTML = channel.name;  
                video_label.classList = 'video-label'

                let video_preview = document.createElement("video");
                video_preview.src = channel.mediaFile;
                video_preview.classList = 'miniature-video'

                if(document.getElementById("preview-channels").childNodes.length == 0){
                    document.getElementById('tv').addEventListener('ended', endVideo, false);
                    document.getElementById('tv').src = channel.mediaFile;
                    document.getElementById('tv-label').innerHTML = channel.name;
                    video_box.style.backgroundColor = insideCard;
                }

                video_box.appendChild(video_preview)
                video_box.appendChild(video_label)
                document.getElementById("preview-channels").appendChild(video_box);
            }
        }
    });
}

const switchCards =(pIndexData)=>{
    var card = document.getElementById("preview-channels").childNodes[pIndexData];
    if(pIndexData == current_channel){
        card.style.backgroundColor =insideCard;
        card.scrollIntoView();
        document.getElementById('tv-label').innerHTML =channels_list.streams[card.id].name;
        document.getElementById('tv').src = channels_list.streams[card.id].mediaFile;
    }else{
        card.style.backgroundColor =outsideCard;
        card.scrollIntoView();
        last_channel= current_channel
    }
}

const changeChannel = () => {
    basicMode()
    switchCards(current_channel)
    switchCards(last_channel)
}

document.addEventListener('keydown', (event) => {
    var code = event.code;
    const tv = document.getElementById('tv');
    const maxChannleNum = document.getElementById("preview-channels").childNodes.length
    console.log("===>", code)
    switch (code) {
        case "ArrowUp":
            is_play = true;
            tv.muted = false;
            tv.play()
            break;
        case "ArrowDown":
            tv.pause()
            basicMode()
            break;
        case "ArrowRight":
            if(current_channel+1 < maxChannleNum){
                current_channel++
                changeChannel()
            }
            break;
        case "ArrowLeft":
            if(current_channel-1 >= 0){
                current_channel--
                changeChannel()
            }
            break;
        case "Enter":
            tv.muted = false;
            fullScreen(tv)
            tv.play()
            break;
        case "KeyM":
            if(is_play){
                tv.muted = is_mute;
                is_mute = !is_mute;
            }
            break;
    }
  }, false);

