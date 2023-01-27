const myQuote = document.querySelector(".my-quote__message");
const quote = myQuote.querySelector(".my-quote__quote");
const info = myQuote.querySelector(".my-quote__info");

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
        quote: "모르고 넘어가는 것이 더 부끄러운 일이다.",
        info: "그러니 도전하자.",
    },
]

const chosenQuote = myQuotes[Math.floor(Math.random() * myQuotes.length)];
quote.innerText = chosenQuote.quote;
info.innerText = chosenQuote.info;