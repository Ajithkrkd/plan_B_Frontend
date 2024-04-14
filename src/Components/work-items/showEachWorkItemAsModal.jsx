import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CreateWorkItem from "./SingleWorkItem";

const ShowEachWorkItemAsModal = ({ isOpen, onClose, creationDetials }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="lg">
      {/* Set fullWidth and maxWidth="lg" for a full-screen modal */}
      <DialogTitle>Work Item</DialogTitle>
      <DialogContent>
        <CreateWorkItem creationDetials={creationDetials} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
      
    </Dialog>
  );
}

export default ShowEachWorkItemAsModal;
