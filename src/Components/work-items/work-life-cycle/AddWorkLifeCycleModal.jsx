import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkLifeCycle,
  getWorkLifeCycleErrors,
  getWorkLifeCycleStatus,
} from "../slices/workLifeCycle/workLifeCycleSlice";

export default function AddWorkLifeCycleModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showTitleError,SetShowTitleError] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });
  const [dateError, setDateErrors] = useState(null);

  const dispatch = useDispatch();
  const workLifeCycleStatus = useSelector(getWorkLifeCycleStatus);
  const workLifeCycleError = useSelector(getWorkLifeCycleErrors);


  const handleTitleChange = (e) => {
    let inputValue = e.target.value;
    if (inputValue.trim() === "") {
        SetShowTitleError(true);
    } else {
        SetShowTitleError(false);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (e) => {
    let inputValue = e.target.value;
    if (inputValue.trim() == "") {
      setShowError(true);
    }
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEndDateChange = (e) => {
    let inputValue = e.target.value;
    if (inputValue.trim() == "") {
      setShowError(true);
    }
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmition = async () => {
    console.log(formData);
    if (
      (formData && formData.startDate === "") ||
      (formData && formData.endDate === "")
    ) {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }
    if(formData && formData.title === ""){
        SetShowTitleError(true);
    }else{
        SetShowTitleError(false)
    }

    const today = new Date(); 
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    if (startDate < today) {
        setShowError(true);
        console.log(" ajith is here")
        setDateErrors( "Start date cannot be before today" ); 
        return;
      }
    if (startDate >= endDate) {
      setShowError(true);
      console.log(startDate)
      setDateErrors( "Start date must be before end date");
      return;
    }


    console.log(dateError)
    try {
      const response  = dispatch(addWorkLifeCycle(formData));
      console.log(response);

    } catch (error) {
      console.log(error);
    }

    console.log(" printing");
  };


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Button variant="contained" onClick={() => setOpen(true)}>
            + create a cycle
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
                Create Your Working Life Cycle
              </Typography>
              <div>
                <TextField
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  fullWidth
                  margin="normal"
                  type="text"
                  required
                  error={showTitleError}
                  helperText={showTitleError && "title must not be empty"}
                />
                <div className="flex py-3 gap-5">
                  <input
                    type="date"
                    name="startDate"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "0",
                      outline: "none",
                      padding: "10px",
                      paddingRight: "25px",
                      paddingLeft: "25px",
                    }}
                    value={formData.startDate}
                    onChange={handleStartDateChange}
                  />
                  <input
                    error={dateError && dateError}
                    type="date"
                    name="endDate"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "0",
                      outline: "none",
                      padding: "10px",
                      paddingRight: "25px",
                      paddingLeft: "25px",
                    }}
                    value={formData.endDate}
                    onChange={handleEndDateChange}
                  />
                </div>
                <p className="text-small " style={{color:'#D32F2F' ,fontSize:"13px" ,paddingBottom:"10px"}}>{showError && dateError}</p>

                <Button
                  style={{
                    float: "right",
                    paddingLeft: 100,
                    paddingRight: 100,
                  }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmition}
                >
                  create
                </Button>
              </div>
            </Sheet>
          </Modal>
        </>
      )}
    </>
  );
}
