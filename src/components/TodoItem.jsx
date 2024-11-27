import React from "react";
import "../css/TodoItem.css";

const TodoItem = ({ task, onComplete, onDelete }) => {
  return (
    <li className={`todo-task ${task.completed ? "done" : ""}`}>
      <span className="task-title">{task.text}</span>
      <button className="task-btn-done" onClick={onComplete}>
        {task.completed ? "Отменить" : "Сделано"}
      </button>
      <button className="task-btn-delete" onClick={onDelete}>
        Удалить
      </button>
    </li>
  );
};

export default TodoItem;
