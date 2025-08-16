import { AuthGuard } from "@/modules/auth/ui/components/AuthGuard";
import { OrganizationGuard } from "@/modules/auth/ui/components/OrganizationGuard";
import { cookies } from "next/headers";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { DashboardSidebar } from "../components/DashboardSidebar";

export const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const sidebarCookie = cookieStore.get("sidebar_state")?.value;
    const defaultOpen = sidebarCookie === undefined ? true : sidebarCookie === "true";

    return (
        <AuthGuard>
            <OrganizationGuard>
                <SidebarProvider defaultOpen={defaultOpen}>
                    <DashboardSidebar />
                    <main className="flex flex-1 flex-col">
                        {children}
                    </main>
                </SidebarProvider>
            </OrganizationGuard>
        </AuthGuard>
    )
}