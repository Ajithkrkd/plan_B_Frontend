import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ProjectAssignedMembers = ({open,setOpen,membersAssigned}) => {
    const [selectedMembers, setSelectedMembers] = useState([]);
    useEffect(() => {
        setSelectedMembers([...membersAssigned]);
    }, [membersAssigned]);
    const handleClose = () => {
        setOpen(false);
    }


  return (
    <div>
    <Dialog 
     style={{ padding: "20px" }}
     fullWidth
        open={open} onClose={handleClose}>
      <DialogContent>
      <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        selectedMembers &&
                        <>
                        {selectedMembers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3}>No members</TableCell>
                        </TableRow>
                    ) : (
                        selectedMembers.map(member => (
                            <TableRow key={member.id}>
                                <TableCell>{member.id}</TableCell>
                                <TableCell>
                                    <Avatar alt={member.name} src={member.profile_image_url} />
                                </TableCell>
                                <TableCell>{member.fullName}</TableCell>
                                <TableCell>{member.email}</TableCell>
                            </TableRow>
                        ))
                    )}
                        </>
                    }
                </TableBody>
            </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default ProjectAssignedMembers