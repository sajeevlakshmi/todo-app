import React, { useState,useEffect } from "react";
import "./todoapp.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/Check";
import swal from 'sweetalert';

function Todo() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const [status,setStatus]=useState('AllTask');
  const[filteredTask,setFilteredTask]=useState([])
  
  useEffect(() => {
    const json = localStorage.getItem("tasklist");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTaskList(loadedTodos);
    }
  }, []);

  useEffect(() => {
   filterHandler();
   const json = JSON.stringify(tasklist);
   localStorage.setItem("tasklist", json);
  }, [status,tasklist])

  const filterHandler=()=>{
    switch(status){
      case "completedTasks":setFilteredTask(tasklist.filter((todo)=>todo.isCompleted===true))
      break;
      case "uncompletedTasks":setFilteredTask(tasklist.filter((todo)=>todo.isCompleted===false))
      break;
      default:setFilteredTask(tasklist)
      break;
    }
  }  

  const AddTask = () => {
    if (task !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false,
      };
      setTaskList([...tasklist, taskDetails]);
      setTask("");
    }
  };

  const deleteItem = (id) => {
    swal({
        title: "Are you sure to Delete?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            setTaskList(tasklist.filter((todo) => todo.id !== id));
          swal(" Your task has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your task is safe!");
        }
      });
    
  };

  const completedItem = (id) => {
    const completedTask = [...tasklist].map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTaskList(completedTask);
    swal("Good job!", "You completed the task successfully!", "success");
  };



  return (
    <div className="todo">
      <input
        type="text"
        name="text"
        id="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="add text here "
      />
      <button className="add-btn" onClick={AddTask}>
        Add Task
      </button>
   
        <select onChange={(e)=>setStatus(e.target.value)}name="todos" className="todo-list">
          <option value="AllTask">All Task</option>
          <option value="completedTasks">Completed Tasks</option>
          <option value="uncompletedTasks">UnCompleted Tasks</option>
        </select>
    
      {tasklist !== [] ? (
        <ul>
          {filteredTask.map((item) => (
            <li
              className={item.isCompleted ? "crossText" : "listItem"}
              key={item.id}
            >
              {item.value}
              <DeleteForeverIcon
                className="delete"
                onClick={() => deleteItem(item.id)}
              ></DeleteForeverIcon>
              <CheckIcon
                className="completed"
                onClick={() => completedItem(item.id)}
              ></CheckIcon>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default Todo;
