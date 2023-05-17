import React from 'react'
import NewTaskModal from './NewTaskModal';
import { useState } from 'react';

function Header({ currentBoard, setCurrentBoard }) {

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false);

  return (
    <header>
      <h3>
        {currentBoard.name}
      </h3>
      <div>
        <button className='headerButton' onClick={() => setOpen(true)}>+Add New Task</button>
        <NewTaskModal currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} open={open} handleClose={handleClose} />
      </div>
      
    </header>
  )
}

export default Header