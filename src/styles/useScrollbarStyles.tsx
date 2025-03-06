import { Theme } from "@mui/material/styles";

const useScrollbarStyles = (theme: Theme) => ({
  scrollbarWidth: "thin",
  scrollbarColor: `${theme.palette.text.secondary} transparent`,
  "&::-webkit-scrollbar": {
    height: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.background.paper : "#999",
    borderRadius: "10px",
    transition: "background 0.3s ease-in-out",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-button": {
    display: "none",
  },
});

export { useScrollbarStyles };
