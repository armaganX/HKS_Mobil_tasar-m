import React, { useState } from 'react';
import { 
  History,
  UserPlus,
  Mail,
  Lock,
  Smartphone, 
  LayoutDashboard, 
  Search, 
  FileText, 
  Users, 
  User, 
  Bell, 
  ChevronRight, 
  QrCode, 
  TrendingUp, 
  ArrowLeft,
  Settings,
  Shield,
  CreditCard,
  Package,
  Clock,
  CheckCircle2,
  Info,
  MapPin,
  Plus,
  MoreVertical,
  Menu,
  HelpCircle,
  ScanLine,
  LogOut,
  Globe,
  FileSearch,
  MessageSquare,
  Send,
  Paperclip
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type Screen = 'login' | 'register' | 'dashboard' | 'query' | 'notificationWizard' | 'notificationsList' | 'profile' | 'menu' | 'history' | 'help' | 'qrcode' | 'profileInfo' | 'securitySettings' | 'appSettings' | 'changePassword' | 'liveChat';

const DESIGN_INFO: Record<Screen, { colors: string[], padding: string, icons: string[] }> = {
  login: { colors: ['#005994', '#FFFFFF', '#1C1B1F'], padding: '24px', icons: ['Smartphone'] },
  register: { colors: ['#005994', '#FFFFFF', '#1C1B1F'], padding: '24px', icons: ['UserPlus', 'Mail', 'Lock', 'ArrowLeft'] },
  dashboard: { colors: ['#005994', '#F39200', '#F8FAFC', '#1C1B1F'], padding: '12px', icons: ['LayoutDashboard', 'QrCode', 'FileText', 'Search', 'History', 'HelpCircle', 'TrendingUp', 'CreditCard', 'Clock'] },
  query: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '12px', icons: ['Search', 'QrCode', 'ChevronRight'] },
  notificationWizard: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '12px', icons: ['Info'] },
  notificationsList: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '12px', icons: ['Bell'] },
  profile: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '12px', icons: ['User', 'Shield', 'Settings', 'History', 'LogOut'] },
  menu: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '12px', icons: ['LayoutDashboard', 'Search', 'Bell', 'History', 'ScanLine', 'HelpCircle', 'Settings', 'Globe', 'MessageSquare', 'User', 'FileSearch', 'Info', 'LogOut'] },
  history: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '12px', icons: ['Search', 'FileText', 'CreditCard'] },
  help: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '16px', icons: ['HelpCircle', 'ChevronRight'] },
  qrcode: { colors: ['#000000', '#005994'], padding: '0px', icons: ['Info', 'Settings', 'ArrowLeft'] },
  profileInfo: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '16px', icons: [] },
  securitySettings: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '16px', icons: ['Smartphone', 'ChevronRight'] },
  appSettings: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '16px', icons: ['ChevronRight'] },
  changePassword: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '16px', icons: ['Lock', 'ArrowLeft'] },
  liveChat: { colors: ['#005994', '#F8FAFC', '#1C1B1F'], padding: '12px', icons: ['Send', 'Paperclip', 'ArrowLeft'] },
};

const BottomNavBar = ({ activeScreen, setActiveScreen, isDarkMode }: { activeScreen: Screen, setActiveScreen: (s: Screen) => void, isDarkMode: boolean }) => (
  <div className={cn(
    "h-12 flex justify-around items-center px-2 pb-0.5 border-t shrink-0 z-30 transition-colors",
    isDarkMode ? "bg-[#1C1B1F] border-[#49454F]" : "bg-[#F0F4F8] border-[#D1D9E0]"
  )}>
    {[
      { id: 'dashboard', icon: LayoutDashboard, label: 'Ana Sayfa' },
      { id: 'query', icon: Search, label: 'Sorgula' },
      { id: 'notificationsList', icon: Bell, label: 'Bildirimler' },
      { id: 'profile', icon: User, label: 'Profil' },
    ].map((item) => (
      <button 
        key={item.id} 
        onClick={() => setActiveScreen(item.id as Screen)}
        className="flex flex-col items-center gap-0 group"
      >
        <div className={cn(
          "px-3 py-0.5 rounded-full transition-all",
          (activeScreen === item.id || (item.id === 'notificationsList' && activeScreen === 'notificationWizard')) 
            ? "bg-[#005994] text-white" 
            : (isDarkMode ? "text-[#C9C5D0] group-hover:bg-[#005994]/20" : "text-[#44474E] group-hover:bg-[#005994]/10")
        )}>
          <item.icon size={16} />
        </div>
        <span className={cn(
          "text-[7px] font-medium mt-0.5",
          activeScreen === item.id 
            ? (isDarkMode ? "text-[#E6E1E5] font-bold" : "text-[#1B1B1F] font-bold") 
            : (isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")
        )}>{item.label}</span>
      </button>
    ))}
  </div>
);

export default function MobileAppDesignView() {
  const [activeScreen, setActiveScreen] = useState<Screen>('login');
  const [history, setHistory] = useState<Screen[]>(['login']);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = (screen: Screen) => {
    setIsLoading(true);
    setTimeout(() => {
      setHistory(prev => [...prev, screen]);
      setActiveScreen(screen);
      setIsLoading(false);
    }, 600);
  };

  const goBack = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (history.length > 1) {
        const newHistory = [...history];
        newHistory.pop();
        const prevScreen = newHistory[newHistory.length - 1];
        setHistory(newHistory);
        setActiveScreen(prevScreen);
      } else {
        setActiveScreen('dashboard');
      }
      setIsLoading(false);
    }, 400);
  };

  const renderTopBar = () => {
    if (activeScreen === 'login' || activeScreen === 'register') return null;
    
    const showBackButton = !['dashboard'].includes(activeScreen);

    const getTitle = () => {
      switch (activeScreen) {
        case 'dashboard': return 'HKS Mobil';
        case 'query': return 'Sorgulama';
        case 'notificationWizard': return 'Yeni Bildirim';
        case 'menu': return 'Menü';
        case 'history': return 'İşlem Geçmişi';
        case 'help': return 'Yardım Merkezi';
        case 'qrcode': return 'Karekod Okut';
        case 'profileInfo': return 'Profil Bilgileri';
        case 'securitySettings': return 'Güvenlik Ayarları';
        case 'appSettings': return 'Uygulama Ayarları';
        case 'changePassword': return 'Şifre Değiştir';
        case 'liveChat': return 'Canlı Destek';
        case 'notificationsList': return 'Bildirimler';
        case 'profile': return 'Profil';
        default: return '';
      }
    };

    return (
      <div className={cn(
        "px-4 pt-10 pb-2 flex justify-between items-center shrink-0 z-30 border-b transition-colors",
        isDarkMode ? "bg-[#1C1B1F] border-[#49454F]/30" : "bg-[#FFFFFF] border-[#D1D9E0]/50"
      )}>
        <div className="flex items-center gap-2 min-w-[40px]">
          {showBackButton && (
            <button onClick={goBack} className={cn(
              "p-2 rounded-full transition-colors",
              isDarkMode ? "hover:bg-zinc-800 text-[#E6E1E5]" : "hover:bg-zinc-100 text-[#44474E]"
            )}>
              <ArrowLeft size={20} />
            </button>
          )}
        </div>

        <h3 className={cn("text-sm font-bold truncate", isDarkMode ? "text-[#E6E1E5]" : "text-[#1B1B1F]")}>{getTitle()}</h3>

        <div className="flex items-center gap-1 min-w-[40px] justify-end">
          <button 
            onClick={() => navigateTo('menu')}
            className={cn(
              "p-2 rounded-full transition-colors",
              isDarkMode ? "text-[#E6E1E5] hover:bg-zinc-800" : "text-[#44474E] hover:bg-zinc-100"
            )}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    );
  };

  const LoadingOverlay = () => (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-[2px] dark:bg-[#1C1B1F]/60"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-12 h-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border-4 border-[#005994]/20 border-t-[#005994] rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-[#F39200] rounded-full" />
              </motion.div>
            </div>
            <span className={cn("text-[10px] font-bold tracking-widest uppercase", isDarkMode ? "text-[#E6E1E5]" : "text-[#005994]")}>
              Yükleniyor...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderScreen = () => {
    switch (activeScreen) {
      case 'login':
        return (
          <div className={cn("h-full flex flex-col p-6 items-center justify-center space-y-6 transition-colors scrollbar-hide", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#FFFFFF]")}>
            <div className="w-20 h-20 bg-[#005994] rounded-[28px] flex items-center justify-center shadow-md">
              <Smartphone className="text-white" size={40} />
            </div>
            <div className="text-center space-y-1">
              <h2 className={cn("text-2xl font-semibold", isDarkMode ? "text-[#E6E1E5]" : "text-[#1B1B1F]")}>HKS Mobil</h2>
              <p className={cn("text-sm", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>Hal Kayıt Sistemi</p>
            </div>
            <div className="w-full space-y-3">
              <button 
                onClick={() => navigateTo('dashboard')}
                className="w-full bg-[#005994] text-white py-3.5 rounded-full font-medium text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3"
              >
                <img src="https://www.turkiye.gov.tr/favicon.ico" className="w-5 h-5" alt="e-devlet" referrerPolicy="no-referrer" />
                e-Devlet ile Giriş
              </button>
              <button 
                onClick={() => navigateTo('register')}
                className={cn(
                  "w-full border py-3.5 rounded-full font-medium text-sm transition-all",
                  isDarkMode ? "border-[#49454F] text-[#005994] hover:bg-[#005994]/10" : "border-[#79747E] text-[#005994] hover:bg-[#005994]/5"
                )}
              >
                Kayıt Ol
              </button>
            </div>
            <p className={cn("text-[11px] text-center px-4", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>
              Giriş yaparak kullanım koşullarını ve gizlilik politikasını kabul etmiş olursunuz.
            </p>
          </div>
        );
      case 'register':
        return (
          <div className={cn("h-full flex flex-col p-6 space-y-6 transition-colors scrollbar-hide", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#FFFFFF]")}>
            <div className="flex items-center gap-4">
              <button onClick={goBack} className={cn("p-2 rounded-full", isDarkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800")}>
                <ArrowLeft size={20} />
              </button>
              <h2 className={cn("text-xl font-bold", isDarkMode ? "text-white" : "text-zinc-900")}>Kayıt Ol</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Ad Soyad</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-zinc-50 border-zinc-200")}>
                  <User size={18} className="text-[#005994]" />
                  <input type="text" placeholder="Adınız Soyadınız" className="bg-transparent border-none outline-none text-xs w-full" />
                </div>
              </div>
              <div className="space-y-1">
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>E-Posta</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-zinc-50 border-zinc-200")}>
                  <Globe size={18} className="text-[#005994]" />
                  <input type="email" placeholder="E-posta adresiniz" className="bg-transparent border-none outline-none text-xs w-full" />
                </div>
              </div>
              <div className="space-y-1">
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Şifre</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-zinc-50 border-zinc-200")}>
                  <Shield size={18} className="text-[#005994]" />
                  <input type="password" placeholder="••••••••" className="bg-transparent border-none outline-none text-xs w-full" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigateTo('dashboard')}
              className="w-full bg-[#005994] text-white py-3.5 rounded-full font-bold text-sm shadow-md"
            >
              Hesap Oluştur
            </button>

            <p className={cn("text-[10px] text-center", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>
              Zaten hesabınız var mı? <button onClick={() => navigateTo('login')} className="text-[#005994] font-bold">Giriş Yap</button>
            </p>
          </div>
        );
      case 'dashboard':
        return (
          <div className={cn("h-full flex flex-col overflow-hidden relative transition-colors scrollbar-hide", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 scrollbar-hide">
              {/* Hero Card - Modern & Compact */}
              <div className={cn(
                "p-4 rounded-[24px] shadow-sm flex justify-between items-center relative overflow-hidden transition-all",
                isDarkMode ? "bg-[#2B2930] border border-[#49454F]" : "bg-white border border-[#D1D9E0]"
              )}>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full border-2 border-[#005994] overflow-hidden">
                    <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
                  </div>
                  <div className="space-y-0.5">
                    <p className={cn("text-[8px] uppercase font-bold tracking-widest", isDarkMode ? "text-[#005994]" : "text-[#005994]")}>Hoş Geldiniz</p>
                    <h4 className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-zinc-900")}>Kullanıcı</h4>
                  </div>
                </div>
                <button 
                  onClick={() => navigateTo('qrcode')}
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-sm",
                    isDarkMode ? "bg-[#1C1B1F] text-[#005994] border border-[#49454F]" : "bg-[#F3EDF7] text-[#005994] border border-[#CAC4D0]/30"
                  )}
                >
                  <QrCode size={18} />
                </button>
              </div>

              {/* Quick Actions Grid - Compact */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: FileText, label: 'Bildirim', color: isDarkMode ? 'bg-[#005994]/20 text-[#005994]' : 'bg-[#005994]/10 text-[#005994]', action: () => navigateTo('notificationWizard') },
                  { icon: Search, label: 'Sorgu', color: isDarkMode ? 'bg-[#F39200]/20 text-[#F39200]' : 'bg-[#F39200]/10 text-[#F39200]', action: () => navigateTo('query') },
                  { icon: History, label: 'Geçmiş', color: isDarkMode ? 'bg-[#005994]/20 text-[#005994]' : 'bg-[#005994]/10 text-[#005994]', action: () => navigateTo('history') },
                  { icon: HelpCircle, label: 'Yardım', color: isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700', action: () => navigateTo('help') },
                ].map((item, idx) => (
                  <button key={idx} onClick={item.action} className="flex flex-col items-center gap-1">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-colors", item.color)}>
                      <item.icon size={22} />
                    </div>
                    <span className={cn("text-[10px] font-medium", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Material 3 Cards - Tighter Spacing */}
              <div className={cn("p-3 rounded-[16px] space-y-2 transition-colors", isDarkMode ? "bg-[#2B2930]" : "bg-[#F0F4F8]")}>
                <div className="flex items-center justify-between">
                  <h5 className={cn("text-[10px] font-bold uppercase tracking-tight", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>GÜNCEL DURUM</h5>
                  <MoreVertical size={14} className={isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]"} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className={cn("p-2.5 rounded-xl border flex flex-col gap-1 transition-colors", isDarkMode ? "bg-[#1C1B1F] border-[#49454F]" : "bg-white border-[#D1D9E0]")}>
                    <TrendingUp size={16} className="text-green-500" />
                    <p className={cn("text-[10px]", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>Aktif Bildirim</p>
                    <p className={cn("text-sm font-bold", isDarkMode ? "text-[#E6E1E5]" : "text-[#1B1B1F]")}>12 Adet</p>
                  </div>
                  <div className={cn("p-2.5 rounded-xl border flex flex-col gap-1 transition-colors", isDarkMode ? "bg-[#1C1B1F] border-[#49454F]" : "bg-white border-[#D1D9E0]")}>
                    <CreditCard size={16} className="text-red-500" />
                    <p className={cn("text-[10px]", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>Bekleyen Borç</p>
                    <p className={cn("text-sm font-bold", isDarkMode ? "text-[#E6E1E5]" : "text-[#1B1B1F]")}>₺1.250</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity List - Compact */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <h5 className={cn("text-[10px] font-bold uppercase tracking-tight", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>SON İŞLEMLER</h5>
                  <button className="text-[11px] font-bold text-[#005994]">Tümünü Gör</button>
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={cn(
                    "p-2.5 rounded-xl border flex items-center gap-3 transition-colors",
                    isDarkMode ? "bg-[#1C1B1F] border-[#49454F] hover:bg-[#005994]/10" : "bg-white border-[#D1D9E0] hover:bg-[#F8FAFC]"
                  )}>
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors", isDarkMode ? "bg-[#005994]/20 text-[#005994]" : "bg-[#E1F5FE] text-[#01579B]")}>
                      <Clock size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs font-semibold truncate", isDarkMode ? "text-[#E6E1E5]" : "text-[#1B1B1F]")}>Domates (Salkım)</p>
                      <p className={cn("text-[10px]", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>24.03.2026 • 14:30</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-green-500">+500 KG</p>
                      <p className={cn("text-[9px] font-bold uppercase", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>Tamamlandı</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Action Button - Smaller */}
            <button 
              onClick={() => setActiveScreen('notificationWizard')}
              className="absolute right-4 bottom-4 w-9 h-9 bg-[#F39200] text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-20"
            >
              <Plus size={18} />
            </button>
          </div>
        );
      case 'query':
        return (
          <div className={cn("h-full flex flex-col transition-colors scrollbar-hide", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            <div className="flex-1 p-3 space-y-4 overflow-y-auto scrollbar-hide">
              <div className={cn("p-4 rounded-[16px] border space-y-3 transition-colors", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-[#D1D9E0]")}>
                <div className="space-y-1">
                  <label className={cn("text-[11px] font-medium ml-1", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>Sorgu Tipi</label>
                  <select className={cn(
                    "w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#005994] transition-colors outline-none",
                    isDarkMode ? "bg-[#1C1B1F] border-[#49454F] text-[#E6E1E5]" : "bg-[#FFFFFF] border-[#79747E] text-[#1B1B1F]"
                  )}>
                    <option>Künye Sorgulama</option>
                    <option>Plaka Sorgulama</option>
                    <option>TCKN/VKN Sorgulama</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className={cn("text-[11px] font-medium ml-1", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>Künye Numarası</label>
                  <div className="relative">
                    <input type="text" placeholder="Örn: 12345678" className={cn(
                      "w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#005994] transition-colors outline-none",
                      isDarkMode ? "bg-[#1C1B1F] border-[#49454F] text-[#E6E1E5]" : "bg-[#FFFFFF] border-[#79747E] text-[#1B1B1F]"
                    )} />
                    <button 
                      onClick={() => navigateTo('qrcode')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#005994]"
                    >
                      <QrCode size={20} />
                    </button>
                  </div>
                </div>
                <button className="w-full bg-[#005994] text-white py-3 rounded-full font-medium text-sm shadow-sm hover:bg-[#004A99] transition-colors">Sorgula</button>
              </div>

              <div className="space-y-2">
                <h5 className={cn("text-[11px] font-bold uppercase px-1", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>SON SORGULAR</h5>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={cn(
                    "p-3 rounded-xl border flex items-center justify-between transition-colors",
                    isDarkMode ? "bg-[#1C1B1F] border-[#49454F]" : "bg-white border-[#D1D9E0]"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", isDarkMode ? "bg-zinc-800 text-[#C9C5D0]" : "bg-zinc-100 text-[#44474E]")}><Search size={16} /></div>
                      <div>
                        <p className={cn("text-xs font-bold", isDarkMode ? "text-[#E6E1E5]" : "text-[#1B1B1F]")}>Künye: 84729103</p>
                        <p className={cn("text-[10px]", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>Elma (Amasya)</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-zinc-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'notificationWizard':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto transition-colors", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            <div className="flex-1 p-3 space-y-4">
              {/* Progress Stepper - Material Style */}
              <div className="flex justify-between items-center px-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                      step === 1 
                        ? "bg-[#005994] text-white" 
                        : (isDarkMode ? "bg-[#2B2930] text-[#C9C5D0]" : "bg-[#EADDFF] text-[#21005D]")
                    )}>
                      {step}
                    </div>
                    {step < 4 && <div className={cn("flex-1 h-[2px] mx-1", isDarkMode ? "bg-[#49454F]" : "bg-[#CAC4D0]")} />}
                  </div>
                ))}
              </div>

              <div className={cn("p-4 rounded-[16px] border space-y-4 transition-colors", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-[#CAC4D0]")}>
                <div className="space-y-1">
                  <h4 className={cn("text-sm font-semibold", isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]")}>Bildirimci Sıfatı</h4>
                  <p className={cn("text-[11px]", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>İşlem yapacağınız sıfatı seçin.</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {['Üretici', 'Komisyoncu', 'Tüccar'].map((role) => (
                    <button key={role} className={cn(
                      "flex items-center justify-between p-3 border rounded-xl transition-all group",
                      isDarkMode 
                        ? "bg-[#1C1B1F] border-[#49454F] hover:bg-[#005994]/10" 
                        : "bg-[#FEF7FF] border-[#79747E] hover:bg-[#005994]/5"
                    )}>
                      <span className={cn("text-xs font-medium", isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]")}>{role}</span>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                        isDarkMode ? "border-[#49454F] group-hover:border-[#005994]" : "border-[#79747E] group-hover:border-[#005994]"
                      )}>
                        <div className={cn(
                          "w-2.5 h-2.5 rounded-full bg-transparent transition-colors",
                          "group-hover:bg-[#005994]"
                        )} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className={cn(
                "p-3 rounded-xl border flex gap-3 transition-colors",
                isDarkMode ? "bg-[#005994]/10 border-[#005994]/30" : "bg-[#E8DEF8] border-[#CAC4D0]"
              )}>
                <Info className={isDarkMode ? "text-[#005994]" : "text-[#21005D]"} size={18} />
                <p className={cn("text-[10px] leading-tight", isDarkMode ? "text-[#C9C5D0]" : "text-[#21005D]")}>
                  Bildirim işlemleri HKS üzerinden anlık gerçekleşir. Lütfen bilgilerin doğruluğundan emin olun.
                </p>
              </div>
            </div>
            <div className={cn("p-4 border-t pb-4 transition-colors", isDarkMode ? "bg-[#1C1B1F] border-[#49454F]" : "bg-[#FEF7FF] border-[#CAC4D0]")}>
              <button className="w-full bg-[#005994] text-white py-3 rounded-full font-medium text-sm shadow-sm opacity-50">Sonraki Adım</button>
            </div>
          </div>
        );
      case 'notificationsList':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto p-3 space-y-3 transition-colors", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            <div className="flex justify-between items-center px-1">
              <h5 className={cn("text-xs font-semibold", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>BİLDİRİMLERİM</h5>
              <button className="text-[10px] text-[#005994] font-bold">Okundu İşaretle</button>
            </div>
            {[
              { title: 'Yeni Fiyat Güncellemesi', desc: 'Domates fiyatları güncellendi.', time: '10 dk önce', unread: true },
              { title: 'İşlem Onayı', desc: '84729103 numaralı künye onaylandı.', time: '2 saat önce', unread: false },
              { title: 'Sistem Bakımı', desc: 'Bu gece 00:00\'da bakım yapılacaktır.', time: '5 saat önce', unread: false },
              { title: 'Yeni Mesaj', desc: 'Hal müdürlüğünden yeni mesajınız var.', time: 'Dün', unread: false },
            ].map((n, i) => (
              <div key={i} className={cn(
                "p-3 rounded-xl border flex gap-3 transition-colors",
                n.unread 
                  ? (isDarkMode ? "bg-[#005994]/10 border-[#005994]/30" : "bg-[#005994]/5 border-[#005994]/20") 
                  : (isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-[#CAC4D0]")
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  n.unread ? "bg-[#005994] text-white" : (isDarkMode ? "bg-zinc-800 text-[#C9C5D0]" : "bg-zinc-100 text-[#44474E]")
                )}>
                  <Bell size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h6 className={cn("text-xs font-bold truncate", isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]")}>{n.title}</h6>
                    <span className={cn("text-[9px] whitespace-nowrap ml-2", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>{n.time}</span>
                  </div>
                  <p className={cn("text-[10px] line-clamp-2 mt-0.5", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'menu':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto p-3 space-y-4 scrollbar-hide transition-colors", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: LayoutDashboard, label: 'Ana Sayfa', action: () => setActiveScreen('dashboard') },
                { icon: Search, label: 'Sorgulama', action: () => setActiveScreen('query') },
                { icon: Bell, label: 'Bildirimler', action: () => setActiveScreen('notificationsList') },
                { icon: History, label: 'Geçmiş', action: () => setActiveScreen('history') },
                { icon: ScanLine, label: 'Karekod', action: () => setActiveScreen('qrcode') },
                { icon: HelpCircle, label: 'Yardım', action: () => setActiveScreen('help') },
                { icon: Settings, label: 'Ayarlar', action: () => setActiveScreen('appSettings') },
                { icon: Globe, label: 'Web Sitesi', action: () => {} },
                { icon: MessageSquare, label: 'Destek', action: () => setActiveScreen('help') },
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={item.action}
                  className={cn(
                    "p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all shadow-sm",
                    isDarkMode ? "bg-[#2B2930] border-[#49454F] hover:bg-[#005994]/10" : "bg-white border-[#CAC4D0]/50 hover:bg-[#005994]/5"
                  )}
                >
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center transition-colors", isDarkMode ? "bg-zinc-800 text-[#005994]" : "bg-[#F3EDF7] text-[#005994]")}>
                    <item.icon size={18} />
                  </div>
                  <span className={cn("text-[9px] font-semibold text-center leading-tight", isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]")}>{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className={cn("rounded-xl border overflow-hidden shadow-sm transition-colors", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-[#CAC4D0]/50")}>
              {[
                { icon: User, label: 'Profilim', action: () => setActiveScreen('profile') },
                { icon: FileSearch, label: 'Mevzuat', action: () => {} },
                { icon: Info, label: 'Hakkımızda', action: () => {} },
              ].map((item, i) => (
                <button key={i} onClick={item.action} className={cn(
                  "w-full p-3.5 flex items-center gap-3.5 border-b last:border-0 transition-colors",
                  isDarkMode ? "hover:bg-zinc-800 border-[#49454F]" : "hover:bg-zinc-50 border-zinc-100"
                )}>
                  <item.icon size={16} className={isDarkMode ? "text-[#C9C5D0]" : "text-[#49454F]"} />
                  <span className={cn("text-xs font-medium", isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]")}>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-center pt-2">
              <button 
                onClick={() => setActiveScreen('login')}
                className={cn(
                  "px-6 py-2 rounded-full flex items-center gap-2 font-bold text-[10px] border transition-all",
                  isDarkMode ? "bg-red-900/20 text-red-400 border-red-900/30 hover:bg-red-900/30" : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                )}
              >
                <LogOut size={14} />
                Güvenli Çıkış
              </button>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto scrollbar-hide p-3 space-y-3 transition-colors", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            <div className="flex justify-between items-center px-1">
              <h5 className={cn("text-xs font-semibold", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>İŞLEM GEÇMİŞİ</h5>
              <button className={cn("p-1.5 rounded-lg transition-colors", isDarkMode ? "bg-zinc-800 text-[#C9C5D0]" : "bg-zinc-100 text-[#44474E]")}><Search size={14} /></button>
            </div>
            {[
              { type: 'Bildirim', item: 'Domates (Salkım)', date: '24.03.2026', amount: '+500 KG', status: 'Tamamlandı' },
              { type: 'Sorgu', item: 'Künye: 84729103', date: '23.03.2026', amount: 'Sorgulandı', status: 'Başarılı' },
              { type: 'Bildirim', item: 'Salatalık (Çengel)', date: '22.03.2026', amount: '+250 KG', status: 'Tamamlandı' },
              { type: 'Ödeme', item: 'Hal Rüsumu', date: '21.03.2026', amount: '-₺450.00', status: 'Ödendi' },
              { type: 'Bildirim', item: 'Biber (Sivri)', date: '20.03.2026', amount: '+120 KG', status: 'İptal Edildi', error: true },
            ].map((h, i) => (
              <div key={i} className={cn(
                "p-3 rounded-xl border flex items-center gap-3 transition-colors",
                isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-[#CAC4D0]"
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                  h.error ? "bg-red-100 text-red-600" : (isDarkMode ? "bg-zinc-800 text-[#005994]" : "bg-zinc-100 text-[#005994]")
                )}>
                  {h.type === 'Bildirim' ? <FileText size={18} /> : h.type === 'Sorgu' ? <Search size={18} /> : <CreditCard size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-xs font-bold truncate", isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]")}>{h.item}</p>
                  <p className={cn("text-[10px]", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>{h.date} • {h.type}</p>
                </div>
                <div className="text-right">
                  <p className={cn("text-xs font-bold", h.error ? "text-red-600" : (isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]"))}>{h.amount}</p>
                  <p className={cn("text-[9px] font-bold uppercase", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>{h.status}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'help':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto p-4 space-y-6 transition-colors", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            <div className="text-center space-y-2">
              <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors", isDarkMode ? "bg-[#005994]/20 text-[#005994]" : "bg-[#005994]/10 text-[#005994]")}>
                <HelpCircle size={32} />
              </div>
              <h4 className={cn("text-lg font-bold", isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]")}>Nasıl yardımcı olabiliriz?</h4>
              <p className={cn("text-xs", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>Sıkça sorulan sorular ve destek kanalları.</p>
            </div>

            <div className="space-y-2">
              <h5 className={cn("text-[11px] font-bold uppercase", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>POPÜLER KONULAR</h5>
              {[
                'Bildirim nasıl yapılır?',
                'Künye sorgulama hatası',
                'Şifremi unuttum',
                'Hal rüsumu ödeme işlemleri',
              ].map((q, i) => (
                <button key={i} className={cn(
                  "w-full p-3.5 rounded-xl border flex items-center justify-between transition-colors",
                  isDarkMode ? "bg-[#2B2930] border-[#49454F] hover:bg-zinc-800" : "bg-white border-[#CAC4D0] hover:bg-zinc-50"
                )}>
                  <span className={cn("text-xs font-medium", isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]")}>{q}</span>
                  <ChevronRight size={14} className="text-zinc-400" />
                </button>
              ))}
            </div>

            <div className={cn("p-4 rounded-2xl text-white space-y-3 shadow-md transition-colors", isDarkMode ? "bg-[#005994]/80" : "bg-[#005994]")}>
              <h5 className="text-sm font-bold">Canlı Destek</h5>
              <p className="text-[11px] text-white/80 leading-tight">Müşteri temsilcilerimizle anlık olarak görüşmeye başlayın.</p>
              <button 
                onClick={() => navigateTo('liveChat')}
                className="w-full bg-white text-[#005994] py-2.5 rounded-full font-bold text-xs hover:bg-zinc-100 transition-colors"
              >
                Sohbeti Başlat
              </button>
            </div>
          </div>
        );
      case 'qrcode':
        return (
          <div className="h-full flex flex-col bg-black relative overflow-hidden">
            {/* Camera View Simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-[#005994] rounded-tl-xl" />
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-[#005994] rounded-tr-xl" />
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-[#005994] rounded-bl-xl" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-[#005994] rounded-br-xl" />
                
                {/* Scanning Line Animation */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-[#005994] shadow-[0_0_15px_#005994]"
                />
              </div>
            </div>

            <div className="absolute bottom-12 left-0 right-0 text-center px-8 space-y-4">
              <p className="text-white text-xs font-medium">Künyeyi veya Karekodu çerçeve içine hizalayın.</p>
              <div className="flex justify-center gap-4">
                <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white"><Info size={20} /></button>
                <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white"><Settings size={20} /></button>
              </div>
            </div>

            <button 
              onClick={() => setActiveScreen('dashboard')}
              className="absolute top-12 left-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
        );
      case 'profile':
        return (
          <div className={cn("h-full flex flex-col transition-colors", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            <div className={cn(
              "px-4 py-3 flex items-center gap-4 border-b transition-colors",
              isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-[#F3EDF7] border-[#CAC4D0]"
            )}>
              <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden shrink-0">
                <img src="https://picsum.photos/seed/user/200/200" alt="User" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <h3 className={cn("text-sm font-bold", isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]")}>Kullanıcı</h3>
                <p className={cn("text-[10px]", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>Teknik Danışman • Armagan4celik@gmail.com</p>
              </div>
              <button onClick={() => setActiveScreen('profileInfo')} className={cn("p-2 rounded-full transition-colors", isDarkMode ? "text-[#005994] hover:bg-white/10" : "text-[#005994] hover:bg-white/50")}>
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              <div className={cn("rounded-xl border overflow-hidden shadow-sm transition-colors", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-[#CAC4D0]/50")}>
                {[
                  { icon: User, label: 'Profil Bilgileri', action: () => setActiveScreen('profileInfo') },
                  { icon: Shield, label: 'Güvenlik Ayarları', action: () => setActiveScreen('securitySettings') },
                  { icon: Settings, label: 'Uygulama Ayarları', action: () => setActiveScreen('appSettings') },
                  { icon: History, label: 'İşlem Geçmişi', action: () => setActiveScreen('history') },
                ].map((item, idx) => (
                  <button key={idx} onClick={item.action} className={cn(
                    "w-full p-3 flex items-center justify-between transition-all border-b last:border-0",
                    isDarkMode ? "hover:bg-zinc-800 border-[#49454F]" : "hover:bg-[#005994]/5 border-[#F3EDF7]"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border transition-colors", isDarkMode ? "bg-zinc-800 text-[#C9C5D0] border-[#49454F]" : "bg-[#FEF7FF] text-[#49454F] border-[#CAC4D0]/30")}><item.icon size={16} /></div>
                      <span className={cn("text-xs font-medium", isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]")}>{item.label}</span>
                    </div>
                    <ChevronRight size={14} className="text-zinc-400" />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setActiveScreen('login')}
                className={cn(
                  "w-full p-2.5 rounded-xl border flex items-center justify-center gap-2 font-bold text-[10px] transition-all shadow-sm",
                  isDarkMode ? "bg-red-900/20 text-red-400 border-red-900/30 hover:bg-red-900/30" : "bg-white text-red-600 border-red-100 hover:bg-red-50"
                )}
              >
                <LogOut size={14} />
                Çıkış Yap
              </button>
            </div>
          </div>
        );
      case 'profileInfo':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto scrollbar-hide p-4 space-y-4 transition-colors", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            <div className="space-y-3">
              {[
                { label: 'Ad Soyad', value: 'Kullanıcı' },
                { label: 'E-Posta', value: 'Armagan4celik@gmail.com' },
                { label: 'Telefon', value: '+90 555 000 00 00' },
                { label: 'TCKN', value: '12345678901' },
                { label: 'Ünvan', value: 'Teknik Danışman' },
              ].map((field, i) => (
                <div key={i} className="space-y-1">
                  <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>{field.label}</label>
                  <div className={cn(
                    "p-3 rounded-xl border text-xs font-medium shadow-sm transition-colors",
                    isDarkMode ? "bg-[#2B2930] border-[#49454F] text-[#E6E1E5]" : "bg-white border-[#CAC4D0]/50 text-[#1D1B20]"
                  )}>
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-[#005994] text-white py-3 rounded-full font-bold text-xs shadow-md hover:bg-[#004A99] transition-colors">Bilgileri Güncelle</button>
          </div>
        );
      case 'securitySettings':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto p-4 space-y-4 transition-colors", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            <div className={cn("rounded-xl border overflow-hidden shadow-sm transition-colors", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-[#CAC4D0]/50")}>
              {[
                { label: 'Şifre Değiştir', desc: 'Son değişim: 3 ay önce', action: () => navigateTo('changePassword') },
                { label: 'İki Faktörlü Doğrulama', desc: 'Aktif değil', toggle: false },
                { icon: Smartphone, label: 'Bağlı Cihazlar', desc: '1 aktif cihaz' },
                { label: 'Biyometrik Giriş', desc: 'Parmak izi / Yüz tanıma', toggle: false },
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={item.action}
                  className={cn(
                    "w-full p-4 flex items-center justify-between border-b last:border-0 transition-colors text-left",
                    isDarkMode ? "hover:bg-zinc-800 border-[#49454F]" : "hover:bg-zinc-50 border-zinc-100"
                  )}
                >
                  <div>
                    <p className={cn("text-xs font-bold", isDarkMode ? "text-[#E6E1E5]" : "text-[#1D1B20]")}>{item.label}</p>
                    <p className={cn("text-[10px]", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>{item.desc}</p>
                  </div>
                  {item.toggle !== undefined ? (
                    <div className={cn(
                      "w-10 h-5 rounded-full relative transition-colors",
                      item.toggle ? "bg-[#005994]" : (isDarkMode ? "bg-zinc-700" : "bg-zinc-200")
                    )}>
                      <div className={cn(
                        "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all",
                        item.toggle ? "right-0.5" : "left-0.5"
                      )} />
                    </div>
                  ) : (
                    <ChevronRight size={14} className="text-zinc-400" />
                  )}
                </button>
              ))}
            </div>
            <p className={cn("text-[10px] text-center px-4", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>
              Güvenlik ayarlarınızı e-Devlet üzerinden de yönetebilirsiniz.
            </p>
          </div>
        );
      case 'changePassword':
        return (
          <div className={cn("h-full flex flex-col p-4 space-y-6 transition-colors scrollbar-hide", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Mevcut Şifre</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-zinc-200")}>
                  <Lock size={18} className="text-[#005994]" />
                  <input type="password" placeholder="••••••••" className="bg-transparent border-none outline-none text-xs w-full" />
                </div>
              </div>
              <div className="space-y-1">
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Yeni Şifre</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-zinc-200")}>
                  <Lock size={18} className="text-[#005994]" />
                  <input type="password" placeholder="••••••••" className="bg-transparent border-none outline-none text-xs w-full" />
                </div>
              </div>
              <div className="space-y-1">
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Yeni Şifre (Tekrar)</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-zinc-200")}>
                  <Lock size={18} className="text-[#005994]" />
                  <input type="password" placeholder="••••••••" className="bg-transparent border-none outline-none text-xs w-full" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => goBack()}
              className="w-full bg-[#005994] text-white py-3.5 rounded-full font-bold text-sm shadow-md"
            >
              Şifreyi Güncelle
            </button>
          </div>
        );
      case 'liveChat':
        return (
          <div className={cn("h-full flex flex-col transition-colors", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              <div className="flex justify-center">
                <span className={cn("text-[8px] font-bold uppercase px-2 py-1 rounded-full", isDarkMode ? "bg-zinc-800 text-zinc-500" : "bg-zinc-100 text-zinc-400")}>Bugün</span>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-[#005994] flex items-center justify-center text-white text-[10px] font-bold">HKS</div>
                <div className={cn("max-w-[80%] p-3 rounded-2xl rounded-tl-none shadow-sm", isDarkMode ? "bg-[#2B2930] text-[#E6E1E5]" : "bg-white text-[#1D1B20]")}>
                  <p className="text-xs leading-relaxed">Merhaba! Ben HKS Destek Asistanı. Size nasıl yardımcı olabilirim?</p>
                  <p className="text-[8px] mt-1 opacity-50 text-right">09:41</p>
                </div>
              </div>

              <div className="flex items-start gap-2 justify-end">
                <div className={cn("max-w-[80%] p-3 rounded-2xl rounded-tr-none shadow-sm bg-[#005994] text-white")}>
                  <p className="text-xs leading-relaxed">Künye sorgulama hakkında bilgi almak istiyorum.</p>
                  <p className="text-[8px] mt-1 opacity-70 text-right">09:42</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-[#005994] flex items-center justify-center text-white text-[10px] font-bold">HKS</div>
                <div className={cn("max-w-[80%] p-3 rounded-2xl rounded-tl-none shadow-sm", isDarkMode ? "bg-[#2B2930] text-[#E6E1E5]" : "bg-white text-[#1D1B20]")}>
                  <p className="text-xs leading-relaxed">Tabii ki. Künye sorgulama ekranından ürünün üzerindeki 10 haneli numarayı girerek veya karekodu okutarak detaylı bilgiye ulaşabilirsiniz. Başka bir sorunuz var mı?</p>
                  <p className="text-[8px] mt-1 opacity-50 text-right">09:42</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className={cn("p-3 border-t transition-colors", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-zinc-100")}>
              <div className={cn("flex items-center gap-2 p-1.5 rounded-full border", isDarkMode ? "bg-[#1C1B1F] border-[#49454F]" : "bg-zinc-50 border-zinc-200")}>
                <button className={cn("p-2 rounded-full transition-colors", isDarkMode ? "text-zinc-400 hover:bg-zinc-800" : "text-zinc-400 hover:bg-zinc-100")}>
                  <Paperclip size={18} />
                </button>
                <input 
                  type="text" 
                  placeholder="Mesajınızı yazın..." 
                  className="flex-1 bg-transparent border-none outline-none text-xs px-1"
                />
                <button className="w-8 h-8 rounded-full bg-[#005994] text-white flex items-center justify-center shadow-md">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      case 'appSettings':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto p-4 space-y-4 transition-colors", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#F8FAFC]")}>
            <div className={cn("rounded-xl border overflow-hidden shadow-sm transition-colors", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-[#D1D9E0]")}>
              {[
                { id: 'notifications', label: 'Bildirim İzinleri', desc: 'Anlık bildirimleri yönet', toggle: true },
                { id: 'darkmode', label: 'Karanlık Mod', desc: isDarkMode ? 'Açık' : 'Kapalı', toggle: isDarkMode, action: () => setIsDarkMode(!isDarkMode) },
                { id: 'language', label: 'Dil Seçimi', desc: 'Türkçe (TR)' },
                { id: 'datasaver', label: 'Veri Tasarrufu', desc: 'Düşük veri kullanımı', toggle: true },
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={item.action}
                  className={cn(
                    "p-4 flex items-center justify-between border-b last:border-0 transition-colors cursor-pointer",
                    isDarkMode ? "border-[#49454F] hover:bg-zinc-800" : "border-zinc-100 hover:bg-zinc-50"
                  )}
                >
                  <div>
                    <p className={cn("text-xs font-bold", isDarkMode ? "text-[#E6E1E5]" : "text-[#1B1B1F]")}>{item.label}</p>
                    <p className={cn("text-[10px]", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>{item.desc}</p>
                  </div>
                  {item.toggle !== undefined ? (
                    <div className={cn(
                      "w-10 h-5 rounded-full relative transition-colors",
                      item.toggle ? "bg-[#005994]" : (isDarkMode ? "bg-zinc-700" : "bg-zinc-200")
                    )}>
                      <div className={cn(
                        "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all",
                        item.toggle ? "right-0.5" : "left-0.5"
                      )} />
                    </div>
                  ) : (
                    <ChevronRight size={14} className="text-zinc-400" />
                  )}
                </div>
              ))}
            </div>
            <div className={cn("p-4 rounded-xl border transition-colors", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-zinc-50 border-zinc-200")}>
              <p className={cn("text-[10px] font-bold uppercase mb-2", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Uygulama Bilgisi</p>
              <div className="flex justify-between text-[11px]">
                <span className={isDarkMode ? "text-zinc-500" : "text-zinc-500"}>Versiyon</span>
                <span className={isDarkMode ? "text-zinc-300" : "text-zinc-800 font-medium"}>v2.4.0 (Build 102)</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 bg-zinc-100">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Info */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#005994]/10 text-[#005994] rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Smartphone size={12} />
              Flutter Material 3 Design
            </div>
            <h1 className="text-3xl font-bold text-zinc-800 leading-tight">
              HKS Mobil <br />
              <span className="text-[#005994]">Geleceğin HAL KAYIT SİSTEMİ</span>
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
              Google'ın Material 3 (M3) tasarım diline uygun olarak yenilenen arayüz, daha kompakt bileşenler ve optimize edilmiş boşluk kullanımıyla mobil deneyimi en üst seviyeye taşır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-start gap-3">
              <div className="w-9 h-9 bg-[#005994]/10 text-[#005994] rounded-lg flex items-center justify-center shrink-0"><LayoutDashboard size={18} /></div>
              <div>
                <h4 className="text-xs font-bold text-zinc-800">M3 Bileşenleri</h4>
                <p className="text-[10px] text-zinc-500">AppBar, NavigationBar ve FAB kullanımı.</p>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-start gap-3">
              <div className="w-9 h-9 bg-[#005994]/10 text-[#005994] rounded-lg flex items-center justify-center shrink-0"><Plus size={18} /></div>
              <div>
                <h4 className="text-xs font-bold text-zinc-800">Kompakt Yapı</h4>
                <p className="text-[10px] text-zinc-500">Minimize edilmiş boşluklar ve padding.</p>
              </div>
            </div>
          </div>

          {/* Design Info Panel */}
          <div className="p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-[#005994] uppercase tracking-wider">Tasarım Paneli</h5>
              <div className="px-2 py-0.5 bg-zinc-100 rounded text-[8px] font-bold text-zinc-500">CANLI VERİ</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-zinc-400 uppercase">Renk Kodları</p>
                <div className="flex flex-wrap gap-1.5">
                  {DESIGN_INFO[activeScreen].colors.map(color => (
                    <div key={color} className="flex items-center gap-1 bg-zinc-50 px-1.5 py-1 rounded border border-zinc-100">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-[8px] font-mono text-zinc-600 uppercase">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-zinc-400 uppercase">Padding Değeri</p>
                <div className="bg-zinc-50 px-2 py-1 rounded border border-zinc-100 inline-block">
                  <span className="text-[8px] font-mono text-zinc-600">{DESIGN_INFO[activeScreen].padding}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[9px] font-bold text-zinc-400 uppercase">Kullanılan İkonlar</p>
              <div className="flex flex-wrap gap-1.5">
                {DESIGN_INFO[activeScreen].icons.map(icon => (
                  <div key={icon} className="bg-zinc-50 px-1.5 py-1 rounded border border-zinc-100 flex items-center gap-1">
                    <span className="text-[8px] font-medium text-zinc-600">{icon}</span>
                  </div>
                ))}
                {DESIGN_INFO[activeScreen].icons.length === 0 && <span className="text-[8px] text-zinc-400 italic">Bu ekranda ikon bulunmuyor.</span>}
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#005994]/5 rounded-2xl border border-[#005994]/10">
            <h5 className="text-xs font-bold text-[#005994] mb-2">TASARIM NOTLARI</h5>
            <ul className="text-[10px] text-zinc-600 space-y-1 list-disc ml-4">
              <li>Material 3 renk paleti ve tipografisi uygulandı.</li>
              <li>Bileşen arası boşluklar %40 oranında azaltıldı.</li>
              <li>Navigasyon çubuğu M3 standartlarına (pill-shape active state) getirildi.</li>
              <li>Kart yapıları daha ince kenarlıklar ve az gölge ile modernize edildi.</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Phone Mockup */}
        <div className="relative mx-auto">
          {/* Phone Frame */}
          <div className="relative w-[300px] h-[600px] bg-zinc-800 rounded-[40px] p-2 shadow-2xl border-[6px] border-zinc-900 overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-zinc-900 rounded-b-xl z-50 flex items-center justify-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              <div className="w-8 h-0.5 bg-zinc-800 rounded-full" />
            </div>

            {/* Screen Content */}
            <div className={cn("w-full h-full rounded-[32px] overflow-hidden relative flex flex-col transition-colors scrollbar-hide", isDarkMode ? "bg-[#1C1B1F]" : "bg-[#FFFFFF]")}>
              <LoadingOverlay />
              {renderTopBar()}
              <div className="flex-1 relative overflow-hidden scrollbar-hide">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="h-full scrollbar-hide"
                  >
                    {renderScreen()}
                  </motion.div>
                </AnimatePresence>
              </div>
              {activeScreen !== 'login' && activeScreen !== 'register' && <BottomNavBar activeScreen={activeScreen} setActiveScreen={navigateTo} isDarkMode={isDarkMode} />}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#5A5A40]/10 rounded-full blur-2xl -z-10" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -z-10" />
        </div>
      </div>
    </div>
  );
}
