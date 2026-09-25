import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../widgets/assistant_orb.dart';
import '../services/api_service.dart';

class AssistantModal extends StatefulWidget {
  final String userLanguage;

  const AssistantModal({super.key, required this.userLanguage});

  @override
  State<AssistantModal> createState() => _AssistantModalState();
}

class _AssistantModalState extends State<AssistantModal> {
  bool _isListening = false;
  String _userTranscript = '';
  String _assistantReply = 'Jeevo paramo dharma. I am Prakriti. Ask me about nature, indigenous trees, organic composting, or small daily acts for the earth.';
  String? _smallStep;
  bool _isLoading = false;
  final TextEditingController _textController = TextEditingController();

  void _toggleMic() {
    setState(() {
      _isListening = !_isListening;
      if (_isListening) {
        _userTranscript = 'Listening... (e.g. "How can I prepare organic neem spray for pests?")';
      }
    });

    if (_isListening) {
      // Simulated spoken question after 2.5 seconds
      Future.delayed(const Duration(milliseconds: 2500), () {
        if (mounted && _isListening) {
          _sendQuestion('How can I prepare organic neem spray for pests?');
        }
      });
    }
  }

  void _sendQuestion(String query) async {
    setState(() {
      _isListening = false;
      _isLoading = true;
      _userTranscript = query;
    });

    final res = await ApiService.askAssistant(query, widget.userLanguage);

    if (mounted) {
      setState(() {
        _isLoading = false;
        _assistantReply = res['reply'] ?? '';
        _smallStep = res['smallStep'];
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      appBar: AppBar(
        title: const Text('Prakriti · प्रकृति Assistant', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                child: Column(
                  children: [
                    const SizedBox(height: 20),
                    // Breathing Orb
                    AssistantOrb(
                      isListening: _isListening,
                      size: 130,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      _isListening ? 'Listening with reverence...' : 'Tap the orb or type below',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: _isListening ? PrakritiColors.leaf : PrakritiColors.inkFaint,
                      ),
                    ),
                    const SizedBox(height: 24),

                    // User Transcript
                    if (_userTranscript.isNotEmpty) ...[
                      Align(
                        alignment: Alignment.centerRight,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          decoration: BoxDecoration(
                            color: PrakritiColors.mist,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Text(
                            _userTranscript,
                            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: PrakritiColors.ink),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                    ],

                    // Assistant Reply
                    if (_isLoading)
                      const Center(child: CircularProgressIndicator(color: PrakritiColors.leaf))
                    else
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
                            const Row(
                              children: [
                                Icon(Icons.spa, color: PrakritiColors.leaf, size: 16),
                                SizedBox(width: 6),
                                Text(
                                  'PRAKRITI SAYS',
                                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: PrakritiColors.leaf),
                                ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(
                              _assistantReply,
                              style: const TextStyle(fontSize: 14, color: PrakritiColors.ink, height: 1.5),
                            ),
                            if (_smallStep != null) ...[
                              const SizedBox(height: 12),
                              Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: PrakritiColors.mossTint,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Row(
                                  children: [
                                    const Icon(Icons.check_circle_outline, color: PrakritiColors.leaf, size: 18),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: Text(
                                        'Small Step: $_smallStep',
                                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: PrakritiColors.leaf),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ],
                        ),
                      ),
                  ],
                ),
              ),
            ),

            // Bottom typed fallback & mic trigger
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: const BoxDecoration(
                color: Colors.white,
                border: Border(top: BorderSide(color: PrakritiColors.line)),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _textController,
                      decoration: InputDecoration(
                        hintText: 'Type your question...',
                        hintStyle: const TextStyle(fontSize: 13, color: PrakritiColors.inkFaint),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                          borderSide: const BorderSide(color: PrakritiColors.line),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                          borderSide: const BorderSide(color: PrakritiColors.leaf),
                        ),
                      ),
                      onSubmitted: (val) {
                        if (val.trim().isNotEmpty) {
                          _sendQuestion(val.trim());
                          _textController.clear();
                        }
                      },
                    ),
                  ),
                  const SizedBox(width: 8),
                  IconButton(
                    icon: Icon(_isListening ? Icons.stop_circle : Icons.mic, color: PrakritiColors.leaf, size: 28),
                    onPressed: _toggleMic,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
