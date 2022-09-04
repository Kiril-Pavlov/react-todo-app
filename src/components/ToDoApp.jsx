import React from 'react'
import { useState } from 'react'

import "./ToDoApp.css"

const ToDoApp = () => {

  const [taskInput,setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);

  const addTask = (e)=> {
    if(taskInput){
      let newTask ={
        id : new Date().getTime().toString(),
        title : taskInput
      }
      setTaskList(...taskList, newTask);
    }
  }

  return (
    <div className='main-container'>
      <h1 className='title'>
        Kiril's Todo App
      </h1>
      <div className='add-task-container'>
        <input 
          type="text" 
          name='text' 
          value="" 
          placeholder='Enter task here...'
          className='task-input'
          onChange={(e)=>setTaskInput(e.target.value)} 
        />
        <button className='add-task-button' onClick={addTask}>
          Add Task
        </button>
      </div>
      <span className='task-counter'>
        You have 
        {
          !taskList.length ? " no tasks"
          : taskList.length === 1 ? " 1 task"
            :taskList.length>1 ? ` ${taskList.length} tasks`:null
        }
      </span>
    </div>
  )
}

export default ToDoApp