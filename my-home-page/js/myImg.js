const myImg = document.querySelector(".my-img");
const myImgImg = myImg.querySelector("img");
const myImgForm = myImg.querySelector(".input-form");
const myImgInput = myImgForm.querySelector("input");

const IMGS_KEY = "myImgs";

let myImgs = [
    "https://blog.kakaocdn.net/dn/ccW5UN/btrbWd3iYGl/xyD0biW4EXeSfltdKu2lv0/img.jpg",
    "https://blog.kakaocdn.net/dn/cSZ5WZ/btrb1q8qzPs/X78yP3xYFgGC6IiITxp1KK/img.jpg",
    "https://blog.kakaocdn.net/dn/INMNW/btrh5Yd46QG/2hcojqZe0D118hKUlDxnfk/img.jpg",
];
let chosenImg;
let chosenImgIndex;

function setRandomImg() {
    loadImgs();
    if (myImgs.length !== 0) {
        chosenImg = myImgs[Math.floor(Math.random() * myImgs.length)];
        chosenImgIndex =  myImgs.indexOf(chosenImg);
        console.log(chosenImg, chosenImgIndex);
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

myImgForm.addEventListener("submit", submitImg);

setRandomImg();