import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDoc, collection } from "firebase/firestore";
import type React from "react";
import { useState } from "react";
import { firebaseFirestore } from "./firebase";
import { ListPlus } from "lucide-react";

interface AddTaskFormProps {
  user: { uid: string };
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ user }) => {
  const [newTask, setNewTask] = useState("");

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      const taskRef = collection(firebaseFirestore, `/users/${user.uid}/tasks`);
      await addDoc(taskRef, {
        userId: user.uid,
        name: newTask,
        done: false,
        scheduledAt: null,
        createdAt: new Date(),
      });
      setNewTask("");
    }
  };

  return (
    <div className="flex space-x-2 mb-4">
      <Input
        type="text"
        value={newTask}
        onChange={handleTaskChange}
        placeholder="新しいタスクを入力"
      />
      <Button onClick={handleAddTask}>
        <ListPlus className="w-5 h-5" />
      </Button>
    </div>
  );
};
