import 'package:flutter/material.dart';

enum TimeOfDayPeriod {
  morning,   // 04:00 - 11:59: Supravatam (dawn peach into pale gold)
  midday,    // 12:00 - 15:59: Namaskar (bright open blue)
  evening,   // 16:00 - 19:59: Subhasandhya (amber into rose)
  night,     // 20:00 - 03:59: Subharatri (deep leaf into near-black)
}

class GreetingInfo {
  final String devanagari;
  final String transliteration;
  final String englishMeaning;
  final List<Color> gradientColors;
  final Color textColor;
  final Color subtextColor;

  const GreetingInfo({
    required this.devanagari,
    required this.transliteration,
    required this.englishMeaning,
    required this.gradientColors,
    required this.textColor,
    required this.subtextColor,
  });
}

class PrakritiGreetings {
  static TimeOfDayPeriod getCurrentPeriod([DateTime? time]) {
    final now = time ?? DateTime.now();
    final hour = now.hour;
    if (hour >= 4 && hour < 12) return TimeOfDayPeriod.morning;
    if (hour >= 12 && hour < 16) return TimeOfDayPeriod.midday;
    if (hour >= 16 && hour < 20) return TimeOfDayPeriod.evening;
    return TimeOfDayPeriod.night;
  }

  static GreetingInfo getGreeting([DateTime? time]) {
    final period = getCurrentPeriod(time);
    switch (period) {
      case TimeOfDayPeriod.morning:
        return const GreetingInfo(
          devanagari: 'सुप्रभातं',
          transliteration: 'Supravatam',
          englishMeaning: 'Good morning',
          gradientColors: [Color(0xFFFFDAB9), Color(0xFFFEE180)],
          textColor: Color(0xFF332014),
          subtextColor: Color(0xFF6B4431),
        );
      case TimeOfDayPeriod.midday:
        return const GreetingInfo(
          devanagari: 'नमस्कार',
          transliteration: 'Namaskar',
          englishMeaning: 'Greetings',
          gradientColors: [Color(0xFFBAE6FD), Color(0xFFE0F2FE)],
          textColor: Color(0xFF0C4A6E),
          subtextColor: Color(0xFF0369A1),
        );
      case TimeOfDayPeriod.evening:
        return const GreetingInfo(
          devanagari: 'शुभसन्ध्या',
          transliteration: 'Subhasandhya',
          englishMeaning: 'Good evening',
          gradientColors: [Color(0xFFFED7AA), Color(0xFFFDA4AF)],
          textColor: Color(0xFF4C1D18),
          subtextColor: Color(0xFF881337),
        );
      case TimeOfDayPeriod.night:
        return const GreetingInfo(
          devanagari: 'शुभरात्रि',
          transliteration: 'Subharatri',
          englishMeaning: 'Good night',
          gradientColors: [Color(0xFF123A25), Color(0xFF091710)],
          textColor: Color(0xFFE2E8F0),
          subtextColor: Color(0xFF94A3B8),
        );
    }
  }

  static String getLocalizedGreeting(String langCode, TimeOfDayPeriod period) {
    switch (langCode) {
      case 'hi':
        switch (period) {
          case TimeOfDayPeriod.morning: return 'शुभ प्रभात';
          case TimeOfDayPeriod.midday: return 'नमस्कार';
          case TimeOfDayPeriod.evening: return 'शुभ संध्या';
          case TimeOfDayPeriod.night: return 'शुभ रात्रि';
        }
      case 'bn':
        switch (period) {
          case TimeOfDayPeriod.morning: return 'সুপ্রভাত';
          case TimeOfDayPeriod.midday: return 'নমস্কার';
          case TimeOfDayPeriod.evening: return 'শুভ সন্ধ্যা';
          case TimeOfDayPeriod.night: return 'শুভ রাত্রি';
        }
      case 'mr':
        switch (period) {
          case TimeOfDayPeriod.morning: return 'शुभ सकाळ';
          case TimeOfDayPeriod.midday: return 'नमस्कार';
          case TimeOfDayPeriod.evening: return 'शुभ संध्याकाळ';
          case TimeOfDayPeriod.night: return 'शुभ रात्री';
        }
      case 'te':
        switch (period) {
          case TimeOfDayPeriod.morning: return 'శుభోదయం';
          case TimeOfDayPeriod.midday: return 'నమస్కారం';
          case TimeOfDayPeriod.evening: return 'శుభ సాయంత్రం';
          case TimeOfDayPeriod.night: return 'శుభరాత్రి';
        }
      case 'ta':
        switch (period) {
          case TimeOfDayPeriod.morning: return 'காலை வணக்கம்';
          case TimeOfDayPeriod.midday: return 'வணக்கம்';
          case TimeOfDayPeriod.evening: return 'மாலை வணக்கம்';
          case TimeOfDayPeriod.night: return 'இனிய இரவு';
        }
      case 'gu':
        switch (period) {
          case TimeOfDayPeriod.morning: return 'સુપ્રભાત';
          case TimeOfDayPeriod.midday: return 'નમસ્તે';
          case TimeOfDayPeriod.evening: return 'શુભ સંધ્યા';
          case TimeOfDayPeriod.night: return 'શુભ રાત્રિ';
        }
      case 'kn':
        switch (period) {
          case TimeOfDayPeriod.morning: return 'ಶುಭೋದಯ';
          case TimeOfDayPeriod.midday: return 'ನಮಸ್ಕಾರ';
          case TimeOfDayPeriod.evening: return 'ಶುಭ ಸಂಜೆ';
          case TimeOfDayPeriod.night: return 'ಶುಭ ರಾತ್ರಿ';
        }
      case 'ml':
        switch (period) {
          case TimeOfDayPeriod.morning: return 'സുപ്രഭാതം';
          case TimeOfDayPeriod.midday: return 'നമസ്കാരം';
          case TimeOfDayPeriod.evening: return 'ശുഭ സായാഹ്നം';
          case TimeOfDayPeriod.night: return 'ശുഭ രാത്രി';
        }
      case 'or':
        switch (period) {
          case TimeOfDayPeriod.morning: return 'ଶୁଭ ସକାଳ';
          case TimeOfDayPeriod.midday: return 'ନମସ୍କାର';
          case TimeOfDayPeriod.evening: return 'ଶୁଭ ସନ୍ଧ୍ୟା';
          case TimeOfDayPeriod.night: return 'ଶୁଭ ରାତ୍ରି';
        }
      case 'pa':
        switch (period) {
          case TimeOfDayPeriod.morning: return 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ';
          case TimeOfDayPeriod.midday: return 'ਨਮਸਕਾਰ';
          case TimeOfDayPeriod.evening: return 'ਸ਼ੁਭ ਸੰਧਿਆ';
          case TimeOfDayPeriod.night: return 'ਸ਼ੁਭ ਰਾਤ';
        }
      case 'as':
        switch (period) {
          case TimeOfDayPeriod.morning: return 'সুপ্ৰভাত';
          case TimeOfDayPeriod.midday: return 'নমস্কাৰ';
          case TimeOfDayPeriod.evening: return 'শুভ সন্ধিয়া';
          case TimeOfDayPeriod.night: return 'শুভ ৰাত্ৰি';
        }
      default:
        switch (period) {
          case TimeOfDayPeriod.morning: return 'Good morning';
          case TimeOfDayPeriod.midday: return 'Greetings';
          case TimeOfDayPeriod.evening: return 'Good evening';
          case TimeOfDayPeriod.night: return 'Good night';
        }
    }
  }
}
