"use client";

import * as Icons from "lucide-react";
import { useState } from "react";

type App = {
  _id: string;
  name: string;
  url: string;
  icon: string;
};

export default function AppIcon({ app }: { app: App }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const Icon =
    (Icons as any)[app.icon] || Icons.Link;
  
  const deleteApp = async (appId: string) => {
    setLoading(true);
    try{
    await fetch("api/apps/delete", {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        appId
      })
    })
    window.location.reload();
  }
  finally{
    setLoading(false);
  }
  }

  const editApp = async () => {
    setLoading(true);
    try{
      await fetch("api/apps/edit", {
        method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
          id,
          name,
          url,
          icon: icon || "Link"
        })
      })
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="relative group inline-block">
      {/* App icon */}
      <a
        href={app.url}
        target="_blank"
        rel="noreferrer"
        className="app-icon"
      >
        <div className="icon-circle">
          <Icon size={26} />
        </div>
        <span className="app-label">{app.name}</span>
      </a>

      {/* Options button */}
      <button
        className="absolute top-1 right-1 z-10
                 opacity-0 group-hover:opacity-100
                 transition-opacity
                 bg-transparent rounded-full p-1
                 hover:bg-white"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpenMenu((prev) => !prev);
        }}
      >
        ⋮
      </button>

      {/* Options menu */}
      {openMenu && (
        <div
          className="absolute top-8 right-1 z-20 w-28
                   bg-white border rounded shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full px-3 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              setOpenMenu(false);
              editApp;
            }}
          >
            ✏️ Edit
          </button>

          <button
            className="w-full px-3 py-2 text-left text-red-600 hover:bg-gray-100"
            disabled={loading}
            onClick={() => {
              deleteApp(app._id);
              setOpenMenu(false);               
            }}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}