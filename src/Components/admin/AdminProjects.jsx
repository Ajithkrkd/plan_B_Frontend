import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Avatar, Skeleton } from '@mui/material';
import { getAllProjects, getAllUsers } from '../../Api/admin/adminApis';
import Header from './Header';
import SideBar from '../SideBar/SideBar';
import Loader from '../../common/Loader';
import UsersTableSkeleton from './skeltons/UsersTableSkeleton ';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await getAllProjects();
            setProjects(response.data);
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false);
        }finally{
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        let day = date.getDate().toString().padStart(2, '0');
        return `${day}-${month}-${year}`;
    };



    return (
        <>
        <Header/>
        <SideBar/>
        <div className='project-container'>
        <p className='text-2xl font-semibold py-3'>Project Details</p>
            {loading ? (
               <UsersTableSkeleton/>
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
                            {projects.map((project) => (
                                <TableRow key={project.projectId}>
                                    <TableCell>{project.projectId}</TableCell>
                                    <TableCell>
                                        {project.project_profile_url &&
                                        <Avatar
                                        src={project.project_profile_url}
                                        />
                                        }
                                    </TableCell>
                                    <TableCell>{project.title}</TableCell>
                                    <TableCell>{project.projectRootAdministratorEmail}</TableCell>
                                    <TableCell>{project.projectAdministratorDetailsList && project.projectAdministratorDetailsList.length}</TableCell>
                                    <TableCell>{project.assignedMembersDetailsList && project.assignedMembersDetailsList.length}</TableCell>
                                    <TableCell>{project.workItems && project.workItems.length}</TableCell>
                                    <TableCell>{formatDate(project.createdDateTime)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
        </>
    );
};

export default AdminProjects;
