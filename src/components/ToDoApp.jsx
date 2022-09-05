import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { AiFillCheckCircle, AiFillEdit ,AiFillDelete } from "react-icons/ai";

import "./ToDoApp.css"

const ToDoApp = () => {

  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(()=>{
    if(localStorage.getItem("localTaskList")){
      let localData = JSON.parse(localStorage.getItem("localTaskList"));
      setTaskList(localData)
    }
  },[])

  const addTask = (e) => {
    if (taskInput) {
      let newTask = {
        id: new Date().getTime().toString(),
        title: taskInput,
        status: false
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

const toggleTaskStatus = (id) => {
  
   let modifiedTasks = taskList.map((task) => {
    if(task.id === id){
      return ({...task, status: !task.status})
    }
    return task
   })
   setTaskList(modifiedTasks);
   localStorage.setItem("localTaskList", JSON.stringify(modifiedTasks))
   
}
console.log(taskList)
const handleDeleteTaskList = () =>{
  setTaskList([]);
  localStorage.removeItem("localTaskList")
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
              <div className={task.status ? "task-title completed" : "task-title"}>
                {task.title}
              </div>
              <button className='complete-button' onClick={(e)=>toggleTaskStatus(task.id)}>
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
      {!taskList.length ? null : (
        <div className='clear-button'>
            <button onClick={()=>handleDeleteTaskList()}>
              Delete all Tasks
            </button>
        </div>
      )}
    </div>
  )
}

export default ToDoApp