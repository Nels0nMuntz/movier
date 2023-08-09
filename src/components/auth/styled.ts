import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";


export const Form = styled("form")({
  width: "100%",
});

export const Input = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiFormLabel-root.MuiInputLabel-root": {
    color: theme.palette.success.main,
    "&.Mui-focused": {
      color: theme.palette.success.main,
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.success.main
  },
  "& .MuiInputBase-root": {
    color: theme.palette.common.white,
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.success.dark,
      "& legend": {
        color: theme.palette.success.dark,
      }
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.success.dark,
      "& legend": {
        color: theme.palette.success.dark,
      },
    },
  },
  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
    fill: theme.palette.text.primary,
  }
}));