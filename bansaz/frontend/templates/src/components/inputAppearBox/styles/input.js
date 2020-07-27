const input_styling = () => ({
  root: {
    "& .MuiFormLabel-root": { color: "#c6c3c3" },
    "& .MuiInputBase-root": {
      background: "#151515",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "0",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#888282",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "& .MuiInputBase-input": {
      fontSize: "0.9em",
      color: "#c1b9b9",
    },
    "& .MuiFormHelperText-root": {
      color: "#c1b9b9",
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: "#f44336",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#f44336",
    },
  },
})

export default input_styling
