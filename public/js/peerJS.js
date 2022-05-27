var peer = new Peer();
let mediaStream = null;

peer.on('open', function (id) {
    socket.emit("admin",id);
});

peer.on('call', function (call) {
    // Answer the call, providing our mediaStream
    call.answer(mediaStream);

    call.on('stream', function (stream) {
        // `stream` is the MediaStream of the remote peer.
        // Here you'd add it to an HTML video/canvas element.
        const video = document.getElementById('webcam2');
        video.autoplay = true;
        video.srcObject = stream;
    });
});

async function getMedia(constraints) {

    try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        /* use the stream */

        const video = document.getElementById('webcam1');
        video.autoplay = true;
        video.srcObject = mediaStream;
    } catch (err) {
        /* handle the error */
        console.log("error");
    }
}


getMedia({ audio: false, video: true })






