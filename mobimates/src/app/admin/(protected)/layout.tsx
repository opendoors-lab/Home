import AdminRouteGuard from "@/components/admin/AdminRouteGuard";
import AdminShell from "@/components/admin/AdminShell";

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell>
      <AdminRouteGuard>{children}</AdminRouteGuard>
    </AdminShell>
  );
}
