"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Copy, RefreshCw, Wallet } from "lucide-react";

export default function WalletCard() {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    // Deposit State
    const [depositAmount, setDepositAmount] = useState("");
    const [pixCode, setPixCode] = useState("");

    // Withdraw State
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [pixKey, setPixKey] = useState("");

    const fetchBalance = async () => {
        try {
            const res = await api.get("/wallet/balance");
            setBalance(Number(res.data.balance));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    const handleDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/wallet/deposit", { amount: Number(depositAmount) });
            setPixCode(res.data.pixCopyPaste);
        } catch (err: any) {
            alert(err.response?.data?.error || "Deposit failed");
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/wallet/withdraw", { amount: Number(withdrawAmount), pixKey });
            alert("Withdrawal requested!");
            setWithdrawAmount("");
            setPixKey("");
            fetchBalance();
        } catch (err: any) {
            alert(err.response?.data?.error || "Withdraw failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
                    <Wallet /> My Wallet
                </h2>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">R$ {balance.toFixed(2)}</span>
                    <button onClick={fetchBalance} className="p-1 hover:bg-gray-700 rounded"><RefreshCw size={16} /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Deposit Section */}
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-green-400 mb-2">Deposit (Pix)</h3>
                    {!pixCode ? (
                        <form onSubmit={handleDeposit} className="space-y-2">
                            <input
                                type="number"
                                placeholder="Amount (R$)"
                                value={depositAmount}
                                onChange={e => setDepositAmount(e.target.value)}
                                className="w-full bg-gray-700 rounded p-2 text-sm"
                                min="1"
                                step="0.01"
                                required
                            />
                            <button disabled={loading} className="w-full bg-green-600 hover:bg-green-500 p-2 rounded text-sm transition">
                                Generate Pix
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-xs text-gray-400 break-all bg-gray-800 p-2 rounded border border-gray-700">
                                {pixCode}
                            </p>
                            <button onClick={() => { navigator.clipboard.writeText(pixCode); alert('Copied!'); }} className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 p-2 rounded text-sm">
                                <Copy size={14} /> Copy Code
                            </button>
                            <button onClick={() => setPixCode("")} className="w-full text-xs text-center text-gray-500 mt-2 underline">New Deposit</button>
                        </div>
                    )}
                </div>

                {/* Withdraw Section */}
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-red-400 mb-2">Withdraw</h3>
                    <form onSubmit={handleWithdraw} className="space-y-2">
                        <input
                            type="number"
                            placeholder="Amount (R$)"
                            value={withdrawAmount}
                            onChange={e => setWithdrawAmount(e.target.value)}
                            className="w-full bg-gray-700 rounded p-2 text-sm"
                            min="0.1"
                            step="0.01"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Pix Key (CPF, Email...)"
                            value={pixKey}
                            onChange={e => setPixKey(e.target.value)}
                            className="w-full bg-gray-700 rounded p-2 text-sm"
                            required
                        />
                        <button disabled={loading} className="w-full bg-red-600 hover:bg-red-500 p-2 rounded text-sm transition">
                            Request Withdraw
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
