const images = [
    "beach.jpg",
    "desert.jpg",
    "mountain.jpg",
    "space.png",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img")

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);