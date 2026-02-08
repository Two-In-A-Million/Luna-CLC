import { useEffect, useState } from "react";

export const useSecretCommands = (targetKeys: string[], callback: () => void) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const allPressed = targetKeys.every((t) => pressedKeys.has(t.toLowerCase()));

    if (allPressed) {
      console.log("SUCCESS: Calling toggle now!");
      callback();
      setPressedKeys(new Set()); 
    }
  }, [pressedKeys, targetKeys, callback]); 
};