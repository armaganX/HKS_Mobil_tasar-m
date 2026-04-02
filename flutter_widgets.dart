import 'package:flutter/material.dart';

/// HKS Mobil Uygulaması - Flutter Widget Yapıları
/// Bu dosya React/Tailwind tasarımının Flutter/Dart karşılığını içerir.

// -----------------------------------------------------------------------------
// 1. Loading Overlay (Belirgin Yükleniyor Ekranı)
// -----------------------------------------------------------------------------
class HKSSpinner extends StatefulWidget {
  final bool isDarkMode;
  const HKSSpinner({Key? key, required this.isDarkMode}) : super(key: key);

  @override
  State<HKSSpinner> createState() => _HKSSpinnerState();
}

class _HKSSpinnerState extends State<HKSSpinner> with TickerProviderStateMixin {
  late AnimationController _outerController;
  late AnimationController _innerController;
  late AnimationController _pulseController;

  @override
  void initState() {
    super.initState();
    _outerController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat();

    _innerController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    )..repeat(reverse: false);

    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _outerController.dispose();
    _innerController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final bgColor = widget.isDarkMode ? const Color(0xFF2B2930) : Colors.white;
    final textColor = widget.isDarkMode ? Colors.white : const Color(0xFF005994);
    final subTextColor = widget.isDarkMode ? Colors.grey[400] : Colors.grey[600];

    return Container(
      color: widget.isDarkMode 
          ? Colors.black.withOpacity(0.6) 
          : const Color(0xFF005994).withOpacity(0.2),
      child: Center(
        child: Container(
          padding: const EdgeInsets.all(32),
          decoration: BoxDecoration(
            color: bgColor,
            borderRadius: BorderRadius.circular(32),
            boxShadow: [
              BoxShadow(
                color: widget.isDarkMode 
                    ? Colors.black.withOpacity(0.5) 
                    : const Color(0xFF005994).withOpacity(0.2),
                blurRadius: 24,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(
                width: 80,
                height: 80,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    // Dış Halka
                    RotationTransition(
                      turns: _outerController,
                      child: Container(
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: Colors.transparent,
                            width: 5,
                          ),
                        ),
                        child: CircularProgressIndicator(
                          valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF005994)),
                          strokeWidth: 5,
                          backgroundColor: Colors.transparent,
                        ),
                      ),
                    ),
                    // İç Halka (Ters Yönde)
                    RotationTransition(
                      turns: Tween(begin: 1.0, end: 0.0).animate(_innerController),
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: CircularProgressIndicator(
                          valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFFF39200)),
                          strokeWidth: 5,
                          backgroundColor: Colors.transparent,
                        ),
                      ),
                    ),
                    // Merkez Nokta (Pulse)
                    ScaleTransition(
                      scale: Tween(begin: 1.0, end: 1.4).animate(
                        CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
                      ),
                      child: Container(
                        width: 16,
                        height: 16,
                        decoration: BoxDecoration(
                          color: const Color(0xFF005994),
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFF005994).withOpacity(0.8),
                              blurRadius: 15,
                              spreadRadius: 2,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'YÜKLENİYOR',
                style: TextStyle(
                  color: textColor,
                  fontSize: 16,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 2.0,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Lütfen bekleyin...',
                style: TextStyle(
                  color: subTextColor,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// -----------------------------------------------------------------------------
// 2. Ana Ekran Yapısı (Scaffold & BottomNavigationBar)
// -----------------------------------------------------------------------------
class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;
  bool _isLoading = false;

  void _onTabTapped(int index) {
    setState(() {
      _isLoading = true;
    });
    
    // Simüle edilmiş yükleme süresi
    Future.delayed(const Duration(milliseconds: 800), () {
      setState(() {
        _currentIndex = index;
        _isLoading = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Stack(
      children: [
        Scaffold(
          backgroundColor: isDarkMode ? const Color(0xFF1C1B1F) : const Color(0xFFF8FAFC),
          appBar: AppBar(
            backgroundColor: const Color(0xFF005994),
            title: const Text('HKS Mobil'),
            centerTitle: true,
            elevation: 0,
          ),
          body: Center(
            child: Text('Seçili Sekme: $_currentIndex'), // Buraya ilgili ekran widget'ı gelecek
          ),
          bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentIndex,
            onTap: _onTabTapped,
            type: BottomNavigationBarType.fixed,
            backgroundColor: isDarkMode ? const Color(0xFF2B2930) : Colors.white,
            selectedItemColor: const Color(0xFF005994),
            unselectedItemColor: isDarkMode ? Colors.grey[600] : Colors.grey[400],
            items: const [
              BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Ana Sayfa'),
              BottomNavigationBarItem(icon: Icon(Icons.search), label: 'Sorgulama'),
              BottomNavigationBarItem(icon: Icon(Icons.qr_code_scanner), label: 'Karekod'),
              BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profil'),
              BottomNavigationBarItem(icon: Icon(Icons.menu), label: 'Menü'),
            ],
          ),
        ),
        
        // Yükleniyor Ekranı Overlay
        if (_isLoading)
          Positioned.fill(
            child: HKSSpinner(isDarkMode: isDarkMode),
          ),
      ],
    );
  }
}
