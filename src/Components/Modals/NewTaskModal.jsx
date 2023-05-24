import Modal from "@mui/material/Modal";
import { MenuItem, Typography } from "@mui/material";
import {
  ModalFormControl,
  ModalTextField,
  ModalBox,
  MyButton,
  MySelect,
  MyTypography,
} from "../StyledModalComponents";

import { useState, useRef, useEffect } from "react";
import crossIcon from "../../assets/icon-cross.svg";

function NewTaskModal({ currentBoard, setCurrentBoard, open, handleClose }) {
  const newTaskNameRef = useRef();
  const newTaskDescRef = useRef();
  const newSubtaskNameRef = useRef();
  const [subtasks, setSubtasks] = useState([]);
  const [currentColumn, setCurrentColumn] = useState("");

  useEffect(() => {
    if (currentBoard?.columns) {
      setCurrentColumn(currentBoard?.columns?.[0].name);
    }
  }, [currentBoard]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        alert("ESC key was pressed");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const createNewSubtask = (event) => {
    if (newSubtaskNameRef.current.value)
      setSubtasks([
        ...subtasks,
        {
          title: newSubtaskNameRef.current.value,
          isCompleted: false,
          id: subtasks.length + 1,
        },
      ]);

    newSubtaskNameRef.current.value = "";
  };

  return (
    <div>
      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalBox>
          <Typography sx={{ marginBottom: "1rem" }}>Add New Task</Typography>

          <ModalFormControl>
            <MyTypography>Task Name</MyTypography>
            <ModalTextField
              placeholder="e.g. Take coffee break"
              inputRef={newTaskNameRef}
              autoFocus={true}
            />

            <MyTypography>Description</MyTypography>
            <ModalTextField
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
              multiline
              rows={3}
              maxRows={10}
              inputRef={newTaskDescRef}
              autoFocus={true}
            />

            <MyTypography>Subtasks</MyTypography>
            {subtasks.map((subtask) => {
              return (
                <div key={subtask.id} className="columnEntry">
                  <ModalTextField value={subtask.title}></ModalTextField>
                  <div>
                    <img
                      onClick={() =>
                        setSubtasks(
                          subtasks.filter((stask) => stask.id !== subtask.id)
                        )
                      }
                      className="icon"
                      src={crossIcon}
                      alt="deleteColumnIcon"
                    />
                  </div>
                </div>
              );
            })}

            <ModalTextField
              placeholder="e.g. Decide on a coffee type"
              inputRef={newSubtaskNameRef}
              name="newColumnName"></ModalTextField>
            <MyButton onClick={createNewSubtask}>+Add New Subtask</MyButton>

            <MyTypography>Current Status</MyTypography>
            <MySelect
              onChange={(event) => setCurrentColumn(event.target.value)}
              value={currentColumn}>
              {currentBoard?.columns?.map((col) => (
                <MenuItem
                  key={col.name}
                  sx={{ fontSize: "0.8rem" }}
                  value={col.name}>
                  {col.name}
                </MenuItem>
              ))}
            </MySelect>

            <MyButton
              type="submit"
              onClick={() => {
                let newTask = {
                  title: newTaskNameRef.current.value,
                  description: newTaskDescRef.current.value,
                  status: currentColumn,
                  subtasks: subtasks.map(({ id, ...rest }) => rest),
                };
                let _currentBoard = { ...currentBoard };
                let _column = _currentBoard.columns.find(
                  (col) => col.name === currentColumn
                );
                _column.tasks.push(newTask);
                setCurrentBoard(_currentBoard);
                setSubtasks([]);
                handleClose();
              }}>
              Create Task
            </MyButton>
          </ModalFormControl>
        </ModalBox>
      </Modal>
    </div>
  );
}

export default NewTaskModal;
