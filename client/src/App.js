import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";
import axios from "axios";
import { BiMessageAltAdd } from "react-icons/bi";
import { AiTwotoneEdit } from "react-icons/ai";


function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/tasks").then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios
      .post("http://localhost:5000/api/v1/task", { task: input })
      .then((res) => {
        console.log(res.data);
        setInput("");
        setUpdateUI((prev) => !prev);
      });
  };

  const updateMode =(id,text)=>{
    console.log(text);
    setInput(text);
    setUpdateId(id)

  }

  const updateTask=()=>{
    axios.put(`http://localhost:5000/api/v1/task/${updateId}`,{task:input}).then((res)=>{
      console.log(res.data);
      setUpdateUI((prev)=>!prev);
      setUpdateId(null);
      setInput("");
    })
  }
  return (
    <div className="app">
      <h1>To Do List</h1>
      <div className="inputHolder">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={updateId?updateTask:addTask}>{updateId?<AiTwotoneEdit />:<BiMessageAltAdd/>}</button>
      </div>

      <ul >
        {tasks.map((task) => (
          <List
            task={task.task}
            key={task._id}
            id={task._id}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
