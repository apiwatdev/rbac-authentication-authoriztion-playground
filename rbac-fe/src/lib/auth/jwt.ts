import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

export type JwtClaims = {
  sub: string; // user identifier
  email?: string;
  roles?: string[];
  permissions?: string[];
}

export async function signMockJwt(claims: JwtClaims, expiresInSec = 3600): Promise<string> {

    return await new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresInSec)
    .sign(secret);
}

export async function verifyJwt(token: string): Promise<JwtClaims | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as unknown as JwtClaims & { exp?: number; iat?: number };
    } catch (e) {
        return null;
    }
}