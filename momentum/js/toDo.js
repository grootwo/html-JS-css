const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todo-list");

let todos = [];
const TODOS_KEY = "todos";

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = {
        text: todoInput.value,
        id: Date.now(),
    }
    todoInput.value = "";
    todos.push(newTodo);
    paintTodo(newTodo);
    saveTodo();
}

function paintTodo(newTodo) {
    const todoLi = document.createElement("li");
    todoLi.id = newTodo.id;
    const todoSpan = document.createElement("span");
    todoSpan.innerText = newTodo.text;
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
    todos = todos.filter(item => {
        return item.id !== parseInt(selectedLi.id)
    });
    saveTodo();
}

function saveTodo() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

todoForm.addEventListener("submit", handleTodoSubmit);


const savedTodos = localStorage.getItem(TODOS_KEY);

// 만약 저장된 todo가 있다면
if (savedTodos !== null) {
    todos = JSON.parse(savedTodos);
    todos.forEach(item => {
        paintTodo(item);
    });
}