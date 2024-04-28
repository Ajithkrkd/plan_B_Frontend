import React from 'react';
import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const UsersTableSkeleton = () => {
  return (
    <Table className='table border'>
      <TableHead>
        <TableRow className='border'>
          <TableCell><Skeleton variant="text" animation="wave" width={100} height={60}/></TableCell>
          <TableCell><Skeleton variant="text" animation="wave" width={170} height={60}/></TableCell>
          <TableCell><Skeleton variant="text" animation="wave" width={170} height={60}/></TableCell>
          <TableCell><Skeleton variant="text" animation="wave" width={170} height={60}/></TableCell>
          <TableCell><Skeleton variant="text" animation="wave" width={170} height={60}/></TableCell>
          <TableCell><Skeleton variant="text" animation="wave" width={170} height={60}/></TableCell>
       
        </TableRow>
      </TableHead>
      <TableBody>
        {[1, 2, 3].map((index) => (
          <tr key={index}>
            <td>
              <Skeleton variant="text" animation="wave" width={30} height={60}/>
            </td>
            <td>
              <Skeleton variant="text" animation="wave" width={170} height={60}/>
            </td>
            <td>
              <Skeleton variant="text" animation="wave" width={170} height={60}/>
            </td>
            <td>
              <Skeleton variant="text" animation="wave" width={170} height={60}/>
            </td>
            <td>
              <Skeleton variant="text" animation="wave" style={{borderRadius:"50px"}} width={50} height={60}/>
            </td>
            <td>
              <Skeleton variant="text" animation="wave" width={170} height={60}/>
            </td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTableSkeleton;
