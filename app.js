const headerInput = document.getElementById("headerInput");
const filterSelect = document.querySelector(".header-select");
const todosList = document.querySelector(".todos");

function loadTodo() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTodo(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTodoItem(task) {
  const li = document.createElement("li");
  li.className = "todo-task";
  if (task.completed) {
    li.classList.add("done");
  }
  li.id = task.id;

  li.innerHTML = `
        <h1>${task.text}</h1>
        <div>
          <button class="task-btn-done" onclick="toggleTask(${task.id})">${
    task.completed ? "Отменить" : "Сделано"
  }</button>
          <button class="task-btn-delete" onclick="deleteTask(${
            task.id
          })">Удалить</button>
        </div>
        `;

  return li;
}

function renderTodo() {
  const filter = filterSelect.value;
  const tasks = filterTask(filter);

  todosList.innerHTML = "";
  tasks.forEach((task) => {
    todosList.appendChild(createTodoItem(task));
  });
}

function addTask() {
  const text = headerInput.value.trim();
  if (!text) return;

  const tasks = loadTodo();
  const newTask = { id: Date.now(), text, completed: false, deleted: false };
  tasks.push(newTask);
  saveTodo(tasks);
  headerInput.value = "";
  renderTodo();
}

headerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }

});

function deleteTask(id) {
  const tasks = loadTodo();
  const task = tasks.find((task) => task.id === id);
  if (task) task.deleted = true;
  saveTodo(tasks);
  renderTodo();
}

function toggleTask(id) {
  const tasks = loadTodo();
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
  }
  saveTodo(tasks);
  renderTodo();
}

function filterTask(filter) {
  const tasks = loadTodo();
  if (filter === "active") {
    return tasks.filter((task) => !task.completed && !task.deleted);
  }
  if (filter === "done") {
    return tasks.filter((task) => task.completed && !task.deleted);
  }
  if (filter === "deleted") {
    return tasks.filter((task) => task.deleted);
  }
  return tasks;
}

function removeDeletedTasks() {
  const tasks = loadTodo();
  const activeTasks = tasks.filter((task) => !task.deleted);
  saveTodo(activeTasks);
  renderTodo();
}

filterSelect.addEventListener("change", renderTodo);

renderTodo();
