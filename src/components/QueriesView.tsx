import React, { useState } from 'react';
import { Search, Filter, ChevronRight, FileDown, Printer, QrCode, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

export default function QueriesView() {
  const [activeTab, setActiveTab] = useState('notifications');

  const tabs = [
    { id: 'notifications', label: 'Bildirimler' },
    { id: 'bulletin', label: 'Bülten' },
    { id: 'fees', label: 'Rüsum' },
    { id: 'debts', label: 'Borçlar' },
    { id: 'stock', label: 'Stok' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all",
              activeTab === tab.id 
                ? "bg-[#5A5A40] text-white shadow-md" 
                : "bg-white text-zinc-500 border border-zinc-200 hover:bg-zinc-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[#5A5A40] mb-2">
          <Filter size={18} />
          <h3 className="font-bold">Filtrele</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Tarih Aralığı</label>
            <div className="relative">
              <input type="text" placeholder="14.11.2025 - 26.03.2026" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20" />
              <Calendar size={16} className="absolute right-4 top-3 text-zinc-400" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Ürün Türü</label>
            <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 appearance-none">
              <option>Tümü</option>
              <option>Sebze</option>
              <option>Meyve</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Künye / Plaka</label>
            <input type="text" placeholder="Sorgula..." className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20" />
          </div>
        </div>
        <button className="w-full bg-[#5A5A40] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#4A4A30] transition-colors flex items-center justify-center gap-2">
          <Search size={18} /> Sorgula
        </button>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bold text-lg">Sorgu Sonuçları</h3>
          <span className="text-xs text-zinc-500">12 kayıt bulundu</span>
        </div>
        
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-[#5A5A40]">
                    <QrCode size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Elma (Amasya)</h4>
                    <p className="text-xs text-zinc-500">Künye: 9876543210</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase">Aktif</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-zinc-100 mb-4">
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Miktar</p>
                  <p className="text-sm font-bold">850 kg</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Tarih</p>
                  <p className="text-sm font-bold">14.11.2025</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Plaka</p>
                  <p className="text-sm font-bold">06 HKS 06</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="p-2 text-zinc-400 hover:text-[#5A5A40] hover:bg-zinc-50 rounded-lg transition-colors">
                    <FileDown size={18} />
                  </button>
                  <button className="p-2 text-zinc-400 hover:text-[#5A5A40] hover:bg-zinc-50 rounded-lg transition-colors">
                    <Printer size={18} />
                  </button>
                </div>
                <button className="flex items-center gap-1 text-sm font-bold text-[#5A5A40] group-hover:translate-x-1 transition-transform">
                  Detayları Gör <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
