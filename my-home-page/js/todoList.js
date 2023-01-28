const todoList = document.querySelector(".todo-list__list");
const todoForm = document.querySelector(".todo-list .input-form");
const todoInput = todoForm.querySelector("input");

function addNewTodo(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    console.log(newTodo);
    createNewTodo(newTodo);
}
function createNewTodo(newTodo) {
    const todoSpan = document.createElement("span");
    todoSpan.innerText = newTodo;
    const todoBtn = document.createElement("Button");
    todoBtn.innerText = "✖️";
    const todoLi = document.createElement("li");
    todoLi.className = "todo";
    todoLi.appendChild(todoSpan);
    todoLi.appendChild(todoBtn);
    todoList.appendChild(todoLi);
}

todoForm.addEventListener("submit", addNewTodo);