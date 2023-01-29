const todoList = document.querySelector(".todo-list__list");
const todoForm = document.querySelector(".todo-list .input-form");
const todoInput = todoForm.querySelector("input");

let todos = [];
const TODOS_KEY = "todos";

function addNewTodo(event) {
    event.preventDefault();
    const newTodo = {
        text: todoInput.value,
        id: Date.now(),
    }
    todoInput.value = "";
    todos.push(newTodo);
    showNewTodo(newTodo);
    saveTodos();
}
function showNewTodo(newTodo) {
    const todoSpan = document.createElement("span");
    todoSpan.innerText = newTodo.text;
    const todoBtn = document.createElement("Button");
    const todoBtnIcon = document.createElement("i");
    todoBtnIcon.classList.add("fa-solid");
    todoBtnIcon.classList.add("fa-xmark");
    todoBtn.appendChild(todoBtnIcon);
    todoBtn.addEventListener("click", deleteTodo);
    const todoLi = document.createElement("li");
    todoLi.className = "todo";
    todoLi.id = newTodo.id;
    todoLi.appendChild(todoBtn);
    todoLi.appendChild(todoSpan);
    todoList.appendChild(todoLi);
}
function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
function deleteTodo(event) {
    const selectedBtn = event.target.parentElement;
    const selectedLi = selectedBtn.parentElement;
    selectedLi.remove();
    todos = todos.filter(item => {
        return item.id !== parseInt(selectedLi.id)
    });
    saveTodos();
}

todoForm.addEventListener("submit", addNewTodo);


const savedTodos = JSON.parse(localStorage.getItem(TODOS_KEY));

if (saveTodos !== null) {
    todos = savedTodos;
    todos.forEach(item => {
        showNewTodo(item);
    })
}