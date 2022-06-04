let mediaStream = null;
const webcams = document.querySelector(".webcams");

async function getMedia(constraints) {

    try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = document.createElement('video');
        video.setAttribute("id", mediaStream.id);
        video.setAttribute("height", "120");
        video.setAttribute("width", "120");
        video.srcObject = mediaStream;
        video.muted = true;
        video.autoplay = true;
        webcams.appendChild(video);

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
            const video = document.createElement('video');
            video.setAttribute("id", stream.id);
            video.setAttribute("height", "120");
            video.setAttribute("width", "120");
            video.srcObject = stream;
            video.autoplay = true;
            webcams.appendChild(video);
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
            const video = document.createElement('video');
            video.setAttribute("id", stream.id);
            video.setAttribute("height", "120");
            video.setAttribute("width", "120");
            video.srcObject = stream;
            video.autoplay = true;
            webcams.appendChild(video);
        } else {
            video.srcObject = stream;
        }
    });
});






