"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { defaultApps } from "@/lib/defaultApps";
import AppIcon from "./AppIcon";

type App = {
  _id?: string;
  name: string;
  url: string;
  icon: string;
};

export default function AppDrawer() {
  const { data: session, status } = useSession();
  const [apps, setApps] = useState<App[]>(defaultApps);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 🚫 Not logged in → show defaults only
    if (status !== "authenticated") {
      setApps(defaultApps);
      return;
    }

    // ✅ Logged in → fetch from DB
    const fetchApps = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/apps");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setApps(data);
        } else {
          // Safety fallback
          setApps(defaultApps);
        }
      } catch (err) {
        console.error("Failed to fetch apps", err);
        setApps(defaultApps);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [status]);

  return (
    <div className="drawer-container">
      <h3 className="launcher-title">Your Apps</h3>
      <p className="launcher-subtitle">
        {loading ? "Loading apps..." : "Quick access to your tools"}
      </p>

      <div className="app-grid">
        {apps.map((app) => (
          <AppIcon key={app._id ?? app.name} app={app} />
        ))}
      </div>
    </div>
  );
}