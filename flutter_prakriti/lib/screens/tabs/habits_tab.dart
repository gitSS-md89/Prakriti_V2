import 'package:flutter/material.dart';
import '../../constants/theme.dart';

class HabitItem {
  final String id;
  final String title;
  final String hindiTitle;
  final String description;
  final int points;
  final IconData icon;
  int streak;
  bool completedToday;

  HabitItem({
    required this.id,
    required this.title,
    required this.hindiTitle,
    required this.description,
    required this.points,
    required this.icon,
    this.streak = 0,
    this.completedToday = false,
  });
}

class HabitsTab extends StatefulWidget {
  final Function(int points)? onHabitCompleted;

  const HabitsTab({super.key, this.onHabitCompleted});

  @override
  State<HabitsTab> createState() => _HabitsTabState();
}

class _HabitsTabState extends State<HabitsTab> {
  final List<HabitItem> _habits = [
    HabitItem(
      id: 'tulsi',
      title: 'Watering Tulsi',
      hindiTitle: 'तुलसी को जल अर्पण',
      description: 'Sacred morning offering; cleanses air and nurtures sacred herb.',
      points: 4,
      icon: Icons.spa,
      streak: 7,
      completedToday: true,
    ),
    HabitItem(
      id: 'composting',
      title: 'Kitchen Waste Composting',
      hindiTitle: 'रसोई गीला कचरा खाद',
      description: 'Segregate peels and moist scraps into earthen bio-pot.',
      points: 5,
      icon: Icons.recycling,
      streak: 12,
      completedToday: false,
    ),
    HabitItem(
      id: 'bird_water',
      title: 'Terracotta Water for Birds',
      hindiTitle: 'पक्षियों के लिए जल पात्र',
      description: 'Replenish cool clean water bowl under shade for sparrows & doves.',
      points: 3,
      icon: Icons.water_drop,
      streak: 5,
      completedToday: false,
    ),
    HabitItem(
      id: 'plastic_free',
      title: 'Zero Single-Use Plastic',
      hindiTitle: 'प्लास्टिक मुक्त दिन',
      description: 'Carried cloth bag and brass/copper water bottle when stepping out.',
      points: 4,
      icon: Icons.shopping_bag_outlined,
      streak: 19,
      completedToday: true,
    ),
    HabitItem(
      id: 'cow_feeding',
      title: 'First Roti to Gomata',
      hindiTitle: 'गौ ग्रास अर्पण',
      description: 'Offer the first wholesome flatbread with jaggery to native desi cow.',
      points: 5,
      icon: Icons.favorite_border,
      streak: 3,
      completedToday: false,
    ),
  ];

  final TextEditingController _customTitleCtrl = TextEditingController();
  final TextEditingController _customHindiCtrl = TextEditingController();

  void _toggleHabit(HabitItem habit) {
    setState(() {
      habit.completedToday = !habit.completedToday;
      if (habit.completedToday) {
        habit.streak += 1;
        widget.onHabitCompleted?.call(habit.points);
      } else {
        habit.streak = (habit.streak > 0) ? habit.streak - 1 : 0;
      }
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          habit.completedToday
              ? '${habit.title} completed! 🔥 Streak: ${habit.streak} days'
              : '${habit.title} unmarked',
        ),
        backgroundColor: PrakritiColors.leaf,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _addNewHabitModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: EdgeInsets.only(
            left: 20,
            right: 20,
            top: 20,
            bottom: MediaQuery.of(context).viewInsets.bottom + 20,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Add Ecological Habit',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _customTitleCtrl,
                decoration: const InputDecoration(
                  labelText: 'Habit Name (e.g. Drip Irrigation Check)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _customHindiCtrl,
                decoration: const InputDecoration(
                  labelText: 'Hindi or Regional Title (optional)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    if (_customTitleCtrl.text.trim().isNotEmpty) {
                      setState(() {
                        _habits.add(
                          HabitItem(
                            id: 'custom_${DateTime.now().millisecondsSinceEpoch}',
                            title: _customTitleCtrl.text.trim(),
                            hindiTitle: _customHindiCtrl.text.trim().isEmpty
                                ? 'प्राकृतिक नियम'
                                : _customHindiCtrl.text.trim(),
                            description: 'Daily recurring ecological duty in harmony with nature.',
                            points: 4,
                            icon: Icons.check_circle_outline,
                            streak: 0,
                            completedToday: false,
                          ),
                        );
                        _customTitleCtrl.clear();
                        _customHindiCtrl.clear();
                      });
                      Navigator.pop(context);
                    }
                  },
                  child: const Text('Add Habit · नियम जोड़ें'),
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
    final completedCount = _habits.where((h) => h.completedToday).length;
    final totalStreak = _habits.fold<int>(0, (sum, h) => sum + h.streak);

    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      appBar: AppBar(
        title: const Text(
          'Daily Eco Habits · नित्य कर्म',
          style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.add_circle_outline),
            onPressed: _addNewHabitModal,
            tooltip: 'Add Custom Habit',
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Streak Header Summary Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFFE8F5E9), Color(0xFFC8E6C9)],
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: PrakritiColors.leaf.withOpacity(0.2)),
              ),
              child: Row(
                children: [
                  Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                      color: PrakritiColors.leaf,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Center(
                      child: Text(
                        '🔥',
                        style: TextStyle(fontSize: 26),
                      ),
                    ),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '$completedCount of ${_habits.length} Completed Today',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w800,
                            color: PrakritiColors.leafDeep,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          'Total Eco Momentum: $totalStreak streak days logged',
                          style: const TextStyle(
                            fontSize: 12,
                            color: PrakritiColors.inkSoft,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 18),

            const Text(
              'Sacred & Ecological Recurring Rhythms',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w700,
                color: PrakritiColors.ink,
              ),
            ),
            const SizedBox(height: 4),
            const Text(
              'Habits performed daily without interruption build steady giving power towards nature.',
              style: TextStyle(fontSize: 12, color: PrakritiColors.inkFaint),
            ),

            const SizedBox(height: 12),

            // Habits List
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _habits.length,
              separatorBuilder: (_, __) => const SizedBox(height: 12),
              itemBuilder: (context, index) {
                final habit = _habits[index];
                return InkWell(
                  onTap: () => _toggleHabit(habit),
                  borderRadius: BorderRadius.circular(18),
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(
                        color: habit.completedToday ? PrakritiColors.leaf : PrakritiColors.line,
                        width: habit.completedToday ? 1.5 : 1,
                      ),
                      boxShadow: habit.completedToday
                          ? [
                              BoxShadow(
                                color: PrakritiColors.leaf.withOpacity(0.08),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              ),
                            ]
                          : null,
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            color: habit.completedToday
                                ? PrakritiColors.leaf
                                : PrakritiColors.mossTint,
                            borderRadius: BorderRadius.circular(14),
                          ),
                          child: Icon(
                            habit.icon,
                            color: habit.completedToday ? Colors.white : PrakritiColors.leaf,
                            size: 22,
                          ),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      habit.title,
                                      style: TextStyle(
                                        fontSize: 15,
                                        fontWeight: FontWeight.w700,
                                        color: habit.completedToday
                                            ? PrakritiColors.leafDeep
                                            : PrakritiColors.ink,
                                        decoration: habit.completedToday
                                            ? TextDecoration.lineThrough
                                            : null,
                                      ),
                                    ),
                                  ),
                                  // Streak badge
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 8,
                                      vertical: 3,
                                    ),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFFFF7ED),
                                      borderRadius: BorderRadius.circular(12),
                                      border: Border.all(
                                        color: const Color(0xFFFDBA74),
                                        width: 1,
                                      ),
                                    ),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        const Text('🔥', style: TextStyle(fontSize: 11)),
                                        const SizedBox(width: 3),
                                        Text(
                                          '${habit.streak} d',
                                          style: const TextStyle(
                                            fontSize: 11,
                                            fontWeight: FontWeight.w800,
                                            color: Color(0xFFC2410C),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 2),
                              Text(
                                habit.hindiTitle,
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w600,
                                  color: PrakritiColors.soil,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                habit.description,
                                style: const TextStyle(
                                  fontSize: 11,
                                  color: PrakritiColors.inkSoft,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Row(
                                children: [
                                  Text(
                                    '+${habit.points} Giving pts',
                                    style: const TextStyle(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w700,
                                      color: PrakritiColors.leaf,
                                    ),
                                  ),
                                  const Spacer(),
                                  Text(
                                    habit.completedToday ? 'Completed today ✓' : 'Tap to mark done',
                                    style: TextStyle(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w600,
                                      color: habit.completedToday
                                          ? PrakritiColors.leaf
                                          : PrakritiColors.inkFaint,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),

            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}
