let canvas = document.querySelector("#board");
let ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let initialXPosition;
let initialYPosition;
let drawing = false;

let xdeviation = canvas.offsetLeft;
let ydeviation = canvas.offsetTop;

// let ydeviation = canvas.getBoundingClientRect().y;

canvas.addEventListener("mousedown",function(e){

    initialXPosition = e.clientX - xdeviation;
    initialYPosition = e.clientY - ydeviation;

    drawing = true;
    ctx.beginPath();

})


canvas.addEventListener("mousemove",function(e){

    let finalX = e.clientX - xdeviation;
    let finalY = e.clientY - ydeviation;

    if(drawing){
        ctx.lineTo(finalX,finalY);
        ctx.stroke();
    }
    
})

canvas.addEventListener("mouseup",function(e){

    drawing = false;
})