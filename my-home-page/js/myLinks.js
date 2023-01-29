const linkList = document.querySelector(".my-links__list");
const linkForm = document.querySelector(".my-links .input-form");
const linkInput = linkForm.querySelector("input:first-child");
const linkNameInput = linkForm.querySelector("input:last-child");

let links = [
    {
        a: "https://www.google.com/",
        name: "google",
        id: Date.now(),
    }
];
const LINKS_KEY = "links";

function addNewLink(event) {
    event.preventDefault();
    const newLink = {
        a: linkInput.value,
        name: linkNameInput.value,
        id: Date.now(),
    }
    linkInput.value = "";
    linkNameInput.value = "";
    console.log(newLink);
    links.push(newLink);
    showNewLink(newLink);
    saveLinks();
}
function showNewLink(newLink) {
    const linkA = document.createElement("a");
    linkA.innerText = newLink.name;
    linkA.href = newLink.a;
    linkA.target = "_blank";
    const linkBtn = document.createElement("Button");
    const linkBtnIcon = document.createElement("i");
    linkBtnIcon.classList.add("fa-solid");
    linkBtnIcon.classList.add("fa-xmark");
    linkBtn.appendChild(linkBtnIcon);
    linkBtn.addEventListener("click", deleteLink);
    const linkLi = document.createElement("li");
    linkLi.className = "link";
    linkLi.id = newLink.id;
    linkLi.appendChild(linkBtn);
    linkLi.appendChild(linkA);
    linkList.appendChild(linkLi);
}
function saveLinks() {
    localStorage.setItem(LINKS_KEY, JSON.stringify(links));
}
function deleteLink(event) {
    const selectedBtn = event.target.parentElement;
    const selectedLi = selectedBtn.parentElement;
    selectedLi.remove();
    links = links.filter(item => {
        return item.id !== parseInt(selectedLi.id)
    });
    saveLinks();
}

linkForm.addEventListener("submit", addNewLink);


const savedLinks = JSON.parse(localStorage.getItem(LINKS_KEY));

if (savedLinks !== null) {
    links = savedLinks;
    links.forEach(item => {
        showNewLink(item);
    })
}