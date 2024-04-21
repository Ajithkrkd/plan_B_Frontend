import { Add, Delete, Edit, MoreVertOutlined } from "@mui/icons-material";
import {
    Menu,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
    const [editing,setEditing] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null)
    const [editingCycle , setEditingCycle] = useState({
        
    })


    useEffect(() => {
        if (workLifeCycleStatus === "idle") {
        dispatch(fetchWorkLifeCycle());
        }
    }, [dispatch, workLifeCycleStatus]);


    const handleDeleteWorkLifeCycle = () =>{
        console.log(editingCycle)
    }

  
    const handleEditWorkLifeCycle = () =>{
        console.log(editingCycle)
        setEditing(true)
    }

    const handleOpenMenu = (event,cycle) => {
        setAnchorEl(event.currentTarget);
        setEditingCycle(cycle);
    };
    const handleCloseMenu = () =>{
        setAnchorEl(null);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if necessary
        let day = date.getDate().toString().padStart(2, '0'); // Adding leading zero if necessary
        return `${day}-${month}-${year}`;
    };

  return (
    <div className="project-container">
      <div className="flex justify-between py-3 px-3">
        <p className="text-xl font-semibold underline pt-2 ">Work Life Cycle</p>
        {editing && <AddWorkLifeCycleModal 
            setEditing={setEditing}
            editing={editing}
            editData={editingCycle}         
        />
        }

        {}
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
                  <TableCell style={{fontWeight:600}}>{cycle.title}</TableCell>
                  <TableCell>
                    {/* Use custom formatting function if needed: */}
                    {/* {formatDate(cycle.startTime)} */}
                    {cycle.startDate &&
                      formatDate(cycle.startDate)}
                  </TableCell>
                  <TableCell>
                    {/* Use custom formatting function if needed: */}
                    {/* {formatDate(cycle.endTime)} */}
                    {cycle.endDate && formatDate(cycle.endDate)}
                  </TableCell>
                  <TableCell>
                    <MoreVertOutlined
                    style={{cursor: "pointer"}}
                     onClick={(e) => {
                        handleOpenMenu(e ,cycle);
                      }}
                    />{" "}
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <p>No workLife Cycles</p>
          )}
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <div
          style={{
            width: 200,
            paddingLeft: 20,
            paddingRight: 30,
          }}
        >
         
         <Button
            variant="soft"
            fullWidth
            style={{
              width: 150,
              borderRadius: 0,
              marginTop: 20,
              marginBottom: 10,
            }}
            onClick={handleEditWorkLifeCycle}
          >
            Edit <Edit/>
          </Button>
         
          <Button
            variant="soft"
            fullWidth
            style={{
              width: 150,
              borderRadius: 0,
              marginTop: 20,
              marginBottom: 20,
            }}
            onClick={handleDeleteWorkLifeCycle}
          >
            Delete <Delete/>
          </Button>
        </div>
      </Menu>
    </div>
  );
}

export default AllWorkLifeCycle;
