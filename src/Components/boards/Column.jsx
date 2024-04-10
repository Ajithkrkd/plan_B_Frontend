import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

export default function Column({ title, tasks, id  }) {
   
  return (
    <div style={{ width: "35%" ,backgroundColor: "#EBECF0", margin:10,padding:10 ,height: "500px"}}>
      <p className="p-2 text-xl font-bold  m-2" style={{ textAlign: "center", border:"1px solid #333" }}>{title}</p>
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
