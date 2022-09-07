import React,{useState} from 'react'
import { useEffect } from 'react'

import "./Popup.css"

const Popup = ({ popupState, setPopupState, task, taskList,setTaskList }) => {
    const [taskTitleEdit, setTaskTitleEdit] = useState("")

    if (!popupState) return null

    const handleTaskEdit = (task) => {
        let editedTasks = taskList.map((t) => {
            if(t.id === task.id){
                return ({...t, title:taskTitleEdit})
            }
            return t;
        })
        setTaskList(editedTasks);
        localStorage.setItem("localTaskList", JSON.stringify(editedTasks))
        setPopupState()
        setTaskTitleEdit("")
    }

    const handleTitleEdit = (e) => {
        setTaskTitleEdit(e.target.value);
    }


    return (
        <div className='overlay-container' onClick={setPopupState}>
            <div onClick={(e)=>{e.stopPropagation()}} className='popup-container'>
                <button onClick={setPopupState} className="popup-close-button">X</button>
                <div className='popup-input-container'>
                    <label htmlFor="task-edit-input">Edit task here:</label>
                    <input type="text" onChange={handleTitleEdit}  value={taskTitleEdit} placeholder="Enter title task here"/>
                </div>
                <div className='popup-buttons'>
                    <button onClick={()=>handleTaskEdit(task)} className="popup-confirm-button">CONFIRM</button>
                    <button onClick={setPopupState} className="popup-cancel-button">CANCEL</button>
                </div>
            </div>
        </div>
    )
}

export default Popup