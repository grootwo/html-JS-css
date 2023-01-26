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
ctx.fillStyle = "cornflowerblue";
ctx.fillRect(220, 220, 160, 160);

ctx.beginPath();
ctx.moveTo(380, 150);
ctx.lineTo(450, 50);
ctx.lineTo(520, 150);
ctx.lineTo(380, 120);
ctx.strokeStyle = "blue";
ctx.lineWidth = 1;
ctx.stroke();

ctx.beginPath();
ctx.arc(200, 400, 100, 0, 1.5 * Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(150, 450, 50, 1 * Math.PI, 0.5 * Math.PI);
ctx.stroke();