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
let bucket = document.querySelector("#bucket");

let mode;
let color = '#000000';


bucket.addEventListener("input",function(e){
    color = e.target.value;

})

penTool.addEventListener("click",function(){
    mode = "pen";
})

eraserTool.addEventListener("click",function(){
    mode = "eraser";
})

highlighterTool.addEventListener("click",function(){
    mode = "highlighter";
})

undoTool.addEventListener("click",undo);
redoTool.addEventListener("click",redo);

download.addEventListener("click",function(){
    let imgData = canvas.toDataURL();
    let img = document.createElement('a');
    img.setAttribute('href',imgData);
    img.setAttribute('download',"download.jpeg");
    img.click();
})

let xdeviation = canvas.offsetLeft;
let ydeviation = canvas.offsetTop;
let redo_list = [];
let undo_list = [];

function saveState(list, keep_redo) {
    keep_redo = keep_redo || false;
    if (!keep_redo) {
        redo_list = [];
    }

    (list || undo_list).push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}
function restoreState(pop, push) {
    if (pop.length) {
        saveState(push, true);
        var restore_state = pop.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(restore_state, 0, 0);
    }
}
function undo() {
    restoreState(undo_list, redo_list);
}
function redo() {
    restoreState(redo_list, undo_list);
}


canvas.addEventListener("mousedown", function (e) {

    initialXPosition = e.clientX - xdeviation;
    initialYPosition = e.clientY - ydeviation;


    ctx.beginPath();
    ctx.moveTo(initialXPosition, initialYPosition);

    saveState();
    drawing = true;

})


canvas.addEventListener("mousemove", function (e) {

    let finalX = e.clientX - xdeviation;
    let finalY = e.clientY - ydeviation;

    if (drawing) {
        if (mode === "pen") {
            ctx.strokeStyle = color;
            ctx.globalCompositeOperation = "source-over";
            ctx.lineWidth = 5;
            ctx.lineTo(finalX, finalY);
            ctx.stroke();
        } else if (mode === "eraser") {
            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = 25;
            ctx.globalCompositeOperation = "source-atop";
            ctx.lineTo(finalX, finalY);
            ctx.stroke();
        } else if (mode === "highlighter") {
            ctx.strokeStyle = "#ff0";
            ctx.lineWidth = 25;
            ctx.globalCompositeOperation = "multiply";
            ctx.lineTo(finalX, finalY);
            ctx.stroke();
        }
    }

})

canvas.addEventListener("mouseup", function (e) {
    drawing = false;
})


window.addEventListener("keydown",function(e){

    if(e.ctrlKey && e.key==='z'){
        undo();
    }
    if(e.ctrlKey && e.key==='y'){
        redo();
    }
    
})
