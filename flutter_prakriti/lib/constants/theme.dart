import 'package:flutter/material.dart';

/// Prakriti Design System Tokens
/// Defined in DESIGN.md from the Indian landscape palette
class PrakritiColors {
  // Primary giving arc, buttons, active states
  static const Color leaf = Color(0xFF1F5E3B);
  // Night sky, deep gradient stops
  static const Color leafDeep = Color(0xFF123A25);
  // Organic marks, secondary accents
  static const Color moss = Color(0xFF7A9A45);
  // Arc tracks, quiet fills
  static const Color mossTint = Color(0xFFE3EBD6);
  // Turmeric. The lightness arc, highlights, warmth
  static const Color haldi = Color(0xFFE3A018);
  // Inner arc track, warm surfaces
  static const Color haldiTint = Color(0xFFFBEFD2);
  // Earth notes, market and farmer contexts
  static const Color soil = Color(0xFF6B4431);
  // Section backgrounds
  static const Color mist = Color(0xFFEEF3EC);
  // Page background. Never pure white.
  static const Color paper = Color(0xFFFAFCF8);
  // Primary text. Green-black.
  static const Color ink = Color(0xFF17231D);
  // Secondary text
  static const Color inkSoft = Color(0xFF4A5A51);
  // Captions, units, quiet metadata
  static const Color inkFaint = Color(0xFF7F8E85);
  // Hairline rules and dividers
  static const Color line = Color(0xFFD6E0D3);
  // Only for genuine warnings
  static const Color danger = Color(0xFFB3412F);
}

class PrakritiTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: PrakritiColors.paper,
      colorScheme: const ColorScheme.light(
        primary: PrakritiColors.leaf,
        secondary: PrakritiColors.haldi,
        surface: PrakritiColors.paper,
        error: PrakritiColors.danger,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: PrakritiColors.ink,
      ),
      fontFamily: 'Manrope',
      appBarTheme: const AppBarTheme(
        backgroundColor: PrakritiColors.paper,
        foregroundColor: PrakritiColors.ink,
        elevation: 0,
        centerTitle: false,
      ),
      cardTheme: CardTheme(
        color: Colors.white,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: PrakritiColors.line, width: 1),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: PrakritiColors.leaf,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(
            fontFamily: 'Manrope',
            fontWeight: FontWeight.w600,
            fontSize: 15,
          ),
        ),
      ),
    );
  }
}
