import { useEffect, useState } from "react";

export default function useLocalStorage<T>(storageKey: string, defaultValue: T) {
  // Load from localStorage ONCE (initial state)
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? (JSON.parse(saved) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  // Save to localStorage anytime value changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // if localStorage fails, don't crash the app
    }
  }, [storageKey, value]);

  return { value, setValue };
}
