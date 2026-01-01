import { requirePermission } from "@/src/lib/auth/requirePermission";


export default async function AdminPage() {

    await requirePermission("admin.view");

    return (
        <main style={{ padding: 24 }}>
          <h1>Admin Page</h1>
           <p>Only users with admin.view can see this.</p>
        </main>
    )
}