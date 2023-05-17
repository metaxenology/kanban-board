import Modal from "@mui/material/Modal";
import { Checkbox, Typography } from "@mui/material";
import {
  ModalFormControl,
  ModalTextField,
  ModalBox,
  MyButton,
  MySelect,
  MyTypography,
} from "./StyledModalComponents";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import { useState } from "react";

function DropdownMenu() {
  return (
    <>
      <div className="dropdownMenu">
        <span> Edit task </span>
        <span style={{ color: "var(--deleteLabel)" }}> Delete task </span>
      </div>
    </>
  );
}

function TaskViewModal({ open, handleClose, task, column, setColumn }) {

  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const toggleTaskCompleted = (subtaskIdx) => {
    let _taskIndex = column.tasks.findIndex(t => t.title === task.title)
    let _column = {...column}
    _column.tasks[_taskIndex].subtasks[subtaskIdx].isCompleted = ! _column.tasks[_taskIndex].subtasks[subtaskIdx].isCompleted;
    setColumn(_column)
  }
  
  return (
    <div>
      <Modal
        className="modal"
        onClick={() => setIsMenuExpanded(false)}
        open={open}
        onClose={(event) => {
          handleClose(event)
          setIsMenuExpanded(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <div className="columnEntry">
            <Typography sx={{ marginBottom: "1rem" }}>{task.title}</Typography>
            <img
              src={verticalEllipsis}
              className="icon"
              alt="verticalEllipsis"
              onClick={(event) => {
                event.stopPropagation();
                setIsMenuExpanded(true);
              }}
            />
            {isMenuExpanded && <DropdownMenu />}
          </div>

          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#828fa3",
              lineHeight: "1.25rem",
              marginBottom: "1rem",
            }}
          >
            {task.description || "No Description"}
          </Typography>

          <MyTypography>
            Subtasks (
            {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
            {task.subtasks.length})
          </MyTypography>
          <div className="subtasksContainer">
            {task.subtasks.map((subtask, subtaskIdx) => {
              return (
                <div>
                  <MyTypography>
                    {subtask.isCompleted ? (
                      <>
                        <Checkbox size="small" defaultChecked onChange={() => toggleTaskCompleted(subtaskIdx)} />
                        <span style={{ textDecoration: "line-through" }}>
                          {subtask.title}
                        </span>
                      </>
                    ) : (
                      <>
                        <Checkbox size="small" onChange={() => toggleTaskCompleted(subtaskIdx)} />
                        <span>{subtask.title}</span>
                      </>
                    )}
                  </MyTypography>
                </div>
              );
            })}
          </div>
        </ModalBox>
      </Modal>
    </div>
  );
}

export default TaskViewModal;
