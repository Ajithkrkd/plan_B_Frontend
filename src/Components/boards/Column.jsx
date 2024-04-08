import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

export default function Column({ title, tasks, id  }) {
   
  return (
    <div style={{ width: "35%" ,backgroundColor: "#EBECF0", margin:10,padding:10 ,height: "500px"}}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Card key={task.workItemId} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
