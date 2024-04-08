import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from "antd";

const Container = styled.div`
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px grey;
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
    return (
        <Draggable draggableId={`${task.workItemId}`} key={task.workItemId} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              <small>
                #{task.workItemId}
                  {"  "}
              </small>
            </span>
                    </div>
                    <div
                        style={{ display: "flex", justifyContent: "center", padding: 2 }}
                    >
                        <TextContent>{task.title}</TextContent>
                    </div>
                    <Icons>
                        <div>
                            {
                                task.membersAssigned.map(member => (

                                    <Avatar
                                    onClick={() => console.log(task)}
                                    src={member? "http://localhost:8081" + member.profile_image_path: "/src/assets/workers.jpg"}
                                />
                                ))
                            }
                        </div>
                    </Icons>
                    {provided.placeholder}
                </Container>
            )}
        </Draggable>
    );
}

