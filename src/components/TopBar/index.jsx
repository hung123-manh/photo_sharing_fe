import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

const CustomUncheckedIcon = () => (
  <Box
    sx={{
      width: 24,
      height: 24,
      border: "2px solid white",
      borderRadius: "4px",
    }}
  />
);

const CustomCheckedIcon = () => (
  <Box
    sx={{
      width: 24,
      height: 24,
      border: "2px solid white",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: "bold",
      color: "white",
      lineHeight: 1,
    }}
  >
    X
  </Box>
);

function TopBar({ advancedFeatures, setAdvancedFeatures }) {
  const handleCheckboxChange = (event) => {
    setAdvancedFeatures(event.target.checked);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          Lê Ngọc Mạnh Hùng
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={advancedFeatures}
              onChange={handleCheckboxChange}
              icon={<CustomUncheckedIcon />}
              checkedIcon={<CustomCheckedIcon />}
            />
          }
          label="Enable Advanced Features"
          labelPlacement="start"
          sx={{ color: "white" }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
