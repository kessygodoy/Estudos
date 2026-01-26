"use client";

import { useAuth } from "@/contexts/AuthContext";
import WalletCard from "@/components/WalletCard";
import LotterySection from "@/components/LotterySection";
import { LogOut } from "lucide-react";

export default function DashboardPage() {
    const { user, logout, loading } = useAuth();

    if (loading) return null; // Or skeleton

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
                        <p className="text-gray-400 text-sm">Let's play and win!</p>
                    </div>
                    <button onClick={logout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition">
                        <LogOut size={18} /> Logout
                    </button>
                </header>

                <WalletCard />
                <LotterySection />
            </div>
        </div>
    );
}
