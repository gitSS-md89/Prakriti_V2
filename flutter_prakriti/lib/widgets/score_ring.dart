import 'dart:math';
import 'package:flutter/material.dart';
import '../constants/theme.dart';

class ScoreRing extends StatelessWidget {
  final int givingScore;    // 0 to 54 (Given back to life - outer arc)
  final int lightnessScore; // 0 to 54 (Lived lightly - inner arc)
  final double size;

  const ScoreRing({
    super.key,
    required this.givingScore,
    required this.lightnessScore,
    this.size = 180,
  });

  int get totalScore => (givingScore.clamp(0, 54) + lightnessScore.clamp(0, 54));

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Prakriti Score $totalScore of 108. Given back to life $givingScore of 54. Lived lightly $lightnessScore of 54.',
      child: SizedBox(
        width: size,
        height: size,
        child: Stack(
          alignment: Alignment.center,
          children: [
            CustomPaint(
              size: Size(size, size),
              painter: _ScoreRingPainter(
                givingFraction: (givingScore.clamp(0, 54) / 54.0),
                lightnessFraction: (lightnessScore.clamp(0, 54) / 54.0),
              ),
            ),
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  '$totalScore',
                  style: const TextStyle(
                    fontSize: 44,
                    fontWeight: FontWeight.w800,
                    color: PrakritiColors.ink,
                    height: 1.0,
                  ),
                ),
                const SizedBox(height: 2),
                const Text(
                  'OF 108',
                  style: TextStyle(
                    fontSize: 11,
                    letterSpacing: 1.5,
                    fontWeight: FontWeight.w700,
                    color: PrakritiColors.inkFaint,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _ScoreRingPainter extends CustomPainter {
  final double givingFraction;
  final double lightnessFraction;

  _ScoreRingPainter({
    required this.givingFraction,
    required this.lightnessFraction,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final outerRadius = size.width / 2 - 10;
    final innerRadius = size.width / 2 - 24;

    const startAngle = -pi / 2; // top center

    // Outer Track (Given back to life track)
    final outerTrackPaint = Paint()
      ..color = PrakritiColors.mossTint
      ..style = PaintingStyle.stroke
      ..strokeWidth = 10
      ..strokeCap = StrokeCap.round;
    canvas.drawCircle(center, outerRadius, outerTrackPaint);

    // Outer Arc (Leaf green: Given back to life)
    if (givingFraction > 0) {
      final outerArcPaint = Paint()
        ..color = PrakritiColors.leaf
        ..style = PaintingStyle.stroke
        ..strokeWidth = 10
        ..strokeCap = StrokeCap.round;
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: outerRadius),
        startAngle,
        2 * pi * givingFraction,
        false,
        outerArcPaint,
      );
    }

    // Inner Track (Lived lightly track)
    final innerTrackPaint = Paint()
      ..color = PrakritiColors.haldiTint
      ..style = PaintingStyle.stroke
      ..strokeWidth = 10
      ..strokeCap = StrokeCap.round;
    canvas.drawCircle(center, innerRadius, innerTrackPaint);

    // Inner Arc (Haldi amber: Lived lightly)
    if (lightnessFraction > 0) {
      final innerArcPaint = Paint()
        ..color = PrakritiColors.haldi
        ..style = PaintingStyle.stroke
        ..strokeWidth = 10
        ..strokeCap = StrokeCap.round;
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: innerRadius),
        startAngle,
        2 * pi * lightnessFraction,
        false,
        innerArcPaint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _ScoreRingPainter oldDelegate) {
    return oldDelegate.givingFraction != givingFraction ||
        oldDelegate.lightnessFraction != lightnessFraction;
  }
}
