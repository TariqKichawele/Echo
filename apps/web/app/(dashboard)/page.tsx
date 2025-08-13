"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

export default function Page() {
  const add = useMutation(api.users.add);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <p>Dashboard</p>
      <OrganizationSwitcher hidePersonal={true} />
      <button onClick={() => add()}>Add</button>
    </div>
  )
}
