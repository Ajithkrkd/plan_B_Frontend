import React from "react";
import Skeleton from "react-loading-skeleton";

function ProfileHeadSkelton({ userDetails }) {
  return (
    <div className="profile-container">
      <div className="h-52 relative">
        <Skeleton height={200} />
        <div className="absolute inset-0 bg-black opacity-0"></div>
      </div>
      <div className="px-5 md:px-14 xl:px-28 mt-[-70px] z-10 relative  pb-5">
        <div className="">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="border-4 sm:border-8 border-white rounded-full">
              <Skeleton circle height={110} width={110} />
            </div>
            <div className="sm:flex  sm:justify-between sm:w-full pt-5">
              <div className="sm:mt-20 mt-4 flex flex-col justify-between items-center">
                <h1 className="sm:text-6xl text-3xl font-semibold text-center">
                  {userDetails ? `Hi, ${userDetails.fullName}` : <Skeleton width={200} />}
                </h1>
                <div className="flex items-center flex-col sm:flex-row gap-2 sm:gap-10 pt-2">
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                </div>
              </div>
              <div className="hidden felx flex-row  sm:block clear-left mt-28">
                <Skeleton width={120} height={40} />
                <Skeleton width={120} height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeadSkelton;
