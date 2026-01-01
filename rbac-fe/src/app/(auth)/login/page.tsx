"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

    const router = useRouter();
    const [email,setEmail] = useState("staff@email.com");
    const [password,setPassword] = useState("password");
    const [error,setError] = useState("");

    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.message || "Login failed");
            return;
        }

        router.push("/dashboard");
        router.refresh();
    }

  return (
    <main style={{ padding: 24 }}>
      <h1>Login Page</h1>
      <p>This is a placeholder for the login page.</p>

      <p style={{ opacity: 0.8 }}>
        Demo users:
        <br />- admin@example.com (sees /admin)
        <br />- staff@example.com (no /admin)
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 400 }}>
        <label>
            Email: 
            <input 
            style={{width:"100%", padding:"8"}}
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
        </label>
        <label>
            Password: 
            <input  style={{ width: "100%", padding: 8 }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
           {error && <p style={{ color: "crimson" }}>{error}</p>}
        <button style={{padding:10}} > Login</button>
      </form>
    </main>
  );
}
