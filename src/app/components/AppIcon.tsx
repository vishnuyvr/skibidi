"use client";

import { AppConfig } from "../config/apps";

type AppIconProps = {
  app: AppConfig;
};

export default function AppIcon({ app }: AppIconProps) {
  const Icon = app.icon;

  const handleClick = () => {
    window.open(app.url, "_blank", "noopener,noreferrer");
  };

  return (
    <button className="app-icon" onClick={handleClick}>
      <div className="icon-circle">
        <Icon size={26} />
      </div>
      <span className="app-label">{app.name}</span>
    </button>
  );
}
