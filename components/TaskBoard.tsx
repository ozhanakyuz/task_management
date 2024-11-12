import React from "react";
import { Container, Row } from "react-bootstrap";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import { Task } from "../types/Task";

interface TaskBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, setTasks }) => {
  const onDragEnd = (result: DropResult) => {
    console.log("Drag Result:", result);
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedTask = tasks.find((task) => task.id === draggableId);
    if (!draggedTask) {
      console.error(`Görev bulunamadı: ${draggableId}`);
      return;
    }

    const updatedTask: Task = {
      ...draggedTask,
      status: destination.droppableId as Task["status"],
    };

    const newTasks = tasks.filter((task) => task.id !== draggableId);

    const destinationTasks = newTasks.filter(
      (task) => task.status === destination.droppableId
    );

    let insertAt = 0;
    if (destination.index === 0) {
      const firstTaskInDestination = newTasks.find(
        (task) => task.status === destination.droppableId
      );
      if (firstTaskInDestination) {
        insertAt = newTasks.indexOf(firstTaskInDestination);
      } else {
        insertAt = newTasks.length;
      }
    } else {
      const prevTaskInDestination = destinationTasks[destination.index - 1];
      if (prevTaskInDestination) {
        insertAt = newTasks.indexOf(prevTaskInDestination) + 1;
      } else {
        insertAt = newTasks.length;
      }
    }

    newTasks.splice(insertAt, 0, updatedTask);

    setTasks(newTasks);
  };

  const statuses: Task["status"][] = ["To Do", "In Progress", "Done"];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container fluid>
        <Row>
          {statuses.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </Row>
      </Container>
    </DragDropContext>
  );
};

export default TaskBoard;
