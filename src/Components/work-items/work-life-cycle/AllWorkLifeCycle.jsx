import { Add, MoreVertOutlined } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWorkLifeCycle,
  getAllWorkLifeCycleList,
  getWorkLifeCycleErrors,
  getWorkLifeCycleStatus,
} from "../slices/workLifeCycle/workLifeCycleSlice";
import { Button } from "@mui/joy";
import AddWorkLifeCycleModal from "./AddWorkLifeCycleModal";
function AllWorkLifeCycle() {
  const workLifeCycleStatus = useSelector(getWorkLifeCycleStatus);
  const dispatch = useDispatch();
  const workLifeCycles = useSelector(getAllWorkLifeCycleList);

  useEffect(() => {
    if (workLifeCycleStatus === "idle") {
      dispatch(fetchWorkLifeCycle());
    }
  }, [dispatch, workLifeCycleStatus]);

  return (
    <div className="project-container">
      <div className="flex justify-between py-3 px-3">
        <p className="text-xl font-semibold underline pt-2 ">Work Life Cycle</p>
        <AddWorkLifeCycleModal />
      </div>
      <TableContainer style={{ border: "1px solid black" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {workLifeCycles ? (
            <TableBody>
              {workLifeCycles.map((cycle) => (
                <TableRow key={cycle.workingLifeCycleId}>
                  <TableCell>{cycle.workingLifeCycleId}</TableCell>
                  <TableCell>{cycle.title}</TableCell>
                  <TableCell>
                    {/* Use custom formatting function if needed: */}
                    {/* {formatDate(cycle.startTime)} */}
                    {cycle.startDate &&
                      new Date(cycle.startDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {/* Use custom formatting function if needed: */}
                    {/* {formatDate(cycle.endTime)} */}
                    {cycle.endDate && new Date(cycle.endDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <MoreVertOutlined />{" "}
                    {/* Assuming Material-UI usage for icons */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <p>No workLife Cycles</p>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

export default AllWorkLifeCycle;
