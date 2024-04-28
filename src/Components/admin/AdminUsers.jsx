import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Avatar, Skeleton } from '@mui/material';
import { getAllUsers } from '../../Api/admin/adminApis';
import Header from './Header';
import SideBar from '../SideBar/SideBar';
import Loader from '../../common/Loader';
import UsersTableSkeleton from './skeltons/UsersTableSkeleton ';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.data);
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
        <p className='text-2xl font-semibold py-3'>Users Details</p>
            {loading ? (
               <UsersTableSkeleton/>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User ID</TableCell>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Email Verified</TableCell>
                                <TableCell>Profile Image</TableCell>
                                <TableCell>Join Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.userId}>
                                    <TableCell>{user.userId}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>{user.emailVerified ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        {user.profile_image_path &&
                                        <Avatar
                                        src={user.profile_image_path}
                                        />

                                        }
                                    </TableCell>
                                    <TableCell>{formatDate(user.joinDate)}</TableCell>
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

export default AdminUsers;
