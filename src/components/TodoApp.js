import React, { useState } from "react";
import "./todoapp.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/Check";
import swal from 'sweetalert';

function Todo() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);

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
        title: "Are you sure?",
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
        Add
      </button>
   
        <select name="todos" className="todo-list">
          <option value="AllTask">All Task</option>
          <option value="completedTasks">Completed Tasks</option>
          <option value="uncompletedTasks">UnCompleted Tasks</option>
        </select>
    
      {tasklist !== [] ? (
        <ul>
          {tasklist.map((item) => (
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
