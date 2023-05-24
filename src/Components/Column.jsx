import React from "react";
import Task from "./Task";
import TaskViewModal from "./Modals/TaskViewModal";
import { useState } from "react";
export default function Column({
  column,
  handleDragStart,
  handleDraggedOver,
  currentBoard,
  setCurrentBoard,
  moveTask,
  viewedTask,
  setViewedTask,
  deleteTask,
}) {
  const handleDragOver = (event) => event.preventDefault();

  const [open, setOpen] = useState(true);

  const showTaskViewModal = (event, title) => {
    if (event.target.className.includes("column-card")) {
      setViewedTask(title);
      event.stopPropagation();
      setOpen(true);
    }
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    let taskDropped = event.dataTransfer.getData("title");
    let _currentBoard = { ...currentBoard };

    let taskColumn = _currentBoard.columns.find((col) =>
      col.tasks.find((t) => t.title === taskDropped)
    );
    let taskIndex = taskColumn.tasks.findIndex(
      (task) => task.title === taskDropped
    );

    if (column.name !== taskColumn.name) {
      let currentColumn = _currentBoard.columns.find(
        (col) => col.name === column.name
      );
      currentColumn.tasks.push(taskColumn.tasks[taskIndex]);
      taskColumn.tasks.splice(taskIndex, 1);
      setCurrentBoard(_currentBoard);
    }
  };

  return (
    <div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <span className="column-title">
        <span className="column-title-ball"></span>
        <span>
          {column.name} ({column?.tasks.length})
        </span>
      </span>
      {column?.tasks.map((task) => (
        <>
          <Task
            key={task.title + task.status}
            task={task}
            handleDragStart={handleDragStart}
            handleDraggedOver={handleDraggedOver}
            showTaskViewModal={showTaskViewModal}
          />
          {viewedTask === task.title ? (
            <TaskViewModal
              key={task.title + task.status}
              open={open}
              handleClose={handleClose}
              task={task}
              column={column}
              currentBoard={currentBoard}
              setCurrentBoard={setCurrentBoard}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
          ) : (
            <></>
          )}
        </>
      ))}
    </div>
  );
}

/*
  What's the other logic in here?
  {task.title === openedTed = }
*/
