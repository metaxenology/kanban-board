import React from 'react'
import Task from './Task'

export default function Column({ column, handleDragStart, handleDraggedOver, currentBoard, setCurrentBoard, setColumn }) {

  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {

    event.preventDefault();

    let taskDropped =  event.dataTransfer.getData('title')
    let _currentBoard = {...currentBoard}

    let taskColumn = _currentBoard.columns.find(col => col.tasks.find(t => t.title === taskDropped))
    let taskIndex = taskColumn.tasks.findIndex(task => task.title === taskDropped)

    if(column.name !== taskColumn.name) {
      let currentColumn = _currentBoard.columns.find(col => col.name === column.name)
      currentColumn.tasks.push(taskColumn.tasks[taskIndex])
      taskColumn.tasks.splice(taskIndex, 1)
      setCurrentBoard(_currentBoard)
    }
  };
  
  return (
    <div className='column'
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <span className='column-title'>
        <span className='column-title-ball'>
        </span>
        <span>{column.name } ({column?.tasks.length})</span>
      </span>
      {column?.tasks.map(task => <Task handleDragStart={handleDragStart} handleDraggedOver={handleDraggedOver} task={task} column={column} setColumn={setColumn} />)}
    </div>
  )
}
