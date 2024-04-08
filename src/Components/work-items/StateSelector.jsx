import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { Circle } from "@mui/icons-material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const StateSelector = ({ onStateSelector ,initialState}) => {
  const [selectedState, setSelectedState] = useState(initialState);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedState(newValue);
    onStateSelector(newValue);
    console.log("showing");
  };

  return (
    <FormControl >
     
      <MuiSelect
        labelId="state-select-label"
        id="state-select"
        value={selectedState}
        onChange={handleChange}
        sx={{
          width: 240,
          transform: selectedState ? "rotate(0deg)" : "rotate(0deg)",
          transition: "0.2s",
        }}
        
      >
        <MenuItem value="TODO">
          <Circle color="error" />
          To Do
        </MenuItem>
        <MenuItem value="DOING">
          <Circle color="warning" />
          Doing
        </MenuItem>
        <MenuItem value="DONE">
          <Circle color="success" />
          Done
        </MenuItem>
      </MuiSelect>
    </FormControl>
  );
};

export default StateSelector;
