import React, { useState } from "react";
import {TextField, Typography, Menu, MenuItem } from "@mui/material";
import { MoreVert, Delete, Visibility, CloudDownload, Edit, Add } from "@mui/icons-material";
import { Button } from "@mui/joy";

function AttachmentSection() {
  // State to manage attachments and their details
  const [attachments, setAttachments] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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
    setAttachments(attachments.filter((attachment) => attachment.id !== id));
    handleMenuClose();
  };

  // Function to preview an attachment (replace with your actual logic)
  const handlePreviewAttachment = () => {
    console.log("Previewing attachment:", selectedAttachment);
    handleMenuClose();
  };

  // Function to download an attachment (replace with your actual logic)
  const handleDownloadAttachment = () => {
    console.log("Downloading attachment:", selectedAttachment);
    handleMenuClose();
  };

  // Function to edit the description of an attachment (replace with your actual logic)
  const handleEditDescription = () => {
    console.log("Editing description of attachment:", selectedAttachment);
    handleMenuClose();
  };

  return (
    <div>
      {/* Attachment input */}
      <b className="py-3">Attachments</b>
      <div className="flex items-center gap-2 mb-3">
        {/* Add attachment button */}
        <Button variant="outlined" color="neutral">
         <Add/> Add Attachment
        </Button>
      </div>
      {/* Attachment list */}
      {attachments.map((attachment) => (
        <div key={attachment.id} className="flex items-center gap-3 mb-2">
          {/* Display attachment details */}
          <Typography>{`ID: ${attachment.id}`}</Typography>
          <Typography>{`Name: ${attachment.name}`}</Typography>
          <Typography>{`Size: ${attachment.size}`}</Typography>
          <Typography>{`Date Attached: ${attachment.date}`}</Typography>
          <Typography>{`Description: ${attachment.description}`}</Typography>
          {/* Operations button */}
          <Button onClick={handleAttachmentMenuOpen(attachment)}>
            <MoreVert />
          </Button>
        </div>
      ))}
      {/* Attachment operations menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handlePreviewAttachment}>
          <Visibility /> Preview
        </MenuItem>
        <MenuItem onClick={handleDownloadAttachment}>
          <CloudDownload /> Download
        </MenuItem>
        <MenuItem onClick={handleEditDescription}>
          <Edit /> Edit Description
        </MenuItem>
        <MenuItem onClick={() => handleDeleteAttachment(selectedAttachment.id)}>
          <Delete /> Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AttachmentSection;
