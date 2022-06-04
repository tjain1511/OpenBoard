var peer = new Peer();
let mediaStream = null;
const webcams = document.querySelector(".webcams");

peer.on('open', function (id) {
    socket.emit("admin", id);
});

peer.on('call', function (call) {
    // Answer the call, providing our mediaStream

    call.answer(mediaStream);

    call.on('stream', function (stream) {

        // `stream` is the MediaStream of the remote peer.
        // Here you'd add it to an HTML video/canvas element.
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

async function getMedia(constraints) {

    try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

        /* use the stream */
        const video = document.createElement('video');
        video.setAttribute("id", mediaStream.id);
        video.setAttribute("height", "120");
        video.setAttribute("width", "120");
        video.srcObject = mediaStream;
        video.muted = true;
        video.autoplay = true;
        webcams.appendChild(video);

    } catch (err) {
        /* handle the error */
        console.log("error");
    }
}


getMedia({ audio: true, video: true })






