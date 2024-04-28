import {
  Menu,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Button, Input } from "@mui/joy";
import React, { useEffect, useState } from "react";
import {
  createChildWorkItem,
  getAllChildWorkItemsByParentWorkItemId,
} from "../../../Api/workItem";
import { Add, CropTwoTone, SyncProblem, Task } from "@mui/icons-material";
import ShowEachWorkItemAsModal from "../showEachWorkItemAsModal";

function ChildWorkItemSection({ workItem }) {
  const [workItems, setWorkItems] = useState([]);
  const [title, setTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ISSUE");
  const [showError, setShowError] = useState(false);
  const { workItemId, projectId } = workItem;
  const [showCreateWorkItemModal, setShowCreateWorkItemModal] = useState(false);
  const [singleWorkItemDetails, setSingleWorkItemDetails] = useState({
    workItemId: "",
    projectId: "",
  });
  useEffect(() => {
    getAllChildWorkItems(workItemId);
  }, [workItemId]);

  const getAllChildWorkItems = async () => {
    try {
      const response = await getAllChildWorkItemsByParentWorkItemId(workItemId);
      setWorkItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to open the menu and set the selected attachment
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleTitleChange = (event) => {
    let inputValue = event.target.value;
    if (inputValue.trim() === "") {
      setShowError(true);
    } else {
      setShowError(false);
    }
    setTitle(inputValue);
  };

  const handleSubmition = async () => {
    if (title.trim() === "") {
      setShowError(true);
      return;
    }
    try {
      const response = await createChildWorkItem(
        title,
        selectedCategory,
        workItem.projectId,
        workItem.workItemId
      );
      setAnchorEl(null);
      console.log(response.data);
      setWorkItems((prevState)=>[...prevState, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowWorkItemModal = (workItemId, projectId) => {
    setShowCreateWorkItemModal(true);
    setSingleWorkItemDetails({
      workItemId: workItemId,
      projectId: projectId,
    });
  };
  return (
    <div
      style={{
        height: "300px",
        overflowY: "scroll",
        padding: "10px",
        backgroundColor: "#FFF",
        border: "1px solid black",
      }}
    >
      <div>
        {/* Button */}
        <Button
          variant="soft"
          onClick={(e) => {
            handleOpenMenu(e);
          }}
        >
          <Add />
          New workItem
        </Button>
      </div>
      {workItems.length === 0 ? (
        <p>No work items available</p>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className="table_header">ID </TableCell>
                <TableCell className="table_header" align="left">
                  Title
                </TableCell>
                <TableCell className="table_header" align="left">
                  Category
                </TableCell>
                <TableCell className="table_header" align="left">
                  Created Time
                </TableCell>
                <TableCell className="table_header" align="left">
                  Status
                </TableCell>
                <TableCell className="table_header" align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workItems.map((workItem) => (
                <TableRow
                  key={workItem.workItemId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{workItem.workItemId}</TableCell>
                  <TableCell align="left">{workItem.title}</TableCell>

                  <TableCell align="left">
                    <span>
                      {workItem.category === "EPIC" && (
                        <CropTwoTone color="error" />
                      )}
                      {workItem.category === "ISSUE" && (
                        <SyncProblem color="warning" />
                      )}
                      {workItem.category === "TASK" && <Task color="success" />}
                    </span>
                    {workItem.category}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(workItem.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="left">{workItem.state}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      className="cursor-pointer underline"
                      onClick={() =>
                        handleShowWorkItemModal(
                          workItem.workItemId,
                          workItem.projectId
                        )
                      }
                    >
                      View
                    </Button>
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
        onClose={handleCloseMenu}
      >
        <div
          style={{
            width: 250,
            paddingLeft: 20,
            paddingRight: 30,
          }}
        >
          <TextField
            fullWidth
            style={{ borderRadius: 0, width: 210, marginTop: 20 }}
            value={title}
            onChange={(e) => {
              handleTitleChange(e);
            }}
            placeholder="Enter a title"
            error={showError}
            helperText={showError && "title must not be empty"}
          />

          {workItem.category === "EPIC" && (
            <Select
              style={{
                height: 40,
                borderRadius: 0,
                marginTop: "10px",
                width: 210,
                outline: "none",
                fontSize: "12px",
              }}
              value={selectedCategory}
              defaultValue="ISSUE" // Set default value
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
            >
              <MenuItem value="ISSUE" sx={{ fontSize: "12px" }}>
                <SyncProblem color="warning" />
                ISSUE
              </MenuItem>
              <MenuItem value="TASK" sx={{ fontSize: "12px" }}>
                <Task color="success" />
                TASK
              </MenuItem>
            </Select>
          )
          }
           {
              workItem.category === "ISSUE"
              &&
              <Select
              style={{
                height: 40,
                borderRadius: 0,
                marginTop: "10px",
                width: 210,
                outline: "none",
                fontSize: "12px",
              }}
              value={selectedCategory}
              defaultValue="TASK" 
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
            >
              <MenuItem value="TASK" sx={{ fontSize: "12px" }}>
                <Task color="success" />
                TASK
              </MenuItem>
            </Select>
            }
          <Button
            variant="soft"
            fullWidth
            style={{
              width: 210,
              borderRadius: 0,
              marginTop: 20,
              marginBottom: 20,
            }}
            onClick={handleSubmition}
          >
            create
          </Button>
        </div>
      </Menu>
      <ShowEachWorkItemAsModal
        isOpen={showCreateWorkItemModal}
        onClose={() => setShowCreateWorkItemModal(false)}
        creationDetials={singleWorkItemDetails}
      />
    </div>
  );
}

export default ChildWorkItemSection;
