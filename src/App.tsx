import React, { ChangeEvent, FC, useState, useEffect } from "react";
import "./App.css";

import { TL } from "./interfaces";
import { TodoList } from "./components/TodoList";

// function App() {
const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<TL[]>([]);

  const LOCAL_STORAGE_KEY = "MYTODOLIST";

  useEffect(() => {
    //https://stackoverflow.com/questions/67700374/use-localstorage-getitem-with-typescript
    const storedTasks = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || ""
    );
    if (storedTasks) setTodoList(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

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
    const newTask = {
      id: crypto.randomUUID(),
      taskName: task,
      taskDeadline: deadline,
      completed: false,
    };
    setTodoList((prev) => {
      return [...prev, newTask];
    });
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskToDelete: string): void => {
    const newTask = todoList.filter((task) => {
      return task.id !== taskToDelete;
    });
    setTodoList(newTask);
  };

  const toggleBox = (taskToToggle: string): void => {
    const newTask = [...todoList];
    const task = newTask.find((task) => {
      return task.id === taskToToggle;
    });
    if (task === undefined) return;
    task.completed = !task.completed;
    setTodoList(newTask);
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
        {todoList.map((task: TL) => {
          return (
            <TodoList
              key={crypto.randomUUID()}
              task={task}
              completeTask={completeTask}
              toggleBox={toggleBox}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
