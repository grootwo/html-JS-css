images = ["cat-0.jpg", "cat-1.jpg", "cat-2.jpg", "cat-3.jpg", "cat-4.jpg", "cat-5.jpg"];
const chosenImg = images[Math.floor(Math.random() * images.length)];

const bgImg = document.createElement("img");
bgImg.src = `img/${chosenImg}`;

document.body.appendChild(bgImg);