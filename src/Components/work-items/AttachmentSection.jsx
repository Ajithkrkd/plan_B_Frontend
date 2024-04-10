import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  MoreVert,
  Delete,
  Visibility,
  CloudDownload,
  Edit,
  Add,
} from "@mui/icons-material";
import { Button } from "@mui/joy";
import {
  addAttachmentToWorkItem,
  getAllAttachmentByWorkItem,
} from "../../Api/attachment";
import toast from "react-hot-toast";
import { Viewer } from "@react-pdf-viewer/core";
//firebase

import {
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import Loader from "../../common/Loader";

function AttachmentSection({ workItemId }) {
  // State to manage attachments and their details
  const [attachments, setAttachments] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [addAttachmentOpen, setAddAttachmentOpen] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [attachmentDescription, setAttachmentDescription] = useState("");
  const [isloading, setLoading] = useState(false);
  const [attachmentDetailsDTO, setAttachmentDetailsDTO] = useState({
    attachment_name: "",
    attachment_size: "",
    attachment_url: "",
    attachment_description: "",
    attachment_contentType: "",
  });
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
    setAttachments(
      attachments.filter((attachment) => attachment.attachmentId !== id)
    );
    handleMenuClose();
  };

  // Function to open the attachment preview modal

  const handleOpenPreview = (attachment) => (event) => {
    setPreviewOpen(true);
    setAnchorEl(event.currentTarget);
    setSelectedAttachment(attachment); // Set the selected attachment here
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

  const handleAddAttachment = async () => {
    console.log("Adding attachment:", attachmentFile, attachmentDescription);
    if (attachmentFile == null) {
      toast.error("please select a file !!");
      return;
    }
    const storage = getStorage();
    const storageRef = ref(storage, attachmentFile.name);
    console.log(storageRef);
    try {
      await uploadBytes(storageRef, attachmentFile);
      console.log("image uploaded");
      const url = await getDownloadURL(storageRef);
      console.log(url);

      const metadata = await getMetadata(storageRef).then((metadata) => {
        const { name, bucket, timeCreated, size, contentType } = metadata;

        setAttachmentDetailsDTO({
          attachment_url: url,
          attachment_name: name,
          attachment_size: size,
          attachment_description: attachmentDescription,
          attachment_contentType: contentType,
        });
      });

      await uploadFileDetailsToBackend(attachmentDetailsDTO);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFileDetailsToBackend = async (attachmentDetailsDTO) => {
    if (
      attachmentDetailsDTO.attachment_url == null ||
      attachmentDetailsDTO.attachment_description == null
    ) {
      toast.error("upload failed ");
      return;
    }
    try {
      setLoading(true);
      const response = await addAttachmentToWorkItem(
        workItemId,
        attachmentDetailsDTO
      );
      console.log(response);
      setLoading(false);
      setAddAttachmentOpen(false);
      toast.success("attachment uploaded");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setAddAttachmentOpen(false);
      console.log(error);
    }
  };

  return (
    <>
      {isloading && isloading ? (
        <>
          <Loader />
        </>
      ) : (
        <div>
          {/* Attachment input */}
          <b className="py-3">Attachments</b>
          <div className="flex items-center gap-2 mb-3">
            {/* Add attachment button */}
            <Button
              variant="outlined"
              color="neutral"
              onClick={handleOpenAddAttachment}
            >
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
                    <TableCell>
                      {Math.round(attachment.attachment_size / 1000) + "K"}
                    </TableCell>
                    <TableCell>
                      {new Date(attachment.createdAt).toLocaleString()}
                    </TableCell>
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
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleOpenPreview(selectedAttachment)}>
              <Visibility /> Preview
            </MenuItem>
            <MenuItem onClick={() => {}}>
              <CloudDownload /> Download
            </MenuItem>
            <MenuItem onClick={() => {}}>
              <Edit /> Edit Description
            </MenuItem>
            <MenuItem
              onClick={() => handleDeleteAttachment(selectedAttachment)}
            >
              <Delete /> Delete
            </MenuItem>
          </Menu>

          <Dialog
            open={previewOpen}
            onClose={handleClosePreview}
            style={{padding: "20px"}}
             // Add fullScreen prop here
          >
            <DialogTitle>Attachment Preview</DialogTitle>
            <DialogContent>
              <div>
                {selectedAttachment && selectedAttachment.attachment_url && (
                  <embed
                    type={selectedAttachment.attachment_contentType}
                    src={selectedAttachment.attachment_url}
                    alt="Attachment Preview"
                    style={{ width: "100vh", height: "100vh", }} // Set height to 100vh for full screen
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Add attachment modal */}
          <Dialog
            open={addAttachmentOpen}
            onClose={handleCloseAddAttachment}
            maxWidth="sm"
          >
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
                style={{ marginTop: "16px" }}
              />
              {/* Add button */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddAttachment}
                style={{ marginTop: "16px" }}
              >
                Add Attachment
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default AttachmentSection;
