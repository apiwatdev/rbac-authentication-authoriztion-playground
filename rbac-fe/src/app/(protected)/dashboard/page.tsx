import { requireAuth } from "@/src/lib/auth/requirePermission";

export default async function DashboardPage() {
  const session = await requireAuth();
  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Welcome: {session?.user.email ?? session.user.id}</p>
      <p>Permissions: {(session?.user.permissions ?? []).join(", ")}</p>
    </main>
  );
}
