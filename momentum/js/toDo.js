const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todo-list");

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    paintTodo(newTodo);
}

function paintTodo(newTodo) {
    const todoLi = document.createElement("li");
    const todoSpan = document.createElement("span");
    todoSpan.innerText = newTodo;
    const todoButton = document.createElement("button");
    todoButton.innerText = "X";
    todoButton.addEventListener("click", deleteTodo);
    todoLi.appendChild(todoSpan);
    todoLi.appendChild(todoButton);
    todoList.appendChild(todoLi);
}

function deleteTodo(event) {
    const selectedLi = event.target.parentElement;
    selectedLi.remove();
}

todoForm.addEventListener("submit", handleTodoSubmit);