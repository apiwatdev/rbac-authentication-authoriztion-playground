import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { NAV_ITEMS } from "@/lib/nav/menu";
import LogoutButton from "./LogoutButton";

export default async function NavBar() {
 const session = await getSession();
  const perms = session?.user?.permissions || [];
  const items = NAV_ITEMS.filter((item) => {
  if (!item.requiredPermission) return true;
    return perms.includes(item.requiredPermission);
  });


  return (
    <header style={{ borderBottom: "1px solid #eee", padding: "12px 24px" }}>
     <nav style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 16 }}> 
        RBAC Demo
       </Link>
       
        <div style={{ display: "flex", gap: 12 }}>
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          {session ? (
            <>
              <span style={{ opacity: 0.7, fontSize: 14 }}>
                {session.user.email ?? session.user.id}
              </span>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
    
      </nav>
    </header>
  );
}
