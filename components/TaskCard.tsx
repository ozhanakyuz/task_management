import React from "react";
import { Card } from "react-bootstrap";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types/Task";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          className="mb-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
          }}
        >
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <Card.Subtitle className="text-muted text-end">
              Atanan: {task.assignee}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
