import React ,{useState} from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import customAxios from '../../store/customAxios';
import toast from 'react-hot-toast';
import { USER_FORGOTTEN_PASSWORD } from './userUtils';

export default function BasicModalDialog() {

const [open, setOpen] = useState(false);
const [userEmail , setUserEmail ] = useState('');


const handleInputChange =(event)=>{
    setUserEmail(event.target.value);
}

const handleSubmition = async(event)=>{
    event.preventDefault();
    
    if(!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)){
        console.log(userEmail ,"not valid");
        toast.error('not valid');
        return;
    }

    try {
            
        const response = await customAxios.post(USER_FORGOTTEN_PASSWORD+"/"+userEmail);
        console.log(response.data);
        toast.success('success');
        setOpen(false);

    } catch (error) {
        console.log(error)
    }

}
  
  
  return (
    <React.Fragment>
      <p
        marginTop={1.5}
        style={{ color: 'blue' }}
        onClick={() => setOpen(true)}
        className='text-end'
      >
        forgotten password ?
      </p>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Request for Change Password ?</DialogTitle>
          <DialogContent>Enter Your Registered email</DialogContent>
          
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                onChange={handleInputChange}
                type='email'
                value={userEmail}
                autoFocus required />
              </FormControl>
              <Button

                onClick={handleSubmition}

              >Submit</Button>
            </Stack>
          
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
