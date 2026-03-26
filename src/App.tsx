import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  Users, 
  User, 
  Bell, 
  Menu, 
  X,
  ChevronRight,
  QrCode,
  TrendingUp,
  Wallet,
  Package,
  CheckCircle2,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import QueriesView from './components/QueriesView';
import NotificationWizard from './components/NotificationWizard';
import MobileAppDesignView from './components/MobileAppDesignView';

// Types
type View = 'dashboard' | 'queries' | 'notifications' | 'notifiers' | 'user' | 'announcements' | 'mobileApp';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Ana Sayfa', icon: LayoutDashboard },
    { id: 'queries', label: 'Sorgulamalar', icon: Search },
    { id: 'notifications', label: 'Bildirim İşlemleri', icon: FileText },
    { id: 'notifiers', label: 'Bildirimci İşlemleri', icon: Users },
    { id: 'user', label: 'Kullanıcı İşlemleri', icon: User },
    { id: 'announcements', label: 'Duyuru İşlemleri', icon: Bell },
    { id: 'mobileApp', label: 'Mobil Tasarım', icon: Smartphone },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onNewNotification={() => setActiveView('notifications')} />;
      case 'queries':
        return <QueriesView />;
      case 'notifications':
        return <NotificationWizard />;
      case 'notifiers':
        return <NotifiersView />;
      case 'user':
        return <UserView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'mobileApp':
        return <MobileAppDesignView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
            <p className="text-lg font-medium">Bu modül geliştirme aşamasındadır.</p>
            <p className="text-sm italic">Analiz raporuna göre yapılandırılıyor...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F5F0] text-[#141414] font-sans overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className={cn(
        "hidden md:flex flex-col w-64 bg-white border-r border-zinc-200 transition-all duration-300",
        !isSidebarOpen && "w-20"
      )}>
        <div className="p-6 flex items-center gap-3 border-bottom border-zinc-100">
          <div className="w-8 h-8 bg-[#5A5A40] rounded-lg flex items-center justify-center text-white font-bold">H</div>
          {isSidebarOpen && <span className="font-bold text-lg tracking-tight">HKS Mobi</span>}
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                activeView === item.id 
                  ? "bg-[#5A5A40] text-white shadow-md" 
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              )}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 text-zinc-400 hover:text-zinc-900 flex justify-center"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-2 py-2 flex justify-around items-center z-50">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as View)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
              activeView === item.id ? "text-[#5A5A40]" : "text-zinc-400"
            )}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-y-auto pb-20 md:pb-0">
        <header className="sticky top-0 z-40 bg-[#F5F5F0]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            {navItems.find(i => i.id === activeView)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white rounded-full shadow-sm border border-zinc-200 text-zinc-600 hover:text-zinc-900">
              <Bell size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-300 border border-white shadow-sm overflow-hidden">
              <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        <div className="p-6 max-w-5xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function DashboardView({ onNewNotification }: { onNewNotification: () => void }) {
  const stats = [
    { label: 'Künye Sorgulama', icon: QrCode, color: 'bg-blue-50 text-blue-600', desc: 'Hızlı QR okuma' },
    { label: 'Güncel Fiyatlar', icon: TrendingUp, color: 'bg-green-50 text-green-600', desc: 'Hal bülten takibi' },
    { label: 'Rüsum Borcu', icon: Wallet, color: 'bg-amber-50 text-amber-600', desc: 'Ödeme durumu' },
    { label: 'Stok Durumu', icon: Package, color: 'bg-purple-50 text-purple-600', desc: 'Anlık envanter' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-[#5A5A40] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-2">
          <h2 className="text-3xl font-bold">Hoş Geldiniz</h2>
          <p className="text-white/70 max-w-md">Hal Kayıt Sistemi üzerinden bildirimlerinizi anlık olarak yönetebilir ve güncel piyasa verilerini takip edebilirsiniz.</p>
          <button 
            onClick={onNewNotification}
            className="mt-4 px-6 py-2 bg-white text-[#5A5A40] rounded-full font-bold text-sm hover:bg-zinc-100 transition-colors"
          >
            Yeni Bildirim Oluştur
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute right-10 top-10 opacity-20">
          <FileText size={120} />
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <button 
            key={idx}
            className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", stat.color)}>
              <stat.icon size={24} />
            </div>
            <h3 className="font-bold text-zinc-900">{stat.label}</h3>
            <p className="text-xs text-zinc-500 mt-1">{stat.desc}</p>
          </button>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Son Bildirimler</h3>
            <button className="text-sm font-medium text-[#5A5A40] hover:underline">Tümünü Gör</button>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm divide-y divide-zinc-100">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-zinc-900">Domates (Salkım)</p>
                    <p className="text-xs text-zinc-500">Künye: 1234567890 • 14.11.2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">1,250 kg</p>
                  <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">Onaylandı</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Duyurular</h3>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase">Önemli</span>
                  <span className="text-[10px] text-zinc-400">12.11.2025</span>
                </div>
                <h4 className="font-bold text-sm leading-tight">Hal Kayıt Sistemi Bakım Çalışması</h4>
                <p className="text-xs text-zinc-500 line-clamp-2">15 Kasım tarihinde sistemlerimizde yapılacak olan güncelleme nedeniyle...</p>
                <button className="text-xs font-bold text-[#5A5A40] flex items-center gap-1 group">
                  Devamını Oku <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotifiersView() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Bildirimci Listeleri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100 space-y-3">
            <div className="flex items-center gap-3 text-red-600">
              <X size={24} className="bg-white p-1 rounded-lg shadow-sm" />
              <h4 className="font-bold">Engellenenler</h4>
            </div>
            <p className="text-xs text-red-700/70">Bildirim yapmak istemediğiniz kişileri buradan yönetebilirsiniz.</p>
            <button className="text-xs font-bold text-red-700 hover:underline">Listeyi Yönet</button>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl border border-green-100 space-y-3">
            <div className="flex items-center gap-3 text-green-600">
              <CheckCircle2 size={24} className="bg-white p-1 rounded-lg shadow-sm" />
              <h4 className="font-bold">Güvenilirler</h4>
            </div>
            <p className="text-xs text-green-700/70">Yalnızca belirlediğiniz kişilerle iletişim kurmanızı sağlar.</p>
            <button className="text-xs font-bold text-green-700 hover:underline">Listeyi Yönet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserView() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-zinc-100 border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer">
          <img src="https://picsum.photos/seed/user/200/200" alt="User" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <User className="text-white" size={24} />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold">Kullanıcı</h3>
          <p className="text-sm text-zinc-500">Teknik Danışman</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">TCKN / Vergi No</label>
            <input type="text" value="12345678901" disabled readOnly className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-600" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Telefon</label>
            <input type="text" defaultValue="0555 123 45 67" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">E-Posta</label>
          <input type="email" defaultValue="kullanici@hks.gov.tr" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20" />
        </div>
        <button className="w-full bg-[#5A5A40] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#4A4A30] transition-colors mt-4">
          Bilgileri Güncelle
        </button>
      </div>
    </div>
  );
}

function AnnouncementsView() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full uppercase">Sistem Duyurusu</span>
            <span className="text-xs text-zinc-400">14.11.2025</span>
          </div>
          <h4 className="font-bold text-lg leading-tight">HKS Mobil Uygulama Analiz Raporu Yayınlandı</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">
            LST Yazılım A.Ş. tarafından hazırlanan Hal Kayıt Sistemi Mobil Uygulama Analiz Raporu tüm detaylarıyla yayınlanmıştır. 
            Uygulama React Native tabanlı ve responsive olarak geliştirilecektir...
          </p>
          <button className="text-sm font-bold text-[#5A5A40] flex items-center gap-1 hover:underline">
            Detayları Görüntüle <ChevronRight size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
