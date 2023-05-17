import Box from "@mui/material/Box";
import {
  FormControl,
  TextField,
  Button,
  Select,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

export const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  width: 500px;
  max-height: 900px;
  background-color: var(--charadeLighter);
`;

export const ModalFormControl = styled(FormControl)({
  input: {
    "&::placeholder": {
      color: "grey",
    },
    padding: "10px",
    fontSize: "0.8rem",
    color: "white",
  },
  textarea: {
    "&::placeholder": {
      color: "grey",
    },
    fontSize: "0.8rem",
    color: "white",
  },
  width: "100%",
});

export const MySelect = styled(Select)({
  color: "white",
  fontSize: "0.8rem",
  marginBottom: "1.5rem",
});

export const ModalTextField = styled(TextField)({
  marginBottom: "1.5rem",
});

export const MyButton = styled(Button)({
  color: "white",
  backgroundColor: "#A8A4FF",
  borderRadius: "1rem",
  marginBottom: "1rem",
  fontSize: "0.8rem",
});

export const MyTypography = styled(Typography)({
  fontSize: "0.8rem",
  marginBottom: "5px",
});
