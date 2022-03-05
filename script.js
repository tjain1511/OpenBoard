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
let redo_list = [];
let undo_list = [];
function saveState(list, keep_redo) {
    keep_redo = keep_redo || false;
    if (!keep_redo) {
        redo_list = [];
    }

    // (list || undo_list).push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // (canvas.toDataUrl)
    (list || undo_list).push(canvas.toDataURL());
}
function restoreState(pop, push) {
    if (pop.length) {
        saveState(push, true);
        var restore_state = pop.pop();
        var img = document.createElement('img');
        img.setAttribute('src', restore_state);
        console.log(img);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.putImageData(restore_state,0, 0);
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
        ctx.lineTo(finalX, finalY);
        ctx.stroke();
    }

})

canvas.addEventListener("mouseup", function (e) {

    drawing = false;
})
