const input1 = document.querySelector("#ip1");
const input2 = document.querySelector("#ip2");
const button1 = document.querySelector("#btn1");
const button2 = document.querySelector("#btn2");
const buttonR = document.querySelector("#btnR");
const buttonP = document.querySelector("#btnP");
const ingredient1 = document.querySelector("#ig1");
const ingredient2 = document.querySelector("#ig2");
const container = document.querySelector(".container");

let color1 = "white";
let color2 = "white";

function changeBg1(info) {
    info.preventDefault();
    color1 = input1.value;
    var text = `btn1: ${color1}`;
    console.log(text);
    ingredient1.style.backgroundColor = color1;
}
function changeBg2(info) {
    info.preventDefault();
    color2 = input2.value;
    var text = `btn2: ${color2}`;
    console.log(text);
    ingredient2.style.backgroundColor = color2;
}
function makeRandom() {
    color1 = `rgba(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},1)`
    color2 = `rgba(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},1)`
    console.log(color1, color2);
    produce();
}
function produce() {
    container.style.backgroundImage = `conic-gradient(from 180deg, ${color1}, ${color2})`;
}

button1.addEventListener("click", changeBg1);
button2.addEventListener("click", changeBg2);
buttonR.addEventListener("click", makeRandom);
buttonP.addEventListener("click", produce);