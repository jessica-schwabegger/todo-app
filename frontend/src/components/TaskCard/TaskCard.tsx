import React from "react";
import { useState } from "react";
import "./TaskCard.scss";
import { ITaskCard } from "interface/ITaskCard";
import { deleteTask } from "services/deleteTask";
import { updateTask } from "services/updateTask";
import { FaCheck, FaTrashAlt, FaPen, FaTimes } from "react-icons/fa";

const TaskCard = ({ taskText, isDone, id, setReload }: ITaskCard) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
    const [showEditTask, setShowEditTask] = useState<boolean>(false);
    const [updatedTaskText, setUpdatedTaskText] = useState<string>("");
    const [temporaryTextHolder, setTemporaryTextHolder] = useState<string>(taskText);


    const toggleConfirmDelete = () => {
        setShowConfirmDelete(!showConfirmDelete);
    };
    
    const handleDeleteTask = async () => {
        await deleteTask(id);
        setReload?.(true);
    }

    const handleOnChange = (value: string) => {
        setTemporaryTextHolder(value);
    }

    const updateTaskText = async () => {
        await updateTask(id, {"taskText": temporaryTextHolder});
        setUpdatedTaskText(temporaryTextHolder);
        setShowEditTask(false);
    }
    
    return (
        <div className={isDone ? "task-card is-done" : "task-card"}>
            {showConfirmDelete &&
                <div className="confirm-action">
                    <p>Are you sure you want to delete this task?</p>
                    <div className="confirm-button-group">
                        <button onClick={handleDeleteTask}>YES</button>
                        <button onClick={toggleConfirmDelete}>NO</button>
                    </div>
                </div>
            }
            {showEditTask &&
                <div className="edit-task">
                        <input 
                            value={temporaryTextHolder}
                            onChange={(event) => handleOnChange(event.target.value)}
                        />
                        <FaCheck color="green" onClick={updateTaskText} />
                        <FaTimes color="darkred" onClick={() => setShowEditTask(false)} />
                </div>
            }
            <div className="task-card-header">
                <div className="assignee">
                    <img src="img/blank-profile-picture.png" alt="" />
                </div>
                <div>
                    <FaPen onClick={() => setShowEditTask(true)} />
                    <FaTrashAlt onClick={toggleConfirmDelete}/>
                </div>
            </div>
            <div className="task-card-content">
                <p>{updatedTaskText ? updatedTaskText : taskText}</p>
                {isDone &&
                    <div className="is-done">
                        <FaCheck className="checkmark"/>
                    </div>
                }
            </div>

        </div>
    )
}

export { TaskCard };