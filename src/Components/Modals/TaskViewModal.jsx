import Modal from "@mui/material/Modal";
import { Checkbox, MenuItem, Typography } from "@mui/material";
import { ModalBox, MySelect, MyTypography } from "../StyledModalComponents";
import verticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import { useState } from "react";

function DropdownMenu({
  handleClose,
  setIsMenuExpanded,
  deleteTask,
  taskTitle,
  columnName,
}) {
  return (
    <>
      <div className="dropdownMenu">
        <span> Edit task </span>
        <span
          style={{ color: "var(--deleteLabel)" }}
          onClick={(event) => {
            handleClose(event);
            setIsMenuExpanded(false);
            deleteTask(taskTitle, columnName);
          }}>
          {" "}
          Delete task{" "}
        </span>
      </div>
    </>
  );
}
`§`;

function TaskViewModal({
  open,
  handleClose,
  task,
  column,
  currentBoard,
  setCurrentBoard,
  moveTask,
  deleteTask,
}) {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(column.name);

  const toggleTaskCompleted = (event, subtaskIdx) => {
    let _currentBoard = { ...currentBoard };
    let _column = { ...column };
    let _taskIndex = _column.tasks.findIndex((t) => t.title === task.title);
    _column.tasks[_taskIndex].subtasks[subtaskIdx].isCompleted =
      !_column.tasks[_taskIndex].subtasks[subtaskIdx].isCompleted;
    setCurrentBoard(_currentBoard);
  };

  return (
    <div>
      <Modal
        className="modal"
        onClick={() => setIsMenuExpanded(false)}
        open={open}
        onClose={(event) => {
          handleClose(event);
          setIsMenuExpanded(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
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
            {isMenuExpanded && (
              <DropdownMenu
                handleClose={handleClose}
                setIsMenuExpanded={setIsMenuExpanded}
                deleteTask={deleteTask}
                taskTitle={task.title}
                columnName={currentColumn}
              />
            )}
          </div>

          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#828fa3",
              lineHeight: "1.25rem",
              marginBottom: "1rem",
            }}>
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
                <div key={subtask.title}>
                  <MyTypography>
                    {subtask.isCompleted ? (
                      <>
                        <Checkbox
                          size="small"
                          defaultChecked
                          onChange={(event) =>
                            toggleTaskCompleted(event, subtaskIdx)
                          }
                        />
                        <span style={{ textDecoration: "line-through" }}>
                          {subtask.title}
                        </span>
                      </>
                    ) : (
                      <>
                        <Checkbox
                          size="small"
                          onChange={(event) =>
                            toggleTaskCompleted(event, subtaskIdx)
                          }
                        />
                        <span>{subtask.title}</span>
                      </>
                    )}
                  </MyTypography>
                </div>
              );
            })}
            <MyTypography>Status{currentColumn}</MyTypography>
            <MySelect
              onChange={(event) => {
                setCurrentColumn(event.target.value);
                moveTask(task, currentColumn, event.target.value);
              }}
              value={currentColumn}>
              {currentBoard?.columns?.map((col) => (
                <MenuItem
                  value={col.name}
                  key={col.name}
                  sx={{ fontSize: "0.8rem" }}>
                  {col.name}
                </MenuItem>
              ))}
            </MySelect>
          </div>
        </ModalBox>
      </Modal>
    </div>
  );
}

export default TaskViewModal;
