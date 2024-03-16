import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Alert, Button, TextField } from "@mui/material";
import { CheckCircleOutlined } from "@mui/icons-material";
import Loader from "../../../common/Loader";





export default function InviteMemberModal() {




  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const validate = (formData) => {
    const errors = {};
    if (formData.title.trim() === "") {
      errors.title = "Title must not be empty ";
    }
    if (formData.description.trim() === "") {
      errors.description = "Description must not be empty";
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
      setIsLoading(false);

      setIsLoading(false);

      console.log(response.data);
      
      toast.success("Created project successfully");
      setOpen(false)
      
    } catch (error) {
      toast.error(error.response.data.message)
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
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="text"
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label="message"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              maxRows={5}
              multiline
              type="text"     
              error={!!errors.description}
              helperText={errors.description}
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
