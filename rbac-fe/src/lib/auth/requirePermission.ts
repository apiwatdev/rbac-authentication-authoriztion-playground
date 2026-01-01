import { redirect } from "next/navigation";
import { getSession } from "./session";

export async function requireAuth(){
    const session = await getSession();
    if(!session || !session.user){
        redirect('/login?message=You must be logged in to access this page');
    }
    return session;
}

export async function requirePermission(permission: string){ 
    const session = await requireAuth();
    if (!session.user) {
      redirect("/login?message=You must be logged in to access this page");
    }
  const perms = session.user.permissions ?? [];
  if (!perms.includes(permission)) redirect("/403");
  return session;
}

export async function requireRole(role: string){
    const session = await requireAuth();
    if (!session.user) {
      redirect("/login?message=You must be logged in to access this page");
    }
  const roles = session.user.roles ?? [];
  if (!roles.includes(role)) redirect("/403");
  return session;
}