import React from "react";
import { useState, useEffect } from "react";
import { TaskCard } from "components/TaskCard/TaskCard";
import { ITaskCard } from "interface/ITaskCard";
import { getTasks } from "services/getTasks";
import { updatePosition } from "services/updatePosition";
import { updateTask } from "services/updateTask";
import { NewTask } from "components/NewTask/NewTask";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import "./TasksView.scss";

const TasksView = () => {
    const [reload, setReload] = useState<boolean>(false);
    const [tasks, setTasks] = useState<ITaskCard[]>();
    const [finishedTasks, setFinishedTasks] = useState<ITaskCard[]>();
    const [tasksToDo, setTasksToDo] = useState<ITaskCard[]>();
    const [tasksInProgress, setTasksInProgress] = useState<ITaskCard[]>();

    useEffect(() => {
        const loadTasks = async () => {
            const allTasks = await getTasks();
            setTasks(allTasks)
        }
        loadTasks();
    }, [reload]);
    
    useEffect(() => {
        setReload(false);
        filterTasks();
    }, [tasks]);

    const filterTasks = () => {
        const finishedTasks: ITaskCard[] = [];
        const tasksToDo: ITaskCard[] = [];
        const tasksInProgress: ITaskCard[] = [];

        tasks?.map((task) => {
            if (task.isDone) {
                finishedTasks.push(task);
            } else if (!task.isDone && !task.inProgress) {
                tasksToDo.push(task)
            } else if (task.inProgress) {
                tasksInProgress.push(task);
            }
        })
        setFinishedTasks(finishedTasks);
        setTasksToDo(tasksToDo);
        setTasksInProgress(tasksInProgress);        
    }

    // const sortTasks = (tasks: any) => {
    //         const sorted = tasks?.sort((a: any, b: any) => {
    //             if(tasks) {
    //                 if (a.index > b.index) {
    //                     return 1;
    //                 } if(a.index < b.index) {
    //                     return -1;
    //                 }
    //             }
    //         })
    //         console.log(sorted);
    //         return sorted;
    // }

    const renderTasks = (tasks: ITaskCard[]) => {
        console.log(tasks);
        return (
            tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <TaskCard
                                taskText={task.taskText}
                                isDone={task.isDone}
                                id={task.id}
                                setReload={setReload}
                            />
                        </div>
                    )}
                </Draggable>
            ))
        )
    }

    const handleDragEnd = async (result: any) => {
        // console.log(result);

        if (!result.destination) {
            return;
        }

        if (result.destination.droppableId === "tasksToDo" && tasksToDo) {
            await updateTask(
                result.draggableId, 
                {
                    "inProgress": false,
                    "isDone": false
                }
            );
            setTasksToDo(updateTaskOrderVertically(result, tasksToDo));
        }
        if (result.destination.droppableId === "tasksInProgress" && tasksInProgress) {
            console.log(result);
            await updateTask(
                result.draggableId, 
                {
                    "inProgress": true,
                    "isDone": false
                }
            );
            setTasksInProgress(updateTaskOrderVertically(result, tasksInProgress));
        }
        if (result.destination.droppableId === "finishedTasks" && finishedTasks) {
            await updateTask(
                result.draggableId, 
                {
                    "inProgress": false,
                    "isDone": true
                }
            );
            setFinishedTasks(updateTaskOrderVertically(result, finishedTasks));
        }

        await updatePosition(result.draggableId, result.source.index, result.destination.index);
        // setReload(true);

        console.log(tasksToDo);
        console.log(tasksInProgress);
        console.log(finishedTasks);


    }

    const updateTaskOrderVertically = (result: any, list: ITaskCard[]) => {
        if (list) {
            const newItems = [...list];
            const [removed] = newItems.splice(result.source.index, 1);
            newItems.splice(result.destination.index, 0, removed);
            return newItems;
        }
        return;
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="tasks-view">
            <NewTask setReload={setReload}/>
                <div className="cards-view">
                    <Droppable droppableId="tasksToDo">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <div className="status-section">
                                    <h3>To do</h3>
                                    {tasksToDo && renderTasks(tasksToDo)}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="tasksInProgress">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <div className="status-section">
                                <h3>In progress</h3>
                                {tasksInProgress && renderTasks(tasksInProgress)}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}    
                    </Droppable>
                    <Droppable droppableId="finishedTasks">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <div className="status-section">
                                <h3>Done</h3>
                                {finishedTasks && renderTasks(finishedTasks)}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}    
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    )
}

export { TasksView };