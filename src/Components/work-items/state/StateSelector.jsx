import React, { useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { Circle } from "@mui/icons-material";

const StateSelector = ({ onStateSelector ,initialState}) => {
  const [selectedState, setSelectedState] = useState("");
  const state = {initialState}
  useEffect(() => {
    console.log(state)
    setSelectedState(initialState)
  },[])
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
          width: 150,
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