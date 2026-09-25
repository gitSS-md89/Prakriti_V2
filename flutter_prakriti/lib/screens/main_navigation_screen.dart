import 'package:flutter/material.dart';
import '../constants/theme.dart';
import 'tabs/today_tab.dart';
import 'tabs/habits_tab.dart';
import 'tabs/news_tab.dart';
import 'tabs/footprint_tab.dart';
import 'tabs/market_tab.dart';
import 'tabs/circle_tab.dart';
import 'assistant_modal.dart';
import 'privacy_screen.dart';
import 'language_screen.dart';
import 'image_studio_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  final String userLanguage;
  final VoidCallback onLanguageChangeRequested;

  const MainNavigationScreen({
    super.key,
    required this.userLanguage,
    required this.onLanguageChangeRequested,
  });

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;
  int _givingScore = 38; // Initial sample score (out of 54)
  int _lightnessScore = 32; // Initial sample score (out of 54)

  void _openAssistant() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => AssistantModal(userLanguage: widget.userLanguage),
    );
  }

  @override
  Widget build(BuildContext context) {
    final tabs = [
      TodayTab(
        givingScore: _givingScore,
        lightnessScore: _lightnessScore,
        userLanguage: widget.userLanguage,
        onLogActTap: () => setState(() => _currentIndex = 3), // Switch to Footprint tab
        onOpenAssistant: _openAssistant,
      ),
      HabitsTab(
        onHabitCompleted: (pts) => setState(() => _givingScore = (_givingScore + pts).clamp(0, 54)),
      ),
      const NewsTab(),
      FootprintTab(
        givingScore: _givingScore,
        lightnessScore: _lightnessScore,
        onGivingUpdated: (val) => setState(() => _givingScore = val),
        onLightnessUpdated: (val) => setState(() => _lightnessScore = val),
      ),
      const MarketTab(),
      const CircleTab(),
    ];

    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      drawer: Drawer(
        backgroundColor: PrakritiColors.paper,
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: const BoxDecoration(
                color: PrakritiColors.leaf,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  const Text(
                    'प्रकृति · PRAKRITI',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                      fontFamily: 'serif',
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Jeevo paramo dharma',
                    style: TextStyle(color: PrakritiColors.mossTint, fontSize: 13, fontStyle: FontStyle.italic),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    'Language: ${widget.userLanguage.toUpperCase()}',
                    style: const TextStyle(color: Colors.white70, fontSize: 11),
                  ),
                ],
              ),
            ),
            ListTile(
              leading: const Icon(Icons.language, color: PrakritiColors.leaf),
              title: const Text('Change Language'),
              onTap: () {
                Navigator.pop(context);
                widget.onLanguageChangeRequested();
              },
            ),
            ListTile(
              leading: const Icon(Icons.auto_awesome, color: PrakritiColors.leaf),
              title: const Text('Gemini AI Eco Studio'),
              subtitle: const Text('Image creation & editing (1K, 2K, 4K)'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(context, MaterialPageRoute(builder: (_) => const ImageStudioScreen()));
              },
            ),
            ListTile(
              leading: const Icon(Icons.privacy_tip_outlined, color: PrakritiColors.leaf),
              title: const Text('Privacy & Export Data'),
              subtitle: const Text('5 Protections, XChaCha20 vault'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(context, MaterialPageRoute(builder: (_) => const PrivacyScreen()));
              },
            ),
            const Divider(),
            const Padding(
              padding: EdgeInsets.all(16),
              child: Text(
                'Prakriti Mobile v1.0.0\nBuilt for Android & iOS',
                style: TextStyle(fontSize: 11, color: PrakritiColors.inkFaint),
              ),
            ),
          ],
        ),
      ),
      body: tabs[_currentIndex],
      // Bottom Bar with 5 tabs and raised center mic
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(top: BorderSide(color: PrakritiColors.line, width: 1)),
        ),
        child: SafeArea(
          child: SizedBox(
            height: 64,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(0, Icons.eco_outlined, Icons.eco, 'Today'),
                _buildNavItem(1, Icons.repeat, Icons.repeat, 'Habits'),
                // Center Raised Mic (Assistant)
                GestureDetector(
                  onTap: _openAssistant,
                  child: Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: PrakritiColors.leaf,
                      boxShadow: [
                        BoxShadow(
                          color: PrakritiColors.leaf.withOpacity(0.35),
                          blurRadius: 8,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                    child: const Icon(Icons.mic, color: Colors.white, size: 24),
                  ),
                ),
                _buildNavItem(2, Icons.newspaper_outlined, Icons.newspaper, 'News'),
                _buildNavItem(4, Icons.storefront_outlined, Icons.storefront, 'Market'),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData outlineIcon, IconData filledIcon, String label) {
    final isSelected = _currentIndex == index;
    return InkWell(
      onTap: () => setState(() => _currentIndex = index),
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              isSelected ? filledIcon : outlineIcon,
              color: isSelected ? PrakritiColors.leaf : PrakritiColors.inkFaint,
              size: 22,
            ),
            const SizedBox(height: 3),
            Text(
              label,
              style: TextStyle(
                fontSize: 10,
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                color: isSelected ? PrakritiColors.leaf : PrakritiColors.inkFaint,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
