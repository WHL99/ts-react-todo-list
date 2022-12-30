import React from "react";
import { TL } from "../interfaces";

interface Props {
  task: TL;
  completeTask(taskToDelete: string): void;
  // pass function to component
}

export const TodoTask = ({ task, completeTask }: Props) => {
  const handleDelete = () => {
    completeTask(task.taskName);
  };

  return (
    <div className="task">
      <div className="content">
        <span>{task.taskName}</span>
        <span>{task.taskDeadline}</span>
      </div>
      <button onClick={handleDelete}>&times;</button>
    </div>
  );
};
