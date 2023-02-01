const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector(".color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const modeBtn = document.querySelector(".mode-btn");
const destroyBtn = document.querySelector(".destroy-btn");
const eraseBtn = document.querySelector(".erase-btn");
const imgInput = document.querySelector(".img-input");
const textInput = document.querySelector(".text-input");
const downloadBtn = document.querySelector(".download-btn");

const canvasWidth = 600;
const canvasHeight = 600;

canvas.width = canvasWidth;
canvas.height = canvasHeight;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

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
        ctx.fillRect(0, 0, canvasWidth, canvasWidth);
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

function onModeClick() {
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

function onDestroyClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onEraseClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onImgChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
        imgInput.value = null;
    }
}

function onCanvasDbclick(event) {
    const text = textInput.value;
    if (text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "50px serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}

function onDownloadeClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onCanvasDbclick);
lineWidth.addEventListener("change", lineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(item => {
    item.addEventListener("click", onColorClick);
})
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraseClick);
imgInput.addEventListener("change", onImgChange);
downloadBtn.addEventListener("click", onDownloadeClick);