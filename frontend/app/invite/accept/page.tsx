"use client";

import { Suspense } from "react";
import AcceptInvite from "./AcceptInvite";

export default function Page() {
  return (
    <Suspense fallback={<div>Accepting invite...</div>}>
      <AcceptInvite />
    </Suspense>
  );
}