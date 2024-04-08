import React from 'react';
import { CardContent, Skeleton } from '@mui/material';

const LazyLoginFormSkeleton = () => {
  return (
    <form>
      <CardContent>
        <Skeleton variant="rectangular" height={40} animation="wave" />
       
      </CardContent>
      <CardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Skeleton variant="rectangular" height={40} width={1000} animation="wave" />
      </CardContent>
      <CardContent>
        <Skeleton variant="text" height={20} animation="wave" />
        <Skeleton variant="text" height={20} animation="wave" />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Skeleton variant="rectangular" height={40} width={120} animation="wave" />
          </div>
      </CardContent>
    </form>
  );
};

export default LazyLoginFormSkeleton;
