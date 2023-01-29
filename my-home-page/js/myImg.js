const myImg = document.querySelector(".my-img");
const myImgImg = myImg.querySelector("img");
const myImgForm = myImg.querySelector(".input-form");
const myImgInput = myImgForm.querySelector("input");
const myImgDeleteBtn = document.querySelector(".my-img__btns button:nth-child(2)");
const myImgLeftBtn = document.querySelector(".my-img__btns button:nth-child(1)");
const myImgRightBtn = document.querySelector(".my-img__btns button:nth-child(3)");

const IMGS_KEY = "myImgs";

let myImgs = [
    "https://cdn.pixabay.com/photo/2017/12/27/14/18/july-pass-3042793_1280.jpg",
];
let chosenImg;

function setRandomImg() {
    loadImgs();
    if (myImgs.length !== 0) {
        chosenImg = myImgs[Math.floor(Math.random() * myImgs.length)];
        myImgImg.src = chosenImg;
    } else {
        myImgImg.src = "https://img.freepik.com/premium-vector/checkered-geometric-vector-background-with-black-gray-tile-transparent-grid-empty-layer_501045-1220.jpg?w=2000";
    }
}
function submitImg(event) {
    event.preventDefault();
    const newImg = myImgInput.value;
    myImgInput.value = "";
    myImgs.push(newImg);
    saveImgs();
}
function saveImgs() {
    localStorage.setItem(IMGS_KEY, JSON.stringify(myImgs));
}
function loadImgs() {
    myImgs = JSON.parse(localStorage.getItem(IMGS_KEY));
}
function deleteImg() {
    myImgs = myImgs.filter(item => {
        return item !== chosenImg
    })
    saveImgs();
    setRandomImg();
}
function getLeftImg() {
    if (myImgs.indexOf(chosenImg) !== 0) {
        chosenImg = myImgs[myImgs.indexOf(chosenImg) - 1];
    } else {
        chosenImg = myImgs[myImgs.length - 1];
    }
    myImgImg.src = chosenImg;
}
function getRightImg() {
    if (myImgs.indexOf(chosenImg) !== (myImgs.length - 1)) {
        chosenImg = myImgs[myImgs.indexOf(chosenImg) + 1];
    } else {
        chosenImg = myImgs[0];
    }
    myImgImg.src = chosenImg;
}

myImgForm.addEventListener("submit", submitImg);
myImgDeleteBtn.addEventListener("click", deleteImg);
myImgLeftBtn.addEventListener("click", getLeftImg);
myImgRightBtn.addEventListener("click", getRightImg);

setRandomImg();