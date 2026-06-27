import { useState, useEffect } from "react";

// Default theme is dark (ClickStart premium navy). `light` toggles the `.light` class.
export function useTheme() {
  const [light, setLight] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    document.documentElement.classList.toggle("dark", !light);
    localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);

  // Keep API stable: `dark` reflects current state for existing callers.
  return { dark: !light, toggle: () => setLight((l) => !l) };
}
