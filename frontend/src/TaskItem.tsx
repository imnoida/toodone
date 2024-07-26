import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { CircleX, FilePenLine, Save, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { Task } from "./data/task";

interface TaskItemProps {
  task: Task;
  user: { uid: string };
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, user }) => {
  const [editingTaskName, setEditingTaskName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckboxChange = async (checked: boolean) => {
    const firebaseFirestore = getFirestore();
    const taskRef = doc(firebaseFirestore, `/users/${user.uid}/tasks`, task.id);

    try {
      await updateDoc(taskRef, { done: checked });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const handleDeleteTask = async () => {
    const firebaseFirestore = getFirestore();
    const taskRef = doc(firebaseFirestore, `/users/${user.uid}/tasks`, task.id);

    try {
      await deleteDoc(taskRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const handleEditTask = () => {
    setIsEditing(true);
    setEditingTaskName(task.name);
  };

  const handleSaveTask = async () => {
    if (editingTaskName.trim() !== "") {
      const firebaseFirestore = getFirestore();
      const taskRef = doc(
        firebaseFirestore,
        `/users/${user.uid}/tasks`,
        task.id,
      );

      try {
        await updateDoc(taskRef, { name: editingTaskName });
        setIsEditing(false);
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingTaskName("");
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={task.done}
          onCheckedChange={(checked: boolean) => handleCheckboxChange(checked)}
        />
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            type="text"
            value={editingTaskName}
            onChange={(e) => setEditingTaskName(e.target.value)}
          />
        ) : (
          task.name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button size="sm" onClick={handleSaveTask}>
              <Save />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
              <CircleX />
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={handleEditTask}>
              <FilePenLine />
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDeleteTask}>
              <Trash2 />
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};
