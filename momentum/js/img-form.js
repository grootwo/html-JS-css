const imgForm = document.querySelector(".img-form");
const imgInput = document.querySelector(".img-form input");

function handleImgSubmit(event) {
    event.preventDefault();
    images.push(imgInput.value);
}

imgForm.addEventListener("submit", handleImgSubmit);