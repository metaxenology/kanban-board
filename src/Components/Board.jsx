import React from 'react'
import Column from './Column'
import '../styles/board.css'

export default function Board({ columns, handleDragStart, handleDraggedOver, currentBoard, setCurrentBoard, setColumn}) {
  
  return ( 
    <main>
      <div className="boardContainer">
        {columns?.map(column => <Column handleDragStart={handleDragStart} handleDraggedOver={handleDraggedOver} column={column} currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} setColumn={setColumn} />)}
      </div>
    </main>
  )
}
