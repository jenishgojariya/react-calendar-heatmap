import React, { FC } from "react";
import { Box, useTheme } from "@mui/material";
import { useScrollbarStyles } from "../styles";
import { HorizontalScrollbarProps } from "./interface";

const HorizontalScrollbar: FC<HorizontalScrollbarProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 2,
        p: 2,
        minHeight: "100px",
        scrollBehavior: "smooth",
        ...useScrollbarStyles(theme),
      }}
    >
      {children}
    </Box>
  );
};

export default HorizontalScrollbar;
