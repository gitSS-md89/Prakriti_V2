class LanguageItem {
  final String code;
  final String nativeName;
  final String englishName;
  final String greetingSample;

  const LanguageItem({
    required this.code,
    required this.nativeName,
    required this.englishName,
    required this.greetingSample,
  });
}

class PrakritiLanguages {
  static const List<LanguageItem> supportedLanguages = [
    LanguageItem(
      code: 'en',
      nativeName: 'English',
      englishName: 'English',
      greetingSample: 'Prakriti will speak in English with you.',
    ),
    LanguageItem(
      code: 'hi',
      nativeName: 'हिन्दी',
      englishName: 'Hindi',
      greetingSample: 'प्रकृति अब आपसे हिन्दी में बात करेगी।',
    ),
    LanguageItem(
      code: 'bn',
      nativeName: 'বাংলা',
      englishName: 'Bengali',
      greetingSample: 'প্রকৃতি এখন আপনার সাথে বাংলায় কথা বলবে।',
    ),
    LanguageItem(
      code: 'mr',
      nativeName: 'मराठी',
      englishName: 'Marathi',
      greetingSample: 'प्रकृती आता तुमच्याशी मराठीत बोलेल.',
    ),
    LanguageItem(
      code: 'te',
      nativeName: 'తెలుగు',
      englishName: 'Telugu',
      greetingSample: 'ప్రకృతి ఇకపై మీతో తెలుగులో మాట్లాడుతుంది.',
    ),
    LanguageItem(
      code: 'ta',
      nativeName: 'தமிழ்',
      englishName: 'Tamil',
      greetingSample: 'பிரகிருதி உங்களுடன் தமிழில் பேசும்.',
    ),
    LanguageItem(
      code: 'gu',
      nativeName: 'ગુજરાતી',
      englishName: 'Gujarati',
      greetingSample: 'પ્રકૃતિ હવે તમારી સાથે ગુજરાતીમાં વાત કરશે.',
    ),
    LanguageItem(
      code: 'kn',
      nativeName: 'ಕನ್ನಡ',
      englishName: 'Kannada',
      greetingSample: 'ಪ್ರಕೃತಿ ಇನ್ನು ನಿಮ್ಮೊಂದಿಗೆ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತದೆ.',
    ),
    LanguageItem(
      code: 'ml',
      nativeName: 'മലയാളം',
      englishName: 'Malayalam',
      greetingSample: 'പ്രകൃതി ഇനി നിങ്ങളോട് മലയാളത്തിൽ സംസാരിക്കും.',
    ),
    LanguageItem(
      code: 'or',
      nativeName: 'ଓଡ଼ିଆ',
      englishName: 'Odia',
      greetingSample: 'ପ୍ରକୃତି ଏବେ ଆପଣଙ୍କ ସହିତ ଓଡ଼ିଆରେ କଥାବାର୍ତ୍ତା କରିବ।',
    ),
    LanguageItem(
      code: 'pa',
      nativeName: 'ਪੰਜਾਬੀ',
      englishName: 'Punjabi',
      greetingSample: 'ਪ੍ਰਕਿਰਤੀ ਹੁਣ ਤੁਹਾਡੇ ਨਾਲ ਪੰਜਾਬੀ ਵਿੱਚ ਗੱਲ ਕਰੇਗੀ।',
    ),
    LanguageItem(
      code: 'as',
      nativeName: 'অসমীয়া',
      englishName: 'Assamese',
      greetingSample: 'প্ৰকৃতিয়ে এতিয়া আপোনাৰ লগত অসমীয়াত কথা পাতিব।',
    ),
  ];
}
