import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from "antd";
import ShowEachWorkItemAsModal from "../work-items/showEachWorkItemAsModal";
import {
  Circle,
  CropTwoTone,
  MoreVertOutlined,
  SyncProblem,
  Task,
} from "@mui/icons-material";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 1px 1px 2px 1px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 120px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TextContent = styled.div``;

const Icons = styled.div`
  display: flex;
  justify-content: end;
  padding: 2px;
`;

const Title = styled.div`
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  cursor: pointer;
`;

function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#FFFFF"
    : props.isBacklog
    ? "#F2D7D5"
    : "#FFFFFF";
}

export default function Card({ task, index }) {
  const [showCreateWorkItemModal, setShowCreateWorkItemModal] = useState(false);
  const [singleWorkItemDetails, setSingleWorkItemDetails] = useState({
    workItemId: "",
    projectId: "",
  });

  const handleViewWorkItem = (workItemId, projectId) => {
    setShowCreateWorkItemModal(true);
    setSingleWorkItemDetails({
      workItemId: workItemId,
      projectId: projectId,
    });
  };

  return (
    <>
      <Draggable
        draggableId={`${task.workItemId}`}
        key={task.workItemId}
        index={index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Title
              onClick={() =>
                handleViewWorkItem(task.workItemId, task.projectId)
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 2,
                }}
              >
                <span className=" flex">
                  <p>
                    {task.category === "EPIC" && <CropTwoTone color="error" />}
                    {task.category === "ISSUE" && (<SyncProblem color="warning" />)}
                    {task.category === "TASK" && <Task color="success" />}
                  </p>
                  <b className="pr-2">{task.workItemId}</b>
                  <TextContent className="font-semibold">
                  {task.title}
                  </TextContent>
                </span>
                
                <span>
                  <MoreVertOutlined />
                </span>
              </div>
            </Title>

              

            <div className="flex justify-between">
            <section className="flex">
              <span className="text-gray-600">
                State
              </span>
              <span className="pl-4">
                    <span>
                      {task.state === "TODO" && <Circle   style={{fontSize:'15px'}}  color="error" />}
                      {task.state === "DOING" && (<Circle style={{fontSize:'15px'}}   color="warning" />)}
                      {task.state === "DONE" && <Circle   style={{fontSize:'15px'}}   color="success" />}
                    </span>
                  <span>{task.state.toLowerCase()}</span>
              </span>
            </section>
            <Icons>
              <AvatarContainer onClick={(e) => e.stopPropagation()}>
                {task.memberAssigned ? (
                  <span className="">
                    <span className="px-3" style={{ fontSize: "13px" }}>
                      {task.memberAssigned.fullName}
                    </span>
                    <Avatar
                      src={
                        "http://localhost:8081" +
                        task.memberAssigned.profile_image_path
                      }
                    />
                  </span>
                ) : (
                  <span>No members assigned</span>
                )}
              </AvatarContainer>
            </Icons>
              
            </div>
            {provided.placeholder}
          </Container>
        )}
      </Draggable>
      <ShowEachWorkItemAsModal
        isOpen={showCreateWorkItemModal}
        onClose={() => setShowCreateWorkItemModal(false)}
        creationDetials={singleWorkItemDetails}
      />
    </>
  );
}
