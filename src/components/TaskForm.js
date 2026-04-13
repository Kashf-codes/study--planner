import React, { useState, useEffect } from "react";

function TaskForm() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleClick = () => {
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const handleDelete = (indexToDelete) => {
    const newTasks = tasks.filter((t, index) => index !== indexToDelete);
    setTasks(newTasks);
  };

  const handleComplete = (indexToComplete) => {
    const newTasks = tasks.map((t, index) => {
      if (index === indexToComplete) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });

    setTasks(newTasks);
  };

  // ✅ CORRECT PLACE (outside functions)
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add Task</button>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
              }}
            >
              {t.text}
            </span>

            <button onClick={() => handleComplete(index)}>Complete</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskForm;