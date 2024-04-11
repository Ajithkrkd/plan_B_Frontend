import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';

import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import WorkItemCategorySelector from './category/WorkItemCategorySelctor';
import toast from 'react-hot-toast';
import { createWorkItem } from '../../Api/workItem';

export default function CreateWorkItemModal({projectId}) {
    const [workItemCategory,setWorkItemCategory]=React.useState('')
    const [title,setTitle] = React.useState('')
    const handleCategorySelect = (category) => {
        console.log(category)
        if(category ==''){
          toast.error("please select again")
        }
        else
        toast.success("you have selected " +category + " work Item")
        setWorkItemCategory(category);
      };
    
  const handleTitleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = async()=>{
    if(workItemCategory == null || workItemCategory == ''){
      toast.error('please select Work Item Category')
      return;
    }
    else if(title.trim() == ''){
      toast.error("Work Item title cannot be Empty !!")
      return;
    }
    console.log(workItemCategory,projectId,title);
    
    try {
      const response = await createWorkItem(title,workItemCategory,projectId);
      console.log(response);
      setOpen(false)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }


console.log(projectId)
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        New WorkItem
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new WorkItem</DialogTitle>
      
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
            
                <FormLabel>Name</FormLabel>
                <Input
                placeholder="Enter Title"
                value={title}
                onChange={handleTitleInputChange} 
                />
                
              <WorkItemCategorySelector onCategorySelect={handleCategorySelect}  />
              <Button onClick={handleSave}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}