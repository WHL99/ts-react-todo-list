import React, { ChangeEvent, FC, useState, useEffect } from "react";
import "./App.css";

import { TL } from "./interfaces";
import { TodoTask } from "./components/TodoTask";

// function App() {
const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<TL[]>([]);

  const LOCAL_STORAGE_KEY = "MYTODOLIST";

  //const handleChange = (e)=>{
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "task") {
      setTask(e.target.value);
    }
    if (e.target.name === "deadline") {
      setDeadline(Number(e.target.value));
    }
  };

  const handleAdd = (): void => {
    const newTask = { taskName: task, taskDeadline: deadline };
    setTodoList((prev) => {
      return [...prev, newTask];
    });

    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskToDelete;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            className="inputTask"
            onChange={handleChange}
            name="task"
            value={task}
            type="text"
            placeholder="Your task?"
          />
          <input
            className="inputDeadline"
            onChange={handleChange}
            name="deadline"
            value={deadline}
            type="number"
          />
        </div>
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="todoList">
        {todoList.map((task: TL, i: number) => {
          return <TodoTask key={i} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
