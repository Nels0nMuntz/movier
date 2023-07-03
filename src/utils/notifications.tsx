import IconButton from "@mui/material/IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { enqueueSnackbar, closeSnackbar } from "notistack";

interface Args {
  message: string;
  variant?: "default" | "error" | "success" | "warning" | "info",
}

export  const addNotification = ({ message, variant }: Args) => {
  enqueueSnackbar({
    variant,
    message,
    action: (key) => (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => closeSnackbar(key)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    )
  })
}