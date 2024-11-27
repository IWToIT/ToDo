import React, { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import "./css/App.css";

const App = () => {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState("active");

  const saveTodo = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTodo = (text) => {
    if (!text || !text.trim()) return;
    console.log(addTodo());
    const newTask = { id: Date.now(), text, completed: false, deleted: false };
    setTasks([...tasks, newTask]);
    saveTodo([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
    saveTodo(tasks.filter((task) => task.id != id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id != id ? { ...task, completed: !task.completed } : task
      )
    );
    saveTodo(tasks);
  };

  const removeDeletedTasks = () => {
    setTasks(tasks.filter((task) => !task.deleted));
    saveTodo(tasks.filter((task) => !task.deleted));
  };

  const filterTask = (filterValue) => {
    setFilter(filterValue);
  };

  return (
    <div className="App">
      <Header onAddTask={(text) => addTodo(text)} />
      <select value={filter} onChange={(e) => filterTask(e.target.value)}>
        <option value="active">Текущие</option>
        <option value="done">Завершенные</option>
        <option value="deleted">Удаленные</option>
      </select>
      <TodoList
        tasks={tasks}
        filter={filter}
        onDelete={deleteTask}
        onComplete={toggleTask}
      />
      <button onClick={removeDeletedTasks}>
        Очистить список удаленных задач
      </button>
    </div>
  );
};

export default App;
