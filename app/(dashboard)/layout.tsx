import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import SignInModal from "@/components/SigninModal";
import UpgradeModal from "@/components/UpgradeModal";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider
        className="h-[(min(100dvh, 100vh))] 
      w-[100vw]"
        style={
          {
            "--sidebar-width": "280px",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <main className="w-full flex-1">{children}</main>
      </SidebarProvider>

      <SignInModal />
      <UpgradeModal />
    </>
  );
}
