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
    userCommentSpan.innerText = userCommentMessage;
}
// function paintUserComment() {
//     userCommentSpan.classList.remove(HIDDEN_CLASS);
//     userCommentSpan.innerText = savedUserComment;
// }

userCommentForm.addEventListener("submit", userCommentSubmit);

const savedUserComment = localStorage.getItem(USER_COMMENT_KEY);

if (savedUserComment !== null) {
    userCommentSpan.classList.remove(HIDDEN_CLASS);
    userCommentSpan.innerText = savedUserComment;
} else {
    userCommentForm.classList.remove(HIDDEN_CLASS);
}