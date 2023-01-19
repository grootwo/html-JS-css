const quotes = [
    {
        quote: "1",
        author: "a1"
    },
    {
        quote: "2",
        author: "a2"
    },
    {
        quote: "3",
        author: "a3"
    },
    {
        quote: "4",
        author: "a4"
    },
    {
        quote: "5",
        author: "a5"
    },
    {
        quote: "6",
        author: "a6"
    },
    {
        quote: "7",
        author: "a7"
    },
    {
        quote: "8",
        author: "a8"
    },
]

const quote = document.querySelector(".quotes .quote");
const author = document.querySelector(".quotes .author");
const chosenQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = chosenQuote.quote;
author.innerText = chosenQuote.author;