const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

ctx.rect(0, 0, 100, 100);
ctx.rect(500, 500, 100, 100);
ctx.fill();

ctx.beginPath();
ctx.rect(100, 100, 120, 120);
ctx.rect(380, 380, 120, 120);
ctx.fillStyle = "gray";
ctx.fill();

ctx.beginPath();
ctx.rect(220, 220, 160, 160);
ctx.fillStyle = "cornflowerblue";
ctx.fill();