import 'package:flutter/material.dart';
import '../constants/languages.dart';
import '../constants/theme.dart';
import '../services/vault_service.dart';

class LanguageScreen extends StatefulWidget {
  final VoidCallback onLanguageSelected;

  const LanguageScreen({super.key, required this.onLanguageSelected});

  @override
  State<LanguageScreen> createState() => _LanguageScreenState();
}

class _LanguageScreenState extends State<LanguageScreen> {
  String _selectedLang = 'en';

  void _chooseLanguage(LanguageItem item) async {
    setState(() {
      _selectedLang = item.code;
    });
    await VaultService.setPreferredLanguage(item.code);

    if (!mounted) return;
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 28),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 44,
                height: 4,
                decoration: BoxDecoration(
                  color: PrakritiColors.line,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 20),
              Text(
                item.nativeName,
                style: const TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w700,
                  color: PrakritiColors.ink,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                item.greetingSample,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 16,
                  color: PrakritiColors.inkSoft,
                  height: 1.4,
                ),
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context);
                    widget.onLanguageSelected();
                  },
                  child: const Text('Continue · आगे बढ़ें'),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 24),
              const Text(
                'PRAKRITI · प्रकृति',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 2.0,
                  color: PrakritiColors.moss,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Choose your language\nअपनी भाषा चुनें',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w700,
                  color: PrakritiColors.ink,
                  height: 1.2,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Prakriti speaks with you in your chosen tongue.',
                style: TextStyle(
                  fontSize: 14,
                  color: PrakritiColors.inkFaint,
                ),
              ),
              const SizedBox(height: 24),
              Expanded(
                child: GridView.builder(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 1.8,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                  ),
                  itemCount: PrakritiLanguages.supportedLanguages.length,
                  itemBuilder: (context, index) {
                    final item = PrakritiLanguages.supportedLanguages[index];
                    final isSelected = _selectedLang == item.code;
                    return InkWell(
                      onTap: () => _chooseLanguage(item),
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: isSelected ? PrakritiColors.mossTint : Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isSelected ? PrakritiColors.leaf : PrakritiColors.line,
                            width: isSelected ? 2 : 1,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              item.nativeName,
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w700,
                                color: isSelected ? PrakritiColors.leaf : PrakritiColors.ink,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              item.englishName,
                              style: const TextStyle(
                                fontSize: 12,
                                color: PrakritiColors.inkFaint,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
