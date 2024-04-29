import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ProjectAdminsModal = ({open,setOpen,projectAdmins}) => {

    const [selectedAdmins, setSelectedAdmins] = useState([])

    useEffect(() => {
        setSelectedAdmins([...projectAdmins]);
    }, [selectedAdmins]);
    
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
                        selectedAdmins && 
                      <>
                        {selectedAdmins.length  === -1 ? (
                            <TableRow>
                                <TableCell colSpan={3}>No members</TableCell>
                            </TableRow>
                        ) : (
                            
                            selectedAdmins.map(admin => (
                                <TableRow key={admin.id}>
                                    <TableCell>{admin.id}</TableCell>
                                    <TableCell>
                                        <Avatar alt={admin.name} src={admin.profile_image_url} />
                                    </TableCell>
                                    <TableCell>{admin.fullName}</TableCell>
                                    <TableCell>{admin.email}</TableCell>
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

export default ProjectAdminsModal