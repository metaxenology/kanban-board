import React from 'react'
import { useState } from 'react';
import TaskViewModal from './TaskViewModal'

function Task({ task, handleDragStart, handleDraggedOver, column, setColumn }) {

  const [open, setOpen] = useState(false)

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false)
  }
  const showTaskViewModal = (event) => {
    event.stopPropagation();
    setOpen(true)
  }

  return (
    <div
      className='column-card'
      draggable
      onClick={event => showTaskViewModal(event)}
      onDragStart={(event) => {
        event.dataTransfer.setData('title', task.title)
        handleDragStart(task.title)
      }}
      onDragOver={event => {
        event.preventDefault();
        handleDraggedOver(task.title)
      }}>

      <div>
        {task.title}
      </div>
      
      <div className='column-card-tasksCompleted'>
        {task.subtasks?.filter(subtask => subtask.isCompleted).length} out of {task.subtasks?.length}
      </div>
      <TaskViewModal open={open} handleClose={handleClose} task={task} column={column} setColumn={setColumn} />

    </div>
  )
}

export default Task