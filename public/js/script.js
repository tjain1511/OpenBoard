
const socket = io({
    query: {
        roomId: roomId,
    },
});

console.log(nameOfUser, roomId);
let canvas = document.querySelector("#board");
let ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

socket.on('server data emit', function (data) {
    loadBoard(data);
});

function loadBoard(restore_state) {
    console.log(restore_state)
    let img = document.createElement('img');
    img.setAttribute('src', restore_state);
    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    }
}
let initialXPosition;
let initialYPosition;
let drawing = false;

let penTool = document.querySelector("#pen");
let eraserTool = document.querySelector("#eraser");
let highlighterTool = document.querySelector("#highlighter");
let undoTool = document.querySelector("#undo");
let redoTool = document.querySelector("#redo");

let download = document.querySelector("#download");
let reset = document.querySelector("#reset");
let bucket = document.querySelector("#bucket");
let sizeSlider = document.querySelector("#size");

let mode;
let color = '#000000';
let size = 5;

sizeSlider.addEventListener("input", function (e) {
    size = e.target.value;
})

reset.addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redo_list = [];
    undo_list = [];
    saveState();

})

bucket.addEventListener("input", function (e) {
    color = e.target.value;
})

penTool.addEventListener("click", function () {
    mode = "pen";
})

eraserTool.addEventListener("click", function () {
    mode = "eraser";
})

highlighterTool.addEventListener("click", function () {
    mode = "highlighter";
})

undoTool.addEventListener("click", undo);
redoTool.addEventListener("click", redo);

download.addEventListener("click", function () {
    let imgData = canvas.toDataURL();
    let img = document.createElement('a');
    img.setAttribute('href', imgData);
    img.setAttribute('download', "download.jpeg");
    img.click();
})

let xdeviation = canvas.offsetLeft;
let ydeviation = canvas.offsetTop;
let redo_list = [];
let undo_list = [];
saveState();
function saveState() {
    let imageData = canvas.toDataURL();
    undo_list.push(imageData);
    if (nameOfUser === "admin") //dummy admin mode (to use set name admin)
        socket.emit("screen_state", imageData, roomId);

}

function undo() {
    if (undo_list.length == 1) {
        return;
    }
    var redo_state = undo_list.pop();
    var restore_state = undo_list[undo_list.length - 1];
    loadBoard(restore_state);
    if (nameOfUser === "admin") //dummy admin mode (to use set name admin)
        socket.emit("screen_state", restore_state, roomId);
    redo_list.push(redo_state);

}
function redo() {

    if (redo_list.length) {
        var restore_state = redo_list.pop();
        loadBoard(restore_state);
        if (nameOfUser === "admin") //dummy admin mode (to use set name admin)
            socket.emit("screen_state", restore_state, roomId);
        undo_list.push(restore_state);
    }

}

let mousemove = false;
let mouseup = true;
canvas.addEventListener("mousedown", function (e) {

    initialXPosition = e.clientX - xdeviation;
    initialYPosition = e.clientY - ydeviation;


    ctx.beginPath();
    ctx.moveTo(initialXPosition, initialYPosition);

    drawing = true;

})


canvas.addEventListener("mousemove", function (e) {

    let finalX = e.clientX - xdeviation;
    let finalY = e.clientY - ydeviation;

    if (drawing) {
        if (mode === "pen") {
            mousemove = true;
            ctx.strokeStyle = color;
            ctx.globalCompositeOperation = "source-over";
            ctx.lineWidth = size;
            ctx.lineTo(finalX, finalY);
            ctx.stroke();
        } else if (mode === "eraser") {
            mousemove = true;
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = size;
            ctx.globalCompositeOperation = "source-atop"; //if we don't chnage this to source-over then everything is drawn on sourceatop mode
            ctx.lineTo(finalX, finalY);
            ctx.stroke();
        } else if (mode === "highlighter") {
            mousemove = true;
            ctx.strokeStyle = "#ff0";
            ctx.lineWidth = size;
            ctx.globalCompositeOperation = "multiply";
            ctx.lineTo(finalX, finalY);
            ctx.stroke();
        }
    }
    ctx.globalCompositeOperation = "source-over";

})

canvas.addEventListener("mouseup", function (e) {
    if (mousemove) {
        mouseup = true;
        mousemove = false;
        redo_list = [];
        saveState();
    }
    mousemove = false;
    drawing = false;
})


window.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key === 'z') {
        undo();
    }
    if (e.ctrlKey && e.key === 'y') {
        redo();
    }

})
