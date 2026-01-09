"use client";

import AppIcon from "./AppIcon";
import { apps } from "../config/apps";

export default function AppDrawer() {
  return (
    <section className="drawer-container">
      <h1 className="launcher-title">My App Launcher</h1>
      <p className="launcher-subtitle">
        All your apps, one place
      </p>

      <div className="app-grid">
        {apps.map((app) => (
          <AppIcon key={app.name} app={app} />
        ))}
      </div>
    </section>
  );
}
