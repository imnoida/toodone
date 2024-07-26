import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import type React from "react";

interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkMode,
  setIsDarkMode,
}) => {
  return (
    <Button onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
};
