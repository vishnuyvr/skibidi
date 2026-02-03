"use client";

import { useEffect, useMemo, useState } from "react";
import { apps } from "../config/apps";

export default function SpotlightSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Filter apps
  const results = useMemo(() => {
    const q = query.toLowerCase();
    return apps.filter((app) =>
      app.name.toLowerCase().includes(q)
    );
  }, [query]);

  // Open app
  const openApp = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setQuery("");
  };

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && results[activeIndex]) {
      openApp(results[activeIndex].url);
    }
  };

  if (!open) return null;

  return (
    <div className="spotlight-overlay" onClick={() => setOpen(false)}>
      <div
        className="spotlight"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          placeholder="Search apps..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={onKeyDown}
        />

        <ul className="spotlight-results">
          {results.map((app, index) => {
            const Icon = app.icon;
            return (
              <li
                key={app.name}
                className={index === activeIndex ? "active" : ""}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => openApp(app.url)}
              >
                <Icon size={18} />
                <span>{app.name}</span>
              </li>
            );
          })}

          {results.length === 0 && (
            <li className="empty">No results</li>
          )}
        </ul>
      </div>
    </div>
  );
}
