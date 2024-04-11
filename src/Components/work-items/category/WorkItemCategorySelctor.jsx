import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { CropTwoTone, SyncProblem, Task } from '@mui/icons-material';

export default function WorkItemCategorySelector({onCategorySelect}) {

  const handleChange = (event, newValue) => {
    onCategorySelect(newValue)
  };

  return (
    <Select
      placeholder="Select Category"
      indicator={<KeyboardArrowDown />}
      name='WorkItemCategory'
      defaultValue={""} // Set the initial value to an empty string
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
      <Option value="EPIC"><CropTwoTone color='error'/> Epic</Option>
      <Option value="ISSUE"><SyncProblem color='warning'/>Issue</Option>
      <Option value="TASK"><Task color='success'/>Task</Option>
    </Select>
  );
}
