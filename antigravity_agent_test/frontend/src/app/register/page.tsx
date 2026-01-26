"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", { name, email, password });
            router.push("/login");
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to register");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg bg-gray-800 p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-center text-purple-400">Create Account</h2>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <div>
                    <label className="block text-sm">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded bg-gray-700 p-2 border border-gray-600 focus:outline-none focus:border-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded bg-gray-700 p-2 border border-gray-600 focus:outline-none focus:border-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded bg-gray-700 p-2 border border-gray-600 focus:outline-none focus:border-purple-500"
                        required
                    />
                </div>

                <button type="submit" className="w-full rounded bg-purple-600 p-2 hover:bg-purple-500 transition">
                    Register
                </button>

                <p className="text-center text-sm text-gray-400">
                    Already have an account? <Link href="/login" className="text-purple-400 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
}
