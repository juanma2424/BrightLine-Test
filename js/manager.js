let json_data;
let current_channel = 0;
let last_channel = 0;
let max_channel = 0;
let preview = document.getElementById('preview-player');
let pagination_index = 5;
let Full_Screen = false;
let is_mute = true;
let scrollAmount;
let outside_card = "rgba(22, 31, 21, 0.685)";
let inside_card = "rgba(190, 198, 189, 0.791)";


window.onload = async () => {
    await fetch('https://cdn-media.brightline.tv/training/demo.json')
        .then((response) => response.json())
        .then((json) => {
            json_data = json;
        });
    json_data = { "streams": [ { "name": "Scrollable Carousel - BMW Mini1",
                                 "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
                                },
                                { "name": "Scrollable Carousel - BMW Mini2",
                                 "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
                                },
                                { "name": "Scrollable Carousel - BMW Mini3",
                                 "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
                                },
                                { "name": "Scrollable Carousel - BMW Mini4",
                                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
                               },
                               { "name": "Scrollable Carousel - BMW Mini5",
                               "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
                              },
                              { "name": "Scrollable Carousel - BMW Mini6",
                              "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
                             },
                             { "name": "Scrollable Carousel - BMW Mini7",
                             "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
                            },
                            { "name": "Scrollable Carousel - BMW Mini8",
                            "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
                           },
                           { "name": "Scrollable Carousel - BMW Mini9",
                           "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
                          },
                          { "name": "Scrollable Carousel - BMW Mini10",
                          "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
                         },

                               
                                {
                                    "name": "Scrollable Carousel - Vizzy",
                                    "mediaFile": "https://3860af3e8e3fbfdb.mediapackage.us-east-2.amazonaws.com/out/v1/791e60d1176b4746aabf4e580a1c0611/index.m3u8"
                                }
                            ]
  }
    
    json_data !== undefined ? videoLoad(json_data.streams) : alert("Couldn't fetch from server")
};



const exitFullscreen = () => {
    if(Full_Screen){
        Full_Screen = false
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}


const endedVideo = () => {
    console.log("=======1234")
    // const videoContainer = document.getElementById('preview-container');
    // const video = document.getElementById('preview-player');
    // video.pause();
    exitFullscreen();
    // videoContainer.classList.add("hide-element");
}




const videoLoad = (pData) => {
    pData.forEach(function (channel, i) {
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
                    let videoElement = document.getElementById('preview-player');
                    videoElement.addEventListener('ended', endedVideo, false);
                    
                    video_box.style.backgroundColor = inside_card;
                    document.getElementById('GFG').innerHTML = channel.name;
                    preview.src = channel.mediaFile;
                }

                video_box.appendChild(video_preview)
                video_box.appendChild(video_label)
                document.getElementById("preview-channels").appendChild(video_box);
               
                
            }
        }
    });

}

const showErrorChannel = () => {
    document.getElementById('GFG').innerHTML = "Error";
}

const showChannel = (pChannelNum) => {
    let catalog = json_data.streams
    document.getElementById('GFG').innerHTML = catalog[pChannelNum].name;
    preview.src = catalog[pChannelNum].mediaFile;
}

const enterFullScreen = (video) => {
    Full_Screen = true
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}


const slectV = () => {
    var elem = document.getElementById("preview-channels").childNodes[current_channel];
    elem.style.backgroundColor =inside_card;
    elem.scrollIntoView();

    console.log("=======1", elem)

    document.getElementById('GFG').innerHTML =json_data.streams[elem.id].name;
    preview.src = json_data.streams[elem.id].mediaFile;

    

    var elemx = document.getElementById("preview-channels").childNodes[last_channel];
    elemx.style.backgroundColor =outside_card;
    elemx.scrollIntoView();
    last_channel= current_channel
    // var myElement = document.getElementById('9');
    // var topPos = myElement.offsetTop;
    // document.getElementById('preview-channels').scrollTop = topPos;
}


function GFG_Fun() {
    var div = document.getElementById('preview-channels');
    var hs = div.scrollWidth > div.clientWidth;
    console.log("-----", hs)
}


document.addEventListener('keydown', (event) => {
    var code = event.code;
   
    console.log("===>", code)
    switch (code) {
        case "KeyW":
            preview.muted = true;
            preview.play()
            // GFG_Fun()
            break;
        case "KeyS":
            preview.pause()
            break;
        case "KeyD":
            if(current_channel+1 < document.getElementById("preview-channels").childNodes.length){
                current_channel++
                slectV()
            }
            break;
        case "KeyA":
            if(current_channel-1 >= 0){
                current_channel--
                slectV()
            }
            break;
        case "Enter":
            preview.muted = false;
            enterFullScreen(preview)
            preview.play()
            break;
        case "KeyP":
            preview.pause()
            break;
        case "KeyM":
            preview.muted = is_mute;
            is_mute = !is_mute
            break;
    }
  }, false);



