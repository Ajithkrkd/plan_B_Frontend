import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
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
  AttachFile,
  MoreVertOutlined,
  LogoDev,
} from "@mui/icons-material";
import { Button } from "@mui/joy";
import {
  addAttachmentToWorkItem,
  getAllAttachmentByWorkItem,
  updateDescrition,
} from "../../../Api/attachment";
import toast from "react-hot-toast";

//fire base
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import Loader from "../../../common/Loader";

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
  const [showMessage, setShowMessage] = useState(false);
  const [descriptionEditing,setDescriptionEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState()
  const [editingAttachmentId,setEditingAttachmetId] = useState(null);
  const descriptionEditingRef = useRef(null);
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
    let inputValue = event.target.value;
    if (inputValue.length > 50) {
      inputValue = inputValue.slice(0, 50);
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
    setAttachmentDescription(inputValue);
  };

  const handleAddAttachment = async () => {
    console.log("Adding attachment:", attachmentFile, attachmentDescription);
    if (attachmentFile == null) {
      toast.error("Please select a file!!");
      return;
    }
    setLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, attachmentFile.name);

    try {
      await uploadBytes(storageRef, attachmentFile);
      console.log("Image uploaded");
      const url = await getDownloadURL(storageRef);
      console.log("URL:", url);
      const metadata = await getMetadata(storageRef);
      console.log("Metadata:", metadata);
      const { name, size, contentType } = metadata;

      // Update attachmentDetailsDTO with metadata
      const updatedAttachmentDetailsDTO = {
        attachment_url: url,
        attachment_name: name,
        attachment_size: size,
        attachment_description: attachmentDescription,
        attachment_contentType: contentType,
      };

      // Pass updatedAttachmentDetailsDTO to uploadFileDetailsToBackend
     const response = await uploadFileDetailsToBackend(updatedAttachmentDetailsDTO);
    } catch (error) {
      console.log("Error:", error);
    }finally{
      setLoading(false);
    }
  };

  const uploadFileDetailsToBackend = async (attachmentDetailsDTO) => {
    if (
      attachmentDetailsDTO.attachment_url == "" ||
      attachmentDetailsDTO.attachment_description == ""
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

 const handleDescriptionEditing = (selectedAttachment)=>{
  setEditingAttachmetId(selectedAttachment.attachmentId);
  setEditedDescription(selectedAttachment.attachment_description);
  setDescriptionEditing(true);
 }


 useEffect(() => {
  if (descriptionEditingRef.current) {
    descriptionEditingRef.current.focus();
  }
},[descriptionEditing])

  const saveEditedDescription = async (attachment)  =>{
    
    if(editedDescription.trim() == '' || attachment.attachmentId == "") {
      console.log("Error while saving missing ",attachment.attachmentId);
      return;
    }
    try {
      
      setLoading(true);
      const response = await updateDescrition(attachment.attachmentId,editedDescription);
      console.log(response);
      toast.success(response.data.message);
      setAttachments((prevAttachments) =>
      prevAttachments.map((att) =>
        att.attachmentId === attachment.attachmentId
          ? { ...att, attachment_description: editedDescription }
          : att
      )
    );
      
      
      setLoading(false);
      setDescriptionEditing(false);
    } catch (error) {
      setLoading(false)
      console.log(error.response.data.message);
    }
  }

  const cancelEdit = () =>{
    setDescriptionEditing(false);
  }

  return (
    <>
    
        <div className="">
       {isloading &&  <Loader/>}
          <Button
            variant="outlined"
            color="primary"
            style={{ float: "align-end", width: "18%", marginBottom: "10px" }}
            onClick={handleOpenAddAttachment}
          >
            <Add /> Add Attachment
          </Button>
          <div
            className="flex items-center gap-2 mb-3"
            style={{
              height: "300px",
              overflowY: "scroll",
              padding: "10px",
              border: "1px solid black",
            }}
          >
            {attachments.length === 0 ? (
              <p
                className="font-semibold italic"
                style={{ textAlign: "start" }}
              >
                No Attachments <AttachFile />
              </p>
            ) : (
              <TableContainer style={{border:'1px solid black'}}>
                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontWeight:600,border:'1px solid black' ,padding:5}}>ID</TableCell>
                      <TableCell style={{fontWeight:600,border:'1px solid black' ,padding:5}}>Name</TableCell>
                      <TableCell style={{fontWeight:600,border:'1px solid black' ,padding:5}}>Size</TableCell>
                      <TableCell style={{fontWeight:600,border:'1px solid black' ,padding:5}}>Date Attached</TableCell>
                      <TableCell style={{fontWeight:600,border:'1px solid black' ,padding:5}}>Description</TableCell>
                      <TableCell style={{fontWeight:600,border:'1px solid black' ,padding:5}}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attachments.map((attachment) => (
                      <TableRow key={attachment.attachmentId}>
                        <TableCell style={{border:'1px solid black' ,padding:5}}>{attachment.attachmentId}</TableCell>
                        <TableCell style={{border:'1px solid black' ,padding:5}}>{attachment.attachment_name}</TableCell>
                        <TableCell style={{border:'1px solid black' ,padding:5}}>
                          {Math.round(attachment.attachment_size / 1000) + "K"}
                        </TableCell>
                        <TableCell style={{border:'1px solid black' ,padding:5}}>
                          {new Date(attachment.createdAt).toLocaleString()}
                        </TableCell>

                        {descriptionEditing && editingAttachmentId === attachment.attachmentId ? (
                          <>
                            <div className="">
                              <Input
                                style={{ margin:10, width:'250px'}}
                                inputRef={descriptionEditingRef}
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                              />
                              <Button
                                variant="soft"
                                color="success"
                                className="py-2 mt-2"
                                onClick={()=>{saveEditedDescription(attachment)}}
                              >
                                Save
                              </Button>
                              <Button
                                variant="soft"
                                color="danger"
                                className="py-2 mt-2"
                                onClick={cancelEdit}
                              >
                                Cancel
                              </Button>
                            </div>
                          </>
                        ) : (
                          <TableCell style={{border:'1px solid black' ,padding:5}}>
                            {attachment.attachment_description}
                          </TableCell>
                        )}

                        <TableCell style={{border:'1px solid black' ,padding:5}}>
                          <MoreVertOutlined
                            onClick={handleAttachmentMenuOpen(attachment)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Attachment operations menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleOpenPreview(selectedAttachment)}>
                <Visibility /> Preview
              </MenuItem>

              <MenuItem  onClick={()=>handleDescriptionEditing(selectedAttachment)}>
                <Edit
                />{" "}
                Edit Description
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
              style={{ padding: "20px" }}
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
                      style={{ width: "100vh", height: "100vh" }} // Set height to 100vh for full screen
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
                <input
                  className="form-control"
                  type="file"
                  onChange={handleAttachmentFileChange}
                />

                <label className="pt-3 text-gray font-semibold italic">
                  write a descripion about the attachment
                </label>

                <TextField
                  error={showMessage}
                  helperText={showMessage && "Only 50 characters allowed"}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={attachmentDescription}
                  onChange={handleAttachmentDescriptionChange}
                  style={{ marginTop: "16px" }}
                />
                <Button
                  variant="soft"
                  color="primary"
                  onClick={handleAddAttachment}
                  style={{ marginTop: "16px", float: "right" }}
                >
                  Add Attachment
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
    
    </>
  );

}
export default AttachmentSection;
