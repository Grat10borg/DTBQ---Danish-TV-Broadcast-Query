"use strict";
var ChannelNamesAndLinks = Array("DR Ramasjang,https://drlive03hls.akamaized.net/hls/live/2014190/drlive03/master2000.m3u8", "DR1,https://drlive01hls.akamaized.net/hls/live/2014185/drlive01/master.m3u8", "DR2,https://drlive02hls.akamaized.net/hls/live/2014187/drlive02/master.m3u8", "DRTV,https://drevent01hls.akamaized.net/hls/live/2014198/drevent01/master.m3u8", "DRTV Ekstra,https://drevent02hls.akamaized.net/hls/live/2028694/drevent02/master.m3u8", "DRTV Live,https://drevent03hls.akamaized.net/hls/live/2028696/drevent03/master.m3u8", "Folketinget,https://cdnapisec.kaltura.com/p/2158211/sp/215821100/playManifest/entryId/1_24gfa7qq/format/applehttp/protocol/https/uiConfId/41529681/a.m3u8?referrer=aHR0cHM6Ly93d3cuZnQuZGs=&playSessionId=311fdf32-0a13-9fe1-1f4d-3642c7967e14", "TV2 Syd,https://cdnapisec.kaltura.com/p/1956351/sp/195635100/playManifest/entryId/0_e9slj9wh/protocol/https/format/applehttp/flavorIds/0_i0pmt89r,0_nqzuefhv,0_uyas58l1/a.m3u8?uiConfId=44173761&playSessionId=4a87cdab-57fa-7a5a-71bb-02beb607d8de:ebbac6ce-1a87-6f38-e99a-a92d1ed0a643&referrer=aHR0cHM6Ly93d3cudHZzeWQuZGsvbGl2ZS10dg==&clientTag=html5:v1.6.1", "TV2east (TV2Øst),https://cdn-lt-live.tveast.dk/env/cluster-1-e.live.nvp1/live/hls/p/1953381/e/0_zphj9q61/tl/main/st/0/t/THUB80e-ZMufZCE4pDhO0g/index-s35.m3u8", "TV2 Fyn,https://cdn-lt-live.tv2fyn.dk/env/cluster-1-e.live.nvp1/live/hls/p/1966291/e/0_vsfrv0zm/tl/main/st/0/t/EgP1FA1D39taZFVewCa42w/index-s32.m3u8", "TV2 Bornholm,https://live.tv2bornholm.dk/stream/live/playlist.m3u8", "TV2 Lorry,https://cdnapisec.kaltura.com/p/2045321/sp/204532100/playManifest/entryId/1_grusx1zd/protocol/https/format/applehttp/flavorIds/1_fg497n4n,1_1qnfg7wp,1_d35ir0bf/a.m3u8?uiConfId=44173821&playSessionId=1fb3567a-5c74-7be9-31de-522921548f5a:48288bcb-6289-4f9a-ca20-fb6ea87ac3e1&referrer=aHR0cHM6Ly93d3cudHYybG9ycnkuZGsvbGl2ZQ==&clientTag=html5:v1.6.1", "TV2AArhus,https://d1pdqnzctoj5f8.cloudfront.net/clients_live/tv3/vr-hd1/chunklist.m3u8");
let TVChannels = Array();
let TVLinks = Array();
for (let index = 0; index < ChannelNamesAndLinks.length; index++) {
    let res = ChannelNamesAndLinks[index].split(",");
    TVChannels.push(res[0]);
    TVLinks.push(res[1]);
}
let ChannelSelect = document.getElementById("ChannelSelect");
let ChannelName = document.getElementById("ChannelNameInput");
let Tellyform = document.getElementById("TellyForm");
ChannelName.addEventListener("keyup", function (event) {
    SearchApi(event, ChannelSelect);
});
ChannelName.addEventListener("keydown", function (event) {
    SearchApi(event, ChannelSelect);
});
ChannelSelect.addEventListener("click", function (event) {
    console.log(event.target.innerHTML);
    ChannelName.value = event.target.innerHTML;
    ChannelSelect.innerHTML = "";
});
Tellyform.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(TVLinks[TVChannels.indexOf(ChannelName.value)]);
    let ScriptsDiv = document.getElementById("scripts");
    let DRTVStream = document.getElementById("TellyStream");
    buildVideo(DRTVStream, ScriptsDiv, TVLinks[TVChannels.indexOf(ChannelName.value)]);
});
function buildVideo(DRTVDiv, ScriptsDiv, URL) {
    let Videoplayer = document.createElement("video");
    let VideoSource = document.createElement("source");
    let VideoJsScript = document.createElement("script");
    Videoplayer.id = "my_video_1";
    Videoplayer.classList.add("video-js", "vjs-tech", "vjs-default-skin");
    Videoplayer.controls = true;
    Videoplayer.hidden = false;
    Videoplayer.setAttribute("preload", "auto");
    Videoplayer.width = 640;
    Videoplayer.height = 268;
    Videoplayer.setAttribute("data-setup", "{}");
    Videoplayer.setAttribute("role", "application");
    Videoplayer.setAttribute("tabindex", "1");
    VideoSource.id = "my_video_1_id";
    VideoSource.src = URL;
    VideoSource.type = "application/x-mpegURL";
    Videoplayer.innerHTML = "your browser does not support video tags sorry";
    VideoJsScript.src = "https://unpkg.com/video.js/dist/video.js";
    Videoplayer.append(VideoSource);
    DRTVDiv.innerHTML = "";
    ScriptsDiv.innerHTML = "";
    ScriptsDiv.append(VideoJsScript);
    DRTVDiv.append(Videoplayer);
}
function SearchApi(event, DropdownElement) {
    if (event.target.value.length == 0) {
        DropdownElement.innerHTML = "";
    }
    if (event.target.value.length > 0) {
        DropdownElement.style.display = "block";
        let SortedChannels = Array();
        for (let index = 0; index < TVChannels.length; index++) {
            let regx = new RegExp(event.target.value, "gi");
            if (TVChannels[index].match(regx)) {
                console.log(event.target.value);
                SortedChannels.push(TVChannels[index]);
            }
        }
        DropdownElement.innerHTML = "";
        for (let index = 0; index < SortedChannels.length; index++) {
            DropdownElement.innerHTML += "<li class='pt-1 pb-1'>" + SortedChannels[index] + "</li>";
        }
    }
}
