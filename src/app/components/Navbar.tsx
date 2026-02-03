"use client";

import { useSession, signOut } from "next-auth/react";
import GoogleSignInButton from "./GoogleSignInButton";
import AddAppModel from "./AddAppModel";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const { status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
    <nav className="navbar">
      <div className="nav-left">
        <span className="nav-brand">Apps</span>
        {status === "authenticated" && (
            <button
              className="nav-button"
              onClick={() => setOpen(true)}
            >
              + Add App
            </button>
          )}
      </div>

      <div className="nav-right">
        {session ? (
          <>
            <span>{session.user?.name}</span>
            <button
              className="nav-link"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        ) : (
          <GoogleSignInButton />
        )}
      </div>
    </nav>
    <AddAppModel
        open={open}
        onClose={() => setOpen(false)}
        onAdded={() => window.location.reload()}
      />
    </>
  );
}
