"use client";

import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 14px",
        borderRadius: "6px",
        border: "1px solid #dadce0",
        background: "#fff",
        color: "#3c4043",
        fontSize: "14px",
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        width={18}
        height={18}
      />
      Sign in with Google
    </button>
  );
}
