import 'package:flutter/material.dart';
import 'constants/theme.dart';
import 'screens/language_screen.dart';
import 'screens/sign_in_screen.dart';
import 'screens/main_navigation_screen.dart';
import 'services/vault_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const PrakritiApp());
}

class PrakritiApp extends StatefulWidget {
  const PrakritiApp({super.key});

  @override
  State<PrakritiApp> createState() => _PrakritiAppState();
}

class _PrakritiAppState extends State<PrakritiApp> {
  // Navigation is guarded: Language first, then sign-in, then app (ARCHITECTURE.md §2)
  int _appFlowStep = 0; // 0: Language, 1: Sign-in, 2: Main App
  String _userLanguage = 'en';

  @override
  void initState() {
    super.initState();
    _checkInitialState();
  }

  void _checkInitialState() async {
    final lang = await VaultService.getPreferredLanguage();
    setState(() {
      _userLanguage = lang;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Prakriti',
      debugShowCheckedModeBanner: false,
      theme: PrakritiTheme.lightTheme,
      home: _buildCurrentScreen(),
    );
  }

  Widget _buildCurrentScreen() {
    if (_appFlowStep == 0) {
      return LanguageScreen(
        onLanguageSelected: () async {
          final lang = await VaultService.getPreferredLanguage();
          setState(() {
            _userLanguage = lang;
            _appFlowStep = 1;
          });
        },
      );
    } else if (_appFlowStep == 1) {
      return SignInScreen(
        onSignInComplete: () {
          setState(() {
            _appFlowStep = 2;
          });
        },
      );
    } else {
      return MainNavigationScreen(
        userLanguage: _userLanguage,
        onLanguageChangeRequested: () {
          setState(() {
            _appFlowStep = 0;
          });
        },
      );
    }
  }
}
