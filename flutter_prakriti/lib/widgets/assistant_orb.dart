import 'package:flutter/material.dart';
import '../constants/theme.dart';

class AssistantOrb extends StatefulWidget {
  final bool isListening;
  final double size;

  const AssistantOrb({
    super.key,
    this.isListening = false,
    this.size = 120,
  });

  @override
  State<AssistantOrb> createState() => _AssistantOrbState();
}

class _AssistantOrbState extends State<AssistantOrb> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _glowAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4), // 4-second breathing cycle as specified in DESIGN.md
    )..repeat(reverse: true);

    _scaleAnimation = Tween<double>(begin: 0.92, end: 1.08).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    _glowAnimation = Tween<double>(begin: 10, end: 32).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final scale = widget.isListening ? _scaleAnimation.value : 1.0;
        final glow = widget.isListening ? _glowAnimation.value : 12.0;

        return Transform.scale(
          scale: scale,
          child: Container(
            width: widget.size,
            height: widget.size,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: const RadialGradient(
                center: Alignment(-0.2, -0.3),
                radius: 0.9,
                colors: [
                  Color(0xFF68D391),
                  PrakritiColors.leaf,
                  PrakritiColors.leafDeep,
                ],
              ),
              boxShadow: [
                BoxShadow(
                  color: PrakritiColors.leaf.withOpacity(widget.isListening ? 0.45 : 0.25),
                  blurRadius: glow,
                  spreadRadius: widget.isListening ? 6 : 2,
                ),
              ],
            ),
            child: const Center(
              child: Icon(
                Icons.mic_none_rounded,
                color: Colors.white,
                size: 40,
              ),
            ),
          ),
        );
      },
    );
  }
}
