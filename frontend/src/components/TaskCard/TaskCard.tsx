import React from "react";
import "./TaskCard.scss";
import { ITaskCard } from "interface/ITaskCard";
import { FaCheck } from "react-icons/fa";

const TaskCard = ({ taskText, isDone }: ITaskCard) => {
    
    return (
        <div className={isDone ? "task-card is-done" : "task-card"}>
            <p>{taskText}</p>
            {isDone ? 
                <div className="is-done">
                    <FaCheck className="checkmark"/>
                </div>
            : 
                <div className="assignee">
                    <img src="img/blank-profile-picture.png" alt="" />
                </div>
            }
        </div>
    )
}

export { TaskCard };