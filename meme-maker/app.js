const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector(".color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));

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

function lineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const chosenColor = event.target.dataset.color;
    color.value = chosenColor;
    ctx.strokeStyle = chosenColor;
    ctx.fillStyle = chosenColor;
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidth.addEventListener("change", lineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(item => {
    item.addEventListener("click", onColorClick);
})