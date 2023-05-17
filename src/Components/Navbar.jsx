import React from 'react'
import NewBoardModal from './NewBoardModal';
import { useState } from 'react';
import '../styles/navbar.css'
import iconBoard from '../assets/icon-board.svg'

function Navbar({ boards, handleBoardClick, handleCreateNewBoard }) {
  
  const [open, setOpen] = useState(false)
  const showCreateNewBoardModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <nav className='navbar'>
      <p className='navbar-title'>ALL BOARDS ({boards.length})</p>
      <ul>
        {boards.map((board, idx) => <li className='navbar-boardTitle' key={idx} onClick={() => handleBoardClick(board)}>
          <img src={iconBoard} alt='iconBoard' /> {board.name}</li>)}
      </ul>
      <button onClick={showCreateNewBoardModal}>
        <img src={iconBoard} alt='iconBoard' />
         + Create New Board
      </button>
      <NewBoardModal open={open} handleClose={handleClose} handleCreateNewBoard={handleCreateNewBoard} />
    </nav>
  )
}

export default Navbar
