"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Page() {
  const users = useQuery(api.users.getUsers);
  const add = useMutation(api.users.add);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <Authenticated>
        <p>Authenticated</p>
        <button onClick={() => add()}>Add</button>
        <UserButton />
      </Authenticated>
      <Unauthenticated>
        <p>Unauthenticated</p>
        <button onClick={() => add()}>Add</button>
        <SignInButton />
      </Unauthenticated>
    </div>
  )
}
