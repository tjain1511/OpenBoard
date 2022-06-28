const socket = io({
    query: {
        roomId,
    },
});

let canvas = document.querySelector("#board");
let ctx = canvas.getContext('2d');

canvas.style.width ='100%';
canvas.style.height='100%';
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

document.getElementById("send-btn").addEventListener("click",function sendMsg(){
    var msg = document.getElementById("msg").value;
    if(msg!=""){
        console.log(msg);
        socket.emit("send-msg",msg,nameOfUser);
        document.getElementById("msg").value = "";
        var msgBox = document.createElement("div");
     msgBox.className = "card p-1 m-1 border"
     msgBox.innerHTML = `<div class='card-header'> You </div> <p>${msg}</p>`
     document.getElementById("msg-text").appendChild(msgBox);
    }
});

socket.on('receive-msg',(msg,sender)=>{
    var msgBox = document.createElement("div");
    msgBox.className = "card p-1 m-1 border"
    msgBox.innerHTML = `<div class='card-header'>${sender}</div> <p>${msg}</p>`
    console.log(msg);
    console.log(msgBox)
    document.getElementById("msg-text").appendChild(msgBox);
})

socket.on('server_data', function (data) {
    loadBoard(data);
});

function loadBoard(restore_state) {
    let img = document.createElement('img');
    img.setAttribute('src', restore_state);
    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    }
}