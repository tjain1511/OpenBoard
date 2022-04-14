
const socket = io();
socket.on('server emit',(msg)=>console.log(msg));

let canvas = document.querySelector("#board");
let ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

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
    redo_list=[];
    undo_list=[];
    saveState();

    socket.emit('send data','this is emitted');
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
    (undo_list).push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}
function restoreState(pop, push) {
    if (pop.length) {
        saveState(push, true);
        var restore_state = pop.pop();
        // push.push(restore_state);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(restore_state, 0, 0);
    }
}
function undo() {
    if (undo_list.length == 1) {
        return;
    }
    var redo_state = undo_list.pop();
    var restore_state = undo_list[undo_list.length - 1];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(restore_state, 0, 0);
    redo_list.push(redo_state);

    // }
}
function redo() {
    // restoreState(redo_list, undo_list);
    if (redo_list.length) {
        var restore_state = redo_list.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(restore_state, 0, 0);
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

    // if (mouseup) {
    //     saveState();
    //     mouseup = false;
    // }
    drawing = true;

})


canvas.addEventListener("mousemove", function (e) {

    let finalX = e.clientX - xdeviation;
    let finalY = e.clientY - ydeviation;

    if (drawing) {
        if (mode === "pen") {
            mousemove = true;
            // mouseup = false;
            ctx.strokeStyle = color;
            ctx.globalCompositeOperation = "source-over";
            ctx.lineWidth = size;
            ctx.lineTo(finalX, finalY);
            ctx.stroke();
        } else if (mode === "eraser") {
            mousemove = true;
            // mouseup = false;
            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = size;
            ctx.globalCompositeOperation = "source-atop";
            ctx.lineTo(finalX, finalY);
            ctx.stroke();
        } else if (mode === "highlighter") {
            mousemove = true;
            // mouseup = false;
            ctx.strokeStyle = "#ff0";
            ctx.lineWidth = size;
            ctx.globalCompositeOperation = "multiply";
            ctx.lineTo(finalX, finalY);
            ctx.stroke();
        }
    }

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
