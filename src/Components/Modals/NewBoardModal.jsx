import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  ModalFormControl,
  ModalTextField,
  ModalBox,
  MyButton,
  MyTypography,
} from "../StyledModalComponents";
import crossIcon from "../../assets/icon-cross.svg";

import { useState, useRef } from "react";

function NewBoardModal({ open, handleClose, handleCreateNewBoard }) {
  const newColumnRef = useRef();
  const newBoardNameRef = useRef();
  const [newBoardColumns, setNewBoardColumns] = useState([]);

  const createNewColumn = (event) => {
    if (newColumnRef.current.value) {
      setNewBoardColumns([
        ...newBoardColumns,
        {
          name: newColumnRef.current.value,
          id: newBoardColumns.length + 1,
          tasks: [],
        },
      ]);
    }
    newColumnRef.current.value = "";
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
          <Typography sx={{ marginBottom: "1rem" }}>Add New Board</Typography>
          <ModalFormControl>
            <MyTypography>Name</MyTypography>
            <ModalTextField inputRef={newBoardNameRef} autoFocus={true} />
            <MyTypography>Columns</MyTypography>
            {newBoardColumns.map((newBoardColumn) => {
              return (
                <div key={newBoardColumn.id} className="columnEntry">
                  <ModalTextField value={newBoardColumn.name}></ModalTextField>
                  <div>
                    <img
                      onClick={() =>
                        setNewBoardColumns(
                          newBoardColumns.filter(
                            (board) => board.id !== newBoardColumn.id
                          )
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
              inputRef={newColumnRef}
              name="newColumnName"></ModalTextField>
            <MyButton onClick={createNewColumn}>+Add New Column</MyButton>
            <MyButton
              type="submit"
              onClick={() => {
                if (!newBoardNameRef.current.value) return;

                let newBoardObj = {
                  name: newBoardNameRef.current.value,
                  active: false,
                  columns: newBoardColumns,
                };
                handleCreateNewBoard(newBoardObj);
                handleClose();
                setNewBoardColumns([]);
              }}>
              Create New Board
            </MyButton>
          </ModalFormControl>
        </ModalBox>
      </Modal>
    </div>
  );
}

export default NewBoardModal;
