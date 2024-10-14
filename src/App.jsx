import { useState } from "react";
import './App.css'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([
    ["Eat Lunch", "2024-10-14", "14:30"],
    ["Take a Shower", "2024-10-14", "12:30"],
  ]);
  const [newTask, setNewTask] = useState({
    name: "",
    time: "",
    date: "",
  });

  /* here we are making use of the structure we set up for newTask, all 3 items of the array are named */
  function handleChange(event) {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  }

  /* checking if the new task is emprty, if not we just add it to the tasks array and empty newTask */
  function addTask(event) {
    event.preventDefault(); // Prevent page refresh
    if(newTask.name != "" && newTask.date != "" && newTask.time != ""  ){
      setTasks([...tasks, [newTask.name, newTask.date, newTask.time]]);
      setNewTask({ name: "", date: "", time: "" }); // Reset input fields
    }
    
  }
  /* here we ahve an array, so all entry have an index by default, the filter just checks all the indexes with
   the index we proivede until it matches, then deletes the matched index */
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_,i) => i !== index);
    setTasks(updatedTasks)

  }

  function moveUp(index) {
    if(index > 0){
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index -1 ], updatedTasks[index]]
      setTasks(updatedTasks)
    }
  }

  function moveDown(index) {
    if(index < tasks.length - 1){
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1 ], updatedTasks[index]]
      setTasks(updatedTasks)
    }
  }

  return (
    <div className="bg-black block text-white font-sans">
      <h1 className="text-white text-center pt-2 text-2xl">New Task</h1>

      <div>
        <div className="mx-14 my-12 p-12 rounded-md bg-slate-500 flex justify-around text-black">
          <div className="w-[250px] text-wrap">
            <h2 className="pb-1 font-bold">Activity</h2>
            <input
              type="text"
              id="name"
              name="name"
              value={newTask.name}
              onChange={handleChange}
            />
          </div>
          <div className="w-[250px] text-wrap">
            <h2 className="pb-1 font-bold">Time</h2>
            <input
              type="time"
              id="time"
              name="time"
              value={newTask.time}
              onChange={handleChange}
            />
          </div>
          <div className="w-[250px] text-wrap">
            <h2 className="pb-1 font-bold">Date</h2>
            <input
              type="date"
              id="date"
              name="date"
              value={newTask.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-slate-500 p-2 mb-12"  type="submit" onClick={addTask}>Add Task</button>
        </div>
      </div>

      <div>
        <h1 className="text-white text-center text-2xl">List of Tasks</h1>
        {tasks.map((taskInfo, index) => {
          console.log(tasks);
          console.log(taskInfo);
          return (
            <div
              className="mx-14 my-6 p-8 rounded-md bg-slate-500 flex justify-around"
              key={index}
            >
              <div className="max-w-[250px] text-wrap">
                <h2 className="font-bold">Activity</h2>
                <p>{taskInfo[0]}</p>
              </div>
              <div className="max-w-[250px] text-wrap">
                <h2 className="font-bold">Time</h2>
                <p>{taskInfo[1]}</p>
              </div>
              <div className="max-w-[250px] text-wrap">
                <h2 className="font-bold">Date</h2>
                <p>{taskInfo[2]}</p>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="bg-red-600 p-2"
                  onClick={() => deleteTask(index)}
                >
                  DELETE
                </button>
                <button
                  className="bg-white text-black p-2 m-1"
                  onClick={() => moveUp(index)}
                >
                  <FaChevronUp/>
                </button>
                <button
                  className="bg-white text-black p-2"
                  onClick={() => moveDown(index)}
                >
                  <FaChevronDown/>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
