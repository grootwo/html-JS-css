const myQuote = document.querySelector(".my-quote__message");
const quote = myQuote.querySelector(".my-quote__quote");
const info = myQuote.querySelector(".my-quote__info");
const quoteForm = document.querySelector(".second-layout .input-form");
const quoteInput = quoteForm.querySelector("input:first-child");
const infoInput = quoteForm.querySelector("input:last-child");

const QUOTES_KEY = "myQuotes";

let myQuotes = [
    {
        quote: "일찍, 많이 실패하자!",
        info: "23.01.27.금",
    },
    {
        quote: "Don't wait for somebody to ask you.",
        info: "Reese Witherspoon",
    },
    {
        quote: "모르고 넘어가는 게 더 부끄러운 일이다.",
        info: "그러니 질문하자",
    },
];

function quoteSubmit(event) {
    event.preventDefault();
    const newQuote = {
        quote: quoteInput.value,
        info: infoInput.value,
    };
    myQuotes.push(newQuote);
    quoteInput.value = "";
    infoInput.value = "";
    saveQuotes();
}
function saveQuotes() {
    localStorage.setItem(QUOTES_KEY, JSON.stringify(myQuotes));
}
function loadQuotes() {
    myQuotes = JSON.parse(localStorage.getItem(QUOTES_KEY));
}
function paintQuote() {
    loadQuotes();
    const chosenQuote = myQuotes[Math.floor(Math.random() * myQuotes.length)];
    quote.innerText = chosenQuote.quote;
    info.innerText = chosenQuote.info;
}

quoteForm.addEventListener("submit", quoteSubmit);

loadQuotes();
if (myQuotes === null) {
    myQuotes = [
        {
            quote: "일찍, 많이 실패하자!",
            info: "23.01.27.금",
        },
        {
            quote: "Don't wait for somebody to ask you.",
            info: "Reese Witherspoon",
        },
        {
            quote: "모르고 넘어가는 게 더 부끄러운 일이다.",
            info: "그러니 질문하자",
        },
    ];
    saveQuotes();
    paintQuote();
} else {
    paintQuote();
}