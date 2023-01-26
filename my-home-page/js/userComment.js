const userComment = document.querySelector(".user-comment");
const userCommentForm = userComment.querySelector("form");
const userCommentInput = userComment.querySelector("input");
const userCommentSpan = userComment.querySelector("span");

const USER_COMMENT_KEY = "userComment";
const HIDDEN_CLASS = "hidden";

function userCommentSubmit(event) {
    event.preventDefault();
    const userCommentMessage = userCommentInput.value;
    localStorage.setItem(USER_COMMENT_KEY, userCommentMessage);
    paintUserComment(userCommentMessage);
    userCommentForm.classList.add(HIDDEN_CLASS);
}
function paintUserComment(message) {
    userCommentSpan.classList.remove(HIDDEN_CLASS);
    userCommentSpan.innerText = message;
}

userCommentForm.addEventListener("submit", userCommentSubmit);

const savedUserComment = localStorage.getItem(USER_COMMENT_KEY);

if (savedUserComment !== null) {
    paintUserComment(savedUserComment);
} else {
    userCommentForm.classList.remove(HIDDEN_CLASS);
}