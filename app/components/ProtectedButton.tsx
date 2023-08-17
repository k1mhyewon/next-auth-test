"use client";
import React from "react";
import Link from "next/link";

function ProtectedButton() {
  return (
    <Link
      className="px-12 py-4 border rounded-xl bg-blue-300"
      href={"/protected"}
    >
      Protected
    </Link>
  );
}

export default ProtectedButton;
