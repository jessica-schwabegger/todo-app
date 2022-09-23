import React from "react";
import { useState, useEffect } from "react";
import { TaskCard } from "components/TaskCard/TaskCard";
import { ITaskCard } from "interface/ITaskCard";
import "./TasksView.scss";

const TasksView = () => {
    const [tasks, setTasks] = useState<[ITaskCard]>();

    useEffect(() => {
        const getTasks = async () => {
            const response = await fetch("/getTasks");
            const tasks = await response.json();
            tasks.tasks.sort((a: ITaskCard, b: ITaskCard) => Number(a.isDone) - Number(b.isDone))
            setTasks(tasks.tasks);
        };
        getTasks();
    }, []);

    return (
        <div className="tasks-view">
            {tasks?.map((task, index) => (
                <div key={index}>
                    <TaskCard
                        taskText={task.taskText}
                        isDone={task.isDone}
                    />
                </div>
            ))}
            
        </div>
    )
}

export { TasksView };