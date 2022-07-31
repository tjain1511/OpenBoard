let chatBtn = document.getElementById('chat-btn');
let chatBox = document.getElementById('chat-area');
let videoArea = document.getElementById('video-list');
let videoBtn = document.getElementById('group-video');
let callEnd = document.getElementById('call-end');
let micOff = document.getElementById('mic-off');
let videoOff = document.getElementById('video-off');

micOff.addEventListener('click', function () {

    if (mediaStream.getAudioTracks()[0].enabled) {
        micOff.innerHTML = "mic";
    } else {
        micOff.innerHTML = "mic_off";
    }
    mediaStream.getAudioTracks()[0].enabled = !(mediaStream.getAudioTracks()[0].enabled)
})

videoOff.addEventListener('click', function () {

    if (mediaStream.getVideoTracks()[0].enabled) {
        videoOff.innerHTML ="videocam";
    } else {
        videoOff.innerHTML ="videocam_off";
    }
    mediaStream.getVideoTracks()[0].enabled = !(mediaStream.getVideoTracks()[0].enabled)
})

callEnd.addEventListener('click', function () {
    console.log("end call btn clicked");
    // peer.close();
})

chatBtn.addEventListener('click', function () {
    videoArea.style.display = 'none';
    chatBox.style.display = 'inline-block';
})

videoBtn.addEventListener('click', function () {
    chatBox.style.display = 'none';
    videoArea.style.display = 'inline-block';
})