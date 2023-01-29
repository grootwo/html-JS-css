const myImg = document.querySelector(".my-img");
const myImgImg = myImg.querySelector("img");

let myImgs = [
    "https://blog.kakaocdn.net/dn/ccW5UN/btrbWd3iYGl/xyD0biW4EXeSfltdKu2lv0/img.jpg",
    "https://blog.kakaocdn.net/dn/cSZ5WZ/btrb1q8qzPs/X78yP3xYFgGC6IiITxp1KK/img.jpg",
    "https://blog.kakaocdn.net/dn/INMNW/btrh5Yd46QG/2hcojqZe0D118hKUlDxnfk/img.jpg",
];
let chosenImg;
let chosenImgIndex;

function setRandomImg() {
    if (myImgs.length !== 0) {
        chosenImg = myImgs[Math.floor(Math.random() * myImgs.length)];
        chosenImgIndex =  myImgs.indexOf(chosenImg);
        console.log(chosenImg, chosenImgIndex);
        myImgImg.src = chosenImg;
    } else {
        myImgImg.src = "https://img.freepik.com/premium-vector/checkered-geometric-vector-background-with-black-gray-tile-transparent-grid-empty-layer_501045-1220.jpg?w=2000";
    }
}

setRandomImg();