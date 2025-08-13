"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <p>Dashboard</p>
      <OrganizationSwitcher hidePersonal={true} />
    </div>
  )
}
