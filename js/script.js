const todoListEl = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];

renderTodoList();

createBtn.addEventListener('click', addTodoItem);

function addTodoItem() {

    const todo = {
        id : Date.now(),
        text : "",
        complete : false
    }

    todos.unshift(todo);
    renderTodoList();
    saveTodosToStorage();

    // 새로 추가된 input에 포커스 주기
    const firstInput = todoListEl.querySelector("input[type='text']");
    if (firstInput) {
        firstInput.removeAttribute("disabled");
        firstInput.focus();
    }
}

function renderTodoList() {
    todoListEl.innerHTML = '';
    todos.forEach(todo => {
        const todoEl = createTodoElement(todo);
        todoListEl.appendChild(todoEl);
    });
}

function createTodoElement(todo) {

    // 요소 생성
    const li = document.createElement("li");
    li.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.complete;

    if(todo.complete) {
        li.classList.add("complete");
    }

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = todo.text;
    inputEl.setAttribute("disabled", "");

    const actionsEl = document.createElement("div");
    actionsEl.className = 'actions';

    const editBtnEl = document.createElement("button");
    editBtnEl.className = 'material-icons';
    editBtnEl.innerText = "edit";

    const removeBtnEl = document.createElement("button");
    removeBtnEl.classList.add("material-icons", "remove-btn");
    removeBtnEl.innerText = "remove_circle";

    // 노드에 추가
    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    li.append(checkbox);
    li.append(inputEl);
    li.append(actionsEl);

    // 이벤트 리스너
    checkbox.addEventListener("change", () => toggleTodoComplete(todo, li, checkbox));

    inputEl.addEventListener("input", () => {todo.text = inputEl.value;});
    
    editBtnEl.addEventListener("click", () => editTodoText(inputEl));
    
    removeBtnEl.addEventListener("click", () => removeTodoItem(todo, li));
    
    inputEl.addEventListener("blur", () => {
        inputEl.setAttribute("disabled", "");
        saveTodosToStorage();
    });

    return li;
}

function toggleTodoComplete(todo, li, checkbox) {

    todo.complete = checkbox.checked;

    if (todo.complete) {
        li.classList.add("complete");
    } else {
        li.classList.remove("complete");
    }

    saveTodosToStorage();
}

function editTodoText(inputEl) {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
}

function removeTodoItem(todo, li) {
    todos = todos.filter(t => t.id != todo.id);
    li.remove();
    saveTodosToStorage();
}

function saveTodosToStorage() {
    const data = JSON.stringify(todos);
    localStorage.setItem("my_todos", data);
}

function loadTodosFromStorage() {
    const data = localStorage.getItem("my_todos");

    if(data){
        todos = JSON.parse(data);
    }
}

loadTodosFromStorage();