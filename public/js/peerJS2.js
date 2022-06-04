
(async function getMedia() {

    try {
        let mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        /* use the stream */
        
        const webcams = document.querySelector(".webcams");
        const video = document.createElement('video');
        video.setAttribute("id", mediaStream.id);
        video.setAttribute("height", "120");
        video.setAttribute("width", "120");
        video.srcObject = mediaStream;
        video.muted = true;
        video.autoplay = true;
        webcams.appendChild(video);

        const peer = new Peer();
        var call;

        setTimeout(() => {
            call = peer.call(adminId, mediaStream);;

            call.on('stream', function (stream) {

                const video = document.getElementById(stream.id);
                if(video==null){
                    const video = document.createElement('video');
                    video.setAttribute("id", stream.id);
                    video.setAttribute("height", "120");
                    video.setAttribute("width", "120");
                    video.srcObject = stream;
                    video.autoplay = true;
                    webcams.appendChild(video);
                }else{
                    video.srcObject = stream;
                }

            }, function (err) {
                console.log('Failed to get local stream', err);
            });
        }, 2000);

    } catch (err) {
        /* handle the error */
        console.log("error");
        console.log(err);
    }
})()





