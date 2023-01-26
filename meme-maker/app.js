const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

let isPainting = false;

function startPainting(event) {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
}

function onMouseMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    } else {
        ctx.moveTo(event.offsetX, event.offsetY);
    }
}


canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseleave", cancelPainting);