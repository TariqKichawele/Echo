"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

export default function Page() {
  const users = useQuery(api.users.getUsers);
  const add = useMutation(api.users.add);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <p>apps/web</p>
      <button onClick={() => add()}>Add</button>
    </div>
  )
}
