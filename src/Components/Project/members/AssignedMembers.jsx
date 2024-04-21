
import React from "react";

function AssignedMembers({ assignedMembers }) {
  return (
    <div className="flex flex-col  justify-between pr-3 border px-5 py-3">
      <p className="text-2xl py-2 font-semibold">Members</p>
      {assignedMembers &&
        assignedMembers.map((member) => (
          <div key={member.id} className="flex flex-row gap-5 items-center py-2">
            <div>
              <img
                src={`${member.profile_image_url}`}
                alt={"img"}
                className="profile"
              />
            </div>
            <div className="flex row-12 d-flex justify-content-between items-center">
              <p className="col">{member.email}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AssignedMembers;
