import React from "react";
import "./NewTask.scss";
import { FaPlus } from "react-icons/fa";


const NewTask = () => {
    return (
        <div className="new-task">
            <button>
                <FaPlus className="plus-icon"/>
            </button>
        </div>
    )
}

export { NewTask };