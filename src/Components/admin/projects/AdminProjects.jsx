import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Avatar,
  Skeleton,
  Button,
} from "@mui/material";
import { getAllProjects, getAllUsers } from "../../../Api/admin/adminApis";
import Header from "../Header";
import SideBar from "../../SideBar/SideBar";
import Loader from "../../../common/Loader";
import UsersTableSkeleton from "../skeltons/UsersTableSkeleton ";
import ProjectAdminsModal from "./ProjectAdminsModal";
import { AdminPanelSettings, PersonSearchOutlined } from "@mui/icons-material";
import ProjectAssignedMembers from "./ProjectAssignedMembers";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getAllProjects();
      setProjects(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleViewProjectAdministrators = (admins) => {
    console.log(admins)
    setSelectedAdmins(admins);
    setAdminOpen(true);
  };
  const handleViewProjectMembersList = (members) => {
    console.log(members)
    setSelectedMembers(members);
    setMemberOpen(true);
  };

  return (
    <>
      <Header />
      <SideBar />
      <div className="project-container">
        <p className="text-2xl font-semibold py-3">Project Details</p>
        {loading ? (
          <UsersTableSkeleton />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project ID</TableCell>
                  <TableCell>Profile Image</TableCell>
                  <TableCell>Project Title</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>No of Administrators</TableCell>
                  <TableCell>No of Members</TableCell>
                  <TableCell>No Of Work Items</TableCell>
                  <TableCell>Created Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.length === 0 ? (
                  <div className="flex justify-between">
                    <p className="pl-2 text-primary py-4 italic">
                      Projects Empty
                    </p>
                  </div>
                ) : (
                  <>
                    {projects.map((project) => (
                      <TableRow key={project.projectId}>
                        <TableCell>{project.projectId}</TableCell>
                        <TableCell>
                          {project.project_profile_url ? (
                            <Avatar
                              alt="logo"
                              src={project.project_profile_url}
                            />
                          ) : (
                            <>
                              <p>no image</p>
                            </>
                          )}
                        </TableCell>
                        <TableCell>{project.title}</TableCell>
                        <TableCell>
                          {project.projectRootAdministratorEmail}
                        </TableCell>
                        <TableCell>
                          {project.projectAdministratorDetailsList && (
                            <Button
                              onClick={() =>
                                handleViewProjectAdministrators(project.projectAdministratorDetailsList)
                              }
                              variant="outlined"
                            >
                                {project.projectAdministratorDetailsList.length}
                              <AdminPanelSettings color="success" className="pl-2" /> 
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          {project.assignedMembersDetailsList && (
                            <Button
                              onClick={() =>
                                handleViewProjectMembersList(project.assignedMembersDetailsList)
                              }
                              variant="outlined"
                            >
                                {project.assignedMembersDetailsList.length}
                              <PersonSearchOutlined className="pl-2" /> 
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          {project.workItems && project.workItems.length}
                        </TableCell>
                        <TableCell>
                          {formatDate(project.createdDateTime)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {selectedAdmins && (
          <ProjectAdminsModal
            open={adminOpen}
            setOpen={setAdminOpen}
            projectAdmins={selectedAdmins}
          />
        )}
        {selectedMembers && (
          <ProjectAssignedMembers
            open={memberOpen}
            setOpen={setMemberOpen}
            membersAssigned={selectedMembers}
          />
        )}
      </div>
    </>
  );
};

export default AdminProjects;
