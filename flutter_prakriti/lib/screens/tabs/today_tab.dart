import 'package:flutter/material.dart';
import '../../constants/theme.dart';
import '../../widgets/score_ring.dart';
import '../../widgets/sky_header.dart';
import '../../models/models.dart';
import '../wisdom_screen.dart';
import '../image_studio_screen.dart';

class TodayTab extends StatelessWidget {
  final int givingScore;
  final int lightnessScore;
  final String userLanguage;
  final VoidCallback onLogActTap;
  final VoidCallback onOpenAssistant;

  const TodayTab({
    super.key,
    required this.givingScore,
    required this.lightnessScore,
    required this.userLanguage,
    required this.onLogActTap,
    required this.onOpenAssistant,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Sky Header with Devanagari greeting
          SkyHeader(
            userLanguage: userLanguage,
            onWisdomTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const WisdomScreen()),
              );
            },
          ),

          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 108 Ring Card
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: PrakritiColors.line),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.02),
                        blurRadius: 10,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Row(
                    children: [
                      // Double concentric 108 ring
                      ScoreRing(
                        givingScore: givingScore,
                        lightnessScore: lightnessScore,
                        size: 140,
                      ),
                      const SizedBox(width: 20),
                      // Stats beside ring - Giving stays on top!
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'PRAKRITI 108',
                              style: TextStyle(
                                fontSize: 11,
                                letterSpacing: 1.2,
                                fontWeight: FontWeight.w700,
                                color: PrakritiColors.inkFaint,
                              ),
                            ),
                            const SizedBox(height: 8),
                            // Giving (Outer green arc)
                            Row(
                              children: [
                                Container(
                                  width: 10,
                                  height: 10,
                                  decoration: const BoxDecoration(
                                    color: PrakritiColors.leaf,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        '$givingScore of 54',
                                        style: const TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.w800,
                                          color: PrakritiColors.leaf,
                                        ),
                                      ),
                                      const Text(
                                        'Given back to life',
                                        style: TextStyle(
                                          fontSize: 11,
                                          color: PrakritiColors.inkSoft,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            // Lightness (Inner haldi arc)
                            Row(
                              children: [
                                Container(
                                  width: 10,
                                  height: 10,
                                  decoration: const BoxDecoration(
                                    color: PrakritiColors.haldi,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        '$lightnessScore of 54',
                                        style: const TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.w800,
                                          color: PrakritiColors.haldi,
                                        ),
                                      ),
                                      const Text(
                                        'Lived lightly today',
                                        style: TextStyle(
                                          fontSize: 11,
                                          color: PrakritiColors.inkSoft,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 14),
                            // Log act action
                            OutlinedButton.icon(
                              icon: const Icon(Icons.add_circle_outline, size: 16),
                              label: const Text('Log An Act', style: TextStyle(fontSize: 12)),
                              style: OutlinedButton.styleFrom(
                                foregroundColor: PrakritiColors.leaf,
                                side: const BorderSide(color: PrakritiColors.leaf),
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                minimumSize: Size.zero,
                              ),
                              onPressed: onLogActTap,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                // One Small Step For Today
                Container(
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: PrakritiColors.mist,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: PrakritiColors.line),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: PrakritiColors.leaf,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Text(
                              'DAILY STEP',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 10,
                                fontWeight: FontWeight.w700,
                                letterSpacing: 1.0,
                              ),
                            ),
                          ),
                          const Spacer(),
                          const Icon(Icons.wb_sunny_outlined, size: 18, color: PrakritiColors.moss),
                        ],
                      ),
                      const SizedBox(height: 10),
                      const Text(
                        'Feed soil before noon with organic vegetable scraps',
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w700,
                          color: PrakritiColors.ink,
                        ),
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        'Unprocessed kitchen peels enrich native earthworms and retain soil moisture in hot weather.',
                        style: TextStyle(
                          fontSize: 13,
                          color: PrakritiColors.inkSoft,
                          height: 1.3,
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                // Gemini AI Studio Quick Banner
                InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const ImageStudioScreen()),
                    );
                  },
                  borderRadius: BorderRadius.circular(20),
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFFE8F5E9), Color(0xFFC8E6C9)],
                      ),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: PrakritiColors.moss.withOpacity(0.3)),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            color: PrakritiColors.leaf,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Icon(Icons.auto_awesome, color: Colors.white, size: 22),
                        ),
                        const SizedBox(width: 14),
                        const Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Gemini AI Eco Studio',
                                style: TextStyle(
                                  fontWeight: FontWeight.w700,
                                  fontSize: 15,
                                  color: PrakritiColors.leafDeep,
                                ),
                              ),
                              Text(
                                'Create & edit images with 3.1 Flash & 3 Pro (1K, 2K, 4K)',
                                style: TextStyle(fontSize: 12, color: PrakritiColors.inkSoft),
                              ),
                            ],
                          ),
                        ),
                        const Icon(Icons.chevron_right, color: PrakritiColors.leaf),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 20),

                // Verse of the Day Card
                Container(
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: PrakritiColors.line),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'VERSE OF THE DAY · ATHARVA VEDA 12.1 (BHUMI SUKTA)',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 1.0,
                          color: PrakritiColors.soil,
                        ),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'माता भूमिः पुत्रो अहं पृथिव्याः',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                          color: PrakritiColors.ink,
                          fontFamily: 'serif',
                        ),
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        '"Earth is my mother, and I am her child."',
                        style: TextStyle(
                          fontSize: 13,
                          fontStyle: FontStyle.italic,
                          color: PrakritiColors.inkSoft,
                        ),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'Practice step: Treat every patch of soil you step on today as a living mother, keeping it free of plastic waste.',
                        style: TextStyle(
                          fontSize: 12,
                          color: PrakritiColors.leaf,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 24),

                // Motto at the foot of the page
                const Center(
                  child: Text(
                    'Jeevo paramo dharma · सर्वभूतहिते रताः',
                    style: TextStyle(
                      fontSize: 12,
                      fontStyle: FontStyle.italic,
                      color: PrakritiColors.inkFaint,
                    ),
                  ),
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
