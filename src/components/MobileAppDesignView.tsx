import React, { useState, useEffect } from 'react';
import { 
  History,
  UserPlus,
  Mail,
  Lock,
  Smartphone,
  Apple, 
  Star,
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
  LogIn,
  Globe,
  FileSearch,
  MessageSquare,
  Send,
  Paperclip,
  Copy,
  Check,
  AlertTriangle,
  XCircle,
  Megaphone,
  Trash2,
  X,
  Handshake,
  ShoppingBasket,
  Code2,
  Zap,
  PieChart,
  BarChart3,
  LayoutGrid
} from 'lucide-react';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const AppLogo = ({ size = 64, isDark = false, className = "" }: { size?: number, isDark?: boolean, className?: string }) => (
  <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
    {/* White rounded background */}
    <div className="absolute inset-0 bg-white rounded-[24%] shadow-sm overflow-hidden" />
    
    {/* Icon container */}
    <div className="relative z-10 flex items-center justify-center w-full h-full p-[12%]">
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* The Crate (Market/Logistics) */}
        <path d="M20 45 L80 45 L75 85 L25 85 Z" className="text-[#005994]" fill="white" stroke="currentColor" />
        <path d="M22 58 L78 58 M24 71 L76 71" className="text-[#005994]" stroke="currentColor" strokeWidth="1.5" />
        
        {/* The Produce (Vibrant Leaf) */}
        <path d="M45 45 C45 45, 65 15, 85 25 C85 25, 75 55, 45 45" className="text-[#2E7D32]" fill="#E8F5E9" stroke="currentColor" />
        <path d="M45 45 L70 30" className="text-[#2E7D32]" stroke="currentColor" strokeWidth="1.5" />
        
        {/* QR Code Symbol (Digital Registration) */}
        <rect x="38" y="58" width="24" height="24" rx="2" className="text-[#005994]" fill="white" stroke="currentColor" strokeWidth="1.5" />
        <path d="M42 62 H46 V66 H42 Z M54 62 H58 V66 H54 Z M42 74 H46 V78 H42 Z M54 74 H58 V78 H54 Z" className="text-[#005994]" fill="currentColor" stroke="none" />
        
        {/* Verification Badge (Success/Official) */}
        <circle cx="82" cy="78" r="14" className="text-[#005994]" fill="white" stroke="currentColor" strokeWidth="2" />
        <path d="M76 78 L80 82 L88 74" className="text-[#005994]" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
  </div>
);

type Screen = 'splash' | 'login' | 'register' | 'forgotPassword' | 'dashboard' | 'query' | 'favorites' | 'notificationWizard' | 'notificationsList' | 'profile' | 'menu' | 'history' | 'help' | 'qrcode' | 'profileInfo' | 'securitySettings' | 'appSettings' | 'changePassword' | 'liveChat' | 'announcements' | 'memberLogin' | 'marketPlaces' | 'exportPrices' | 'organicQuery' | 'notifierStats' | 'priceDetails' | 'marketArbitration';

const BottomNavBar = ({ activeScreen, setActiveScreen, isDarkMode, notifications }: { activeScreen: Screen, setActiveScreen: (s: Screen) => void, isDarkMode: boolean, notifications: any[] }) => {
  const unreadCount = notifications.filter(n => n.unread).length;
  return (
    <div className={cn(
      "h-14 flex justify-around items-center px-2 border-t shrink-0 z-30 transition-colors",
      isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-[#F0F4F8] border-[#D1D9E0]"
    )}>
      {[
        { id: 'dashboard', icon: LayoutDashboard },
        { id: 'query', icon: Search },
        { id: 'qrcode', icon: QrCode, isSpecial: true },
        { id: 'notificationsList', icon: Bell, badge: unreadCount },
        { id: 'profile', icon: User },
      ].map((item) => (
        <button 
          key={item.id} 
          onClick={() => setActiveScreen(item.id as Screen)}
          className="flex flex-col items-center group relative"
        >
          <div className={cn(
            "flex items-center justify-center transition-all",
            item.isSpecial 
              ? "w-12 h-12 bg-[#F39200] text-white rounded-2xl shadow-lg -mt-6 border-4 border-[#F5F5F0]" 
              : cn(
                  "w-10 h-10 rounded-2xl",
                  (activeScreen === item.id || (item.id === 'notificationsList' && activeScreen === 'notificationWizard')) 
                    ? "bg-[#005994] text-white" 
                    : (isDarkMode ? "text-zinc-400 group-hover:bg-blue-500/10" : "text-[#44474E] group-hover:bg-[#005994]/10")
                )
          )}>
            <item.icon size={item.isSpecial ? 24 : 20} />
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-[#F0F4F8]">
                {item.badge}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

const PriceTicker = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const fruitVegetablePrices = [
    { name: 'Domates', price: '22.50 ₺' },
    { name: 'Salatalık', price: '18.00 ₺' },
    { name: 'Biber', price: '35.00 ₺' },
    { name: 'Patlıcan', price: '26.00 ₺' },
    { name: 'Elma', price: '15.00 ₺' },
    { name: 'Armut', price: '20.00 ₺' },
    { name: 'Portakal', price: '12.00 ₺' },
    { name: 'Muz', price: '45.00 ₺' },
  ];

  return (
    <div className={cn(
      "w-full overflow-hidden py-2 border-b transition-colors shrink-0",
      isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-[#F0F4F8] border-[#D1D9E0]"
    )}>
      <motion.div 
        className="flex whitespace-nowrap gap-6 items-center"
        animate={{ x: [0, -1200] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {[...fruitVegetablePrices, ...fruitVegetablePrices, ...fruitVegetablePrices].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className={cn("text-[11px] font-bold", isDarkMode ? "text-[#E6E1E5]" : "text-[#1B1B1F]")}>{item.name}</span>
            <span className="text-[11px] font-bold text-[#005994]">{item.price}</span>
            <div className={cn("w-1.5 h-1.5 rounded-full", isDarkMode ? "bg-[#49454F]" : "bg-[#D1D9E0]")} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const AnnouncementsPanel = ({ isDarkMode, onClick }: { isDarkMode: boolean, onClick?: () => void }) => {
  const announcements = [
    { id: 1, text: "Yeni hal fiyatları güncellendi!", icon: TrendingUp, color: "text-green-500" },
    { id: 2, text: "Sistem bakımı bu gece 00:00'da başlayacaktır.", icon: AlertTriangle, color: "text-amber-500" },
    { id: 3, text: "Künye sorgulama işlemlerinde yeni özellikler yayında.", icon: Info, color: "text-blue-500" },
    { id: 4, text: "HKS Mobil ile işlemleriniz artık daha hızlı.", icon: Zap, color: "text-purple-500" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const current = announcements[currentIndex];

  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-[20px] shadow-sm border transition-all overflow-hidden relative active:scale-[0.98]",
        isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-white border-[#D1D9E0]"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", isDarkMode ? "bg-white/5" : "bg-zinc-50")}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <current.icon size={20} className={current.color} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-[10px] font-bold uppercase tracking-wider mb-1", isDarkMode ? "text-[#005994]" : "text-[#005994]")}>Duyurular</p>
          <div className="relative min-h-[2.5rem] flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={cn("text-[13px] font-medium leading-snug", isDarkMode ? "text-zinc-100" : "text-[#1B1B1F]")}
              >
                {current.text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </button>
  );
};

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'announcement';
interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message: string;
}

export default function MobileAppDesignView() {
  const [activeScreen, setActiveScreen] = useState<Screen>('splash');
  const [history, setHistory] = useState<Screen[]>(['splash']);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [marketSearchQuery, setMarketSearchQuery] = useState('');
  const [exportSearchQuery, setExportSearchQuery] = useState('');
  const [showExportSearch, setShowExportSearch] = useState(false);
  const [organicSearchQuery, setOrganicSearchQuery] = useState('');
  const [showOrganicSearch, setShowOrganicSearch] = useState(false);
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');
  const [priceDetailsSearchQuery, setPriceDetailsSearchQuery] = useState('');
  const [showPriceDetailsSearch, setShowPriceDetailsSearch] = useState(false);
  const [arbitrationSearchQuery, setArbitrationSearchQuery] = useState('');
  const [showArbitrationSearch, setShowArbitrationSearch] = useState(false);

  const [favorites, setFavorites] = useState([
    { id: '1', icon: FileText, label: 'Yeni Bildirim Oluştur', desc: 'Hızlıca yeni künye bildirimi yapın', color: 'text-blue-500', actionKey: 'notificationWizard' },
    { id: '2', icon: TrendingUp, label: 'İhracat Fiyatları', desc: 'Güncel ihracat bültenini inceleyin', color: 'text-orange-500', actionKey: 'exportPrices' },
    { id: '3', icon: ShoppingBasket, label: 'Organik Ürün Sorgula', desc: 'Sertifikalı ürünleri kontrol edin', color: 'text-green-500', actionKey: 'organicQuery' },
    { id: '4', icon: MapPin, label: 'Yakın Hal Yerleri', desc: 'Size en yakın hal ve pazar yerleri', color: 'text-red-500', actionKey: 'marketPlaces' },
    { id: '5', icon: Shield, label: 'Hakem Heyeti Listesi', desc: 'Uyuşmazlık çözümü heyetleri', color: 'text-purple-500', actionKey: 'marketArbitration' },
  ]);

  const [isAddFavoriteModalOpen, setIsAddFavoriteModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [favoriteToDelete, setFavoriteToDelete] = useState<string | null>(null);

  const availableActions = [
    { icon: FileText, label: 'Yeni Bildirim Oluştur', desc: 'Hızlıca yeni künye bildirimi yapın', color: 'text-blue-500', actionKey: 'notificationWizard' },
    { icon: TrendingUp, label: 'İhracat Fiyatları', desc: 'Güncel ihracat bültenini inceleyin', color: 'text-orange-500', actionKey: 'exportPrices' },
    { icon: ShoppingBasket, label: 'Organik Ürün Sorgula', desc: 'Sertifikalı ürünleri kontrol edin', color: 'text-green-500', actionKey: 'organicQuery' },
    { icon: MapPin, label: 'Yakın Hal Yerleri', desc: 'Size en yakın hal ve pazar yerleri', color: 'text-red-500', actionKey: 'marketPlaces' },
    { icon: Shield, label: 'Hakem Heyeti Listesi', desc: 'Uyuşmazlık çözümü heyetleri', color: 'text-purple-500', actionKey: 'marketArbitration' },
    { icon: History, label: 'İşlem Geçmişi', desc: 'Geçmiş işlemlerinizi görün', color: 'text-blue-600', actionKey: 'history' },
    { icon: Bell, label: 'Bildirimler', desc: 'Tüm bildirimlerinizi görün', color: 'text-amber-500', actionKey: 'notificationsList' },
    { icon: User, label: 'Profil Bilgileri', desc: 'Hesap bilgilerinizi güncelleyin', color: 'text-indigo-500', actionKey: 'profileInfo' },
    { icon: Settings, label: 'Uygulama Ayarları', desc: 'Uygulama tercihlerini yönetin', color: 'text-zinc-500', actionKey: 'appSettings' },
    { icon: HelpCircle, label: 'Yardım Merkezi', desc: 'Sıkça sorulan sorular ve destek', color: 'text-teal-500', actionKey: 'help' },
  ];

  useEffect(() => {
    if (activeScreen === 'splash') {
      const timer = setTimeout(() => {
        setActiveScreen('dashboard');
        setHistory(['dashboard']);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activeScreen]);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    biometric: false,
  });

  const toggleSecuritySetting = (key: 'twoFactor' | 'biometric') => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', title: 'Yeni Fiyat Güncellemesi', desc: 'Domates fiyatları güncellendi.', time: '10 dk önce', unread: true },
    { id: 2, type: 'success', title: 'İşlem Onayı', desc: '84729103 numaralı künye başarıyla onaylandı.', time: '2 saat önce', unread: false },
    { id: 3, type: 'warning', title: 'Sistem Bakımı', desc: 'Bu gece 00:00\'da bakım yapılacaktır. Lütfen işlemlerinizi tamamlayın.', time: '5 saat önce', unread: false },
    { id: 4, type: 'error', title: 'Bağlantı Hatası', desc: 'Sunucu ile bağlantı kurulamadı. Lütfen tekrar deneyin.', time: 'Dün', unread: false },
    { id: 5, type: 'announcement', title: 'Yeni Özellik', desc: 'Mobil uygulamamıza yeni özellikler eklendi.', time: '2 gün önce', unread: false },
  ]);

  const addToast = (type: ToastType, title: string, message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('isDarkMode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const getFlutterCode = (screen: Screen) => {
    const screenName = screen.charAt(0).toUpperCase() + screen.slice(1);
    
    switch (screen) {
      case 'splash':
        return `import 'package:flutter/material.dart';
import 'dart:ui';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: isDark 
              ? [const Color(0xFF1A1A1A), const Color(0xFF002D4B)]
              : [const Color(0xFF005994), const Color(0xFF003D66)],
          ),
        ),
        child: Stack(
          children: [
            // Background Handshake Pattern (Subtle)
            Center(
              child: Opacity(
                opacity: 0.05,
                child: Icon(Icons.handshake, size: 400, color: Colors.white),
              ),
            ),
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Custom App Logo (HKS Modern Design)
                  Container(
                    width: 120,
                    height: 120,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(28),
                      boxShadow: [
                        BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 15)
                      ],
                    ),
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        // Crate
                        Positioned(
                          bottom: 22,
                          child: Container(
                            width: 70,
                            height: 45,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              border: Border.all(color: const Color(0xFF005994), width: 2),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Container(width: 60, height: 1.5, color: const Color(0xFF005994).withOpacity(0.3)),
                                Container(width: 60, height: 1.5, color: const Color(0xFF005994).withOpacity(0.3)),
                              ],
                            ),
                          ),
                        ),
                        // Leaf
                        Positioned(
                          top: 25,
                          right: 20,
                          child: Transform.rotate(
                            angle: 0.5,
                            child: Icon(Icons.eco, size: 45, color: const Color(0xFF2E7D32)),
                          ),
                        ),
                        // QR Code
                        Positioned(
                          bottom: 30,
                          child: Container(
                            padding: const EdgeInsets.all(4),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              border: Border.all(color: const Color(0xFF005994), width: 1.5),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Icon(Icons.qr_code_2, size: 24, color: const Color(0xFF005994)),
                          ),
                        ),
                        // Verification Badge
                        Positioned(
                          bottom: 35,
                          right: 15,
                          child: Container(
                            padding: const EdgeInsets.all(2),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              border: Border.all(color: const Color(0xFF005994), width: 2),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.check, size: 16, color: Color(0xFF005994)),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 32),
                  const Text(
                    'HKS MOBİL',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 2,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Geleceğin Hal Kayıt Sistemi',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.white.withOpacity(0.7),
                      letterSpacing: 1.2,
                    ),
                  ),
                  const SizedBox(height: 60),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(3, (index) {
                      return AnimatedBuilder(
                        animation: _controller,
                        builder: (context, child) {
                          final delay = index * 0.2;
                          final value = (_controller.value - delay).clamp(0.0, 1.0);
                          final opacity = (value < 0.5) ? (value * 2) : (2 - value * 2);
                          return Container(
                            margin: const EdgeInsets.symmetric(horizontal: 4),
                            width: 8,
                            height: 8,
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(opacity.clamp(0.3, 1.0)),
                              shape: BoxShape.circle,
                            ),
                          );
                        },
                      );
                    }),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLogoDot(Color color) {
    return Container(
      width: 6,
      height: 6,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 2)
        ],
      ),
    );
  }
}`;
      case 'login':
        return `import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 32.0, vertical: 40.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 20),
              // App Logo Simulation (HKS Modern Design)
              Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)
                  ],
                ),
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    // Crate
                    Positioned(
                      bottom: 18,
                      child: Container(
                        width: 60,
                        height: 35,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(color: const Color(0xFF005994), width: 2),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Container(width: 50, height: 1, color: const Color(0xFF005994).withOpacity(0.3)),
                            Container(width: 50, height: 1, color: const Color(0xFF005994).withOpacity(0.3)),
                          ],
                        ),
                      ),
                    ),
                    // Leaf
                    Positioned(
                      top: 20,
                      right: 15,
                      child: Transform.rotate(
                        angle: 0.5,
                        child: Icon(Icons.eco, size: 35, color: const Color(0xFF2E7D32)),
                      ),
                    ),
                    // QR Code
                    Positioned(
                      bottom: 24,
                      child: Container(
                        padding: const EdgeInsets.all(3),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(color: const Color(0xFF005994), width: 1),
                          borderRadius: BorderRadius.circular(3),
                        ),
                        child: Icon(Icons.qr_code_2, size: 18, color: const Color(0xFF005994)),
                      ),
                    ),
                    // Verification Badge
                    Positioned(
                      bottom: 28,
                      right: 12,
                      child: Container(
                        padding: const EdgeInsets.all(1),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(color: const Color(0xFF005994), width: 1.5),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.check, size: 12, color: Color(0xFF005994)),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),
              Text(
                'Hoş Geldiniz',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: isDark ? Colors.white : const Color(0xFF1C1B1F),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'HKS Mobil ile işlemlerinizi kolayca yönetin',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 12,
                  color: isDark ? Colors.white70 : Colors.grey[600],
                ),
              ),
              const SizedBox(height: 40),
              // e-Devlet Button (Smaller)
              SizedBox(
                width: 260,
                child: ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF005994),
                    foregroundColor: Colors.white,
                    minimumSize: const Size.fromHeight(48),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    elevation: 1,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Image.network('https://www.turkiye.gov.tr/favicon.ico', width: 18),
                      const SizedBox(width: 10),
                      const Text(
                        'e-Devlet ile Giriş Yap',
                        style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 12),
              // Register Button (Smaller)
              SizedBox(
                width: 260,
                child: OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    minimumSize: const Size.fromHeight(48),
                    side: BorderSide(color: isDark ? Colors.white24 : Colors.grey[300]!),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: Text(
                    'Yeni Hesap Oluştur',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: isDark ? Colors.white : const Color(0xFF005994),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 32),
              TextButton(
                onPressed: () {},
                child: Text(
                  'Şifremi Unuttum',
                  style: TextStyle(fontSize: 12, color: isDark ? Colors.blue[300] : const Color(0xFF005994)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLogoDot(Color color, double size) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
      ),
    );
  }
}`;
      case 'dashboard':
        return `import 'package:flutter/material.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        elevation: 0,
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        title: Row(
          children: [
            // Minimal HKS Logo Simulation
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                boxShadow: [
                  BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4)
                ],
              ),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // Minimal Crate
                  Positioned(
                    bottom: 6,
                    child: Container(
                      width: 20,
                      height: 12,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        border: Border.all(color: const Color(0xFF005994), width: 1.5),
                      ),
                    ),
                  ),
                  // Minimal Leaf
                  Positioned(
                    top: 6,
                    right: 4,
                    child: Icon(Icons.eco, size: 14, color: const Color(0xFF2E7D32)),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 10),
            Text(
              'HKS MOBİL',
              style: TextStyle(
                color: isDark ? Colors.white : const Color(0xFF005994),
                fontWeight: FontWeight.w900,
                fontSize: 18,
                letterSpacing: -0.5,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.notifications_none, color: isDark ? Colors.white : Colors.black87),
            onPressed: () {},
          ),
          IconButton(
            icon: Icon(Icons.menu, color: isDark ? Colors.white : Colors.black87),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Summary Card
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF005994), Color(0xFF0088CC)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(28),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF005994).withOpacity(0.3),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  )
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Günlük Özet',
                        style: TextStyle(color: Colors.white70, fontSize: 13, fontWeight: FontWeight.w600),
                      ),
                      Container(
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), shape: BoxShape.circle),
                        child: const Icon(Icons.trending_up, color: Colors.white, size: 14),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    '1,284.50 ₺',
                    style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold, letterSpacing: -1),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    children: [
                      _buildStatItem('Bildirim', '12', Icons.send_outlined),
                      const SizedBox(width: 32),
                      _buildStatItem('Sorgu', '48', Icons.search_outlined),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Hızlı İşlemler',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                TextButton(onPressed: () {}, child: const Text('Tümü', style: TextStyle(fontSize: 13))),
              ],
            ),
            const SizedBox(height: 16),
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              childAspectRatio: 1.1,
              children: [
                _buildActionCard(Icons.add_box_outlined, 'Yeni Bildirim', 'Hızlı kayıt', isDark),
                _buildActionCard(Icons.history_outlined, 'Geçmiş', 'Son işlemler', isDark),
                _buildActionCard(Icons.search_outlined, 'Sorgulama', 'Künye/Plaka', isDark),
                _buildActionCard(Icons.qr_code_scanner_outlined, 'Karekod', 'Hızlı tara', isDark),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLogoDot(Color color, double size) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
      ),
    );
  }

  Widget _buildStatItem(String label, String value, IconData icon) {
    return Row(
      children: [
        Icon(icon, color: Colors.white60, size: 16),
        const SizedBox(width: 8),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(value, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
            Text(label, style: const TextStyle(color: Colors.white60, fontSize: 10)),
          ],
        ),
      ],
    );
  }

  Widget _buildActionCard(IconData icon, String title, String subtitle, bool isDark) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2B2930) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 10, offset: const Offset(0, 4))
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {},
          borderRadius: BorderRadius.circular(20),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: const Color(0xFF005994).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(icon, color: const Color(0xFF005994), size: 24),
                ),
                const SizedBox(height: 12),
                Text(
                  title,
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: isDark ? Colors.white : Colors.black87),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: TextStyle(color: Colors.grey[500], fontSize: 10),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}`;
      case 'favorites':
        return `import 'package:flutter/material.dart';

class FavoritesScreen extends StatefulWidget {
  const FavoritesScreen({Key? key}) : super(key: key);

  @override
  State<FavoritesScreen> createState() => _FavoritesScreenState();
}

class _FavoritesScreenState extends State<FavoritesScreen> {
  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Text(
          'Favori İşlemlerim',
          style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontWeight: FontWeight.bold),
        ),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: isDark ? Colors.white : Colors.black87),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          _buildFavoriteItem(Icons.description, 'Yeni Bildirim Oluştur', 'Hızlıca yeni künye bildirimi yapın', Colors.blue, isDark),
          _buildFavoriteItem(Icons.trending_up, 'İhracat Fiyatları', 'Güncel ihracat bültenini inceleyin', Colors.orange, isDark),
          _buildFavoriteItem(Icons.shopping_basket, 'Organik Ürün Sorgula', 'Sertifikalı ürünleri kontrol edin', Colors.green, isDark),
          _buildFavoriteItem(Icons.map, 'Yakın Hal Yerleri', 'Size en yakın hal ve pazar yerleri', Colors.red, isDark),
          _buildFavoriteItem(Icons.shield, 'Hakem Heyeti Listesi', 'Uyuşmazlık çözümü heyetleri', Colors.purple, isDark),
        ],
      ),
    );
  }

  Widget _buildFavoriteItem(IconData icon, String title, String subtitle, Color color, bool isDark) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2B2930) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(icon, color: color, size: 24),
        ),
        title: Text(
          title,
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: isDark ? Colors.white : Colors.black87),
        ),
        subtitle: Text(
          subtitle,
          style: TextStyle(color: Colors.grey[500], fontSize: 10),
        ),
        trailing: Icon(Icons.chevron_right, color: Colors.grey[400]),
        onTap: () {},
      ),
    );
  }
}`;
      case 'notificationWizard':
        return `import 'package:flutter/material.dart';

class NotificationWizardScreen extends StatefulWidget {
  const NotificationWizardScreen({Key? key}) : super(key: key);

  @override
  State<NotificationWizardScreen> createState() => _NotificationWizardScreenState();
}

class _NotificationWizardScreenState extends State<NotificationWizardScreen> {
  int _currentStep = 1;
  String? _selectedRole;
  String? _selectedProduct = 'Domates (Salkım)';

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Text(
          'Yeni Bildirim',
          style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontWeight: FontWeight.bold),
        ),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: isDark ? Colors.white : Colors.black87),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          // Progress Stepper
          Container(
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 24),
            color: isDark ? const Color(0xFF2B2930) : Colors.white,
            child: Row(
              children: [
                _buildStepCircle(1),
                _buildStepLine(1),
                _buildStepCircle(2),
                _buildStepLine(2),
                _buildStepCircle(3),
                _buildStepLine(3),
                _buildStepCircle(4),
              ],
            ),
          ),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: _buildStepContent(isDark),
            ),
          ),
          // Navigation
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF1C1B1F) : Colors.white,
              border: Border(top: BorderSide(color: isDark ? Colors.white10 : Colors.black12)),
            ),
            child: ElevatedButton(
              onPressed: (_currentStep == 1 && _selectedRole == null) ? null : () {
                if (_currentStep < 4) {
                  setState(() => _currentStep++);
                } else {
                  Navigator.pop(context);
                }
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF005994),
                foregroundColor: Colors.white,
                minimumSize: const Size.fromHeight(56),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                disabledBackgroundColor: const Color(0xFF005994).withOpacity(0.5),
                elevation: 0,
              ),
              child: Text(_currentStep < 4 ? 'Sonraki Adım' : 'Tamamla', style: const TextStyle(fontWeight: FontWeight.bold)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStepCircle(int step) {
    final isActive = step <= _currentStep;
    return Container(
      width: 28,
      height: 28,
      decoration: BoxDecoration(
        color: isActive ? const Color(0xFF005994) : Colors.grey[300],
        shape: BoxShape.circle,
      ),
      child: Center(
        child: Text(
          '\$step',
          style: TextStyle(
            color: isActive ? Colors.white : Colors.grey[600],
            fontSize: 12,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  Widget _buildStepLine(int step) {
    final isActive = step < _currentStep;
    return Expanded(
      child: Container(
        height: 2,
        color: isActive ? const Color(0xFF005994) : Colors.grey[300],
      ),
    );
  }

  Widget _buildStepContent(bool isDark) {
    switch (_currentStep) {
      case 1:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Bildirimci Sıfatı',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: isDark ? Colors.white : Colors.black87),
            ),
            const SizedBox(height: 8),
            Text(
              'İşlem yapacağınız sıfatı seçin.',
              style: TextStyle(fontSize: 12, color: Colors.grey[600]),
            ),
            const SizedBox(height: 24),
            _buildRoleOption('Üretici', isDark),
            _buildRoleOption('Komisyoncu', isDark),
            _buildRoleOption('Tüccar', isDark),
            const SizedBox(height: 24),
            _buildInfoBox(isDark),
          ],
        );
      case 2:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Ürün Seçimi',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: isDark ? Colors.white : Colors.black87),
            ),
            const SizedBox(height: 24),
            TextField(
              decoration: InputDecoration(
                hintText: 'Ürün ara...',
                prefixIcon: const Icon(Icons.search),
                filled: true,
                fillColor: isDark ? const Color(0xFF2B2930) : Colors.white,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
            const SizedBox(height: 16),
            _buildProductItem('Domates (Salkım)', 'Meyve/Sebze', isDark),
            _buildProductItem('Salatalık (Sera)', 'Meyve/Sebze', isDark),
            _buildProductItem('Biber (Sivri)', 'Meyve/Sebze', isDark),
          ],
        );
      case 3:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Miktar ve Fiyat',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: isDark ? Colors.white : Colors.black87),
            ),
            const SizedBox(height: 24),
            _buildInputField('Miktar (KG)', 'Örn: 500', isDark),
            const SizedBox(height: 16),
            _buildInputField('Birim Fiyat (₺)', 'Örn: 15.50', isDark),
            const SizedBox(height: 16),
            _buildInputField('Üretim Yeri', 'Örn: Antalya', isDark),
          ],
        );
      case 4:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Center(
              child: Icon(Icons.check_circle_outline, size: 64, color: Colors.green),
            ),
            const SizedBox(height: 24),
            Text(
              'Özet Bilgiler',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: isDark ? Colors.white : Colors.black87),
            ),
            const SizedBox(height: 16),
            _buildSummaryRow('Sıfat', _selectedRole ?? '-', isDark),
            _buildSummaryRow('Ürün', _selectedProduct ?? '-', isDark),
            _buildSummaryRow('Miktar', '500 KG', isDark),
            _buildSummaryRow('Toplam Tutar', '7.750,00 ₺', isDark),
          ],
        );
      default:
        return const SizedBox();
    }
  }

  Widget _buildRoleOption(String role, bool isDark) {
    final isSelected = _selectedRole == role;
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2B2930) : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isSelected ? const Color(0xFF005994) : (isDark ? Colors.white10 : Colors.black12)),
      ),
      child: ListTile(
        onTap: () => setState(() => _selectedRole = role),
        title: Text(role, style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal)),
        trailing: Radio<String>(
          value: role,
          groupValue: _selectedRole,
          onChanged: (val) => setState(() => _selectedRole = val),
          activeColor: const Color(0xFF005994),
        ),
      ),
    );
  }

  Widget _buildProductItem(String name, String category, bool isDark) {
    final isSelected = _selectedProduct == name;
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2B2930) : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isSelected ? const Color(0xFF005994) : (isDark ? Colors.white10 : Colors.black12)),
      ),
      child: ListTile(
        onTap: () => setState(() => _selectedProduct = name),
        leading: const Icon(Icons.shopping_basket_outlined, color: Color(0xFF005994)),
        title: Text(name, style: TextStyle(fontSize: 14, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal, color: isDark ? Colors.white : Colors.black87)),
        subtitle: Text(category, style: const TextStyle(fontSize: 11, color: Colors.grey)),
        trailing: isSelected ? const Icon(Icons.check_circle, color: Color(0xFF005994)) : null,
      ),
    );
  }

  Widget _buildInputField(String label, String hint, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: isDark ? Colors.white70 : Colors.black54)),
        const SizedBox(height: 8),
        TextField(
          decoration: InputDecoration(
            hintText: hint,
            filled: true,
            fillColor: isDark ? const Color(0xFF2B2930) : Colors.white,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),
      ],
    );
  }

  Widget _buildSummaryRow(String label, String value, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: Colors.grey, fontSize: 13)),
          Text(value, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: isDark ? Colors.white : Colors.black87)),
        ],
      ),
    );
  }

  Widget _buildInfoBox(bool isDark) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF005994).withOpacity(0.05),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF005994).withOpacity(0.1)),
      ),
      child: Row(
        children: [
          const Icon(Icons.info_outline, color: Color(0xFF005994), size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              'Bildirim işlemleri HKS üzerinden anlık gerçekleşir. Lütfen bilgilerin doğruluğundan emin olun.',
              style: TextStyle(fontSize: 11, color: const Color(0xFF005994)),
            ),
          ),
        ],
      ),
    );
  }
}
`;
      case 'notificationsList':
        return `import 'package:flutter/material.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Bildirimler'),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
        actions: [
          TextButton(
            onPressed: () {},
            child: const Text('Tümünü Oku', style: TextStyle(fontSize: 12)),
          ),
        ],
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: 5,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (context, index) {
          return Container(
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF2B2930) : Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 10, offset: const Offset(0, 4))
              ],
            ),
            child: ListTile(
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              leading: Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: const Color(0xFF005994).withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.notifications_none, color: Color(0xFF005994), size: 20),
              ),
              title: Text(
                'Yeni Fiyat Güncellemesi',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: isDark ? Colors.white : Colors.black87),
              ),
              subtitle: Text(
                'Domates fiyatları güncellendi.',
                style: TextStyle(fontSize: 12, color: isDark ? Colors.white70 : Colors.black54),
              ),
              trailing: const Text('10 dk önce', style: TextStyle(fontSize: 10, color: Colors.grey)),
            ),
          );
        },
      ),
    );
  }
}`;
      case 'profile':
        return `import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Profil'),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 24),
            // Profile Image
            Center(
              child: Stack(
                children: [
                  Container(
                    width: 100,
                    height: 100,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: const Color(0xFF005994), width: 2),
                      image: const DecorationImage(
                        image: NetworkImage('https://picsum.photos/seed/user/200/200'),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: Container(
                      padding: const EdgeInsets.all(6),
                      decoration: const BoxDecoration(color: Color(0xFF005994), shape: BoxShape.circle),
                      child: const Icon(Icons.camera_alt, size: 16, color: Colors.white),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Kullanıcı Adı',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: isDark ? Colors.white : Colors.black87),
            ),
            Text(
              'kullanici@hks.gov.tr',
              style: TextStyle(fontSize: 12, color: Colors.grey[600]),
            ),
            const SizedBox(height: 32),
            // Menu Sections
            _buildMenuSection(isDark, [
              _buildMenuItem(Icons.person_outline, 'Profil Bilgileri', isDark),
              _buildMenuItem(Icons.security_outlined, 'Güvenlik Ayarları', isDark),
              _buildMenuItem(Icons.settings_outlined, 'Uygulama Ayarları', isDark),
            ]),
            const SizedBox(height: 16),
            _buildMenuSection(isDark, [
              _buildMenuItem(Icons.help_outline, 'Yardım Merkezi', isDark),
              _buildMenuItem(Icons.info_outline, 'Hakkımızda', isDark),
            ]),
            const SizedBox(height: 16),
            _buildMenuSection(isDark, [
              _buildMenuItem(Icons.logout, 'Çıkış Yap', isDark, isDestructive: true),
            ]),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildMenuSection(bool isDark, List<Widget> items) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2B2930) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
      ),
      child: Column(children: items),
    );
  }

  Widget _buildMenuItem(IconData icon, String title, bool isDark, {bool isDestructive = false}) {
    return ListTile(
      leading: Icon(icon, color: isDestructive ? Colors.red : const Color(0xFF005994), size: 20),
      title: Text(
        title,
        style: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          color: isDestructive ? Colors.red : (isDark ? Colors.white : Colors.black87),
        ),
      ),
      trailing: const Icon(Icons.chevron_right, size: 16, color: Colors.grey),
      onTap: () {},
    );
  }
}`;
      case 'menu':
        return `import 'package:flutter/material.dart';

class MenuScreen extends StatelessWidget {
  const MenuScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Menü'),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 3,
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              children: [
                _buildGridItem(Icons.dashboard_outlined, 'Ana Sayfa', isDark),
                _buildGridItem(Icons.search, 'Sorgulama', isDark),
                _buildGridItem(Icons.notifications_none, 'Bildirimler', isDark),
                _buildGridItem(Icons.history, 'Geçmiş', isDark),
                _buildGridItem(Icons.qr_code_scanner, 'Karekod', isDark),
                _buildGridItem(Icons.help_outline, 'Yardım', isDark),
                _buildGridItem(Icons.settings_outlined, 'Ayarlar', isDark),
                _buildGridItem(Icons.language, 'Web Sitesi', isDark),
                _buildGridItem(Icons.message_outlined, 'Destek', isDark),
              ],
            ),
            const SizedBox(height: 24),
            Container(
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF2B2930) : Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
              ),
              child: Column(
                children: [
                  _buildListItem(Icons.description_outlined, 'Mevzuat', isDark),
                  _buildListItem(Icons.info_outline, 'Hakkımızda', isDark),
                ],
              ),
            ),
            const SizedBox(height: 24),
            OutlinedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.logout, size: 16),
              label: const Text('Çıkış Yap'),
              style: OutlinedButton.styleFrom(
                foregroundColor: Colors.red,
                side: const BorderSide(color: Colors.red),
                minimumSize: const Size(140, 40),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGridItem(IconData icon, String label, bool isDark) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2B2930) : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0xFF005994).withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: const Color(0xFF005994), size: 20),
          ),
          const SizedBox(height: 8),
          Text(
            label,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.bold,
              color: isDark ? Colors.white : Colors.black87,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildListItem(IconData icon, String label, bool isDark) {
    return ListTile(
      leading: Icon(icon, color: isDark ? Colors.white70 : Colors.black54, size: 20),
      title: Text(
        label,
        style: TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w500,
          color: isDark ? Colors.white : Colors.black87,
        ),
      ),
      trailing: const Icon(Icons.chevron_right, size: 16),
      onTap: () {},
    );
  }
}
`;
      case 'forgotPassword':
        return `import 'package:flutter/material.dart';

class ForgotPasswordScreen extends StatelessWidget {
  const ForgotPasswordScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: isDark ? Colors.white : Colors.black87),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Şifremi Unuttum',
          style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontWeight: FontWeight.bold),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF005994).withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.lock_reset, size: 64, color: Color(0xFF005994)),
            ),
            const SizedBox(height: 32),
            const Text(
              'Şifrenizi mi unuttunuz?',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            Text(
              'E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey[600], fontSize: 14),
            ),
            const SizedBox(height: 40),
            _buildTextField('E-Posta', Icons.email_outlined, isDark),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Sıfırlama bağlantısı gönderildi.')),
                );
                Navigator.pop(context);
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF005994),
                foregroundColor: Colors.white,
                minimumSize: const Size.fromHeight(56),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                elevation: 2,
              ),
              child: const Text('Bağlantı Gönder', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField(String label, IconData icon, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 1),
        ),
        const SizedBox(height: 8),
        TextFormField(
          style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontSize: 14),
          decoration: InputDecoration(
            prefixIcon: Icon(icon, color: const Color(0xFF005994), size: 20),
            hintText: label,
            hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),
            filled: true,
            fillColor: isDark ? const Color(0xFF2B2930) : Colors.grey[50],
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(color: isDark ? Colors.white10 : Colors.grey[200]!),
            ),
          ),
        ),
      ],
    );
  }
}
`;
      case 'register':
        return `import 'package:flutter/material.dart';

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: isDark ? Colors.white : Colors.black87),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Kayıt Ol',
          style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontWeight: FontWeight.bold),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Yeni Hesap Oluştur',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'HKS Mobil dünyasına katılın',
              style: TextStyle(color: Colors.grey[600], fontSize: 14),
            ),
            const SizedBox(height: 32),
            _buildTextField('Ad Soyad', Icons.person_outline, isDark),
            const SizedBox(height: 16),
            _buildTextField('E-Posta', Icons.email_outlined, isDark),
            const SizedBox(height: 16),
            _buildTextField('T.C. Kimlik No', Icons.shield_outlined, isDark),
            const SizedBox(height: 16),
            _buildTextField('Şifre', Icons.lock_outline, isDark, isPassword: true),
            const SizedBox(height: 40),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF005994),
                foregroundColor: Colors.white,
                minimumSize: const Size.fromHeight(56),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                elevation: 2,
              ),
              child: const Text('Hesap Oluştur', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(height: 24),
            Center(
              child: TextButton(
                onPressed: () => Navigator.pop(context),
                child: RichText(
                  text: TextSpan(
                    text: 'Zaten hesabınız var mı? ',
                    style: TextStyle(color: Colors.grey[600], fontSize: 13),
                    children: const [
                      TextSpan(
                        text: 'Giriş Yap',
                        style: TextStyle(color: Color(0xFF005994), fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField(String label, IconData icon, bool isDark, {bool isPassword = false}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 1),
        ),
        const SizedBox(height: 8),
        TextFormField(
          obscureText: isPassword,
          style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontSize: 14),
          decoration: InputDecoration(
            prefixIcon: Icon(icon, color: const Color(0xFF005994), size: 20),
            hintText: label,
            hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),
            filled: true,
            fillColor: isDark ? const Color(0xFF2B2930) : Colors.grey[50],
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(color: isDark ? Colors.white10 : Colors.grey[200]!),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(color: isDark ? Colors.white10 : Colors.grey[200]!),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: const BorderSide(color: Color(0xFF005994), width: 1.5),
            ),
          ),
        ),
      ],
    );
  }
}
`;
      case 'history':
        return `import 'package:flutter/material.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('İşlem Geçmişi'),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: 10,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (context, index) {
          final items = [
            {'name': 'Domates (Salkım)', 'date': '24.03.2026', 'amount': '+500 KG', 'purchase': '15,00 ₺', 'sale': '22,50 ₺'},
            {'name': 'Salatalık (Sera)', 'date': '24.03.2026', 'amount': '+300 KG', 'purchase': '12,00 ₺', 'sale': '18,00 ₺'},
            {'name': 'Biber (Sivri)', 'date': '23.03.2026', 'amount': '+150 KG', 'purchase': '25,00 ₺', 'sale': '35,00 ₺'},
            {'name': 'Patlıcan (Kemer)', 'date': '23.03.2026', 'amount': '+200 KG', 'purchase': '18,00 ₺', 'sale': '26,00 ₺'}
          ];
          final item = items[index % items.length];

          return Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF2B2930) : Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
            ),
            child: Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: const Color(0xFF005994).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Icon(Icons.history, color: Color(0xFF005994), size: 20),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item['name']!,
                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: isDark ? Colors.white : Colors.black87),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Text('Geliş: \${item['purchase']}', style: TextStyle(fontSize: 10, color: Colors.grey[600])),
                          const SizedBox(width: 8),
                          Text('Satış: \${item['sale']}', style: TextStyle(fontSize: 10, color: Colors.grey[600])),
                        ],
                      ),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      item['amount']!,
                      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.green),
                    ),
                    Text(
                      item['date']!,
                      style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.grey[500]),
                    ),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}`;
      case 'help':
        return `import 'package:flutter/material.dart';

class HelpScreen extends StatelessWidget {
  const HelpScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Yardım Merkezi'),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF2B2930) : Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
            ),
            child: const TextField(
              decoration: InputDecoration(
                hintText: 'Nasıl yardımcı olabiliriz?',
                prefixIcon: Icon(Icons.search, size: 20),
                border: InputBorder.none,
                hintStyle: TextStyle(fontSize: 14),
              ),
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'SIKÇA SORULAN SORULAR',
            style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 1),
          ),
          const SizedBox(height: 12),
          _buildFaqItem('Bildirim nasıl yapılır?', isDark),
          _buildFaqItem('Şifremi unuttum ne yapmalıyım?', isDark),
          _buildFaqItem('Künye sorgulama ücretli mi?', isDark),
          _buildFaqItem('HKS Mobil nedir?', isDark),
        ],
      ),
    );
  }

  Widget _buildFaqItem(String question, bool isDark) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2B2930) : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
      ),
      child: ExpansionTile(
        title: Text(question, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: isDark ? Colors.white : Colors.black87)),
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              'Bu sorunun cevabı yakında eklenecektir. Detaylı bilgi için canlı destek hattımıza bağlanabilirsiniz.',
              style: TextStyle(fontSize: 12, color: isDark ? Colors.white70 : Colors.black54),
            ),
          ),
        ],
      ),
    );
  }
}`;
      case 'qrcode':
        return `import 'package:flutter/material.dart';

class QRCodeScreen extends StatelessWidget {
  const QRCodeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: const Text('Karekod Okut'),
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: Stack(
        children: [
          // Scanner View Simulation
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 260,
                  height: 260,
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.white24, width: 1),
                    borderRadius: BorderRadius.circular(32),
                  ),
                  child: Stack(
                    children: [
                      // Corner Accents
                      _buildCorner(0, 0),
                      _buildCorner(1, 0),
                      _buildCorner(0, 1),
                      _buildCorner(1, 1),
                      // Scanning Line
                      _ScanningLine(),
                    ],
                  ),
                ),
                const SizedBox(height: 48),
                const Text(
                  'Karekodu çerçevenin içine hizalayın',
                  style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w500),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Otomatik olarak taranacaktır',
                  style: TextStyle(color: Colors.white38, fontSize: 12),
                ),
              ],
            ),
          ),
          // Bottom Controls
          Positioned(
            bottom: 60,
            left: 0,
            right: 0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildControlBtn(Icons.flash_on_outlined, 'Flaş'),
                const SizedBox(width: 40),
                _buildControlBtn(Icons.image_outlined, 'Galeri'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCorner(double x, double y) {
    return Positioned(
      top: y == 0 ? -2 : null,
      bottom: y == 1 ? -2 : null,
      left: x == 0 ? -2 : null,
      right: x == 1 ? -2 : null,
      child: Container(
        width: 32,
        height: 32,
        decoration: BoxDecoration(
          border: Border(
            top: y == 0 ? const BorderSide(color: Color(0xFF005994), width: 5) : BorderSide.none,
            bottom: y == 1 ? const BorderSide(color: Color(0xFF005994), width: 5) : BorderSide.none,
            left: x == 0 ? const BorderSide(color: Color(0xFF005994), width: 5) : BorderSide.none,
            right: x == 1 ? const BorderSide(color: Color(0xFF005994), width: 5) : BorderSide.none,
          ),
        ),
      ),
    );
  }

  Widget _buildControlBtn(IconData icon, String label) {
    return Column(
      children: [
        Container(
          width: 64,
          height: 64,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.1),
            shape: BoxShape.circle,
            border: Border.all(color: Colors.white10),
          ),
          child: Icon(icon, color: Colors.white, size: 28),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(color: Colors.white70, fontSize: 12)),
      ],
    );
  }
}

class _ScanningLine extends StatefulWidget {
  @override
  __ScanningLineState createState() => __ScanningLineState();
}

class __ScanningLineState extends State<_ScanningLine> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 2))..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Positioned(
          top: _controller.value * 260,
          left: 10,
          right: 10,
          child: Container(
            height: 3,
            decoration: BoxDecoration(
              boxShadow: [
                BoxShadow(color: const Color(0xFF005994).withOpacity(0.6), blurRadius: 15, spreadRadius: 2),
              ],
              gradient: const LinearGradient(
                colors: [Colors.transparent, Color(0xFF005994), Colors.transparent],
              ),
            ),
          ),
        );
      },
    );
  }
}`;
      case 'profileInfo':
        return `import 'package:flutter/material.dart';

class ProfileInfoScreen extends StatelessWidget {
  const ProfileInfoScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Profil Bilgileri'),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          _buildInfoField('Ad Soyad', 'Ahmet Yılmaz', isDark),
          _buildInfoField('T.C. Kimlik No', '12345678901', isDark),
          _buildInfoField('E-posta', 'ahmet@example.com', isDark),
          _buildInfoField('Telefon', '+90 555 123 45 67', isDark),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF005994),
              foregroundColor: Colors.white,
              minimumSize: const Size.fromHeight(56),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
            ),
            child: const Text('Bilgileri Güncelle'),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoField(String label, String value, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: isDark ? Colors.white70 : Colors.black54),
          ),
          const SizedBox(height: 8),
          TextFormField(
            initialValue: value,
            style: TextStyle(color: isDark ? Colors.white : Colors.black87),
            decoration: InputDecoration(
              filled: true,
              fillColor: isDark ? const Color(0xFF2B2930) : Colors.white,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: isDark ? Colors.white10 : Colors.black12),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: isDark ? Colors.white10 : Colors.black12),
              ),
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            ),
          ),
        ],
      ),
    );
  }
}`;
      case 'securitySettings':
        return `import 'package:flutter/material.dart';

class SecuritySettingsScreen extends StatelessWidget {
  const SecuritySettingsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Güvenlik Ayarları'),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildSection(isDark, [
            _buildSwitchTile('İki Faktörlü Doğrulama', 'Girişlerde SMS onayı istenir', true, isDark),
            _buildSwitchTile('Biyometrik Giriş', 'Parmak izi veya yüz tanıma', false, isDark),
          ]),
          const SizedBox(height: 16),
          _buildSection(isDark, [
            _buildActionTile(Icons.lock_outline, 'Şifre Değiştir', isDark),
            _buildActionTile(Icons.history, 'Giriş Hareketleri', isDark),
          ]),
        ],
      ),
    );
  }

  Widget _buildSection(bool isDark, List<Widget> items) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2B2930) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
      ),
      child: Column(children: items),
    );
  }

  Widget _buildSwitchTile(String title, String subtitle, bool value, bool isDark) {
    return SwitchListTile(
      title: Text(title, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: isDark ? Colors.white : Colors.black87)),
      subtitle: Text(subtitle, style: const TextStyle(fontSize: 11, color: Colors.grey)),
      value: value,
      activeColor: const Color(0xFF005994),
      onChanged: (v) {},
    );
  }

  Widget _buildActionTile(IconData icon, String title, bool isDark) {
    return ListTile(
      leading: Icon(icon, color: const Color(0xFF005994), size: 20),
      title: Text(title, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: isDark ? Colors.white : Colors.black87)),
      trailing: const Icon(Icons.chevron_right, size: 16),
      onTap: () {},
    );
  }
}`;
      case 'appSettings':
        return `import 'package:flutter/material.dart';

class AppSettingsScreen extends StatelessWidget {
  const AppSettingsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Uygulama Ayarları'),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          _buildSectionTitle('GÖRÜNÜM VE DİL'),
          const SizedBox(height: 12),
          _buildSection(isDark, [
            _buildActionTile('Dil Seçimi', 'Türkçe', isDark),
            _buildSwitchTile('Karanlık Mod', isDark, isDark),
          ]),
          const SizedBox(height: 24),
          _buildSectionTitle('BİLDİRİMLER'),
          const SizedBox(height: 12),
          _buildSection(isDark, [
            _buildSwitchTile('Anlık Bildirimler', true, isDark),
            _buildSwitchTile('E-posta Bildirimleri', false, isDark),
          ]),
          const SizedBox(height: 24),
          _buildSectionTitle('HAKKINDA'),
          const SizedBox(height: 12),
          _buildSection(isDark, [
            _buildActionTile('Uygulama Versiyonu', 'v1.0.4', isDark),
            _buildActionTile('Kullanım Koşulları', '', isDark),
            _buildActionTile('Gizlilik Politikası', '', isDark),
          ]),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 1.2),
    );
  }

  Widget _buildSection(bool isDark, List<Widget> items) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2B2930) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
      ),
      child: Column(children: items),
    );
  }

  Widget _buildSwitchTile(String title, bool value, bool isDark) {
    return SwitchListTile(
      title: Text(title, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: isDark ? Colors.white : Colors.black87)),
      value: value,
      activeColor: const Color(0xFF005994),
      onChanged: (v) {},
    );
  }

  Widget _buildActionTile(String title, String trailing, bool isDark) {
    return ListTile(
      title: Text(title, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: isDark ? Colors.white : Colors.black87)),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (trailing.isNotEmpty) Text(trailing, style: const TextStyle(fontSize: 12, color: Colors.grey)),
          const Icon(Icons.chevron_right, size: 16, color: Colors.grey),
        ],
      ),
      onTap: () {},
    );
  }
}`;
      case 'changePassword':
        return `import 'package:flutter/material.dart';

class ChangePasswordScreen extends StatelessWidget {
  const ChangePasswordScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Şifre Değiştir'),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            _buildPasswordField('Mevcut Şifre', isDark),
            const SizedBox(height: 16),
            _buildPasswordField('Yeni Şifre', isDark),
            const SizedBox(height: 16),
            _buildPasswordField('Yeni Şifre (Tekrar)', isDark),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF005994),
                foregroundColor: Colors.white,
                minimumSize: const Size.fromHeight(56),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
              ),
              child: const Text('Şifreyi Güncelle'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPasswordField(String label, bool isDark) {
    return TextFormField(
      obscureText: true,
      style: TextStyle(color: isDark ? Colors.white : Colors.black87),
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(color: isDark ? Colors.white70 : Colors.black54),
        filled: true,
        fillColor: isDark ? const Color(0xFF2B2930) : Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: isDark ? Colors.white10 : Colors.black12),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: isDark ? Colors.white10 : Colors.black12),
        ),
      ),
    );
  }
}`;
      case 'liveChat':
        return `import 'package:flutter/material.dart';

class LiveChatScreen extends StatelessWidget {
  const LiveChatScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Canlı Destek'),
        backgroundColor: isDark ? const Color(0xFF1C1B1F) : Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _buildMessage('Merhaba, size nasıl yardımcı olabilirim?', false, isDark),
                _buildMessage('Bildirimlerim neden görünmüyor?', true, isDark),
                _buildMessage('Hemen kontrol ediyorum...', false, isDark),
                _buildMessage('Sistemde bir güncelleme yapıldı, lütfen uygulamayı kapatıp tekrar açın.', false, isDark),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF1C1B1F) : Colors.white,
              border: Border(top: BorderSide(color: isDark ? Colors.white10 : Colors.black12)),
            ),
            child: Row(
              children: [
                IconButton(icon: const Icon(Icons.attach_file, size: 20), onPressed: () {}),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF2B2930) : Colors.grey[100],
                      borderRadius: BorderRadius.circular(24),
                    ),
                    child: const TextField(
                      decoration: InputDecoration(
                        hintText: 'Mesajınızı yazın...',
                        border: InputBorder.none,
                        hintStyle: TextStyle(fontSize: 13),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  decoration: const BoxDecoration(color: Color(0xFF005994), shape: BoxShape.circle),
                  child: IconButton(icon: const Icon(Icons.send, color: Colors.white, size: 18), onPressed: () {}),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMessage(String text, bool isMe, bool isDark) {
    return Align(
      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        constraints: const BoxConstraints(maxWidth: 280),
        decoration: BoxDecoration(
          color: isMe ? const Color(0xFF005994) : (isDark ? const Color(0xFF2B2930) : Colors.white),
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(16),
            topRight: const Radius.circular(16),
            bottomLeft: Radius.circular(isMe ? 16 : 0),
            bottomRight: Radius.circular(isMe ? 0 : 16),
          ),
          boxShadow: [
            BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4, offset: const Offset(0, 2))
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              text,
              style: TextStyle(
                fontSize: 13,
                color: isMe ? Colors.white : (isDark ? Colors.white : Colors.black87),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              '09:42',
              style: TextStyle(
                fontSize: 8,
                color: isMe ? Colors.white60 : Colors.grey,
              ),
            ),
          ],
        ),
      ),
    );
  }
}`;
      default:
        return `import 'package:flutter/material.dart';

class ${screenName}Screen extends StatelessWidget {
  const ${screenName}Screen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('${screenName}')),
      body: const Center(
        child: Text('Bu ekran için Flutter kodu yakında eklenecektir.'),
      ),
    );
  }
}`;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getFlutterCode(activeScreen));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const navigateTo = (screen: Screen) => {
    if (screen === 'menu') {
      setHistory(prev => [...prev, screen]);
      setActiveScreen(screen);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setHistory(prev => [...prev, screen]);
      setActiveScreen(screen);
      setIsLoading(false);
    }, 1800);
  };

  const goBack = () => {
    const prevScreen = history.length > 1 ? history[history.length - 2] : 'dashboard';
    
    if (activeScreen === 'menu' || prevScreen === 'menu') {
      if (history.length > 1) {
        const newHistory = [...history];
        newHistory.pop();
        setHistory(newHistory);
        setActiveScreen(newHistory[newHistory.length - 1]);
      } else {
        setActiveScreen('dashboard');
      }
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (history.length > 1) {
        const newHistory = [...history];
        newHistory.pop();
        setHistory(newHistory);
        setActiveScreen(newHistory[newHistory.length - 1]);
      } else {
        setActiveScreen('dashboard');
      }
      setIsLoading(false);
    }, 800);
  };

  const renderTopBar = () => {
    if (activeScreen === 'splash' || activeScreen === 'login' || activeScreen === 'register') return null;
    
    const showBackButton = !['dashboard'].includes(activeScreen);

    const getTitle = () => {
      switch (activeScreen) {
        case 'dashboard': return 'HKS Mobil';
        case 'query': return 'Künye/Plaka Sorgulama';
        case 'favorites': return 'Favori İşlemlerim';
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
        case 'announcements': return 'Duyurular';
        case 'memberLogin': return 'Üye Girişi';
        case 'marketPlaces': return 'Hal ve Pazar Yerleri';
        case 'exportPrices': return 'İhracat Fiyat Listesi';
        case 'organicQuery': return 'Organik Ürün Sorgulama';
        case 'notifierStats': return 'Bildirimci İstatistikleri';
        case 'priceDetails': return 'Ürün Fiyat Detayları';
        case 'marketArbitration': return 'Hal Hakem Heyeti Sorgulama';
        default: return '';
      }
    };

    return (
      <div className={cn(
        "px-4 pt-10 pb-2 flex justify-between items-center shrink-0 z-30 border-b transition-colors",
        isDarkMode ? "bg-zinc-950 border-zinc-800/50" : "bg-[#FFFFFF] border-[#D1D9E0]/50"
      )}>
        <div className="flex items-center gap-2 min-w-[40px]">
          {showBackButton && (
            <button onClick={goBack} className={cn(
              "p-2 rounded-full transition-colors",
              isDarkMode ? "hover:bg-zinc-900 text-zinc-100" : "hover:bg-zinc-100 text-[#44474E]"
            )}>
              <ArrowLeft size={20} />
            </button>
          )}
        </div>

        <h3 className={cn("text-sm font-bold truncate", isDarkMode ? "text-zinc-100" : "text-[#1B1B1F]")}>{getTitle()}</h3>

        <div className="flex items-center gap-1 min-w-[40px] justify-end">
          <button 
            onClick={() => navigateTo('menu')}
            className={cn(
              "p-2 rounded-full transition-colors",
              isDarkMode ? "text-zinc-100 hover:bg-zinc-900" : "text-[#44474E] hover:bg-zinc-100"
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
          className={cn(
            "absolute inset-0 z-[100] flex items-center justify-center backdrop-blur-sm transition-colors",
            isDarkMode ? "bg-black/60" : "bg-[#005994]/10"
          )}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            className={cn(
              "flex flex-col items-center gap-4 p-5 rounded-3xl shadow-xl",
              isDarkMode ? "bg-zinc-900 shadow-black/50" : "bg-white shadow-[#005994]/20"
            )}
          >
            <div className="relative w-12 h-12">
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[3px] border-transparent border-t-[#005994] border-r-[#005994] rounded-full opacity-90"
              />
              {/* Inner Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1.5 border-[3px] border-transparent border-b-[#F39200] border-l-[#F39200] rounded-full opacity-90"
              />
              {/* Center Dot */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 bg-[#005994] rounded-full shadow-[0_0_10px_rgba(0,89,148,0.8)]" />
              </motion.div>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className={cn(
                "text-xs font-bold tracking-wider uppercase", 
                isDarkMode ? "text-white" : "text-[#005994]"
              )}>
                Yükleniyor
              </span>
              <span className={cn(
                "text-[10px] font-medium", 
                isDarkMode ? "text-zinc-400" : "text-zinc-500"
              )}>
                Lütfen bekleyin...
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderScreen = () => {
    switch (activeScreen) {
      case 'splash':
        return (
          <div className={cn(
            "h-full flex flex-col items-center justify-center relative overflow-hidden",
            isDarkMode ? "bg-zinc-950" : "bg-[#005994]"
          )}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            </div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className={cn(
                "p-8 rounded-[40px] shadow-2xl mb-8 transition-colors",
                isDarkMode ? "bg-zinc-900" : "bg-white"
              )}>
                <AppLogo size={80} isDark={isDarkMode} />
              </div>
              
              <h1 className={cn(
                "text-3xl font-black tracking-widest mb-2",
                isDarkMode ? "text-white" : "text-white"
              )}>HKS MOBİL</h1>
              <p className={cn(
                "text-xs tracking-[0.2em] uppercase opacity-70",
                isDarkMode ? "text-zinc-400" : "text-white/80"
              )}>Geleceğin Hal Kayıt Sistemi</p>
            </motion.div>

            <div className="absolute bottom-12 flex flex-col items-center gap-4">
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-white"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'login':
        return (
          <div className={cn("h-full flex flex-col p-8 transition-colors", isDarkMode ? "bg-zinc-950" : "bg-white")}>
            <div className="flex-1 flex flex-col items-center justify-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-col items-center w-full"
              >
                <AppLogo size={100} isDark={isDarkMode} className="mb-8" />
                
                <h2 className={cn("text-2xl font-black mb-2", isDarkMode ? "text-white" : "text-zinc-900")}>Hoş Geldiniz</h2>
                <p className={cn("text-xs text-center mb-12 px-4", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>
                  HKS Mobil ile işlemlerinizi kolayca yönetin ve takip edin.
                </p>

                <div className="w-full max-w-[280px] space-y-3">
                  <button 
                    onClick={() => {
                      setIsLoggedIn(true);
                      navigateTo('dashboard');
                    }}
                    className="w-full h-11 bg-[#005994] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-900/20 hover:bg-[#004a7c] transition-all active:scale-[0.98] text-sm"
                  >
                    <img src="https://www.turkiye.gov.tr/favicon.ico" alt="e-devlet" className="w-5 h-5" />
                    e-Devlet ile Giriş Yap
                  </button>

                  <button 
                    onClick={() => navigateTo('memberLogin')}
                    className={cn(
                      "w-full h-11 border-2 rounded-xl font-bold transition-all active:scale-[0.98] text-sm flex items-center justify-center gap-2",
                      isDarkMode ? "border-zinc-800 text-white hover:bg-zinc-800" : "border-zinc-100 text-[#005994] hover:bg-zinc-50"
                    )}
                  >
                    <User size={18} />
                    Üye Girişi Yap
                  </button>
                  
                  <button 
                    onClick={() => navigateTo('register')}
                    className={cn(
                      "w-full h-11 border-2 rounded-xl font-bold transition-all active:scale-[0.98] text-sm",
                      isDarkMode ? "border-zinc-800 text-white hover:bg-zinc-800" : "border-zinc-100 text-[#005994] hover:bg-zinc-50"
                    )}
                  >
                    Yeni Hesap Oluştur
                  </button>
                </div>
              </motion.div>
            </div>
            
            <div className="py-4 flex justify-center">
              <button 
                onClick={() => navigateTo('forgotPassword')}
                className={cn("text-xs font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-400")}
              >
                Şifremi Unuttum
              </button>
            </div>
          </div>
        );
      case 'memberLogin':
        return (
          <div className={cn("h-full flex flex-col p-6 space-y-6 transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#FFFFFF]")}>
            <div className="flex items-center gap-4">
              <button onClick={goBack} className={cn("p-2 rounded-full", isDarkMode ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-800")}>
                <ArrowLeft size={20} />
              </button>
              <h2 className={cn("text-xl font-bold", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>Üye Girişi</h2>
            </div>
            
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Kullanıcı Adı / T.C. No</label>
                  <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-zinc-50 border-zinc-200")}>
                    <User size={18} className="text-[#005994]" />
                    <input type="text" placeholder="Kullanıcı adınız veya T.C. No" className="bg-transparent border-none outline-none text-xs w-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Şifre</label>
                  <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-zinc-50 border-zinc-200")}>
                    <Lock size={18} className="text-[#005994]" />
                    <input type="password" placeholder="••••••••" className="bg-transparent border-none outline-none text-xs w-full" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={() => navigateTo('forgotPassword')}
                    className="text-[10px] font-bold text-[#005994]"
                  >
                    Şifremi Unuttum
                  </button>
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsLoggedIn(true);
                  navigateTo('dashboard');
                }}
                className="w-full bg-[#005994] text-white py-3.5 rounded-full font-bold text-sm shadow-md active:scale-[0.98] transition-transform"
              >
                Giriş Yap
              </button>
            </div>
          </div>
        );
      case 'forgotPassword':
        return (
          <div className={cn("h-full flex flex-col p-6 space-y-6 transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#FFFFFF]")}>
            <div className="flex items-center gap-4">
              <button onClick={goBack} className={cn("p-2 rounded-full", isDarkMode ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-800")}>
                <ArrowLeft size={20} />
              </button>
              <h2 className={cn("text-xl font-bold", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>Şifremi Unuttum</h2>
            </div>
            
            <div className="flex-1 flex flex-col justify-center space-y-8">
              <div className="text-center space-y-2">
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4", isDarkMode ? "bg-[#005994]/20 text-[#005994]" : "bg-[#005994]/10 text-[#005994]")}>
                  <Lock size={32} />
                </div>
                <p className={cn("text-sm px-4", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>
                  E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
                </p>
              </div>

              <div className="space-y-1">
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>E-Posta</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-zinc-50 border-zinc-200")}>
                  <Mail size={18} className="text-[#005994]" />
                  <input type="email" placeholder="E-posta adresiniz" className="bg-transparent border-none outline-none text-xs w-full" />
                </div>
              </div>

              <button 
                onClick={() => {
                  addToast('success', 'Bağlantı Gönderildi', 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
                  navigateTo('login');
                }}
                className="w-full bg-[#005994] text-white py-3.5 rounded-full font-bold text-sm shadow-md"
              >
                Sıfırlama Bağlantısı Gönder
              </button>
            </div>
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
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>T.C. Kimlik No</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-zinc-50 border-zinc-200")}>
                  <Shield size={18} className="text-[#005994]" />
                  <input type="text" placeholder="11 Haneli T.C. Kimlik No" className="bg-transparent border-none outline-none text-xs w-full" />
                </div>
              </div>
              <div className="space-y-1">
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Şifre</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-[#2B2930] border-[#49454F]" : "bg-zinc-50 border-zinc-200")}>
                  <Lock size={18} className="text-[#005994]" />
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
          <div className={cn("h-full flex flex-col overflow-hidden relative transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            {/* Price Ticker */}
            <PriceTicker isDarkMode={isDarkMode} />
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 scrollbar-hide">
              {/* Announcements Panel */}
              <AnnouncementsPanel isDarkMode={isDarkMode} onClick={() => navigateTo('announcements')} />

              {/* Quick Actions Grid - Compact */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: FileText, label: 'Yeni Bildirim', color: isDarkMode ? 'bg-[#005994]/20 text-[#005994]' : 'bg-[#005994]/10 text-[#005994]', action: () => navigateTo('notificationWizard') },
                  { icon: Star, label: 'Favoriler', color: isDarkMode ? 'bg-[#F39200]/20 text-[#F39200]' : 'bg-[#F39200]/10 text-[#F39200]', action: () => navigateTo('favorites') },
                  { icon: History, label: 'Geçmiş', color: isDarkMode ? 'bg-[#005994]/20 text-[#005994]' : 'bg-[#005994]/10 text-[#005994]', action: () => navigateTo('history') },
                  { 
                    icon: isLoggedIn ? LogOut : LogIn, 
                    label: isLoggedIn ? 'Çıkış' : 'Giriş', 
                    color: isLoggedIn 
                      ? (isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600')
                      : (isDarkMode ? 'bg-[#005994]/20 text-[#005994]' : 'bg-[#005994]/10 text-[#005994]'), 
                    action: () => {
                      if (isLoggedIn) {
                        setIsLoggedIn(false);
                        navigateTo('login');
                      } else {
                        navigateTo('login');
                      }
                    } 
                  },
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
              <div className={cn("p-3 rounded-[16px] space-y-2 transition-colors", isDarkMode ? "bg-zinc-900" : "bg-[#F0F4F8]")}>
                <div className="flex items-center justify-between">
                  <h5 className={cn("text-[10px] font-bold uppercase tracking-tight", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>GÜNCEL DURUM</h5>
                  <MoreVertical size={14} className={isDarkMode ? "text-zinc-400" : "text-[#44474E]"} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className={cn("p-2.5 rounded-xl border flex flex-col gap-1 transition-colors", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-white border-[#D1D9E0]")}>
                    <TrendingUp size={16} className="text-green-500" />
                    <p className={cn("text-[10px]", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>Aktif Bildirim</p>
                    <p className={cn("text-sm font-bold", isDarkMode ? "text-zinc-100" : "text-[#1B1B1F]")}>12 Adet</p>
                  </div>
                  <div className={cn("p-2.5 rounded-xl border flex flex-col gap-1 transition-colors", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-white border-[#D1D9E0]")}>
                    <CreditCard size={16} className="text-red-500" />
                    <p className={cn("text-[10px]", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>Bekleyen Borç</p>
                    <p className={cn("text-sm font-bold", isDarkMode ? "text-zinc-100" : "text-[#1B1B1F]")}>₺1.250</p>
                  </div>
                </div>
              </div>

              {/* Market Places Button */}
              <button 
                onClick={() => navigateTo('marketPlaces')}
                className={cn(
                  "w-full p-4 rounded-[16px] border flex items-center justify-between transition-all active:scale-[0.99]",
                  isDarkMode ? "bg-zinc-900 border-zinc-800 hover:bg-blue-500/10" : "bg-white border-[#D1D9E0] hover:bg-zinc-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isDarkMode ? "bg-[#005994]/20 text-[#005994]" : "bg-[#005994]/10 text-[#005994]")}>
                    <MapPin size={20} />
                  </div>
                  <div className="text-left">
                    <p className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-zinc-900")}>Hal ve Pazar Yerleri</p>
                    <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Türkiye geneli adres ve konum bilgileri</p>
                  </div>
                </div>
                <ChevronRight size={18} className={isDarkMode ? "text-zinc-500" : "text-zinc-400"} />
              </button>

              {/* Export Prices Button */}
              <button 
                onClick={() => navigateTo('exportPrices')}
                className={cn(
                  "w-full p-4 rounded-[16px] border flex items-center justify-between transition-all active:scale-[0.99]",
                  isDarkMode ? "bg-zinc-900 border-zinc-800 hover:bg-blue-500/10" : "bg-white border-[#D1D9E0] hover:bg-zinc-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isDarkMode ? "bg-[#F39200]/20 text-[#F39200]" : "bg-[#F39200]/10 text-[#F39200]")}>
                    <TrendingUp size={20} />
                  </div>
                  <div className="text-left">
                    <p className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-zinc-900")}>İhracat Fiyatları</p>
                    <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Güncel ihracat bülten fiyat listeleri</p>
                  </div>
                </div>
                <ChevronRight size={18} className={isDarkMode ? "text-zinc-500" : "text-zinc-400"} />
              </button>

              {/* Organic Query Button */}
              <button 
                onClick={() => navigateTo('organicQuery')}
                className={cn(
                  "w-full p-4 rounded-[16px] border flex items-center justify-between transition-all active:scale-[0.99]",
                  isDarkMode ? "bg-zinc-900 border-zinc-800 hover:bg-green-500/10" : "bg-white border-[#D1D9E0] hover:bg-zinc-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-50 text-green-600")}>
                    <ShoppingBasket size={20} />
                  </div>
                  <div className="text-left">
                    <p className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-zinc-900")}>Organik Ürün Sorgulama</p>
                    <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Organik ve iyi tarım ürünleri sorgulama</p>
                  </div>
                </div>
                <ChevronRight size={18} className={isDarkMode ? "text-zinc-500" : "text-zinc-400"} />
              </button>

              {/* Notifier Stats Button */}
              <button 
                onClick={() => navigateTo('notifierStats')}
                className={cn(
                  "w-full p-4 rounded-[16px] border flex items-center justify-between transition-all active:scale-[0.99]",
                  isDarkMode ? "bg-zinc-900 border-zinc-800 hover:bg-amber-500/10" : "bg-white border-[#D1D9E0] hover:bg-zinc-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isDarkMode ? "bg-amber-500/20 text-amber-400" : "bg-amber-50 text-amber-600")}>
                    <PieChart size={20} />
                  </div>
                  <div className="text-left">
                    <p className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-zinc-900")}>Bildirimci İstatistikleri</p>
                    <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>HKS bildirimci sıfat dağılımı</p>
                  </div>
                </div>
                <ChevronRight size={18} className={isDarkMode ? "text-zinc-500" : "text-zinc-400"} />
              </button>

              {/* Price Details Button */}
              <button 
                onClick={() => navigateTo('priceDetails')}
                className={cn(
                  "w-full p-4 rounded-[16px] border flex items-center justify-between transition-all active:scale-[0.99]",
                  isDarkMode ? "bg-zinc-900 border-zinc-800 hover:bg-red-500/10" : "bg-white border-[#D1D9E0] hover:bg-zinc-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isDarkMode ? "bg-red-500/20 text-red-400" : "bg-red-50 text-red-600")}>
                    <FileSearch size={20} />
                  </div>
                  <div className="text-left">
                    <p className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-zinc-900")}>Ürün Fiyat Detayları</p>
                    <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Ürün bazlı detaylı fiyat bülteni</p>
                  </div>
                </div>
                <ChevronRight size={18} className={isDarkMode ? "text-zinc-500" : "text-zinc-400"} />
              </button>

              {/* Market Arbitration Button */}
              <button 
                onClick={() => navigateTo('marketArbitration')}
                className={cn(
                  "w-full p-4 rounded-[16px] border flex items-center justify-between transition-all active:scale-[0.99]",
                  isDarkMode ? "bg-zinc-900 border-zinc-800 hover:bg-purple-500/10" : "bg-white border-[#D1D9E0] hover:bg-zinc-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isDarkMode ? "bg-purple-500/20 text-purple-400" : "bg-purple-50 text-purple-600")}>
                    <Shield size={20} />
                  </div>
                  <div className="text-left">
                    <p className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-zinc-900")}>Hal Hakem Heyeti</p>
                    <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Heyet listesi ve iletişim bilgileri</p>
                  </div>
                </div>
                <ChevronRight size={18} className={isDarkMode ? "text-zinc-500" : "text-zinc-400"} />
              </button>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <h5 className={cn("text-[10px] font-bold uppercase tracking-tight", isDarkMode ? "text-[#C9C5D0]" : "text-[#44474E]")}>SON İŞLEMLER</h5>
                  <button onClick={() => navigateTo('history')} className="text-[11px] font-bold text-[#005994]">Tümünü Gör</button>
                </div>
                {[
                  { name: 'Domates (Salkım)', date: '24.03.2026', amount: '+500 KG', purchase: '15,00 ₺', sale: '22,50 ₺' },
                  { name: 'Salatalık (Sera)', date: '24.03.2026', amount: '+300 KG', purchase: '12,00 ₺', sale: '18,00 ₺' },
                  { name: 'Biber (Sivri)', date: '23.03.2026', amount: '+150 KG', purchase: '25,00 ₺', sale: '35,00 ₺' },
                  { name: 'Patlıcan (Kemer)', date: '23.03.2026', amount: '+200 KG', purchase: '18,00 ₺', sale: '26,00 ₺' }
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "p-2.5 rounded-xl border flex items-center gap-3 transition-colors",
                    isDarkMode ? "bg-zinc-950 border-zinc-800 hover:bg-blue-500/10" : "bg-white border-[#D1D9E0] hover:bg-[#F8FAFC]"
                  )}>
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors", isDarkMode ? "bg-[#005994]/20 text-[#005994]" : "bg-[#E1F5FE] text-[#01579B]")}>
                      <Clock size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs font-semibold truncate", isDarkMode ? "text-zinc-100" : "text-[#1B1B1F]")}>{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={cn("text-[9px]", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>Geliş: <span className="font-bold">{item.purchase}</span></span>
                        <span className={cn("text-[9px]", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>Satış: <span className="font-bold">{item.sale}</span></span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-green-500">{item.amount}</p>
                      <p className={cn("text-[8px] font-bold uppercase", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'marketPlaces':
        const markets = [
          { id: 1, city: 'İstanbul', name: 'Bayrampaşa Sebze ve Meyve Hali', address: 'Mega Center Yanı, Bayrampaşa, İstanbul', type: 'Hal' },
          { id: 2, city: 'İstanbul', name: 'Ataşehir Sebze ve Meyve Hali', address: 'İçerenköy Mah. Hal Yolu Cad. Ataşehir, İstanbul', type: 'Hal' },
          { id: 3, city: 'İstanbul', name: 'Kadıköy Salı Pazarı', address: 'Hasanpaşa Mah. Kadıköy, İstanbul', type: 'Pazar' },
          { id: 4, city: 'İstanbul', name: 'Beşiktaş Cumartesi Pazarı', address: 'Muradiye Mah. Nüzhetiye Cad. Beşiktaş, İstanbul', type: 'Pazar' },
          { id: 5, city: 'Ankara', name: 'Ankara Toptancı Hali', address: 'Hipodrom Cad. No:16, Yenimahalle, Ankara', type: 'Hal' },
          { id: 6, city: 'Ankara', name: 'Sıhhiye Pazarı', address: 'Sıhhiye, Çankaya, Ankara', type: 'Pazar' },
          { id: 7, city: 'Ankara', name: 'Ulus Hali', address: 'Anafartalar Mah. Ulus, Ankara', type: 'Hal' },
          { id: 8, city: 'İzmir', name: 'İzmir Büyükşehir Belediyesi Sebze ve Meyve Hali', address: 'Buca Hal Yolu, Buca, İzmir', type: 'Hal' },
          { id: 9, city: 'İzmir', name: 'Bostanlı Pazarı', address: 'Bostanlı, Karşıyaka, İzmir', type: 'Pazar' },
          { id: 10, city: 'Antalya', name: 'Antalya Toptancı Hali', address: 'Güneş Mah. Hal Yolu, Kepez, Antalya', type: 'Hal' },
          { id: 11, city: 'Antalya', name: 'Alanya Toptancı Hali', address: 'Kızlar Pınarı Mah. Alanya, Antalya', type: 'Hal' },
          { id: 12, city: 'Bursa', name: 'Bursa Kent Hali', address: 'Yalova Yolu 12. km, Osmangazi, Bursa', type: 'Hal' },
          { id: 13, city: 'Bursa', name: 'Nilüfer Köylü Pazarı', address: 'İhsaniye Mah. Nilüfer, Bursa', type: 'Pazar' },
          { id: 14, city: 'Adana', name: 'Adana Vedat Dalokay Hal Kompleksi', address: 'Yüreğir, Adana', type: 'Hal' },
          { id: 15, city: 'Mersin', name: 'Mersin Toptancı Hali', address: 'Akdeniz, Mersin', type: 'Hal' },
        ];

        const cities = Array.from(new Set(markets.map(m => m.city))).sort();

        const filteredMarkets = markets.filter(m => 
          m.name.toLowerCase().includes(marketSearchQuery.toLowerCase()) || 
          m.city.toLowerCase().includes(marketSearchQuery.toLowerCase()) ||
          m.address.toLowerCase().includes(marketSearchQuery.toLowerCase())
        );

        // Group by city
        const groupedMarkets = filteredMarkets.reduce((acc, market) => {
          if (!acc[market.city]) acc[market.city] = [];
          acc[market.city].push(market);
          return acc;
        }, {} as Record<string, typeof markets>);

        const getCityColor = (city: string) => {
          const colors = [
            { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', darkBg: 'bg-blue-950/40', darkText: 'text-blue-300', darkBorder: 'border-blue-800/20', accent: 'bg-blue-500' },
            { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', darkBg: 'bg-emerald-950/40', darkText: 'text-emerald-300', darkBorder: 'border-emerald-800/20', accent: 'bg-emerald-500' },
            { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100', darkBg: 'bg-violet-950/40', darkText: 'text-violet-300', darkBorder: 'border-violet-800/20', accent: 'bg-violet-500' },
            { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', darkBg: 'bg-amber-950/40', darkText: 'text-amber-300', darkBorder: 'border-amber-800/20', accent: 'bg-amber-500' },
            { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', darkBg: 'bg-rose-950/40', darkText: 'text-rose-300', darkBorder: 'border-rose-800/20', accent: 'bg-rose-500' },
            { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-100', darkBg: 'bg-cyan-950/40', darkText: 'text-cyan-300', darkBorder: 'border-cyan-800/20', accent: 'bg-cyan-500' },
            { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100', darkBg: 'bg-indigo-950/40', darkText: 'text-indigo-300', darkBorder: 'border-indigo-800/20', accent: 'bg-indigo-500' },
          ];
          let hash = 0;
          for (let i = 0; i < city.length; i++) {
            hash = city.charCodeAt(i) + ((hash << 5) - hash);
          }
          return colors[Math.abs(hash) % colors.length];
        };

        return (
          <div className={cn("h-full flex flex-col transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            {/* Search Bar */}
            <div className="p-4 pb-2 shrink-0">
              <div className={cn(
                "flex items-center gap-3 p-3 rounded-2xl border transition-all",
                isDarkMode ? "bg-zinc-900 border-zinc-800 focus-within:border-blue-500/50" : "bg-white border-zinc-200 focus-within:border-[#005994] shadow-sm"
              )}>
                <Search size={18} className="text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Şehir, hal veya pazar yeri ara..." 
                  className="bg-transparent border-none outline-none text-xs w-full"
                  value={marketSearchQuery}
                  onChange={(e) => setMarketSearchQuery(e.target.value)}
                />
                {marketSearchQuery && (
                  <button onClick={() => setMarketSearchQuery('')}>
                    <X size={16} className="text-zinc-400" />
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-hide">
              {Object.keys(groupedMarkets).length > 0 ? (
                Object.keys(groupedMarkets).sort().map(city => {
                  const cityColor = getCityColor(city);
                  return (
                    <div key={city} className="mb-4">
                      <div className={cn(
                        "px-3 py-2 rounded-xl mb-2 sticky top-0 z-10 border shadow-sm transition-colors",
                        isDarkMode 
                          ? `${cityColor.darkBg} ${cityColor.darkBorder}` 
                          : `${cityColor.bg} ${cityColor.border}`
                      )}>
                        <div className="flex items-center gap-2">
                          <div className={cn("w-1 h-3 rounded-full", cityColor.accent)} />
                          <h5 className={cn(
                            "text-[10px] font-black uppercase tracking-widest", 
                            isDarkMode ? cityColor.darkText : cityColor.text
                          )}>
                            {city}
                          </h5>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {groupedMarkets[city].map((market) => (
                          <div key={market.id} className={cn(
                            "p-3 rounded-xl border transition-all",
                            isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
                          )}>
                            <div className="flex justify-between items-start mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className={cn(
                                  "px-1.5 py-0.5 rounded text-[8px] font-bold uppercase",
                                  market.type === 'Hal' ? "bg-blue-500/10 text-blue-500" : "bg-orange-500/10 text-orange-500"
                                )}>
                                  {market.type}
                                </span>
                              </div>
                              <button 
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(market.name + ' ' + market.address)}`, '_blank')}
                                className={cn(
                                  "flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-bold transition-all",
                                  isDarkMode ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30" : "bg-[#005994]/10 text-[#005994] hover:bg-[#005994]/20"
                                )}
                              >
                                <MapPin size={10} />
                                Yol Tarifi
                              </button>
                            </div>
                            <h4 className={cn("text-xs font-bold mb-0.5", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>{market.name}</h4>
                            <p className={cn("text-[10px] leading-relaxed", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>{market.address}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-4", isDarkMode ? "bg-zinc-800" : "bg-zinc-100")}>
                    <Search size={32} className="text-zinc-400" />
                  </div>
                  <p className={cn("text-sm font-medium", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>Sonuç bulunamadı</p>
                  <p className={cn("text-xs mt-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Farklı bir arama veya şehir seçin.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'exportPrices':
        const exportData = [
          { name: 'AHUDUDU(FRAMBUAZ)', type: 'AHUDUDU(FRAMBUAZ)', kind: 'Geleneksel(Konvansiyonel)', price: '992,00', volume: '80', unit: 'Kg' },
          { name: 'ANANAS', type: 'ANANAS', kind: 'Geleneksel(Konvansiyonel)', price: '117,48', volume: '286', unit: 'Kg' },
          { name: 'ARMUT', type: 'DEVECİ', kind: 'Geleneksel(Konvansiyonel)', price: '40,72', volume: '4033', unit: 'Kg' },
          { name: 'ARMUT', type: 'DİĞER', kind: 'Geleneksel(Konvansiyonel)', price: '55,27', volume: '37440', unit: 'Kg' },
          { name: 'ARMUT', type: 'SANTAMARİ', kind: 'Geleneksel(Konvansiyonel)', price: '41,21', volume: '21058', unit: 'Kg' },
          { name: 'ASMA YAPRAĞI', type: 'ASMA YAPRAĞI', kind: 'Geleneksel(Konvansiyonel)', price: '500,00', volume: '12', unit: 'Kg' },
          { name: 'AVOKADO', type: 'AVOKADO', kind: 'Geleneksel(Konvansiyonel)', price: '60,00', volume: '204', unit: 'Adet' },
          { name: 'AYVA', type: 'AYVA', kind: 'Geleneksel(Konvansiyonel)', price: '138,85', volume: '680', unit: 'Kg' },
          { name: 'BADEM (YAŞ-TAZE)', type: 'BADEM (YAŞ-TAZE)', kind: 'Geleneksel(Konvansiyonel)', price: '250,00', volume: '97', unit: 'Kg' },
          { name: 'BAKLA TAZE', type: 'DİĞER', kind: 'Geleneksel(Konvansiyonel)', price: '119,64', volume: '588', unit: 'Kg' },
          { name: 'BAKLA TAZE', type: 'SAKIZ', kind: 'Geleneksel(Konvansiyonel)', price: '88,00', volume: '120', unit: 'Kg' },
          { name: 'BALKABAĞI', type: 'BALKABAĞI', kind: 'Geleneksel(Konvansiyonel)', price: '54,33', volume: '516', unit: 'Kg' },
          { name: 'BEYAZ LAHANA', type: 'DİĞER', kind: 'Geleneksel(Konvansiyonel)', price: '36,42', volume: '27112', unit: 'Kg' },
          { name: 'BEYAZ LAHANA', type: 'HİBRİT', kind: 'Geleneksel(Konvansiyonel)', price: '18,00', volume: '51', unit: 'Kg' },
          { name: 'BİBER ÇARLİSTON', type: 'BİBER ÇARLİSTON', kind: 'Geleneksel(Konvansiyonel)', price: '124,77', volume: '69683', unit: 'Kg' },
          { name: 'BİBER DOLMALIK', type: 'BİBER DOLMALIK', kind: 'Geleneksel(Konvansiyonel)', price: '108,93', volume: '55204', unit: 'Kg' },
        ];

        const filteredExportData = exportData.filter(item => 
          item.name.toLowerCase().includes(exportSearchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(exportSearchQuery.toLowerCase())
        );

        return (
          <div className={cn("h-full flex flex-col transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            {/* Header Info & Search */}
            <div className="p-3 pb-1 shrink-0">
              <div className={cn(
                "rounded-xl border transition-all duration-300 overflow-hidden",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
              )}>
                {/* Top Bar */}
                <div className="px-3 py-2 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/50">
                  <div>
                    <h3 className={cn("text-[10px] font-bold uppercase tracking-wider", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>İhracat Bülteni</h3>
                    <p className={cn("text-[8px] font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>01.04.2026 Güncel</p>
                  </div>
                  <button 
                    onClick={() => setShowExportSearch(!showExportSearch)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-tight transition-all active:scale-95",
                      showExportSearch 
                        ? "bg-red-500 text-white" 
                        : "bg-[#005994] text-white"
                    )}
                  >
                    {showExportSearch ? 'Kapat' : 'Fiyat Bul'}
                  </button>
                </div>
                
                {/* Search Input */}
                {showExportSearch ? (
                  <div className="p-2 bg-zinc-50 dark:bg-zinc-950/30">
                    <div className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-all",
                      isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200 shadow-inner"
                    )}>
                      <Search size={14} className="text-zinc-400" />
                      <input 
                        type="text"
                        placeholder="Ürün veya cins ara..."
                        value={exportSearchQuery}
                        onChange={(e) => setExportSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-[11px] w-full font-medium"
                        autoFocus
                      />
                      {exportSearchQuery && (
                        <button onClick={() => setExportSearchQuery('')}>
                          <X size={14} className="text-zinc-400" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2">
                    <p className={cn("text-[9px] leading-tight font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>
                      Veriler bilgilendirme amaçlıdır.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-3 pt-1 space-y-2 scrollbar-hide">
              {filteredExportData.length > 0 ? (
                filteredExportData.map((item, idx) => (
                  <div key={idx} className={cn(
                    "p-3 rounded-xl border transition-all active:scale-[0.99]",
                    isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
                  )}>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-[8px] font-bold uppercase tracking-widest leading-none mb-1 opacity-50", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>ÜRÜN ADI</p>
                        <h4 className={cn("text-[12px] font-bold leading-tight tracking-tight break-words", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>
                          {item.name}
                        </h4>
                        <div className="mt-2 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <span className={cn("text-[9px] font-bold uppercase opacity-40", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>CİNS:</span>
                            <span className={cn("text-[10px] font-bold break-words", isDarkMode ? "text-blue-400" : "text-blue-700")}>{item.type}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={cn("text-[9px] font-bold uppercase opacity-40", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>TÜR:</span>
                            <span className={cn("text-[9px] font-medium break-words", isDarkMode ? "text-zinc-500" : "text-zinc-600")}>{item.kind}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0 pt-4">
                        <div className={cn("text-lg font-black tracking-tighter leading-none", isDarkMode ? "text-zinc-100" : "text-[#005994]")}>
                          {item.price}
                          <span className="text-[10px] font-bold ml-0.5 opacity-60">TL</span>
                        </div>
                        <p className={cn("text-[8px] font-bold uppercase tracking-wider mt-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>BİRİM FİYAT</p>
                      </div>
                    </div>

                    <div className={cn("pt-2 border-t flex items-center justify-between", isDarkMode ? "border-zinc-800/50" : "border-zinc-100")}>
                      <div className="flex items-center gap-1.5">
                        <Package size={12} className="text-zinc-400" />
                        <span className={cn("text-[10px] font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-600")}>İşlem Hacmi</span>
                      </div>
                      <div className={cn("text-[11px] font-bold", isDarkMode ? "text-zinc-200" : "text-zinc-900")}>
                        {item.volume} <span className="text-[9px] font-normal text-zinc-500 uppercase">{item.unit}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4", isDarkMode ? "bg-zinc-900" : "bg-zinc-100")}>
                    <Search size={24} className="text-zinc-300" />
                  </div>
                  <h4 className={cn("text-xs font-bold mb-1", isDarkMode ? "text-zinc-200" : "text-zinc-900")}>Sonuç Bulunamadı</h4>
                  <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Farklı bir arama deneyin.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'organicQuery':
        const organicData = [
          { name: 'ADAÇAYI (YAŞ-TAZE)', kind: 'ADAÇAYI (YAŞ-TAZE)', type: 'Konvansiyonel' },
          { name: 'ADAÇAYI (YAŞ-TAZE)', kind: 'ADAÇAYI (YAŞ-TAZE)', type: 'Organik Tarım' },
          { name: 'ADAÇAYI (YAŞ-TAZE)', kind: 'ADAÇAYI (YAŞ-TAZE)', type: 'İyi Tarım' },
          { name: 'ELMA (AMASYA)', kind: 'AMASYA', type: 'Organik Tarım' },
          { name: 'ELMA (AMASYA)', kind: 'AMASYA', type: 'İyi Tarım' },
          { name: 'DOMATES (SALKIM)', kind: 'SALKIM', type: 'Organik Tarım' },
          { name: 'DOMATES (SALKIM)', kind: 'SALKIM', type: 'İyi Tarım' },
          { name: 'SALATALIK', kind: 'ÇENGELKÖY', type: 'Organik Tarım' },
          { name: 'SALATALIK', kind: 'ÇENGELKÖY', type: 'İyi Tarım' },
          { name: 'BİBER (KAPYA)', kind: 'KAPYA', type: 'Organik Tarım' },
          { name: 'BİBER (KAPYA)', kind: 'KAPYA', type: 'İyi Tarım' },
        ];

        const filteredOrganicData = organicData.filter(item => 
          item.name.toLowerCase().includes(organicSearchQuery.toLowerCase()) ||
          item.kind.toLowerCase().includes(organicSearchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(organicSearchQuery.toLowerCase())
        );

        return (
          <div className={cn("h-full flex flex-col transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            {/* Header Info & Search */}
            <div className="p-3 pb-1 shrink-0">
              <div className={cn(
                "rounded-xl border transition-all duration-300 overflow-hidden",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
              )}>
                {/* Top Bar */}
                <div className="px-3 py-2 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/50">
                  <div>
                    <h3 className={cn("text-[10px] font-bold uppercase tracking-wider", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>Ürün Sorgulama</h3>
                    <p className={cn("text-[8px] font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Organik ve İyi Tarım</p>
                  </div>
                  <button 
                    onClick={() => setShowOrganicSearch(!showOrganicSearch)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-tight transition-all active:scale-95",
                      showOrganicSearch 
                        ? "bg-red-500 text-white" 
                        : "bg-green-600 text-white"
                    )}
                  >
                    {showOrganicSearch ? 'Kapat' : 'Ürün Ara'}
                  </button>
                </div>
                
                {/* Search Input */}
                {showOrganicSearch ? (
                  <div className="p-2 bg-zinc-50 dark:bg-zinc-950/30">
                    <div className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-all",
                      isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200 shadow-inner"
                    )}>
                      <Search size={14} className="text-zinc-400" />
                      <input 
                        type="text"
                        placeholder="Ürün, cins veya tür ara..."
                        value={organicSearchQuery}
                        onChange={(e) => setOrganicSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-[11px] w-full font-medium"
                        autoFocus
                      />
                      {organicSearchQuery && (
                        <button onClick={() => setOrganicSearchQuery('')}>
                          <X size={14} className="text-zinc-400" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2">
                    <p className={cn("text-[9px] leading-tight font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>
                      Sertifikalı organik ve iyi tarım ürünlerini sorgulayın.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-3 pt-1 space-y-2 scrollbar-hide">
              {filteredOrganicData.length > 0 ? (
                filteredOrganicData.map((item, idx) => (
                  <div key={idx} className={cn(
                    "p-3 rounded-xl border transition-all active:scale-[0.99]",
                    isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
                  )}>
                    <div className="flex flex-col gap-2">
                      <div className="min-w-0">
                        <p className={cn("text-[8px] font-bold uppercase tracking-widest leading-none mb-1", isDarkMode ? "text-zinc-600" : "text-zinc-400")}>Ürün Adı</p>
                        <h4 className={cn("text-[12px] font-bold leading-tight tracking-tight break-words", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>
                          {item.name}
                        </h4>
                      </div>
                      
                      <div className={cn("pt-2 border-t flex items-start justify-between gap-4", isDarkMode ? "border-zinc-800/50" : "border-zinc-100")}>
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-[8px] font-bold uppercase tracking-widest leading-none mb-1", isDarkMode ? "text-zinc-600" : "text-zinc-400")}>Ürün Cinsi</p>
                          <p className={cn("text-[11px] font-medium break-words", isDarkMode ? "text-zinc-300" : "text-zinc-700")}>{item.kind}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={cn("text-[8px] font-bold uppercase tracking-widest leading-none mb-1", isDarkMode ? "text-zinc-600" : "text-zinc-400")}>Ürün Türü</p>
                          <span className={cn(
                            "inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase",
                            item.type === 'Organik Tarım' 
                              ? (isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-50 text-green-700")
                              : item.type === 'İyi Tarım'
                                ? (isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-700")
                                : (isDarkMode ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-600")
                          )}>
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4", isDarkMode ? "bg-zinc-900" : "bg-zinc-100")}>
                    <Search size={24} className="text-zinc-300" />
                  </div>
                  <h4 className={cn("text-xs font-bold mb-1", isDarkMode ? "text-zinc-200" : "text-zinc-900")}>Sonuç Bulunamadı</h4>
                  <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Farklı bir arama deneyin.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'notifierStats':
        const statsData = [
          { name: 'Pazarcı', value: 16977, color: '#3B82F6' },
          { name: 'Üretici', value: 13979, color: '#F97316' },
          { name: 'Tüccar (Hal Dışı)', value: 8819, color: '#6B7280' },
          { name: 'Tüccar (Hal İçi)', value: 5340, color: '#EAB308' },
          { name: 'İhracat', value: 5833, color: '#9A3412' },
          { name: 'Manav', value: 4273, color: '#84CC16' },
          { name: 'Komisyoncu', value: 3439, color: '#2563EB' },
          { name: 'Market', value: 2982, color: '#1D4ED8' },
          { name: 'Depo/Tas. Ve Amb.', value: 1843, color: '#4B5563' },
          { name: 'Diğer', value: 1679, color: '#3F6212' },
          { name: 'Sanayici', value: 829, color: '#1E3A8A' },
          { name: 'Üretici Örgütü', value: 811, color: '#A16207' },
        ];

        const totalStats = statsData.reduce((acc, curr) => acc + curr.value, 0);

        return (
          <div className={cn("h-full flex flex-col transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
              {/* Chart Section */}
              <div className={cn(
                "p-4 rounded-xl border",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
              )}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className={cn("text-xs font-bold uppercase tracking-wider", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>Sıfat Dağılımı</h3>
                    <p className={cn("text-[10px] font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>14.10.2024 Güncel Veri</p>
                  </div>
                  
                  {/* Chart Type Toggle */}
                  <div className={cn(
                    "flex p-1 rounded-lg",
                    isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
                  )}>
                    <button 
                      onClick={() => setChartType('pie')}
                      className={cn(
                        "p-1.5 rounded-md transition-all",
                        chartType === 'pie' 
                          ? (isDarkMode ? "bg-zinc-700 text-white shadow-lg" : "bg-white text-[#005994] shadow-sm")
                          : "text-zinc-400 hover:text-zinc-200"
                      )}
                    >
                      <PieChart size={14} />
                    </button>
                    <button 
                      onClick={() => setChartType('bar')}
                      className={cn(
                        "p-1.5 rounded-md transition-all",
                        chartType === 'bar' 
                          ? (isDarkMode ? "bg-zinc-700 text-white shadow-lg" : "bg-white text-[#005994] shadow-sm")
                          : "text-zinc-400 hover:text-zinc-200"
                      )}
                    >
                      <BarChart3 size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="h-64 w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'pie' ? (
                      <RechartsPieChart>
                        <Pie
                          data={statsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={85}
                          paddingAngle={4}
                          dataKey="value"
                          stroke="none"
                        >
                          {statsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: isDarkMode ? '#18181b' : '#ffffff',
                            borderColor: isDarkMode ? '#27272a' : '#e2e8f0',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                          }}
                          itemStyle={{ color: isDarkMode ? '#f4f4f5' : '#18181b' }}
                        />
                      </RechartsPieChart>
                    ) : (
                      <RechartsBarChart data={statsData} layout="vertical" margin={{ left: -20, right: 20, top: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? '#27272a' : '#f1f5f9'} />
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={80} 
                          tick={{ fontSize: 9, fontWeight: 500, fill: isDarkMode ? '#a1a1aa' : '#64748b' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip 
                          cursor={{ fill: isDarkMode ? '#27272a' : '#f8fafc' }}
                          contentStyle={{ 
                            backgroundColor: isDarkMode ? '#18181b' : '#ffffff',
                            borderColor: isDarkMode ? '#27272a' : '#e2e8f0',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          radius={[0, 4, 4, 0]} 
                          barSize={12}
                        >
                          {statsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </RechartsBarChart>
                    )}
                  </ResponsiveContainer>
                  
                  {chartType === 'pie' && (
                    <div className="absolute flex flex-col items-center justify-center">
                      <p className={cn("text-[8px] font-bold uppercase tracking-[0.2em] opacity-50", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>TOPLAM</p>
                      <p className={cn("text-lg font-black tracking-tighter", isDarkMode ? "text-white" : "text-zinc-900")}>
                        {Math.round(totalStats / 1000)}K
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600")}>
                      <Users size={16} />
                    </div>
                    <div>
                      <p className={cn("text-[9px] font-bold uppercase tracking-tight opacity-50", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>Kayıtlı Kişi</p>
                      <p className={cn("text-xs font-bold", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>{totalStats.toLocaleString('tr-TR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", isDarkMode ? "bg-green-500/10 text-green-400" : "bg-green-50 text-green-600")}>
                      <LayoutGrid size={16} />
                    </div>
                    <div>
                      <p className={cn("text-[9px] font-bold uppercase tracking-tight opacity-50", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>Kategori</p>
                      <p className={cn("text-xs font-bold", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>{statsData.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Table Section */}
              <div className={cn(
                "rounded-xl border overflow-hidden",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
              )}>
                <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-950/20">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    <span>Bildirimci Sıfatı</span>
                    <span>Toplam / Oran</span>
                  </div>
                </div>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                  {statsData.map((item, idx) => (
                    <div key={idx} className="px-4 py-3 flex items-center justify-between transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-950/30">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-1.5 h-6 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <div className="min-w-0">
                          <span className={cn("text-[11px] font-bold truncate block", isDarkMode ? "text-zinc-200" : "text-zinc-800")}>{item.name}</span>
                          <div className="w-24 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-1 overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                backgroundColor: item.color,
                                width: `${(item.value / totalStats) * 100}%`
                              }} 
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <p className={cn("text-[11px] font-black tracking-tight", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>{item.value.toLocaleString('tr-TR')}</p>
                        <p className="text-[9px] font-bold text-zinc-500">{((item.value / totalStats) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'priceDetails':
        const priceDetailsData = [
          { name: 'ACUR', type: 'ACUR', kind: 'Geleneksel(Konvansiyonel)', price: '35,60', volume: '1330', unit: 'Kg' },
          { name: 'ADAÇAYI (YAŞ-TAZE)', type: 'ADAÇAYI (YAŞ-TAZE)', kind: 'Geleneksel(Konvansiyonel)', price: '57,99', volume: '386', unit: 'Kg' },
          { name: 'ADAÇAYI (YAŞ-TAZE)', type: 'ADAÇAYI (YAŞ-TAZE)', kind: 'İyi Tarım', price: '117,45', volume: '69', unit: 'Kg' },
          { name: 'AHUDUDU(FRAMBUAZ)', type: 'AHUDUDU(FRAMBUAZ)', kind: 'Geleneksel(Konvansiyonel)', price: '1224,81', volume: '523', unit: 'Kg' },
          { name: 'AHUDUDU(FRAMBUAZ)', type: 'AHUDUDU(FRAMBUAZ)', kind: 'İyi Tarım', price: '952,58', volume: '2497', unit: 'Kg' },
          { name: 'ALABAŞ(KOHLRABI)', type: 'BEYAZ', kind: 'Geleneksel(Konvansiyonel)', price: '38,13', volume: '15863', unit: 'Kg' },
          { name: 'ALABAŞ(KOHLRABI)', type: 'KIRMIZI', kind: 'Geleneksel(Konvansiyonel)', price: '62,23', volume: '938', unit: 'Kg' },
          { name: 'ALABAŞ(KOHLRABI)', type: 'BEYAZ', kind: 'İyi Tarım', price: '51,93', volume: '737', unit: 'Kg' },
          { name: 'ALABAŞ(KOHLRABI)', type: 'KIRMIZI', kind: 'İyi Tarım', price: '61,13', volume: '46', unit: 'Kg' },
          { name: 'ANANAS', type: 'ANANAS', kind: 'Geleneksel(Konvansiyonel)', price: '69,46', volume: '470837', unit: 'Kg' },
          { name: 'ANDİVA', type: 'ANDİVA', kind: 'Geleneksel(Konvansiyonel)', price: '78,33', volume: '600', unit: 'Kg' },
          { name: 'ARMUT', type: 'AKÇA', kind: 'Geleneksel(Konvansiyonel)', price: '44,87', volume: '6019', unit: 'Kg' },
          { name: 'ARMUT', type: 'ANKARA', kind: 'Geleneksel(Konvansiyonel)', price: '44,70', volume: '17517', unit: 'Kg' },
          { name: 'ARMUT', type: 'DEVECİ', kind: 'Geleneksel(Konvansiyonel)', price: '55,94', volume: '327150', unit: 'Kg' },
          { name: 'ARMUT', type: 'DİĞER', kind: 'Geleneksel(Konvansiyonel)', price: '31,17', volume: '512890', unit: 'Kg' },
          { name: 'ARMUT', type: 'MARGARİT', kind: 'Geleneksel(Konvansiyonel)', price: '34,78', volume: '32932', unit: 'Kg' },
          { name: 'ARMUT', type: 'SANTAMARİ', kind: 'Geleneksel(Konvansiyonel)', price: '64,29', volume: '263373', unit: 'Kg' },
          { name: 'ARMUT', type: 'ANKARA', kind: 'İyi Tarım', price: '44,67', volume: '90', unit: 'Kg' },
          { name: 'ARMUT', type: 'DEVECİ', kind: 'İyi Tarım', price: '56,09', volume: '65758', unit: 'Kg' },
        ];

        const filteredPriceDetails = priceDetailsData.filter(item => 
          item.name.toLowerCase().includes(priceDetailsSearchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(priceDetailsSearchQuery.toLowerCase()) ||
          item.kind.toLowerCase().includes(priceDetailsSearchQuery.toLowerCase())
        );

        return (
          <div className={cn("h-full flex flex-col transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            {/* Header Info & Search */}
            <div className="p-3 pb-1 shrink-0">
              <div className={cn(
                "rounded-xl border transition-all duration-300 overflow-hidden",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
              )}>
                {/* Top Bar */}
                <div className="px-3 py-2 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/50">
                  <div>
                    <h3 className={cn("text-[10px] font-bold uppercase tracking-wider", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>Fiyat Bülteni</h3>
                    <p className={cn("text-[8px] font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>01.04.2026 Güncel Veriler</p>
                  </div>
                  <button 
                    onClick={() => setShowPriceDetailsSearch(!showPriceDetailsSearch)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-tight transition-all active:scale-95",
                      showPriceDetailsSearch 
                        ? "bg-red-500 text-white" 
                        : "bg-[#005994] text-white"
                    )}
                  >
                    {showPriceDetailsSearch ? 'Kapat' : 'Ürün Ara'}
                  </button>
                </div>
                
                {/* Search Input */}
                {showPriceDetailsSearch ? (
                  <div className="p-2 bg-zinc-50 dark:bg-zinc-950/30">
                    <div className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-all",
                      isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200 shadow-inner"
                    )}>
                      <Search size={14} className="text-zinc-400" />
                      <input 
                        type="text"
                        placeholder="Ürün, cins veya tür ara..."
                        value={priceDetailsSearchQuery}
                        onChange={(e) => setPriceDetailsSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-[11px] w-full font-medium"
                        autoFocus
                      />
                      {priceDetailsSearchQuery && (
                        <button onClick={() => setPriceDetailsSearchQuery('')}>
                          <X size={14} className="text-zinc-400" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2">
                    <p className={cn("text-[9px] leading-tight font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>
                      Bilgi amaçlı olup, hatalı değerlerle karşılaşılma ihtimali bulunmaktadır.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-3 pt-1 space-y-2 scrollbar-hide">
              {filteredPriceDetails.length > 0 ? (
                filteredPriceDetails.map((item, idx) => (
                  <div key={idx} className={cn(
                    "p-3 rounded-xl border transition-all active:scale-[0.99]",
                    isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
                  )}>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-[8px] font-bold uppercase tracking-widest leading-none mb-1 opacity-50", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>ÜRÜN ADI</p>
                        <h4 className={cn("text-[12px] font-bold leading-tight tracking-tight break-words", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>
                          {item.name}
                        </h4>
                        <div className="mt-2 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <span className={cn("text-[9px] font-bold uppercase opacity-40", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>CİNS:</span>
                            <span className={cn("text-[10px] font-bold break-words", isDarkMode ? "text-blue-400" : "text-blue-700")}>{item.type}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={cn("text-[9px] font-bold uppercase opacity-40", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>TÜR:</span>
                            <span className={cn(
                              "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase",
                              item.kind === 'İyi Tarım' 
                                ? (isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-50 text-green-700")
                                : (isDarkMode ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-600")
                            )}>
                              {item.kind}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0 pt-4">
                        <div className={cn("text-lg font-black tracking-tighter leading-none", isDarkMode ? "text-zinc-100" : "text-[#005994]")}>
                          {item.price}
                          <span className="text-[10px] font-bold ml-0.5 opacity-60">TL</span>
                        </div>
                        <p className={cn("text-[8px] font-bold uppercase tracking-wider mt-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>ORTALAMA FİYAT</p>
                      </div>
                    </div>

                    <div className={cn("pt-2 border-t flex items-center justify-between", isDarkMode ? "border-zinc-800/50" : "border-zinc-100")}>
                      <div className="flex items-center gap-1.5">
                        <Package size={12} className="text-zinc-400" />
                        <span className={cn("text-[10px] font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-600")}>İşlem Hacmi</span>
                      </div>
                      <div className={cn("text-[11px] font-bold", isDarkMode ? "text-zinc-200" : "text-zinc-900")}>
                        {item.volume} <span className="text-[9px] font-normal text-zinc-500 uppercase">{item.unit}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4", isDarkMode ? "bg-zinc-900" : "bg-zinc-100")}>
                    <Search size={24} className="text-zinc-300" />
                  </div>
                  <h4 className={cn("text-xs font-bold mb-1", isDarkMode ? "text-zinc-200" : "text-zinc-900")}>Sonuç Bulunamadı</h4>
                  <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Farklı bir arama deneyin.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'marketArbitration':
        const arbitrationData = [
          { city: 'ADANA', name: 'ADANA HAL HAKEM HEYETİ', address: 'Adana Ticaret İl Müdürlüğü', phone: '0322 458 84 00', email: 'adana.tim@ticaret.gov.tr' },
          { city: 'ANKARA', name: 'ANKARA HAL HAKEM HEYETİ', address: 'Ankara Ticaret İl Müdürlüğü', phone: '0312 310 63 00', email: 'ankara.tim@ticaret.gov.tr' },
          { city: 'ANTALYA', name: 'ANTALYA HAL HAKEM HEYETİ', address: 'Antalya Ticaret İl Müdürlüğü', phone: '0242 248 78 00', email: 'antalya.tim@ticaret.gov.tr' },
          { city: 'BURSA', name: 'BURSA HAL HAKEM HEYETİ', address: 'Bursa Ticaret İl Müdürlüğü', phone: '0224 220 10 00', email: 'bursa.tim@ticaret.gov.tr' },
          { city: 'İSTANBUL', name: 'İSTANBUL HAL HAKEM HEYETİ', address: 'İstanbul Ticaret İl Müdürlüğü', phone: '0212 514 20 00', email: 'istanbul.tim@ticaret.gov.tr' },
          { city: 'İZMİR', name: 'İZMİR HAL HAKEM HEYETİ', address: 'İzmir Ticaret İl Müdürlüğü', phone: '0232 483 38 00', email: 'izmir.tim@ticaret.gov.tr' },
          { city: 'MERSİN', name: 'MERSİN HAL HAKEM HEYETİ', address: 'Mersin Ticaret İl Müdürlüğü', phone: '0324 237 77 00', email: 'mersin.tim@ticaret.gov.tr' },
        ];

        const filteredArbitration = arbitrationData.filter(item => 
          item.city.toLowerCase().includes(arbitrationSearchQuery.toLowerCase()) ||
          item.name.toLowerCase().includes(arbitrationSearchQuery.toLowerCase())
        );

        return (
          <div className={cn("h-full flex flex-col transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            {/* Header Info & Search */}
            <div className="p-3 pb-1 shrink-0">
              <div className={cn(
                "rounded-xl border transition-all duration-300 overflow-hidden",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
              )}>
                {/* Top Bar */}
                <div className="px-3 py-2 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/50">
                  <div>
                    <h3 className={cn("text-[10px] font-bold uppercase tracking-wider", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>Heyet Sorgulama</h3>
                    <p className={cn("text-[8px] font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>İl Hakem Heyetleri Listesi</p>
                  </div>
                  <button 
                    onClick={() => setShowArbitrationSearch(!showArbitrationSearch)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-tight transition-all active:scale-95",
                      showArbitrationSearch 
                        ? "bg-red-500 text-white" 
                        : "bg-[#005994] text-white"
                    )}
                  >
                    {showArbitrationSearch ? 'Kapat' : 'Heyet Ara'}
                  </button>
                </div>
                
                {/* Search Input */}
                {showArbitrationSearch ? (
                  <div className="p-2 bg-zinc-50 dark:bg-zinc-950/30">
                    <div className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-all",
                      isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200 shadow-inner"
                    )}>
                      <Search size={14} className="text-zinc-400" />
                      <input 
                        type="text"
                        placeholder="İl veya heyet adı ara..."
                        value={arbitrationSearchQuery}
                        onChange={(e) => setArbitrationSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-[11px] w-full font-medium"
                        autoFocus
                      />
                      {arbitrationSearchQuery && (
                        <button onClick={() => setArbitrationSearchQuery('')}>
                          <X size={14} className="text-zinc-400" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2">
                    <p className={cn("text-[9px] leading-tight font-medium", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>
                      Uyuşmazlıkların çözümü için yetkili heyet bilgilerine ulaşın.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-3 pt-1 space-y-2 scrollbar-hide">
              {filteredArbitration.length > 0 ? (
                filteredArbitration.map((item, idx) => (
                  <div key={idx} className={cn(
                    "p-3 rounded-xl border transition-all active:scale-[0.99]",
                    isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
                  )}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", isDarkMode ? "bg-purple-500/10 text-purple-400" : "bg-purple-50 text-purple-600")}>
                        <Shield size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={cn("px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider", isDarkMode ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-500")}>
                            {item.city}
                          </span>
                        </div>
                        <h4 className={cn("text-[11px] font-bold leading-tight tracking-tight break-words", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>
                          {item.name}
                        </h4>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                      <div className="flex items-start gap-1.5">
                        <MapPin size={10} className="text-zinc-400 shrink-0 mt-0.5" />
                        <p className={cn("text-[9px] leading-snug font-medium", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>{item.address}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <a 
                          href={`tel:${item.phone.replace(/\s/g, '')}`}
                          className="flex items-center gap-1.5 group transition-colors hover:opacity-70"
                        >
                          <Smartphone size={10} className="text-zinc-400 group-hover:text-purple-500" />
                          <p className={cn("text-[9px] font-bold tracking-tight", isDarkMode ? "text-zinc-300" : "text-zinc-700")}>{item.phone}</p>
                        </a>
                        <a 
                          href={`mailto:${item.email}`}
                          className="flex items-center gap-1.5 group transition-colors hover:opacity-70"
                        >
                          <Mail size={10} className="text-zinc-400 group-hover:text-purple-500" />
                          <p className={cn("text-[9px] font-medium tracking-tight", isDarkMode ? "text-zinc-500" : "text-zinc-500")}>{item.email}</p>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4", isDarkMode ? "bg-zinc-900" : "bg-zinc-100")}>
                    <Search size={24} className="text-zinc-300" />
                  </div>
                  <h4 className={cn("text-xs font-bold mb-1", isDarkMode ? "text-zinc-200" : "text-zinc-900")}>Sonuç Bulunamadı</h4>
                  <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Farklı bir arama deneyin.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'announcements':
        return (
          <div className={cn("h-full flex flex-col transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className="flex-1 p-3 space-y-3 overflow-y-auto scrollbar-hide">
              {[
                { id: 1, title: "Yeni Hal Fiyatları", text: "Yeni hal fiyatları güncellendi! Domates, biber ve patlıcan fiyatlarında değişiklikler yapıldı.", icon: TrendingUp, color: "text-green-500", date: "Bugün, 09:45" },
                { id: 2, title: "Sistem Bakımı", text: "Sistem bakımı bu gece 00:00'da başlayacaktır. İşlemlerinizde kısa süreli kesintiler olabilir.", icon: AlertTriangle, color: "text-amber-500", date: "Bugün, 08:30" },
                { id: 3, title: "Künye Sorgulama", text: "Künye sorgulama işlemlerinde yeni özellikler yayında. Artık daha detaylı raporlar alabilirsiniz.", icon: Info, color: "text-blue-500", date: "Dün, 15:20" },
                { id: 4, title: "HKS Mobil Hızlandı", text: "HKS Mobil ile işlemleriniz artık daha hızlı. Performans iyileştirmeleri yapıldı.", icon: Zap, color: "text-purple-500", date: "2 gün önce" },
                { id: 5, title: "Yeni Mevzuat", text: "Hal kayıt sistemi mevzuatında yapılan değişiklikler hakkında bilgilendirme.", icon: FileText, color: "text-blue-500", date: "3 gün önce" },
              ].map((item) => (
                <div key={item.id} className={cn(
                  "p-4 rounded-2xl border transition-colors",
                  isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-[#D1D9E0]"
                )}>
                  <div className="flex items-start gap-3">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", isDarkMode ? "bg-white/5" : "bg-zinc-50")}>
                      <item.icon size={20} className={item.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={cn("text-sm font-bold", isDarkMode ? "text-zinc-100" : "text-[#1B1B1F]")}>{item.title}</h4>
                        <span className={cn("text-[9px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>{item.date}</span>
                      </div>
                      <p className={cn("text-xs leading-relaxed", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'query':
        return (
          <div className={cn("h-full flex flex-col transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-hide">
              <div className={cn(
                "p-4 rounded-[24px] border space-y-4 transition-colors",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-[#CAC4D0] shadow-sm"
              )}>
                <div className={cn("p-1 rounded-xl flex transition-colors", isDarkMode ? "bg-zinc-950" : "bg-zinc-100")}>
                  {['kunye', 'plaka'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setQueryResult(type)}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                        (queryResult === type || (!queryResult && type === 'kunye'))
                          ? (isDarkMode ? "bg-zinc-800 text-white shadow-md" : "bg-white text-[#005994] shadow-sm")
                          : "text-zinc-500"
                      )}
                    >
                      {type === 'kunye' ? 'Künye' : 'Plaka'}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className={cn("text-[10px] font-bold ml-1 uppercase tracking-wider", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>
                      {(!queryResult || queryResult === 'kunye') ? 'KÜNYE NUMARASI' : 'ARAÇ PLAKASI'}
                    </label>
                    <div className={cn(
                      "flex items-center gap-2 p-3 rounded-xl border transition-all",
                      isDarkMode ? "bg-zinc-950 border-zinc-800 focus-within:border-[#005994]" : "bg-white border-zinc-200 focus-within:border-[#005994]"
                    )}>
                      {(!queryResult || queryResult === 'kunye') ? <FileText size={18} className="text-[#005994]" /> : <Smartphone size={18} className="text-[#005994]" />}
                      <input 
                        type="text" 
                        placeholder={(!queryResult || queryResult === 'kunye') ? "Örn: 12345678" : "Örn: 34ABC123"}
                        className="bg-transparent border-none outline-none text-sm w-full font-medium"
                      />
                      <button 
                        onClick={() => navigateTo('qrcode')} 
                        className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <QrCode size={18} className="text-zinc-400 hover:text-[#005994]" />
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => setIsLoading(false), 1500);
                    }}
                    className="w-full bg-[#005994] text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-[#005994]/20 active:scale-[0.98] transition-all"
                  >
                    SORGULA
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className={cn("text-[11px] font-bold uppercase px-1", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>SON SORGULAMALAR</h5>
                {[
                  { title: 'Künye: 84729103', desc: 'Domates (Salkım) • 2 saat önce' },
                  { title: 'Plaka: 34ABC123', desc: 'Salatalık (Çengel) • Dün' },
                  { title: 'Künye: 12345678', desc: 'Biber (Sivri) • 2 gün önce' },
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "p-3 rounded-xl border flex items-center justify-between transition-colors",
                    isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", isDarkMode ? "bg-zinc-950" : "bg-zinc-50")}>
                        <History size={16} className="text-[#005994]" />
                      </div>
                      <div>
                        <p className={cn("text-xs font-bold", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>{item.title}</p>
                        <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-zinc-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className={cn("h-full flex flex-col transition-colors scrollbar-hide relative", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className="flex-1 p-3 space-y-4 overflow-y-auto scrollbar-hide">
              <div className="space-y-2">
                <h5 className={cn("text-[11px] font-bold uppercase px-1", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>SIK KULLANILANLAR</h5>
                <AnimatePresence mode="popLayout">
                  {favorites.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group relative"
                    >
                      <div className={cn(
                        "w-full p-4 rounded-2xl border flex items-center justify-between transition-all active:scale-[0.98]",
                        isDarkMode ? "bg-zinc-900 border-zinc-800 hover:bg-zinc-800" : "bg-white border-[#D1D9E0] hover:bg-zinc-50 shadow-sm"
                      )}>
                        <button 
                          onClick={() => navigateTo(item.actionKey as Screen)}
                          className="flex-1 flex items-center gap-4"
                        >
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isDarkMode ? "bg-zinc-800" : "bg-zinc-50")}>
                            <item.icon size={20} className={item.color} />
                          </div>
                          <div className="text-left">
                            <p className={cn("text-sm font-bold", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>{item.label}</p>
                            <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>{item.desc}</p>
                          </div>
                        </button>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setFavoriteToDelete(item.id);
                              setIsDeleteConfirmModalOpen(true);
                            }}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                          <ChevronRight size={18} className="text-zinc-400" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {favorites.length === 0 && (
                  <div className="py-12 flex flex-col items-center justify-center text-center opacity-50">
                    <Star size={48} className="text-zinc-400 mb-4" />
                    <p className="text-xs font-medium">Henüz favori işleminiz yok.</p>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsAddFavoriteModalOpen(true)}
                className={cn("w-full p-6 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all hover:border-[#005994] hover:bg-[#005994]/5", isDarkMode ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-zinc-50/50")}
              >
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                  <Plus size={24} className="text-zinc-400" />
                </div>
                <p className={cn("text-xs font-bold mb-1", isDarkMode ? "text-zinc-300" : "text-zinc-700")}>Yeni Favori Ekle</p>
                <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Sık yaptığınız işlemleri buraya ekleyerek hızlanın.</p>
              </button>
            </div>

            {/* Add Favorite Modal */}
            <AnimatePresence>
              {isAddFavoriteModalOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsAddFavoriteModalOpen(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
                  />
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className={cn(
                      "absolute bottom-0 left-0 right-0 z-50 rounded-t-[32px] p-6 max-h-[80%] overflow-y-auto scrollbar-hide",
                      isDarkMode ? "bg-zinc-900" : "bg-white"
                    )}
                  >
                    <div className="w-12 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mb-6" />
                    <div className="flex justify-between items-center mb-6">
                      <h3 className={cn("text-lg font-bold", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>Yeni Favori Ekle</h3>
                      <button onClick={() => setIsAddFavoriteModalOpen(false)} className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <X size={20} className="text-zinc-500" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {availableActions
                        .filter(action => !favorites.some(f => f.actionKey === action.actionKey))
                        .map((action, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              const newFavorite = {
                                id: Math.random().toString(36).substr(2, 9),
                                ...action
                              };
                              setFavorites([...favorites, newFavorite]);
                              setIsAddFavoriteModalOpen(false);
                            }}
                            className={cn(
                              "w-full p-4 rounded-2xl border flex items-center gap-4 transition-all active:scale-[0.98]",
                              isDarkMode ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700" : "bg-white border-zinc-100 hover:bg-zinc-50 shadow-sm"
                            )}
                          >
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isDarkMode ? "bg-zinc-900" : "bg-zinc-50")}>
                              <action.icon size={20} className={action.color} />
                            </div>
                            <div className="text-left flex-1">
                              <p className={cn("text-sm font-bold", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>{action.label}</p>
                              <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>{action.desc}</p>
                            </div>
                            <Plus size={18} className="text-[#005994]" />
                          </button>
                        ))}
                      
                      {availableActions.filter(action => !favorites.some(f => f.actionKey === action.actionKey)).length === 0 && (
                        <div className="py-8 text-center opacity-50">
                          <p className="text-xs">Tüm işlemler zaten favorilerinizde.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
              {isDeleteConfirmModalOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsDeleteConfirmModalOpen(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-[60] p-6">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className={cn(
                        "w-full max-w-xs rounded-[32px] p-6 shadow-2xl",
                        isDarkMode ? "bg-zinc-900 border border-zinc-800" : "bg-white"
                      )}
                    >
                      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                        <Trash2 size={32} className="text-red-500" />
                      </div>
                      <h3 className={cn("text-lg font-bold text-center mb-2", isDarkMode ? "text-zinc-100" : "text-zinc-900")}>Favoriyi Kaldır?</h3>
                      <p className={cn("text-xs text-center mb-6 px-2", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>
                        Bu işlemi favorilerinizden kaldırmak istediğinize emin misiniz?
                      </p>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setIsDeleteConfirmModalOpen(false)}
                          className={cn(
                            "flex-1 py-3 rounded-2xl font-bold text-xs transition-colors",
                            isDarkMode ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                          )}
                        >
                          Vazgeç
                        </button>
                        <button 
                          onClick={() => {
                            setFavorites(favorites.filter(f => f.id !== favoriteToDelete));
                            setIsDeleteConfirmModalOpen(false);
                            setFavoriteToDelete(null);
                          }}
                          className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                        >
                          Evet, Kaldır
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </>
              )}
            </AnimatePresence>
          </div>
        );
      case 'notificationWizard':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto scrollbar-hide transition-colors", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className="flex-1 p-3 space-y-4">
              {/* Progress Stepper - Material Style */}
              <div className="flex justify-between items-center px-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                      step <= wizardStep 
                        ? "bg-[#005994] text-white" 
                        : (isDarkMode ? "bg-zinc-900 text-zinc-400" : "bg-[#005994]/10 text-[#005994]")
                    )}>
                      {step}
                    </div>
                    {step < 4 && <div className={cn("flex-1 h-[2px] mx-1", isDarkMode ? "bg-zinc-800" : "bg-[#CAC4D0]")} />}
                  </div>
                ))}
              </div>

              {wizardStep === 1 && (
                <div className={cn("p-4 rounded-[16px] border space-y-4 transition-colors", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-[#CAC4D0]")}>
                  <div className="space-y-1">
                    <h4 className={cn("text-sm font-semibold", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>Bildirimci Sıfatı</h4>
                    <p className={cn("text-[11px]", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>İşlem yapacağınız sıfatı seçin.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {['Üretici', 'Komisyoncu', 'Tüccar'].map((role) => (
                      <button 
                        key={role} 
                        onClick={() => setSelectedRole(role)}
                        className={cn(
                          "flex items-center justify-between p-3 border rounded-xl transition-all group",
                          selectedRole === role 
                            ? (isDarkMode ? "border-[#005994] bg-[#005994]/10" : "border-[#005994] bg-[#005994]/5")
                            : (isDarkMode ? "bg-zinc-950 border-zinc-800 hover:bg-[#005994]/10" : "bg-[#FEF7FF] border-[#79747E] hover:bg-[#005994]/5")
                        )}>
                        <span className={cn("text-xs font-medium", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>{role}</span>
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          selectedRole === role ? "border-[#005994]" : (isDarkMode ? "border-zinc-800" : "border-[#79747E]")
                        )}>
                          <div className={cn(
                            "w-2.5 h-2.5 rounded-full transition-colors",
                            selectedRole === role ? "bg-[#005994]" : "bg-transparent"
                          )} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {wizardStep > 1 && (
                <div className={cn("p-4 rounded-[16px] border space-y-4 transition-colors", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-[#CAC4D0]")}>
                  <h4 className={cn("text-sm font-semibold", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>Adım {wizardStep}</h4>
                  <p className={cn("text-[11px]", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>Bu adım {wizardStep}. adım detaylarıdır.</p>
                </div>
              )}

              <div className={cn(
                "p-3 rounded-xl border flex gap-3 transition-colors",
                isDarkMode ? "bg-[#005994]/10 border-[#005994]/30" : "bg-[#005994]/5 border-[#005994]/20"
              )}>
                <Info className={isDarkMode ? "text-[#005994]" : "text-[#005994]"} size={18} />
                <p className={cn("text-[10px] leading-tight", isDarkMode ? "text-zinc-400" : "text-[#005994]")}>
                  Bildirim işlemleri HKS üzerinden anlık gerçekleşir. Lütfen bilgilerin doğruluğundan emin olun.
                </p>
              </div>
            </div>
            <div className={cn("p-4 border-t pb-4 transition-colors", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-[#FEF7FF] border-[#CAC4D0]")}>
              <button 
                disabled={!selectedRole}
                onClick={() => {
                  if (wizardStep < 4) setWizardStep(wizardStep + 1);
                  else {
                    setWizardStep(1);
                    setSelectedRole(null);
                    navigateTo('notificationsList');
                  }
                }}
                className={cn(
                  "w-full text-white py-3 rounded-full font-medium text-sm shadow-sm transition-all",
                  selectedRole ? "bg-[#005994]" : "bg-[#005994] opacity-50 cursor-not-allowed"
                )}>
                {wizardStep < 4 ? 'Sonraki Adım' : 'Tamamla'}
              </button>
            </div>
          </div>
        );
      case 'notificationsList':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto scrollbar-hide p-3 space-y-3 transition-colors", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className="flex justify-between items-center px-1">
              <h5 className={cn("text-xs font-semibold", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>BİLDİRİMLERİM</h5>
              {notifications.some(n => n.unread) && (
                <button onClick={markAllAsRead} className="text-[10px] text-[#005994] font-bold">Okundu İşaretle</button>
              )}
            </div>
            
            <AnimatePresence mode="popLayout">
              {notifications.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-40 text-center"
                >
                  <Bell size={32} className={cn("mb-2 opacity-20", isDarkMode ? "text-white" : "text-black")} />
                  <p className={cn("text-xs", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Hiç bildiriminiz yok.</p>
                </motion.div>
              ) : (
                notifications.map((n) => {
                  let Icon = Bell;
                  let colorClass = "";
                  let bgClass = "";
                  let borderClass = "";
                  
                  switch(n.type) {
                    case 'info':
                      Icon = Info;
                      colorClass = isDarkMode ? "text-blue-400" : "text-blue-600";
                      bgClass = isDarkMode ? "" : "bg-blue-50";
                      borderClass = isDarkMode ? "border-blue-500/30" : "border-blue-200";
                      break;
                    case 'success':
                      Icon = CheckCircle2;
                      colorClass = isDarkMode ? "text-green-400" : "text-green-600";
                      bgClass = isDarkMode ? "" : "bg-green-50";
                      borderClass = isDarkMode ? "border-green-500/30" : "border-green-200";
                      break;
                    case 'warning':
                      Icon = AlertTriangle;
                      colorClass = isDarkMode ? "text-amber-400" : "text-amber-600";
                      bgClass = isDarkMode ? "" : "bg-amber-50";
                      borderClass = isDarkMode ? "border-amber-500/30" : "border-amber-200";
                      break;
                    case 'error':
                      Icon = XCircle;
                      colorClass = isDarkMode ? "text-red-400" : "text-red-600";
                      bgClass = isDarkMode ? "" : "bg-red-50";
                      borderClass = isDarkMode ? "border-red-500/30" : "border-red-200";
                      break;
                    case 'announcement':
                      Icon = Megaphone;
                      colorClass = isDarkMode ? "text-blue-400" : "text-blue-600";
                      bgClass = isDarkMode ? "" : "bg-blue-50";
                      borderClass = isDarkMode ? "border-blue-500/30" : "border-blue-200";
                      break;
                  }

                  return (
                    <motion.div 
                      key={n.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      className="relative rounded-xl overflow-hidden"
                    >
                      {/* Foreground Card */}
                      <div
                        className={cn(
                          "relative p-3 border flex gap-3 transition-colors rounded-xl",
                          isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200",
                          bgClass, borderClass,
                          n.unread && !isDarkMode && "shadow-sm"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          isDarkMode ? "bg-black/20" : "bg-white",
                          colorClass
                        )}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h6 className={cn("text-xs font-bold truncate", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>{n.title}</h6>
                            <span className={cn("text-[9px] whitespace-nowrap ml-2", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>{n.time}</span>
                          </div>
                          <p className={cn("text-[10px] line-clamp-2 mt-0.5", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>{n.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        );
      case 'menu':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto p-3 space-y-4 scrollbar-hide transition-colors", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: LayoutDashboard, label: 'Ana Sayfa', action: () => navigateTo('dashboard') },
                { icon: Search, label: 'Sorgulama', action: () => navigateTo('query') },
                { icon: Star, label: 'Favoriler', action: () => navigateTo('favorites') },
                { icon: Bell, label: 'Bildirimler', action: () => navigateTo('notificationsList') },
                { icon: History, label: 'Geçmiş', action: () => navigateTo('history') },
                { icon: ScanLine, label: 'Karekod', action: () => navigateTo('qrcode') },
                { icon: HelpCircle, label: 'Yardım', action: () => navigateTo('help') },
                { icon: Settings, label: 'Ayarlar', action: () => navigateTo('appSettings') },
                { icon: Globe, label: 'Web Sitesi', action: () => {} },
                { icon: MessageSquare, label: 'Destek', action: () => navigateTo('liveChat') },
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={item.action}
                  className={cn(
                    "p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all shadow-sm",
                    isDarkMode ? "bg-zinc-900 border-zinc-800 hover:bg-[#005994]/10" : "bg-white border-[#CAC4D0]/50 hover:bg-[#005994]/5"
                  )}
                >
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center transition-colors", isDarkMode ? "bg-zinc-800 text-[#005994]" : "bg-[#F3EDF7] text-[#005994]")}>
                    <item.icon size={18} />
                  </div>
                  <span className={cn("text-[9px] font-semibold text-center leading-tight", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className={cn("rounded-xl border overflow-hidden shadow-sm transition-colors", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-[#CAC4D0]/50")}>
              {[
                { icon: FileSearch, label: 'Mevzuat', action: () => {} },
                { icon: Info, label: 'Hakkımızda', action: () => {} },
              ].map((item, i) => (
                <button key={i} onClick={item.action} className={cn(
                  "w-full p-3.5 flex items-center gap-3.5 border-b last:border-0 transition-colors",
                  isDarkMode ? "hover:bg-zinc-800 border-zinc-800" : "hover:bg-zinc-50 border-zinc-100"
                )}>
                  <item.icon size={16} className={isDarkMode ? "text-zinc-400" : "text-[#49454F]"} />
                  <span className={cn("text-xs font-medium", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-center pt-2">
              <button 
                onClick={() => navigateTo('login')}
                className={cn(
                  "px-6 py-2 rounded-full flex items-center gap-2 font-bold text-[10px] border transition-all",
                  isDarkMode ? "bg-red-900/20 text-red-400 border-red-900/30 hover:bg-red-900/30" : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                )}
              >
                <LogOut size={14} />
                GÜVENLİ ÇIKIŞ
              </button>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto scrollbar-hide p-3 space-y-3 transition-colors", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className="flex justify-between items-center px-1">
              <h5 className={cn("text-xs font-semibold", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>İŞLEM GEÇMİŞİ</h5>
              <button className={cn("p-1.5 rounded-lg transition-colors", isDarkMode ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-[#44474E]")}><Search size={14} /></button>
            </div>
            {[
              { type: 'Bildirim', item: 'Domates (Salkım)', date: '24.03.2026', amount: '+500 KG', status: 'Tamamlandı' },
              { type: 'Favori', item: 'Künye: 84729103', date: '23.03.2026', amount: 'Sorgulandı', status: 'Başarılı' },
              { type: 'Bildirim', item: 'Salatalık (Çengel)', date: '22.03.2026', amount: '+250 KG', status: 'Tamamlandı' },
              { type: 'Ödeme', item: 'Hal Rüsumu', date: '21.03.2026', amount: '-₺450.00', status: 'Ödendi' },
              { type: 'Bildirim', item: 'Biber (Sivri)', date: '20.03.2026', amount: '+120 KG', status: 'İptal Edildi', error: true },
            ].map((h, i) => (
              <div key={i} className={cn(
                "p-3 rounded-xl border flex items-center gap-3 transition-colors",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-[#CAC4D0]"
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                  h.error ? "bg-red-100 text-red-600" : (isDarkMode ? "bg-zinc-800 text-[#005994]" : "bg-zinc-100 text-[#005994]")
                )}>
                  {h.type === 'Bildirim' ? <FileText size={18} /> : h.type === 'Favori' ? <Star size={18} /> : <CreditCard size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-xs font-bold truncate", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>{h.item}</p>
                  <p className={cn("text-[10px]", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>{h.date} • {h.type}</p>
                </div>
                <div className="text-right">
                  <p className={cn("text-xs font-bold", h.error ? "text-red-600" : (isDarkMode ? "text-zinc-100" : "text-[#1D1B20]"))}>{h.amount}</p>
                  <p className={cn("text-[9px] font-bold uppercase", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>{h.status}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'help':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto scrollbar-hide p-4 space-y-6 transition-colors", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className="text-center space-y-2">
              <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors", isDarkMode ? "bg-zinc-900 text-[#005994]" : "bg-[#005994]/10 text-[#005994]")}>
                <HelpCircle size={32} />
              </div>
              <h4 className={cn("text-lg font-bold", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>Nasıl yardımcı olabiliriz?</h4>
              <p className={cn("text-xs", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>Sıkça sorulan sorular ve destek kanalları.</p>
            </div>

            <div className="space-y-2">
              <h5 className={cn("text-[11px] font-bold uppercase", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>POPÜLER KONULAR</h5>
              {[
                'Bildirim nasıl yapılır?',
                'Künye sorgulama hatası',
                'Şifremi unuttum',
                'Hal rüsumu ödeme işlemleri',
              ].map((q, i) => (
                <button key={i} className={cn(
                  "w-full p-3.5 rounded-xl border flex items-center justify-between transition-colors",
                  isDarkMode ? "bg-zinc-900 border-zinc-800 hover:bg-zinc-800" : "bg-white border-[#CAC4D0] hover:bg-zinc-50"
                )}>
                  <span className={cn("text-xs font-medium", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>{q}</span>
                  <ChevronRight size={14} className="text-zinc-400" />
                </button>
              ))}
            </div>

            <div className={cn("p-4 rounded-2xl text-white space-y-3 shadow-md transition-colors", isDarkMode ? "bg-zinc-900 border border-zinc-800" : "bg-[#005994]")}>
              <h5 className={cn("text-sm font-bold", isDarkMode ? "text-zinc-100" : "text-white")}>Canlı Destek</h5>
              <p className={cn("text-[11px] leading-tight", isDarkMode ? "text-zinc-400" : "text-white/80")}>Müşteri temsilcilerimizle anlık olarak görüşmeye başlayın.</p>
              <button 
                onClick={() => navigateTo('liveChat')}
                className={cn("w-full py-2.5 rounded-full font-bold text-xs transition-colors", isDarkMode ? "bg-[#005994] text-white" : "bg-white text-[#005994] hover:bg-zinc-100")}
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
              onClick={() => navigateTo('dashboard')}
              className="absolute top-12 left-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
        );
      case 'profile':
        return (
          <div className={cn("h-full flex flex-col transition-colors", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className={cn(
              "px-4 py-3 flex items-center gap-4 border-b transition-colors",
              isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-[#F3EDF7] border-[#CAC4D0]"
            )}>
              <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden shrink-0">
                <img src="https://picsum.photos/seed/user/200/200" alt="User" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <h3 className={cn("text-sm font-bold", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>Kullanıcı</h3>
                <p className={cn("text-[10px]", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>Teknik Danışman • Armagan4celik@gmail.com</p>
              </div>
              <button onClick={() => navigateTo('profileInfo')} className={cn("p-2 rounded-full transition-colors", isDarkMode ? "text-blue-400 hover:bg-white/10" : "text-[#005994] hover:bg-white/50")}>
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex-1 p-3 space-y-3 overflow-y-auto scrollbar-hide">
              <div className={cn("rounded-xl border overflow-hidden shadow-sm transition-colors", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-[#CAC4D0]/50")}>
                {[
                  { icon: User, label: 'Profil Bilgileri', action: () => navigateTo('profileInfo') },
                  { icon: Shield, label: 'Güvenlik Ayarları', action: () => navigateTo('securitySettings') },
                  { icon: Settings, label: 'Uygulama Ayarları', action: () => navigateTo('appSettings') },
                  { icon: History, label: 'İşlem Geçmişi', action: () => navigateTo('history') },
                ].map((item, idx) => (
                  <button key={idx} onClick={item.action} className={cn(
                    "w-full p-3 flex items-center justify-between transition-all border-b last:border-0",
                    isDarkMode ? "hover:bg-zinc-800 border-zinc-800" : "hover:bg-[#005994]/5 border-[#F3EDF7]"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border transition-colors", isDarkMode ? "bg-zinc-800 text-zinc-400 border-zinc-700" : "bg-[#FEF7FF] text-[#49454F] border-[#CAC4D0]/30")}><item.icon size={16} /></div>
                      <span className={cn("text-xs font-medium", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>{item.label}</span>
                    </div>
                    <ChevronRight size={14} className="text-zinc-400" />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => navigateTo('login')}
                className={cn(
                  "w-full p-2.5 rounded-xl border flex items-center justify-center gap-2 font-bold text-[10px] transition-all shadow-sm",
                  isDarkMode ? "bg-red-900/20 text-red-400 border-red-900/30 hover:bg-red-900/30" : "bg-white text-red-600 border-red-100 hover:bg-red-50"
                )}
              >
                <LogOut size={14} />
                ÇIKIŞ YAP
              </button>
            </div>
          </div>
        );
      case 'profileInfo':
        return (
          <div className={cn("h-full flex flex-col overflow-y-auto scrollbar-hide p-4 space-y-4 transition-colors", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className="space-y-3">
              {[
                { label: 'Ad Soyad', value: 'Kullanıcı' },
                { label: 'E-Posta', value: 'Armagan4celik@gmail.com' },
                { label: 'Telefon', value: '+90 555 000 00 00' },
                { label: 'TCKN', value: '12345678901' },
                { label: 'Ünvan', value: 'Teknik Danışman' },
              ].map((field, i) => (
                <div key={i} className="space-y-1">
                  <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>{field.label}</label>
                  <div className={cn(
                    "p-3 rounded-xl border text-xs font-medium shadow-sm transition-colors",
                    isDarkMode ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-[#CAC4D0]/50 text-[#1D1B20]"
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
          <div className={cn("h-full flex flex-col overflow-y-auto scrollbar-hide p-4 space-y-4 transition-colors", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className={cn("rounded-xl border overflow-hidden shadow-sm transition-colors", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-[#CAC4D0]/50")}>
              {[
                { label: 'Şifre Değiştir', desc: 'Son değişim: 3 ay önce', action: () => navigateTo('changePassword') },
                { label: 'İki Faktörlü Doğrulama', desc: securitySettings.twoFactor ? 'Aktif' : 'Aktif değil', toggle: securitySettings.twoFactor, action: () => toggleSecuritySetting('twoFactor') },
                { icon: Smartphone, label: 'Bağlı Cihazlar', desc: '1 aktif cihaz' },
                { label: 'Biyometrik Giriş', desc: 'Parmak izi / Yüz tanıma', toggle: securitySettings.biometric, action: () => toggleSecuritySetting('biometric') },
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={item.action}
                  className={cn(
                    "w-full p-4 flex items-center justify-between border-b last:border-0 transition-colors text-left",
                    isDarkMode ? "hover:bg-zinc-800 border-zinc-800" : "hover:bg-zinc-50 border-zinc-100"
                  )}
                >
                  <div>
                    <p className={cn("text-xs font-bold", isDarkMode ? "text-zinc-100" : "text-[#1D1B20]")}>{item.label}</p>
                    <p className={cn("text-[10px]", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>{item.desc}</p>
                  </div>
                  {item.toggle !== undefined ? (
                    <div className={cn(
                      "w-10 h-5 rounded-full relative transition-colors",
                      item.toggle ? "bg-[#005994]" : (isDarkMode ? "bg-zinc-800" : "bg-zinc-200")
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
            <p className={cn("text-[10px] text-center px-4", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>
              Güvenlik ayarlarınızı e-Devlet üzerinden de yönetebilirsiniz.
            </p>
          </div>
        );
      case 'changePassword':
        return (
          <div className={cn("h-full flex flex-col p-4 space-y-6 transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Mevcut Şifre</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200")}>
                  <Lock size={18} className="text-[#005994]" />
                  <input type="password" placeholder="••••••••" className="bg-transparent border-none outline-none text-xs w-full" />
                </div>
              </div>
              <div className="space-y-1">
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Yeni Şifre</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200")}>
                  <Lock size={18} className="text-[#005994]" />
                  <input type="password" placeholder="••••••••" className="bg-transparent border-none outline-none text-xs w-full" />
                </div>
              </div>
              <div className="space-y-1">
                <label className={cn("text-[10px] font-bold uppercase ml-1", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Yeni Şifre (Tekrar)</label>
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200")}>
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
          <div className={cn("h-full flex flex-col transition-colors", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              <div className="flex justify-center">
                <span className={cn("text-[8px] font-bold uppercase px-2 py-1 rounded-full", isDarkMode ? "bg-zinc-900 text-zinc-500" : "bg-zinc-100 text-zinc-400")}>Bugün</span>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-[#005994] flex items-center justify-center text-white text-[10px] font-bold">HKS</div>
                <div className={cn("max-w-[80%] p-3 rounded-2xl rounded-tl-none shadow-sm", isDarkMode ? "bg-zinc-900 text-zinc-100" : "bg-white text-[#1D1B20]")}>
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
                <div className={cn("max-w-[80%] p-3 rounded-2xl rounded-tl-none shadow-sm", isDarkMode ? "bg-zinc-900 text-zinc-100" : "bg-white text-[#1D1B20]")}>
                  <p className="text-xs leading-relaxed">Tabii ki. Künye sorgulama ekranından ürünün üzerindeki 10 haneli numarayı girerek veya karekodu okutarak detaylı bilgiye ulaşabilirsiniz. Başka bir sorunuz var mı?</p>
                  <p className="text-[8px] mt-1 opacity-50 text-right">09:42</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className={cn("p-3 border-t transition-colors", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100")}>
              <div className={cn("flex items-center gap-2 p-1.5 rounded-full border", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200")}>
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
          <div className={cn("h-full flex flex-col overflow-y-auto scrollbar-hide p-4 space-y-4 transition-colors", isDarkMode ? "bg-zinc-950" : "bg-[#F8FAFC]")}>
            <div className={cn("rounded-xl border overflow-hidden shadow-sm transition-colors", isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-[#D1D9E0]")}>
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
                    isDarkMode ? "border-zinc-800 hover:bg-zinc-800/50" : "border-zinc-100 hover:bg-zinc-50"
                  )}
                >
                  <div>
                    <p className={cn("text-xs font-bold", isDarkMode ? "text-zinc-100" : "text-[#1B1B1F]")}>{item.label}</p>
                    <p className={cn("text-[10px]", isDarkMode ? "text-zinc-400" : "text-[#44474E]")}>{item.desc}</p>
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
              <p className={cn("text-[10px] font-bold uppercase mb-3", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Toaster Test (Bildirimler)</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => addToast('success', 'İşlem Başarılı', 'Kayıt işlemi başarıyla tamamlandı.')}
                  className="p-2 text-[10px] font-bold rounded-lg bg-green-500/10 text-green-600 border border-green-500/20 hover:bg-green-500/20 transition-colors"
                >
                  Başarılı
                </button>
                <button 
                  onClick={() => addToast('error', 'Hata Oluştu', 'Sunucu bağlantısı kurulamadı.')}
                  className="p-2 text-[10px] font-bold rounded-lg bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                >
                  Hata
                </button>
                <button 
                  onClick={() => addToast('warning', 'Uyarı', 'Lütfen eksik alanları doldurunuz.')}
                  className="p-2 text-[10px] font-bold rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                >
                  Uyarı
                </button>
                <button 
                  onClick={() => addToast('info', 'Bilgilendirme', 'Sistem güncellemesi mevcuttur.')}
                  className="p-2 text-[10px] font-bold rounded-lg bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                >
                  Bilgi
                </button>
                <button 
                  onClick={() => addToast('announcement', 'Yeni Özellik', 'Karanlık mod artık kullanılabilir!')}
                  className="p-2 text-[10px] font-bold rounded-lg bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:bg-blue-500/20 transition-colors col-span-2"
                >
                  Duyuru
                </button>
              </div>
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
    <div className={cn("w-full h-full flex flex-col transition-colors overflow-hidden", isDarkMode ? "bg-zinc-950" : "bg-zinc-100")}>
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Flutter Code */}
        <div className={cn(
          "hidden lg:flex flex-col w-[850px] border-r transition-colors overflow-hidden shrink-0",
          isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
        )}>
          <div className="p-4 border-b flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#005994] rounded-lg flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <div>
                <h2 className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-zinc-900")}>Flutter Dart Kodu</h2>
                <p className={cn("text-[10px]", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>Dinamik olarak oluşturulan kod</p>
              </div>
            </div>
            <button 
              onClick={handleCopyCode}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                isCopied 
                  ? "bg-green-500 text-white" 
                  : (isDarkMode ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200")
              )}
            >
              {isCopied ? <Check size={12} /> : <Copy size={12} />}
              {isCopied ? 'Kopyalandı' : 'Kodu Kopyala'}
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4 font-mono text-[11px] leading-relaxed scrollbar-hide">
            <pre className={isDarkMode ? "text-blue-300" : "text-blue-700"}>
              {getFlutterCode(activeScreen)}
            </pre>
          </div>
        </div>

        {/* Right Content: Phone Mockup */}
        <div className="flex-1 flex items-center justify-center p-4 overflow-auto scrollbar-hide">
          <div className="relative mx-auto">
            {/* Phone Frame */}
            <div className="relative w-[300px] h-[600px] bg-zinc-800 rounded-[40px] p-2 shadow-2xl border-[6px] border-zinc-900 overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-zinc-900 rounded-b-xl z-50 flex items-center justify-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <div className="w-8 h-0.5 bg-zinc-800 rounded-full" />
              </div>

              {/* Screen Content */}
              <div className={cn("w-full h-full rounded-[32px] overflow-hidden relative flex flex-col transition-colors scrollbar-hide", isDarkMode ? "bg-zinc-950" : "bg-[#FFFFFF]")}>
                {/* Toaster Container */}
                <div className="absolute top-6 left-4 right-4 z-[60] flex flex-col gap-2 pointer-events-none">
                  <AnimatePresence>
                    {toasts.map(toast => {
                      let Icon = Bell;
                      let colorClass = "";
                      let bgClass = "";
                      let borderClass = "";
                      
                      switch(toast.type) {
                        case 'info':
                          Icon = Info;
                          colorClass = isDarkMode ? "text-blue-400" : "text-blue-600";
                          bgClass = isDarkMode ? "bg-blue-900/90" : "bg-blue-50/95";
                          borderClass = isDarkMode ? "border-blue-500/30" : "border-blue-200";
                          break;
                        case 'success':
                          Icon = CheckCircle2;
                          colorClass = isDarkMode ? "text-green-400" : "text-green-600";
                          bgClass = isDarkMode ? "bg-green-900/90" : "bg-green-50/95";
                          borderClass = isDarkMode ? "border-green-500/30" : "border-green-200";
                          break;
                        case 'warning':
                          Icon = AlertTriangle;
                          colorClass = isDarkMode ? "text-amber-400" : "text-amber-600";
                          bgClass = isDarkMode ? "bg-amber-900/90" : "bg-amber-50/95";
                          borderClass = isDarkMode ? "border-amber-500/30" : "border-amber-200";
                          break;
                        case 'error':
                          Icon = XCircle;
                          colorClass = isDarkMode ? "text-red-400" : "text-red-600";
                          bgClass = isDarkMode ? "bg-red-900/90" : "bg-red-50/95";
                          borderClass = isDarkMode ? "border-red-500/30" : "border-red-200";
                          break;
                        case 'announcement':
                          Icon = Megaphone;
                          colorClass = isDarkMode ? "text-blue-400" : "text-blue-600";
                          bgClass = isDarkMode ? "bg-blue-900/90" : "bg-blue-50/95";
                          borderClass = isDarkMode ? "border-blue-500/30" : "border-blue-200";
                          break;
                      }

                      return (
                        <motion.div
                          key={toast.id}
                          initial={{ opacity: 0, y: -20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                          className={cn(
                            "p-3 rounded-xl border flex items-start gap-3 shadow-lg backdrop-blur-sm pointer-events-auto",
                            bgClass, borderClass
                          )}
                        >
                          <div className={cn("mt-0.5", colorClass)}>
                            <Icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h6 className={cn("text-xs font-bold", isDarkMode ? "text-white" : "text-zinc-900")}>{toast.title}</h6>
                            <p className={cn("text-[10px] mt-0.5", isDarkMode ? "text-zinc-300" : "text-zinc-600")}>{toast.message}</p>
                          </div>
                          <button 
                            onClick={() => removeToast(toast.id)}
                            className={cn("p-1 -mr-1 -mt-1 rounded-md transition-colors", isDarkMode ? "hover:bg-white/10 text-zinc-400" : "hover:bg-black/5 text-zinc-500")}
                          >
                            <X size={14} />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

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
                {activeScreen !== 'splash' && activeScreen !== 'login' && activeScreen !== 'register' && activeScreen !== 'memberLogin' && activeScreen !== 'forgotPassword' && <BottomNavBar activeScreen={activeScreen} setActiveScreen={navigateTo} isDarkMode={isDarkMode} notifications={notifications} />}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#5A5A40]/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
