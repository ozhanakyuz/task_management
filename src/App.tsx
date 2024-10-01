import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AddTaskForm from "../components/AddTaskForm";
import TaskBoard from "../components/TaskBoard";
import { Task } from "../types/Task";
import { v4 as uuidv4 } from "uuid";

// Görev dizisini burada tanımlıyoruz
const taskData = [
  {
    title: "Express Myself",
    description: "Set the building on fire.",
    status: "To Do",
    assignee: "Lyla Harper",
  },
  {
    title: "Catch Up Work - Saturday",
    description: "Gonna need you to come into work on Saturday",
    status: "In Progress",
    assignee: "Hayes Aguirre",
  },
  {
    title: "Catch Up Work - Sunday",
    description: "Gonna need you to come into work on Sunday too.",
    status: "In Progress",
    assignee: "Ariah Koch",
  },
  {
    title: "TPS Reports",
    description: "Did you get the memo?",
    status: "Done",
    assignee: "Salvador Vega",
  },
  {
    title: 'Buy some more "Flare"',
    description: "Apparently, 13 is not the minimum number of Flare.",
    status: "Done",
    assignee: "Dakota Calhoun",
  },
  {
    title: "Move desk into storage room B",
    description:
      "See if you can take care of some of the rat problem while you're down here.",
    status: "Done",
    assignee: "Gary Crane",
  },
];

const initialTasks: Task[] = [];

// taskData'yı forEach ile döngüye al ve her bir nesneye id ekle
taskData.forEach((task) => {
  initialTasks.push({
    ...task,
    id: uuidv4(), // Her bir görev için yeni bir UUID oluştur
  });
});

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Task Management</h1>
      <AddTaskForm addTask={addTask} />
      <TaskBoard tasks={tasks} setTasks={setTasks} />
    </Container>
  );
};

export default App;
