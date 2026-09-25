import 'package:flutter/material.dart';
import '../constants/theme.dart';

class SellerOnboardingScreen extends StatefulWidget {
  const SellerOnboardingScreen({super.key});

  @override
  State<SellerOnboardingScreen> createState() => _SellerOnboardingScreenState();
}

class _SellerOnboardingScreenState extends State<SellerOnboardingScreen> {
  int _step = 0;
  bool _hasGovCert = false;
  bool _hasGroupCert = false;
  String _farmName = '';
  String _certNumber = '';

  final TextEditingController _textCtrl = TextEditingController();

  void _answerYes() {
    if (_step == 0) {
      setState(() {
        _hasGovCert = true;
        _step = 2; // Ask farm name then cert number
      });
    } else if (_step == 1) {
      setState(() {
        _hasGroupCert = true;
        _step = 2; // Ask farm name
      });
    }
  }

  void _answerNo() {
    if (_step == 0) {
      setState(() {
        _hasGovCert = false;
        _step = 1; // Ask if part of farmer group
      });
    } else if (_step == 1) {
      setState(() {
        _hasGroupCert = false;
        _step = 2; // Ask farm name then explain neighbour vouching
      });
    }
  }

  void _submitFarmName() {
    if (_textCtrl.text.trim().isNotEmpty) {
      setState(() {
        _farmName = _textCtrl.text.trim();
        _textCtrl.clear();
        if (_hasGovCert || _hasGroupCert) {
          _step = 3; // ask cert number
        } else {
          _step = 4; // neighbour vouching conclusion
        }
      });
    }
  }

  void _submitCertNumber() {
    setState(() {
      _certNumber = _textCtrl.text.trim();
      _step = 4; // done
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      appBar: AppBar(
        title: const Text('Sell on Prakriti · किसान पंजीकरण', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 16),
              // Spoken conversation indicator
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.volume_up, color: PrakritiColors.leaf, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    'Question ${_step + 1} of 4',
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: PrakritiColors.leaf),
                  ),
                ],
              ),
              const SizedBox(height: 30),

              // Question Area
              Expanded(
                child: Center(
                  child: SingleChildScrollView(
                    child: _buildCurrentQuestion(),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCurrentQuestion() {
    if (_step == 0) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text(
            'Do you have an organic certificate from the government board?',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: PrakritiColors.ink, height: 1.3),
          ),
          const SizedBox(height: 10),
          const Text(
            'क्या आपके पास सरकारी बोर्ड से जैविक प्रमाणपत्र है?',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 16, color: PrakritiColors.inkSoft),
          ),
          const SizedBox(height: 40),
          _buildYesNoButtons(),
        ],
      );
    } else if (_step == 1) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text(
            'Are you part of a farmer group that checks each other\'s fields?',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: PrakritiColors.ink, height: 1.3),
          ),
          const SizedBox(height: 10),
          const Text(
            'क्या आप किसी किसान समूह का हिस्सा हैं जो एक-दूसरे के खेतों की जांच करता है?',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 16, color: PrakritiColors.inkSoft),
          ),
          const SizedBox(height: 40),
          _buildYesNoButtons(),
        ],
      );
    } else if (_step == 2) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text(
            'What is your farm called?',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
          ),
          const SizedBox(height: 10),
          const Text(
            'आपके खेत का क्या नाम है?',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 16, color: PrakritiColors.inkSoft),
          ),
          const SizedBox(height: 24),
          TextField(
            controller: _textCtrl,
            decoration: const InputDecoration(
              hintText: 'e.g. Surabhi Natural Farm',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: _submitFarmName,
              child: const Text('Next · आगे बढ़ें'),
            ),
          ),
        ],
      );
    } else if (_step == 3) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text(
            'Please enter your Certificate Number',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
          ),
          const SizedBox(height: 10),
          const Text(
            'प्रमाणपत्र संख्या दर्ज करें (हम इसे आधिकारिक पोर्टल से सत्यापित करेंगे)',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 14, color: PrakritiColors.inkSoft),
          ),
          const SizedBox(height: 24),
          TextField(
            controller: _textCtrl,
            decoration: const InputDecoration(
              hintText: 'e.g. ORG/2026/IND/4921',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: _submitCertNumber,
              child: const Text('Verify & Submit'),
            ),
          ),
        ],
      );
    } else {
      // Step 4: Honest Tier Assignment & Neighbour Vouching Message
      final hasCert = _hasGovCert || _hasGroupCert;
      return Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            hasCert ? Icons.check_circle : Icons.handshake,
            color: PrakritiColors.leaf,
            size: 60,
          ),
          const SizedBox(height: 16),
          Text(
            hasCert
                ? 'Welcome, $_farmName!'
                : 'That is fine, $_farmName.',
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
          ),
          const SizedBox(height: 12),
          Text(
            hasCert
                ? 'Your certificate will be checked by our team against the official registry. Your products will be marked as certified.'
                : 'That is fine. Your neighbours can vouch for you, and we will help you get certified with a local farmer group for free later.',
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 15, color: PrakritiColors.inkSoft, height: 1.4),
          ),
          const SizedBox(height: 30),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Return to Market'),
            ),
          ),
        ],
      );
    }
  }

  Widget _buildYesNoButtons() {
    return Row(
      children: [
        Expanded(
          child: SizedBox(
            height: 60,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: PrakritiColors.leaf),
              onPressed: _answerYes,
              child: const Text('Yes · हाँ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
            ),
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: SizedBox(
            height: 60,
            child: OutlinedButton(
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: PrakritiColors.line, width: 2),
              ),
              onPressed: _answerNo,
              child: const Text('No · नहीं', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: PrakritiColors.ink)),
            ),
          ),
        ),
      ],
    );
  }
}
