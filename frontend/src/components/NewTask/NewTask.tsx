import React, { useEffect } from "react";
import { useState } from "react";
import "./NewTask.scss";
import { FaPlus } from "react-icons/fa";
import { addNewTask } from "services/addNewTask";
import { getTasks } from "services/getTasks";



const NewTask = ({ setReload }: any) => {
    const [newTaskValue, setNewTaskValue] = useState<string>("");

    const handleOnSubmit = () => {
        setReload(true);
        addNewTask(newTaskValue);
        setNewTaskValue("");
    }

    const handleOnChange = (value: string) => {
        setNewTaskValue(value);
    }

    return (
        <div className="new-task">
            <input type={"text"} value={newTaskValue} onChange={(event) => handleOnChange(event.target.value)} />
            <button onClick={handleOnSubmit}>
                <FaPlus className={"plus-icon"}/>
            </button>
        </div>
    )
}

export { NewTask };