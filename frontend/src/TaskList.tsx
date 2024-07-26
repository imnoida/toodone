import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import type React from "react";
import { useState } from "react";
import { TaskItem } from "./TaskItem";
import type { Task } from "./data/task";

interface TaskListProps {
  tasks: Task[];
  user: { uid: string };
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, user }) => {
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);

  const filteredTasks = showIncompleteOnly
    ? tasks.filter((task) => !task.done)
    : tasks;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo リスト</CardTitle>
        <div className="flex items-center space-x-2">
          <Switch
            id="show-incomplete"
            checked={showIncompleteOnly}
            onCheckedChange={setShowIncompleteOnly}
          />
          <label htmlFor="show-incomplete">未完了のタスクのみ表示</label>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">完了</TableHead>
              <TableHead>タスク</TableHead>
              <TableHead className="w-[100px]">アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} user={user} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
