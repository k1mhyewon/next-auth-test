"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    console.log("session.user", session?.user);
    return (
      <button
        className="px-12 py-4 border rounded-xl bg-red-300"
        onClick={() => signOut()}
      >
        {session.user.name}님 Sign Out
      </button>
    );
  }

  return (
    <button
      className="px-12 py-4 border rounded-xl bg-yellow-300"
      onClick={() => signIn()}
    >
      SignIn
    </button>
  );
}

export default SignInButton;
