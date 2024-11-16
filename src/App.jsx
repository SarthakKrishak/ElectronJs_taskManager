import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Todo from "./components/Todo";

const App = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedColor, setSelectedColor] = useState("zinc"); // Holds selected color
  const [task, setTask] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTask(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage
  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Handle new task submission
  const submitHandler = (e) => {
    e.preventDefault();
    if (title && desc) {
      const newTask = { title, desc, color: selectedColor };
      const updatedTasks = [...task, newTask];

      saveTasks(updatedTasks);
      setTask(updatedTasks);

      // Clear inputs
      setTitle("");
      setDesc("");
      setSelectedColor("zinc");
    }
  };

  // Delete a task by index
  const deleteTask = (index) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    saveTasks(updatedTasks);
    setTask(updatedTasks);
  };

  return (
    <div className="bg-gradient-to-tr from-gray-900 via-gray-800 to-black min-h-screen text-white flex flex-col items-center">
      <Header />

      {/* Task Form */}
      <form
        onSubmit={submitHandler}
        className="bg-zinc-800 w-full max-w-lg p-8 rounded-lg shadow-2xl mt-8 border border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
          Create Task
        </h2>

        {/* Task Title */}
        <input
          type="text"
          placeholder="Task Title"
          className="bg-gray-700 text-white rounded-lg w-full px-6 py-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Task Description */}
        <textarea
          placeholder="Task Description"
          className="bg-gray-700 text-white rounded-lg w-full px-6 py-3 mb-6 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        {/* Color Picker */}
        <div className="flex justify-center items-center gap-3 mb-6">
          {[
            { color: "blue", hex: "#007BFF" },
            { color: "green", hex: "#28A745" },
            { color: "yellow", hex: "#FFC107" },
            { color: "gray", hex: "#6C757D" },
            { color: "purple", hex: "#6F42C1" },
          ].map(({ color, hex }) => (
            <button
              key={color}
              type="button"
              className={`rounded-full p-3 w-10 h-10 border-4 ${selectedColor === color ? "border-white" : "border-transparent"
                }`}
              style={{ backgroundColor: hex }}
              onClick={() => setSelectedColor(color)}
            ></button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 w-full py-3 rounded-lg text-white font-bold hover:bg-blue-600 transition-all duration-200 shadow-lg"
        >
          Add Task
        </button>
      </form>

      {/* Task Display */}
      <div className="p-16 w-full flex gap-6 flex-wrap shrink-0">
        {task.map((task, index) => (
          <Todo
            key={index}
            title={task.title}
            desc={task.desc}
            color={task.color}
            onDelete={() => deleteTask(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
