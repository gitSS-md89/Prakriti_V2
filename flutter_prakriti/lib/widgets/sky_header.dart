import 'package:flutter/material.dart';
import '../constants/greetings.dart';
import '../constants/theme.dart';

class SkyHeader extends StatelessWidget {
  final String userLanguage;
  final VoidCallback? onLanguageTap;
  final VoidCallback? onWisdomTap;

  const SkyHeader({
    super.key,
    required this.userLanguage,
    this.onLanguageTap,
    this.onWisdomTap,
  });

  @override
  Widget build(BuildContext context) {
    final greeting = PrakritiGreetings.getGreeting();
    final period = PrakritiGreetings.getCurrentPeriod();
    final localized = PrakritiGreetings.getLocalizedGreeting(userLanguage, period);

    return Container(
      width: double.infinity,
      padding: EdgeInsets.only(
        top: MediaQuery.of(context).padding.top + 16,
        left: 20,
        right: 20,
        bottom: 24,
      ),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: greeting.gradientColors,
        ),
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(32),
          bottomRight: Radius.circular(32),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'PRAKRITI · प्रकृति',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 1.5,
                  color: greeting.subtextColor,
                ),
              ),
              Row(
                children: [
                  if (onWisdomTap != null)
                    IconButton(
                      icon: Icon(Icons.auto_stories_outlined, color: greeting.textColor, size: 20),
                      onPressed: onWisdomTap,
                      tooltip: 'Veda & Gita Wisdom',
                    ),
                  if (onLanguageTap != null)
                    InkWell(
                      onTap: onLanguageTap,
                      borderRadius: BorderRadius.circular(20),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          children: [
                            Icon(Icons.language, size: 14, color: greeting.textColor),
                            const SizedBox(width: 4),
                            Text(
                              userLanguage.toUpperCase(),
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w700,
                                color: greeting.textColor,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),
          // Devanagari Sanskrit greeting
          Text(
            greeting.devanagari,
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.w600,
              color: greeting.textColor,
              fontFamily: 'serif',
            ),
          ),
          // Transliteration & Localized Translation
          Row(
            children: [
              Text(
                greeting.transliteration,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: greeting.subtextColor,
                ),
              ),
              if (userLanguage != 'en') ...[
                Text(' · ', style: TextStyle(color: greeting.subtextColor)),
                Text(
                  localized,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    color: greeting.subtextColor,
                  ),
                ),
              ],
            ],
          ),
          const SizedBox(height: 12),
          Text(
            'Jeevo paramo dharma — Life itself is the highest duty',
            style: TextStyle(
              fontSize: 12,
              fontStyle: FontStyle.italic,
              color: greeting.subtextColor.withOpacity(0.9),
            ),
          ),
        ],
      ),
    );
  }
}
