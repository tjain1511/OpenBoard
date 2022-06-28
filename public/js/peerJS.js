let mediaStream = null;
const videoList = document.querySelector("#video-list");
const videoContainer = videoList.querySelector('.container');

async function getMedia(constraints) {

    try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        addVideo(mediaStream,true)

    } catch (err) {
        console.log("error");
    }
}

getMedia({ audio: true, video: true })

const peer = new Peer();

peer.on('open', function (id) {
    socket.emit("peerId", roomId, id);
});


socket.on('new-peer', (id) => {
    var call = peer.call(id, mediaStream);

    call.on('stream', function (stream) {

        const video = document.getElementById(stream.id);
        if (video == null) {
            addVideo(stream,false);
        } else {
            video.srcObject = stream;
        }

    })
})

peer.on('call', function (call) {
    call.answer(mediaStream);

    call.on('stream', function (stream) {
        const video = document.getElementById(stream.id);
        if (video == null) {
            addVideo(stream,false);
        } else {
            video.srcObject = stream;
        }
    });
});

function addVideo(stream,muted) {
    const noOfVideo = document.getElementsByTagName('video');

    if (noOfVideo.length % 2 == 0) {
        const div = document.createElement('div');
        div.setAttribute('class', 'row');
        videoContainer.appendChild(div);

        const col = document.createElement('div');
        col.setAttribute('class','col');
        div.appendChild(col);

        const video = document.createElement('video');
        video.setAttribute("id", stream.id);
        video.setAttribute("height", "100%");
        video.setAttribute("width", "100%");
        video.srcObject = stream;
        video.muted = muted;
        video.autoplay = true;
        col.appendChild(video);
    } else {
        let lastRow = videoContainer.querySelectorAll('.row');
        lastRow = lastRow[lastRow.length - 1];

        const col = document.createElement('div');
        col.setAttribute('class','col');
        lastRow.appendChild(col);

        const video = document.createElement('video');
        video.setAttribute("id", stream.id);
        video.setAttribute("height", "100%");
        video.setAttribute("width", "100%");
        video.srcObject = stream;
        video.muted = muted;
        video.autoplay = true;
        col.appendChild(video);
    }
}




