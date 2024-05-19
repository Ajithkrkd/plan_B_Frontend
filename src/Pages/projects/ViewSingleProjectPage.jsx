import React, { useEffect } from "react";
import ViewSingleProject from "../../Components/Project/ViewSingleProject";
import Header from "../../Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { checkAdminOrNot, getIsProjectAdminOrNot } from "../../store/redux/slices/isProjectAdminSlice";
function ViewSingleProjectPage() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const projectId = id;
  useEffect(() => {
    dispatch(checkAdminOrNot( projectId ));
  }, [dispatch, projectId]);

  const isAdmin = useSelector(getIsProjectAdminOrNot);
  console.log(isAdmin)
  return (
    <div>
      
      <ViewSingleProject isAdmin={isAdmin}  />
    </div>
  );
}

export default ViewSingleProjectPage;
