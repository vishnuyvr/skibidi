"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
};

export default function AddAppModal({ open, onClose, onAdded }: Props) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async () => {
    if (!name || !url) return;

    setLoading(true);
    try {
      await fetch("/api/apps/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          url,
          icon: icon || "Link",
        }),
      });

      setName("");
      setUrl("");
      setIcon("");
      onAdded();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Add Custom App</h3>

        <input
          placeholder="App name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          placeholder="Icon (optional, e.g. Globe)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />

        <div className="modal-actions">
          <button className="nav-button" onClick={onClose}>Cancel</button>
          <button className="nav-button" disabled={loading} onClick={submit}>
            {loading ? "Adding..." : "Add App"}
          </button>
        </div>
      </div>
    </div>
  );
}