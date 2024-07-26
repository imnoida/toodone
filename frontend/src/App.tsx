import { Toaster } from "@/components/ui/toaster";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AddTaskForm } from "./AddTaskForm";
import { AuthForm } from "./AuthForm";
import { TaskList } from "./TaskList";
import { ThemeToggle } from "./ThemeToggle";
import { type Task, TaskConverter } from "./data/task";
import { firebaseFirestore } from "./firebase";
import { useAuthState } from "./hooks/useAuthState";

function App() {
  const [maybeUser] = useAuthState();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("dark-mode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    if (maybeUser) {
      const userId = maybeUser.uid;
      const col = collection(
        firebaseFirestore,
        `/users/${userId}/tasks`,
      ).withConverter(TaskConverter);

      return onSnapshot(col, {
        next: (sn) => {
          setTasks(sn.docs.map((docSn) => docSn.data()));
        },
      });
    }
  }, [maybeUser]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <div className={`container mx-auto p-4 ${isDarkMode ? "dark" : ""}`}>
      <Toaster />
      <div className="grid gap-4">
        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <AuthForm />
        {maybeUser && (
          <>
            <AddTaskForm user={maybeUser} />
            <TaskList tasks={tasks} user={maybeUser} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
