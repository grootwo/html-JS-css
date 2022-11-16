const quotes = [
    {
        quote: "Heart beating and sweating are simply the my body's declaration that I'm ready to fight.",
        author: "_some text book",
    },
    {
        quote: "You buried me not knowing that I was a seed.",
        author: "_Me",
    },
    {
        quote: "I am the leader.",
        author: "_Abby Wambach",
    }
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;