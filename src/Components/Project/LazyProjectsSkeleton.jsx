import React from 'react';
import { Skeleton } from '@mui/material';

const LazyProjectsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 project-container">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <Skeleton variant="circular" width={100} height={100} animation="wave" />
          <div className="max-w-50 mt-4">
            <Skeleton variant="text" width={250} height={50} animation="wave" />
            <Skeleton variant="text" width={250} height={50} animation="wave" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LazyProjectsSkeleton;
