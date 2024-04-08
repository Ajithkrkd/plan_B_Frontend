import React from 'react';
import { Skeleton } from '@mui/material';

const SingleProjectSkeleton = () => {
  return (
    <div className="project-container">
      <div className="flex flex-row items-center justify-between pr-3  py-2">
        <div className="flex flex-wrap items-center">
          <div>
            <div className="relative">
              <Skeleton variant="circular" width={100} height={100} animation="wave" />
              <label htmlFor="fileInput" className="edit-icon absolute bottom-0 right-5">
                <Skeleton variant="rectangular" width={24} height={24} animation="wave" />
              </label>
            </div>
            <Skeleton variant="text" width={150} height={30} animation="wave" />
          </div>
          <Skeleton variant="text" width={200} height={30} animation="wave" />
        </div>
        <div className=" flex items-end">
          <Skeleton variant="rectangular" width={100} height={36} animation="wave" />
        </div>
      </div>

      <div className="flex flex-row items-center justify-between pr-3 border px-5   py-3">
        <div>
          <Skeleton variant="text" width={300} height={20} animation="wave" />
          <Skeleton variant="text" width={500} height={100} animation="wave" />
        </div>
        <div className=" flex items-end">
          <Skeleton variant="rectangular" width={40} height={40} animation="wave" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between pr-3 border px-5   py-3">
        <div>
          <Skeleton variant="text" width={300} height={20} animation="wave" />
          <Skeleton variant="text" width={500} height={100} animation="wave" />
        </div>
        <div className=" flex items-end">
          <Skeleton variant="rectangular" width={40} height={40} animation="wave" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between pr-3 border px-5   py-3">
        <div>
          <Skeleton variant="text" width={300} height={20} animation="wave" />
          <Skeleton variant="text" width={500} height={100} animation="wave" />
        </div>
        <div className=" flex items-end">
          <Skeleton variant="rectangular" width={40} height={40} animation="wave" />
        </div>
      </div>
      {/* Repeat the same structure for other sections */}
    </div>
  );
};

export default SingleProjectSkeleton;
