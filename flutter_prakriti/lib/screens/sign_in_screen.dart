import 'package:flutter/material.dart';
import '../constants/greetings.dart';
import '../constants/theme.dart';

class SignInScreen extends StatelessWidget {
  final VoidCallback onSignInComplete;

  const SignInScreen({super.key, required this.onSignInComplete});

  @override
  Widget build(BuildContext context) {
    final greeting = PrakritiGreetings.getGreeting();

    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      body: Column(
        children: [
          // Upper two-thirds: Current hour sky gradient
          Expanded(
            flex: 6,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 28),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: greeting.gradientColors,
                ),
                borderRadius: const BorderRadius.only(
                  bottomLeft: Radius.circular(40),
                  bottomRight: Radius.circular(40),
                ),
              ),
              child: SafeArea(
                bottom: false,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'PRAKRITI · प्रकृति',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 2.0,
                        color: greeting.subtextColor,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      greeting.devanagari,
                      style: TextStyle(
                        fontSize: 48,
                        fontWeight: FontWeight.w700,
                        color: greeting.textColor,
                        fontFamily: 'serif',
                        height: 1.1,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '${greeting.transliteration} — ${greeting.englishMeaning}',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                        color: greeting.subtextColor,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.25),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        'Jeevo paramo dharma · Life is the highest duty',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: greeting.textColor,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Lower third: Sign in options and one-line privacy notice
          Expanded(
            flex: 4,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Apple Sign In (first on iOS)
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: OutlinedButton.icon(
                      icon: const Icon(Icons.apple, color: PrakritiColors.ink, size: 24),
                      label: const Text(
                        'Continue with Apple',
                        style: TextStyle(
                          color: PrakritiColors.ink,
                          fontWeight: FontWeight.w600,
                          fontSize: 15,
                        ),
                      ),
                      style: OutlinedButton.styleFrom(
                        side: const BorderSide(color: PrakritiColors.line),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                      ),
                      onPressed: onSignInComplete,
                    ),
                  ),
                  const SizedBox(height: 12),
                  // Google Sign In
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.g_mobiledata, color: Colors.white, size: 28),
                      label: const Text(
                        'Continue with Google',
                        style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: PrakritiColors.leaf,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                      ),
                      onPressed: onSignInComplete,
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Demo mode direct entry
                  TextButton(
                    onPressed: onSignInComplete,
                    child: const Text(
                      'Explore in local demo mode →',
                      style: TextStyle(
                        color: PrakritiColors.moss,
                        fontWeight: FontWeight.w600,
                        fontSize: 13,
                      ),
                    ),
                  ),
                  const Spacer(),
                  // Architectural requirement: One-line privacy note
                  const Text(
                    'Your journal and footprint are encrypted on this phone.',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 12,
                      color: PrakritiColors.inkFaint,
                    ),
                  ),
                  const SizedBox(height: 8),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
