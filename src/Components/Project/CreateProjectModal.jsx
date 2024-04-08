import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Alert, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { CheckCircleOutlined } from "@mui/icons-material";
import { createProject } from "../../Api/project";
import Loader from "../../common/Loader";





export default function CreateProjectModal() {




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
      setIsLoading(true);
      const response = await createProject(formData);
      setIsLoading(false);
      window.location.reload();
      console.log(response.data);
      
      toast.success("Created project successfully");
      setOpen(false)
      
    } catch (error) {
      setIsLoading(false);

      toast.error(error.response)
      console.log(error);
    }
  };




  return (
    <>
{
  isLoading ?

  <Loader/>

  :

<>

    <button className="button --shine" onClick={() => setOpen(true)}>
        + New Project
      </button>
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
            Create Your Project
          </Typography>
          <div>
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="text"
              required
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label="description"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              maxRows={5}
              multiline
              type="text"
              required
              error={!!errors.description}
              helperText={errors.description}
            />
            <button className="button --shine" onClick={handleSubmition}>
              create
            </button>
          </div>
          <Alert icon={<CheckCircleOutlined fontSize="inherit" />}
          className="my-3" 
          severity="success">
            You are the project administrator
          </Alert>
          <Alert icon={<CheckCircleOutlined fontSize="inherit" />}
          className="my-3" 
          severity="success">
            Initially the project is assigned to you
          </Alert>
          <Alert icon={<CheckCircleOutlined fontSize="inherit" />}
          className="my-3" 
          severity="success">
            Initially a board is created for you
          </Alert>
        </Sheet>
      </Modal>
      </>
}
    </>
  );
}
