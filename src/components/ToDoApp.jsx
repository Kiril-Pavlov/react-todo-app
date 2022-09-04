import React from 'react'
import { useState } from 'react'
import { AiFillCheckCircle, AiFillEdit ,AiFillDelete } from "react-icons/ai";

import "./ToDoApp.css"

const ToDoApp = () => {

  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);

  const addTask = (e) => {
    if (taskInput) {
      let newTask = {
        id: new Date().getTime().toString(),
        title: taskInput
      }
      console.log(taskList)
      setTaskList([...taskList, newTask]);
      localStorage.setItem("localTaskList", JSON.stringify([...taskList, newTask]))
      setTaskInput("")
      console.log(taskList)
    }
  }

  const handleDeleteTask = (task)=>{
    const updated = taskList.filter((t)=>t.id !== task.id);
    setTaskList(updated);
    localStorage.setItem("localTaskList", JSON.stringify(updated))
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
          value={taskInput}
          placeholder='Enter task here...'
          className='task-input'
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className='add-task-button' onClick={addTask}>
          Add Task
        </button>
      </div>
      <div className='task-counter'>
        You have
        {
          !taskList.length ? " no tasks"
            : taskList.length === 1 ? " 1 task"
              : taskList.length > 1 ? ` ${taskList.length} tasks` : null
        }
      </div>
      <div className='task-list-container'>
        {taskList.map((task) => {
          return (
            <div className='task-item' key={task.id}>
              <div className='task-title'>
                {task.title}
              </div>
              <button className='complete-button'>
                <AiFillCheckCircle />
              </button>
              <button className='edit-button'>
                <AiFillEdit />
              </button>
              <button className='delete-button' onClick={()=>handleDeleteTask(task)}>
                <AiFillDelete />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ToDoApp