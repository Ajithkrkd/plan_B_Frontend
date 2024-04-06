import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { MoreVert, Delete, Visibility, CloudDownload, Edit, Add } from "@mui/icons-material";
import { Button } from "@mui/joy";
import { addAttachmentToWorkItem, getAllAttachmentByWorkItem } from "../../Api/attachment";
import toast from 'react-hot-toast'
function AttachmentSection({ workItemId }) {
  // State to manage attachments and their details
  const [attachments, setAttachments] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [addAttachmentOpen, setAddAttachmentOpen] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [attachmentDescription, setAttachmentDescription] = useState("");

  useEffect(() => {
    const getAllAttachmentsForPerticularWorkItem = async (workId) => {
      try {
        console.log(workId);
        const response = await getAllAttachmentByWorkItem(workId);
        console.log(response);
        setAttachments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllAttachmentsForPerticularWorkItem(workItemId);
  }, []);

  // Function to open the menu and set the selected attachment
  const handleAttachmentMenuOpen = (attachment) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedAttachment(attachment);
  };

  // Function to close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAttachment(null);
  };

  // Function to delete an attachment
  const handleDeleteAttachment = (id) => {
    setAttachments(attachments.filter((attachment) => attachment.attachmentId !== id));
    handleMenuClose();
  };

  // Function to open the attachment preview modal
  const handleOpenPreview = (attachment) => () => {
    setSelectedAttachment(attachment);
    setPreviewOpen(true);
    handleMenuClose();
  };

  // Function to close the attachment preview modal
  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  // Function to handle opening the add attachment modal
  const handleOpenAddAttachment = () => {
    setAddAttachmentOpen(true);
  };

  // Function to handle closing the add attachment modal
  const handleCloseAddAttachment = () => {
    setAddAttachmentOpen(false);
    // Reset attachment file and description
    setAttachmentFile(null);
    setAttachmentDescription("");
  };

  // Function to handle attachment file change
  const handleAttachmentFileChange = (event) => {
    setAttachmentFile(event.target.files[0]);
  };

  // Function to handle attachment description change
  const handleAttachmentDescriptionChange = (event) => {
    setAttachmentDescription(event.target.value);
  };

  // Function to handle adding attachment
  const handleAddAttachment = async() => {
    // Perform logic to add attachment (upload file and description)
    console.log("Adding attachment:", attachmentFile, attachmentDescription);
    
    try {
      const formData = new FormData();
      formData.append("file", attachmentFile);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await addAttachmentToWorkItem(
        workItemId,formData,attachmentDescription,config
      );
      toast.success("profile pic updated");

    } catch (error) {
      console.log(error);
    }
    // Clear input fields
    setAttachmentFile(null);
    setAttachmentDescription("");
    // Close modal
    handleCloseAddAttachment();
  };

  return (
    <div>
      {/* Attachment input */}
      <b className="py-3">Attachments</b>
      <div className="flex items-center gap-2 mb-3">
        {/* Add attachment button */}
        <Button variant="outlined" color="neutral" onClick={handleOpenAddAttachment}>
          <Add /> Add Attachment
        </Button>
      </div>
      {/* Attachment list */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Date Attached</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attachments.map((attachment) => (
              <TableRow key={attachment.attachmentId}>
                <TableCell>{attachment.attachmentId}</TableCell>
                <TableCell>{attachment.attachment_name}</TableCell>
                <TableCell>{attachment.attachment_size}</TableCell>
                <TableCell>{new Date(attachment.createdAt).toLocaleString()}</TableCell>
                <TableCell>{attachment.attachment_description}</TableCell>
                <TableCell>
                  <Button onClick={handleAttachmentMenuOpen(attachment)}>
                    <MoreVert />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Attachment operations menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleOpenPreview(selectedAttachment)}>
          <Visibility /> Preview
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <CloudDownload /> Download
        </MenuItem>
        <MenuItem onClick={()=>{}}>
          <Edit /> Edit Description
        </MenuItem>
        <MenuItem onClick={() => handleDeleteAttachment(selectedAttachment.attachmentId)}>
          <Delete /> Delete
        </MenuItem>
      </Menu>

      {/* Attachment preview modal */}
      <Dialog open={previewOpen} onClose={handleClosePreview} maxWidth="lg">
        <DialogTitle>Attachment Preview</DialogTitle>
        <DialogContent>
          {/* Display attachment preview */}
          {selectedAttachment && (
            <img
              src={`http://localhost:8084${selectedAttachment.attachment_url}`}
              alt="Attachment Preview"
              style={{ width: '80%', height: 'auto' }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add attachment modal */}
      <Dialog open={addAttachmentOpen} onClose={handleCloseAddAttachment} maxWidth="sm">
        <DialogTitle>Add Attachment</DialogTitle>
        <DialogContent>
          {/* File input */}
          <input type="file" onChange={handleAttachmentFileChange} />
          <br />
          {/* Description input */}
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={attachmentDescription}
            onChange={handleAttachmentDescriptionChange}
            style={{ marginTop: '16px' }}
          />
          {/* Add button */}
          <Button variant="contained" color="primary" onClick={handleAddAttachment} style={{ marginTop: '16px' }}>
            Add Attachment
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AttachmentSection;
