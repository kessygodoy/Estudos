"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";

export default function LotterySection() {
    const [lottery, setLottery] = useState<any>(null);
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchLottery = async () => {
        try {
            const res = await api.get("/lottery/current");
            setLottery(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLottery();
    }, []);

    const toggleNumber = (num: number) => {
        if (selectedNumbers.includes(num)) {
            setSelectedNumbers(prev => prev.filter(n => n !== num));
        } else {
            if (selectedNumbers.length < 5) {
                setSelectedNumbers(prev => [...prev, num]);
            }
        }
    };

    const handleBet = async () => {
        if (selectedNumbers.length !== 5) return;
        setLoading(true);
        try {
            await api.post("/lottery/bet", { numbers: selectedNumbers });
            alert("Bet placed successfully! Good luck!");
            setSelectedNumbers([]);
            fetchLottery(); // Refresh pool
        } catch (err: any) {
            alert(err.response?.data?.error || "Bet failed");
        } finally {
            setLoading(false);
        }
    };

    if (!lottery || !lottery.id) return <div className="text-gray-400">Loading Lottery...</div>;

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mt-6">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    PixLottery Jackpot
                </h2>
                <p className="text-gray-400 mt-2">Prize Pool: <span className="text-green-400 font-bold text-xl">R$ {Number(lottery.prize_pool).toFixed(2)}</span></p>
                <p className="text-sm text-gray-500">Draw Date: {new Date(lottery.draw_date).toLocaleDateString()}</p>
            </div>

            <div className="max-w-md mx-auto">
                <p className="text-center mb-4 text-sm text-gray-300">Pick 5 lucky numbers (1-10)</p>

                <div className="grid grid-cols-5 gap-4 mb-6">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                        <button
                            key={num}
                            onClick={() => toggleNumber(num)}
                            className={`
                h-12 w-12 rounded-full font-bold transition-all
                ${selectedNumbers.includes(num)
                                    ? 'bg-purple-600 text-white scale-110 shadow-lg shadow-purple-500/50'
                                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}
              `}
                        >
                            {num}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleBet}
                    disabled={selectedNumbers.length !== 5 || loading}
                    className={`
            w-full py-3 rounded-lg font-bold text-lg transition
            ${selectedNumbers.length === 5
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'}
          `}
                >
                    {loading ? 'Processing...' : 'Place Bet (R$ 0,10)'}
                </button>
            </div>
        </div>
    );
}
