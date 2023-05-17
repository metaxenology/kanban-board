import './App.css'
import Navbar from './Components/Navbar';
import Logo from './Components/Logo';
import Header from './Components/Header';
import Board from './Components/Board'
import { useEffect, useState } from 'react';

function App() {

  const [boards, setBoards] = useState([])
  const [currentBoard, setCurrentBoard] = useState('')

  const handleBoardClick = (board) => setCurrentBoard(board);
  const handleCreateNewBoard = (newBoard) => setBoards([...boards, newBoard])

  const [draggedCard, setDraggedCard] = useState()
  const [cardLastSwapped, setCardLastSwapped] = useState()

  const setColumn = newColumn => {
    let _currentBoard = {...currentBoard}
    let col = _currentBoard.columns.find(col => col.name === newColumn.name)
    col = {...newColumn}
    setCurrentBoard(_currentBoard)
  }

  const handleDragStart = card => setDraggedCard(card)

  const handleDraggedOver = newCard => {

    let _currentBoard = {...currentBoard}

    if(cardLastSwapped !== newCard && draggedCard !== newCard) {
      
      let columnA = _currentBoard?.columns.find(column => column.tasks.find(task => task.title === draggedCard))
      let columnB = _currentBoard?.columns.find(column => column.tasks.find(task => task.title === newCard))
      let taskA = columnA.tasks?.find(task => task.title === draggedCard)
      let indexOfTaskA = columnA.tasks?.findIndex(task => task.title === draggedCard)
      let taskB = columnB.tasks?.find(task => task.title === newCard)
      let indexOfTaskB = columnB.tasks?.findIndex(task => task.title === newCard)
      
      columnA.tasks.splice(indexOfTaskA, 1)
      columnB.tasks.splice(indexOfTaskB + 1, 0, taskA)

      setCurrentBoard(_currentBoard)
      setCardLastSwapped(draggedCard)
    }
  }

  useEffect(() => {
    const fetchBoards = async function() {
      const response = await fetch('./data.json');
      const { boards } = await response.json();
      setBoards(boards);
      if(boards.length > length) {
        setCurrentBoard(boards[0])
      }
    }
    fetchBoards();
  }, [])

  return (
    <>
      <section className='page'>
        <Logo />
        <Header currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />
        <Navbar boards={boards} handleBoardClick={handleBoardClick} handleCreateNewBoard={handleCreateNewBoard} />
        <Board handleDragStart={handleDragStart} handleDraggedOver={handleDraggedOver} columns={currentBoard["columns"]} currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} setColumn={setColumn}></Board>
      </section>
    </>
  )
}

export default App

