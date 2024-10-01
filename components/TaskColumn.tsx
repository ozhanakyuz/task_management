import React from "react";
import { Col } from "react-bootstrap";
import { Droppable } from "@hello-pangea/dnd";
import { Task } from "../types/Task";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  status: string;
  tasks: Task[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks }) => {
  return (
    <Col>
      <h4 className="text-center">{status}</h4>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: "500px",
              padding: "8px",
              background: snapshot.isDraggingOver ? "#e9ecef" : "#f8f9fa",
              borderRadius: "4px",
            }}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default TaskColumn;
