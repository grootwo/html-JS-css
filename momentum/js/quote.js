const quotes = [
    {
        quote: "Champions keep playing until they get it right.",
        author: "Billie Jean King"
    },
    {
        quote: "Don't wait for somebody to ask you.",
        author: "Reese Witherspoon"
    },
    {
        quote: "Always be a first-rate version of yourself, instead of a second-rate version of somebody else.",
        author: "Judy Garland"
    },
    {
        quote: "We must reject not only the stereotypes that others hold of us, but also the stereotypes that we hold of ourselves.",
        author: "Shirley Chisholm"
    },
    {
        quote: "Stay strong. Stand up. Have a voice.",
        author: "Shawn Johnson"
    },
    {
        quote: "I'd rather regret the risks that didn't work out than the chances I didn't take at all.",
        author: "Simone Biles"
    },
    {
        quote: "Make failure your fuel.",
        author: "Abby Wambach"
    },
    {
        quote: "살되, 네 생명을 살아라. 생각하되, 네 생각으로 하여라. 알되, 네가 깨달아 알아라.",
        author: "차미리사"
    },
]

const quote = document.querySelector(".quotes .quote");
const author = document.querySelector(".quotes .author");
const chosenQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = chosenQuote.quote;
author.innerText = chosenQuote.author;