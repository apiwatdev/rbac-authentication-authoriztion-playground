import { cookies } from "next/headers";
import { COOKIE_ACCESS } from "./cookieNames";

export type SessionUser = {
  id: string | number;
  email?: string;
  roles: string[];
  permissions: string[];
};

export type Session = {
  user: SessionUser;
  exp?: number | null;
};

type JwtPayload = {
   sub?: string | number;
  userId?: string | number;
  id?: string | number;
  email?: string;
  roles?: string[];
  permissions?: string[];
  exp?: number;
}

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(base64, "base64").toString("utf8");
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies(); 
  const token = cookieStore.get(COOKIE_ACCESS)?.value;
  if (!token) return null;

  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload !== "object" || payload === null) {
    return null;
  }
  const user: SessionUser = {
    id:payload.sub ?? payload.userId ?? payload.id ?? "unknown",
    email: payload?.email ,
    roles: Array.isArray(payload.roles) ? payload.roles : [],
    permissions: Array.isArray(payload.permissions) ? payload.permissions : [],
  };

   return { user, exp: payload.exp };
}


export async function isLoggedIn(): Promise<boolean> {
    const session = await getSession();
    return !!session?.user;
}