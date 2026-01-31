'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [balance, setBalance] = useState(850.50);
  const [history, setHistory] = useState([
    { id: 1, item: 'Monthly Allowance', amount: '+1000', date: 'Jan 1', type: 'credit' }
  ]);

  // Load balance from "browser memory" when page opens
  useEffect(() => {
    const savedBalance = localStorage.getItem('campusBalance');
    if (savedBalance) setBalance(parseFloat(savedBalance));
  }, []);

  const handlePay = (cost: number, itemName: string) => {
    if (balance >= cost) {
      const newBalance = balance - cost;
      setBalance(newBalance);
      localStorage.setItem('campusBalance', newBalance.toString()); // Save to memory
      
      setHistory([{ 
        id: Date.now(), 
        item: itemName, 
        amount: `-${cost}`, 
        date: 'Just Now', 
        type: 'debit' 
      }, ...history]);
    } else {
      alert("Insufficient Balance!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black">CampusPay</h1>
            <p className="text-sm text-slate-500 font-medium">Student View</p>
          </div>
          <button onClick={() => router.push('/login')} className="text-xs font-bold text-red-600 bg-red-50 px-3 py-2 rounded-lg">Logout</button>
        </header>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm mb-8">
          <p className="text-xs uppercase font-bold text-slate-400 mb-1">Available Balance</p>
          <h2 className="text-5xl font-black text-slate-900">₹{balance.toFixed(2)}</h2>
          <button onClick={() => router.push('/merchant')} className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm">Open Merchant Terminal</button>
        </div>

        <h3 className="font-bold text-slate-800 mb-4 text-lg">Quick Pay</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button onClick={() => handlePay(60, "Canteen Lunch")} className="bg-white border border-slate-200 p-5 rounded-2xl text-left hover:border-blue-500 transition">
            <span className="text-3xl block mb-2">🍔</span>
            <span className="font-bold text-slate-800 block text-sm">Canteen (₹60)</span>
          </button>
          <button onClick={() => handlePay(20, "Stationery")} className="bg-white border border-slate-200 p-5 rounded-2xl text-left hover:border-blue-500 transition">
            <span className="text-3xl block mb-2">📚</span>
            <span className="font-bold text-slate-800 block text-sm">Books (₹20)</span>
          </button>
        </div>

        <h3 className="font-bold text-slate-800 mb-4 text-lg">History</h3>
        <div className="space-y-3">
          {history.map((tx) => (
            <div key={tx.id} className="bg-white border border-slate-200 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800 text-sm">{tx.item}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.date}</p>
              </div>
              <p className="font-black text-slate-900">{tx.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}