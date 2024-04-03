import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Circle, PointOfSaleRounded } from '@mui/icons-material';

export default function StateSelector({onStateSelector}) {
  const handleChange = (event, newValue) => {
    onStateSelector(newValue)
  };

  return (
    <Select
      placeholder="Select State"
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 240,
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
      onChange={handleChange}
    >
      <Option value="TODO"><Circle color='error'/> To Do</Option>
      <Option value="DOING"><Circle color='warning'/>Doing</Option>
      <Option value="DONE"><Circle color='success'/>Done</Option>
    </Select>
  );
}