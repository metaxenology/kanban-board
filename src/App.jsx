import "./App.css";
import Navbar from "./Components/Navbar";
import Logo from "./Components/Logo";
import Header from "./Components/Header";
import Board from "./Components/Board";
import { useEffect, useState } from "react";

function App() {

  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState("");

  const handleBoardClick = (board) => setCurrentBoard(board);
  const handleCreateNewBoard = (newBoard) => setBoards([...boards, newBoard]);

  const [draggedCard, setDraggedCard] = useState();
  const [cardLastSwapped, setCardLastSwapped] = useState();

  const handleDragStart = (card) => setDraggedCard(card);

  const moveTask = (task, oldColumnName, newColumnName) => {
    let _currentBoard = { ...currentBoard };
    let _oldColumn = _currentBoard.columns.find(
      (col) => col.name === oldColumnName
    );
    let taskIndex = _oldColumn.tasks.findIndex((taskObj) =>
      Object.keys(task).every((key) => taskObj[key] === task[key])
    );
    _oldColumn.tasks.splice(taskIndex, 1);
    let _newColumn = _currentBoard.columns.find(
      (col) => col.name === newColumnName
    );
    task.status = newColumnName;
    _newColumn.tasks.push(task);
    setCurrentBoard(_currentBoard);
  };

  const deleteTask = (taskTitle, columnName) => {
    let _currentBoard = { ...currentBoard };
    let _column = _currentBoard.columns.find((col) => col.name === columnName);
    let taskIndex = _column.tasks.findIndex(
      (taskObj) => taskObj.title === taskTitle
    );
    _column.tasks.splice(taskIndex, 1);
    setCurrentBoard(_currentBoard);
  };

  const handleDraggedOver = (newCard) => {
    let _currentBoard = { ...currentBoard };

    if (cardLastSwapped !== newCard && draggedCard !== newCard) {
      let columnA = _currentBoard?.columns.find((column) =>
        column.tasks.find((task) => task.title === draggedCard)
      );
      let columnB = _currentBoard?.columns.find((column) =>
        column.tasks.find((task) => task.title === newCard)
      );
      let taskA = columnA.tasks?.find((task) => task.title === draggedCard);
      let indexOfTaskA = columnA.tasks?.findIndex(
        (task) => task.title === draggedCard
      );
      let taskB = columnB.tasks?.find((task) => task.title === newCard);
      let indexOfTaskB = columnB.tasks?.findIndex(
        (task) => task.title === newCard
      );

      columnA.tasks.splice(indexOfTaskA, 1);
      columnB.tasks.splice(indexOfTaskB + 1, 0, taskA);

      setCurrentBoard(_currentBoard);
      setCardLastSwapped(draggedCard);
    }
  };

  useEffect(() => {
    const fetchBoards = async function () {
      const response = await fetch("./data.json");
      const { boards } = await response.json();
      setBoards(boards);
      if (boards.length > length) {
        setCurrentBoard(boards[0]);
      }
    };
    fetchBoards();
  }, []);

  return (
    <>
      <section className="page">
        <Logo />
        <Header currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />
        <Navbar
          boards={boards}
          handleBoardClick={handleBoardClick}
          handleCreateNewBoard={handleCreateNewBoard}
        />
        <Board
          handleDragStart={handleDragStart}
          handleDraggedOver={handleDraggedOver}
          columns={currentBoard["columns"]}
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
          moveTask={moveTask}
          deleteTask={deleteTask}
          ></Board>
      </section>
    </>
  );
}

export default App;
