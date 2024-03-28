import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Alert, Button, TextField } from "@mui/material";
import { CheckCircleOutlined } from "@mui/icons-material";
import Loader from "../../../common/Loader";
import { sentInvitaionForMember } from "../../../Api/project";
import toast from "react-hot-toast";





export default function InviteMemberModal({ projectId, onOpen }) {

  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const validate = (formData) => {
    const errors = {};
    if (formData.email.trim() === "") {
      errors.email = "email must not be empty ";
    }
    if (formData.message.trim() === "") {
      errors.message = "message must not be empty";
    }
    return errors;
  };

  const handleValidation = (formData) => {
    const errors = validate(formData);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmition = async (e) => {
    e.preventDefault();
    if (!handleValidation(formData)) {
      toast.error("please enter valid data");
      console.log(errors);
      return;
    }
    try {
      console.log(formData);
      setIsLoading(false);
      
      const response = await sentInvitaionForMember(projectId,formData)
      console.log(response.data , 'from invite');
      setIsLoading(false);

      console.log(response.data);
      
      toast.success("Invitation sent successfully");
      setOpen(false)
      
    } catch (error) {
      toast.error(error.response)
      console.log(error);
    }
  };




  return (
    <React.Fragment>
  
    <Button variant="contained" onClick={() => setOpen(true)}>
        + members
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "end", alignItems: "top" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h3"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Send Invitation
          </Typography>
          <div>
            <TextField
              label="email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="text"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="message"
              variant="outlined"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              margin="normal"
              maxRows={5}
              multiline
              type="text"     
              error={!!errors.message}
              helperText={errors.message}
            />
            <Button variant="contained" onClick={handleSubmition}>
              invite
            </Button>
          </div>
          <Alert icon={<CheckCircleOutlined fontSize="inherit" />}
          className="my-3" 
          severity="success">
            Email will sent to the member
          </Alert>
          <Alert icon={<CheckCircleOutlined fontSize="inherit" />}
          className="my-3" 
          severity="success">
            If he joined or declined you will receive the notification
          </Alert>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
