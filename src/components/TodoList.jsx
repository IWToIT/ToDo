import React from "react";
import TodoItem from "./TodoItem";
import "../css/TodoItem.css";

const TodoList = ({ tasks, onDelete, onComplete, filter }) => {
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "active":
        return !task.completed && !task.deleted;
      case "done":
        return task.completed && !task.deleted;
      case "deleted":
        return task.deleted;
      default:
        return true;
    }
  });
 
  return (
    <ul className="todos">
      {filteredTasks.map(
        (task) =>
          !task.deleted && (
            <TodoItem
              key={task.id}
              task={task}
              onComplete={() => onComplete(task.id)}
              onDelete={() => onDelete(task.id)}
            />
          )
      )}
    </ul>
  );
};

export default TodoList;
