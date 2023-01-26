const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

function onMouseMove(event) {
    ctx.beginPath();
    ctx.moveTo(600, 600);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

canvas.addEventListener("mousemove", onMouseMove);