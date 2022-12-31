import React from "react";
import { TL } from "../interfaces";

interface Props {
  task: TL;
  completeTask(taskToDelete: string): void;
  toggleBox(taskToToggle: string): void;
  // pass function to component
}

export const TodoList = ({ task, completeTask, toggleBox }: Props) => {
  const handleDelete = () => {
    completeTask(task.id);
  };

  const handleCheck = () => {
    toggleBox(task.id);
  };

  return (
    <div className="task">
      <div className="content">
        <input
          className="checkbox"
          type="checkbox"
          onChange={handleCheck}
          checked={task.completed}
        />
        <span>{task.taskName}</span>
        <span>{task.taskDeadline}</span>
      </div>
      <button onClick={handleDelete}>&times;</button>
    </div>
  );
};
