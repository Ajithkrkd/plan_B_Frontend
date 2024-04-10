import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import toast from 'react-hot-toast'
import '../../Components/Project/project.css'
import { changeStateOfWorkItem } from "../../Api/workItem";
export default function Board({workItems}) {
    const [done, setDone] = useState([]);
    const [todo, setTodo] = useState([]);
    const [doing, setDoing] = useState([]);
    useEffect(() => {
       if(workItems){
        setTodo( workItems.filter((item) => item.state === "TODO"));
        setDoing(workItems.filter((item) => item.state === "DOING"));
        setDone(workItems.filter((item) => item.state === "DONE"));
       }
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [...todo, ...done, ...doing]);
        
        setNewState(destination.droppableId, task);
        const workItemID = task.workItemId;
        const updatedTask = { taskId: workItemID, state: destination.droppableId };
        makeServerRequest(updatedTask); 

    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setTodo(removeItemById(taskId, todo));
                break;
            case "2":
                setDone(removeItemById(taskId, done));
                break;
            case "3":
                setDoing(removeItemById(taskId, doing));
                break;
        
        }

    }
    function setNewState(destinationDroppableId, task) {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1":   // TO DO
                updatedTask = { ...task, done: false };
                setTodo([updatedTask, ...todo]);
                break;
            case "2":  // DONE
                updatedTask = { ...task, done: true };
                setDone([updatedTask, ...done]);
                break;
            case "3":  // IN REVIEW
                updatedTask = { ...task, done: false };
                setDoing([updatedTask, ...doing]);
                break;
           
        }
    }

    function findState (state){
        let newState = ''
       if(state == '1' ){
        newState = "TODO"
       }else if(state == '3'){
        newState = "DOING"
       }else if(state == '2') {
        newState = "DONE"
       }
       return newState;
    }
    
      
    const  makeServerRequest = async (updatedTask) => {
       const {taskId ,state} =updatedTask;
       console.log(taskId,state)
       const newState = findState(state);
       if(newState == ''){
        toast.error('state is not getting');
        return;
       }
       try {
        
        const response = await changeStateOfWorkItem(newState,taskId);
        console.log(response.data)
        toast.success("you have changed state to " +newState)
      } catch (error) {
        console.log(error)
      }
        console.log("Making server request to update task state:", updatedTask);

      }

    function findItemById(id, array) {
        return array.find((item) => item.workItemId == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.workItemId != id);
    }

    return (
        <div className="project-container p-0">
            
        <DragDropContext onDragEnd={handleDragEnd}>
            <p className="text-center text-2xl p-2 font-semibold" >PROGRESS BOARD</p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "100%",
                    margin: "0 auto"
                }}
            >
                <Column title={"TODO"} tasks={todo} id={"1"} />
                <Column title={"DOING"} tasks={doing} id={"3"} />
                <Column title={"DONE"} tasks={done} id={"2"} />
            </div>
        </DragDropContext>

        </div>
    );
}