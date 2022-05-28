
(async function getMedia() {

    try {
        let mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        /* use the stream */
        const peer = new Peer();
        const video = document.getElementById('webcam1');
        video.autoplay = true;
        video.srcObject = mediaStream;

         var call;

         setTimeout(() => {
            call = peer.call(adminId, mediaStream);
            call.on('stream', function (stream) {
             console.log("in user ")
             const video = document.getElementById('webcam2');
             video.srcObject = stream;
             video.autoplay = true;
         },function(err) {
             console.log('Failed to get local stream' ,err);
           });
         }, 2000);

        } catch (err) {
        /* handle the error */
        console.log("error");
        console.log(err);
    }
})()





