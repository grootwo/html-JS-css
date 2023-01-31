const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector(".color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const modeBtn = document.querySelector(".mode-btn");

canvas.width = 600;
canvas.height = 600;
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

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

function onCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, 600, 600);
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

function onChangeMode() {
    // 왜 이게 불필요한지 알아야 함
    // if (isPainting) {
    //     isPainting = false;
    //     isFilling = true;
    //     modeBtn.innerText = "Draw";
    // } else {
    //     isPainting = true;
    //     isFilling = false;
    //     modeBtn.innerText = "Fill";
    // }
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", lineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(item => {
    item.addEventListener("click", onColorClick);
})
modeBtn.addEventListener("click", onChangeMode);