let chatBtn = document.getElementById('chat-btn');
let chatBox = document.getElementById('chat-area');
let videoArea = document.getElementById('video-list');
let videoBtn = document.getElementById('group-video');
let callEnd = document.getElementById('call-end');


callEnd.addEventListener('click',function(){
    console.log("end call btn clicked");
})

chatBtn.addEventListener('click',function(){
    videoArea.style.display = 'none';
    chatBox.style.display = 'inline-block';
})

videoBtn.addEventListener('click',function(){
    chatBox.style.display = 'none';
    videoArea.style.display = 'inline-block';
})