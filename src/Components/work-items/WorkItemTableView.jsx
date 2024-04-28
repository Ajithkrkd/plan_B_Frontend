import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./work.css";
import { Button } from "@mui/joy";
import { CropTwoTone, SyncProblem, Task } from "@mui/icons-material";

export default function WorkItemTableView({
                        workItems ,
                        setSingleWorkItemDetails,
                        setShowCreateWorkItemModal,
                        projectId
                        }) {
    
    const handleViewWorkItem = (workItemId, projectId) => {
        setSingleWorkItemDetails({
          workItemId: workItemId,
          projectId: projectId
        });
        setShowCreateWorkItemModal(true);
      };

  return (
    <TableContainer component={Paper}>
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
              Created Member
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
                    {workItem.category === "EPIC" && <CropTwoTone color="error" />}
                    {workItem.category === "ISSUE" && (<SyncProblem color="warning" />)}
                    {workItem.category === "TASK" && <Task color="success" />}
                  </span>
                {workItem.category}</TableCell>
              <TableCell align="left">
                {new Date(workItem.createdAt).toLocaleString()}
              </TableCell>
              <TableCell align="left">{workItem.state}</TableCell>
              <TableCell align="left" key={workItem.createdBy.userId}>{workItem.createdBy.fullName}</TableCell>
              <TableCell align="left">
                <Button
                  variant="outlined"
                  className="cursor-pointer underline"
                  onClick={() => handleViewWorkItem(workItem.workItemId, projectId)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
