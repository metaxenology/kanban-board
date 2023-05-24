import React from "react";
import Column from "./Column";
import "../styles/board.css";
import { useState } from "react";

export default function Board({
  columns,
  handleDragStart,
  handleDraggedOver,
  currentBoard,
  setCurrentBoard,
  moveTask,
  deleteTask,
}) {
  
  const [viewedTask, setViewedTask] = useState("");

  return (
    <main>
      <div className="boardContainer">
        {columns?.map((column) => (
          <Column
            key={column.name}
            handleDragStart={handleDragStart}
            handleDraggedOver={handleDraggedOver}
            column={column}
            currentBoard={currentBoard}
            setCurrentBoard={setCurrentBoard}
            moveTask={moveTask}
            deleteTask={deleteTask}
            viewedTask={viewedTask}
            setViewedTask={setViewedTask}
          />
        ))}
      </div>
    </main>
  );
}
