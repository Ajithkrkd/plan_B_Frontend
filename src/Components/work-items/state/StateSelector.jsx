import React, { useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select as MuiSelect,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  return (
    <FormControl >
     
      <MuiSelect
        labelId="state-select-label"
        id="state-select"
        value={selectedState}
        onChange={handleChange}
        sx={{
          width: isMobile ? '100%' : isTablet ? 300 : 200,
          height: 60
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