import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { FC } from "react";


type PropsType = {
  errorMessage: string | undefined
}

export const ErrorSnackbar: FC<PropsType> = ({errorMessage}) => {
  const [open, setOpen] = React.useState(!!errorMessage);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>

    </Stack>
  );
};