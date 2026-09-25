import 'package:flutter/material.dart';

/// Prakriti Peacock Feather (मयूर पंख) Design System Tokens
/// Inspired by Shri Krishna's sacred peacock crown and the divine interplay
/// between Raadha (radiant daylight) and Krishna (celestial twilight).
class PeacockColors {
  // --- RAADHA MODE (Light Mode - Morning Feather Radiance) ---
  // Background: Luminous silk feather cream
  static const Color radhaPaper = Color(0xFFF6FAF7);
  static const Color radhaCard = Color(0xFFFFFFFF);
  static const Color radhaMist = Color(0xFFEDF5F1);
  // Mayur Kanth: Deep radiant turquoise/teal peacock throat
  static const Color radhaKanthTeal = Color(0xFF097770);
  static const Color radhaKanthDeep = Color(0xFF065A54);
  // Chandrika: Golden amber eye of the peacock feather
  static const Color radhaChandrikaGold = Color(0xFFC58F1B);
  static const Color radhaChandrikaTint = Color(0xFFFDF5E2);
  // Plumes: Rich living emerald
  static const Color radhaEmeraldBarb = Color(0xFF1A5F44);
  static const Color radhaMossTint = Color(0xFFDCEEE5);
  // Quill lines and dividers
  static const Color radhaLine = Color(0xFFD2E3DB);
  // Text: Deep indigo feather ink
  static const Color radhaInk = Color(0xFF0C1F1B);
  static const Color radhaInkSoft = Color(0xFF3E564F);
  static const Color radhaInkFaint = Color(0xFF6C837C);

  // --- KRISHNA MODE (Dark Mode - Iridescent Midnight Plumes) ---
  // Background: Deep celestial peacock midnight
  static const Color krishnaNight = Color(0xFF07131B);
  static const Color krishnaCard = Color(0xFF0D212E);
  static const Color krishnaCardRaised = Color(0xFF142C3C);
  // Mayur Kanth: Electric iridescent peacock cyan/teal glow
  static const Color krishnaKanthCyan = Color(0xFF00DFB6);
  static const Color krishnaKanthTeal = Color(0xFF00C29F);
  // Chandrika: Radiant divine gold eye ring
  static const Color krishnaChandrikaGold = Color(0xFFFFB800);
  static const Color krishnaChandrikaGlow = Color(0xFF4A3700);
  // Plumes: Glowing night emerald
  static const Color krishnaEmeraldBarb = Color(0xFF10B981);
  static const Color krishnaEmeraldGlow = Color(0xFF083226);
  // Shaft/Danda lines and borders
  static const Color krishnaLine = Color(0xFF1B3E52);
  // Text: Luminous feather fluff white
  static const Color krishnaInk = Color(0xFFEEF9F6);
  static const Color krishnaInkSoft = Color(0xFF9BC3B9);
  static const Color krishnaInkFaint = Color(0xFF5E857C);

  // Shared alert
  static const Color danger = Color(0xFFB3412F);
}

/// Backwards compatibility alias for original PrakritiColors
class PrakritiColors extends PeacockColors {
  static const Color leaf = PeacockColors.radhaKanthTeal;
  static const Color leafDeep = PeacockColors.radhaKanthDeep;
  static const Color moss = PeacockColors.radhaEmeraldBarb;
  static const Color mossTint = PeacockColors.radhaMossTint;
  static const Color haldi = PeacockColors.radhaChandrikaGold;
  static const Color haldiTint = PeacockColors.radhaChandrikaTint;
  static const Color soil = Color(0xFF6B4431);
  static const Color mist = PeacockColors.radhaMist;
  static const Color paper = PeacockColors.radhaPaper;
  static const Color ink = PeacockColors.radhaInk;
  static const Color inkSoft = PeacockColors.radhaInkSoft;
  static const Color inkFaint = PeacockColors.radhaInkFaint;
  static const Color line = PeacockColors.radhaLine;
}

class PrakritiTheme {
  /// RAADHA MODE (Light Mode - Daylight Grace & Sacred Flora)
  static ThemeData get radhaTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: PeacockColors.radhaPaper,
      colorScheme: const ColorScheme.light(
        primary: PeacockColors.radhaKanthTeal,
        secondary: PeacockColors.radhaChandrikaGold,
        tertiary: PeacockColors.radhaEmeraldBarb,
        surface: PeacockColors.radhaCard,
        error: PeacockColors.danger,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: PeacockColors.radhaInk,
      ),
      fontFamily: 'Manrope',
      appBarTheme: const AppBarTheme(
        backgroundColor: PeacockColors.radhaPaper,
        foregroundColor: PeacockColors.radhaInk,
        elevation: 0,
        centerTitle: false,
      ),
      cardTheme: CardTheme(
        color: PeacockColors.radhaCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: PeacockColors.radhaLine, width: 1),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: PeacockColors.radhaKanthTeal,
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

  /// KRISHNA MODE (Dark Mode - Iridescent Midnight Plumes & Celestial Blue)
  static ThemeData get krishnaTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: PeacockColors.krishnaNight,
      colorScheme: const ColorScheme.dark(
        primary: PeacockColors.krishnaKanthCyan,
        secondary: PeacockColors.krishnaChandrikaGold,
        tertiary: PeacockColors.krishnaEmeraldBarb,
        surface: PeacockColors.krishnaCard,
        error: PeacockColors.danger,
        onPrimary: PeacockColors.krishnaNight,
        onSecondary: PeacockColors.krishnaNight,
        onSurface: PeacockColors.krishnaInk,
      ),
      fontFamily: 'Manrope',
      appBarTheme: const AppBarTheme(
        backgroundColor: PeacockColors.krishnaNight,
        foregroundColor: PeacockColors.krishnaInk,
        elevation: 0,
        centerTitle: false,
      ),
      cardTheme: CardTheme(
        color: PeacockColors.krishnaCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: PeacockColors.krishnaLine, width: 1),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: PeacockColors.krishnaKanthCyan,
          foregroundColor: PeacockColors.krishnaNight,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(
            fontFamily: 'Manrope',
            fontWeight: FontWeight.w700,
            fontSize: 15,
          ),
        ),
      ),
    );
  }

  // Aliases for system integration
  static ThemeData get lightTheme => radhaTheme;
  static ThemeData get darkTheme => krishnaTheme;
}
