const userComment = document.querySelector(".user-comment");
const userCommentForm = userComment.querySelector("form");
const userCommentInput = userComment.querySelector("input");
const userCommentMessage = userComment.querySelector("span");


function userCommentSubmit(event) {
    event.preventDefault();
    userCommentMessage.innerText = userCommentInput.value;
}

userCommentForm.addEventListener("submit", userCommentSubmit);