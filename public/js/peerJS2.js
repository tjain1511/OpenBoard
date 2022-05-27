var peer = new Peer();
let mediaStream = null;


(async function getMedia() {

    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
        /* use the stream */

        const video = document.getElementById('webcam1');
        video.autoplay = true;
        video.srcObject = mediaStream;

        
        var call = await peer.call(adminId, mediaStream);
        

        call.on('stream', function (stream) {
            console.log("in user ")
            const video = document.getElementById('webcam2');
            video.srcObject = stream;
            video.autoplay = true;
        });

    } catch (err) {
        /* handle the error */
        console.log("error");
    }
})()





