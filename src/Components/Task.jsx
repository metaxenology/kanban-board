import React from "react";

function Task({ task, handleDragStart, handleDraggedOver, showTaskViewModal }) {
  return (
    <div
      className="column-card"
      draggable
      onClick={(event) => showTaskViewModal(event, task.title)}
      onDragStart={(event) => {
        event.dataTransfer.setData("title", task.title);
        handleDragStart(task.title);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        handleDraggedOver(task.title);
      }}>
      <div className="column-card-title">{task.title}</div>

      <div className="column-card-tasksCompleted">
        {task.subtasks?.filter((subtask) => subtask.isCompleted).length} out of{" "}
        {task.subtasks?.length}
      </div>
    </div>
  );
}

export default Task;
