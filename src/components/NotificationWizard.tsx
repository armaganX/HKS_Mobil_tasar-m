import React, { useState } from 'react';
import { 
  User, 
  Users, 
  FileSearch, 
  Package, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  AlertCircle,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const steps = [
  { id: 1, label: 'Bildirimci', icon: User },
  { id: 2, label: 'Kimden/Kime', icon: Users },
  { id: 3, label: 'Referans', icon: FileSearch },
  { id: 4, label: 'Mal Bilgileri', icon: Package },
  { id: 5, label: 'Gidecek Yer', icon: MapPin },
  { id: 6, label: 'Onay', icon: CheckCircle2 },
];

export default function NotificationWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3 text-blue-700">
              <Info size={20} className="shrink-0 mt-0.5" />
              <p className="text-xs font-medium leading-relaxed">
                Bildirimci bilgileri sistemde tanımlı profilinizden otomatik olarak getirilir. 
                Lütfen sıfatınızı seçerek devam edin.
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">TCKN / Vergi No</label>
                  <input type="text" value="12345678901" disabled readOnly className="w-full bg-zinc-100 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-600 cursor-not-allowed" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Ad Soyad / Ünvan</label>
                  <input type="text" value="KULLANICI ADI" disabled readOnly className="w-full bg-zinc-100 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-600 cursor-not-allowed" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Aktif Sıfat Listesi</label>
                <div className="grid grid-cols-1 gap-2">
                  {['Üretici', 'Komisyoncu', 'Tüccar'].map((role) => (
                    <button key={role} className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl hover:border-[#5A5A40] hover:bg-zinc-50 transition-all group">
                      <span className="font-bold text-sm text-zinc-700">{role}</span>
                      <div className="w-5 h-5 rounded-full border-2 border-zinc-200 group-hover:border-[#5A5A40] group-hover:bg-[#5A5A40]/10 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Muhatap TCKN / Vergi No</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Sorgula..." className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20" />
                  <button className="bg-[#5A5A40] text-white px-6 rounded-xl font-bold text-sm hover:bg-[#4A4A30] transition-colors">Sorgula</button>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3 text-amber-700">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <p className="text-xs font-medium leading-relaxed">
                  Kayıt bulunamazsa MERSİS, ESBİS, GİB ve KPS sistemlerinden otomatik sorgulama yapılacaktır.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
            <Package size={48} strokeWidth={1} />
            <p className="mt-4 font-medium italic">Bu adım analiz raporuna göre yapılandırılıyor...</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Progress Header */}
      <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
        <div className="flex justify-between items-center relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-100 -z-0" />
          <div 
            className="absolute top-5 left-0 h-0.5 bg-[#5A5A40] transition-all duration-500 -z-0" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
          
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                currentStep >= step.id 
                  ? "bg-[#5A5A40] border-[#5A5A40] text-white" 
                  : "bg-white border-zinc-200 text-zinc-400"
              )}>
                <step.icon size={18} />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider hidden sm:block",
                currentStep >= step.id ? "text-[#5A5A40]" : "text-zinc-400"
              )}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm min-h-[400px]">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-8 h-8 bg-[#5A5A40]/10 text-[#5A5A40] rounded-lg flex items-center justify-center text-sm">{currentStep}</span>
          {steps[currentStep - 1].label}
        </h3>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all",
            currentStep === 1 
              ? "text-zinc-300 cursor-not-allowed" 
              : "text-zinc-600 hover:bg-zinc-100"
          )}
        >
          <ChevronLeft size={18} /> Geri
        </button>
        
        <button
          onClick={nextStep}
          className="flex items-center gap-2 px-8 py-3 bg-[#5A5A40] text-white rounded-xl font-bold text-sm hover:bg-[#4A4A30] transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          {currentStep === steps.length ? 'Tamamla' : 'Devam Et'} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
