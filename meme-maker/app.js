const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");

canvas.width = 600;
canvas.height = 600;
ctx.lineWidth = lineWidth.value;

let isPainting = false;

function startPainting(event) {
    isPainting = true;
    ctx.beginPath();
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

function lineWidthChange() {
    console.dir(lineWidth.value);
    ctx.lineWidth = lineWidth.value;
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidth.addEventListener("change", lineWidthChange);