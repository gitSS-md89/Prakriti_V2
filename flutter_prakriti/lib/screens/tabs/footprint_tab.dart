import 'package:flutter/material.dart';
import '../../constants/theme.dart';
import '../../models/models.dart';

class FootprintTab extends StatefulWidget {
  final int givingScore;
  final int lightnessScore;
  final Function(int) onGivingUpdated;
  final Function(int) onLightnessUpdated;

  const FootprintTab({
    super.key,
    required this.givingScore,
    required this.lightnessScore,
    required this.onGivingUpdated,
    required this.onLightnessUpdated,
  });

  @override
  State<FootprintTab> createState() => _FootprintTabState();
}

class _FootprintTabState extends State<FootprintTab> {
  int _activeTab = 0; // 0: Given Back (leads!), 1: Cost Categories

  // The 7 Acts of Giving as detailed in ARCHITECTURE.md §11 & DESIGN.md §6
  final List<GivingAct> _givingActs = const [
    GivingAct(
      id: 'give-1',
      title: 'Planted a Tree or Plant',
      description: 'Put indigenous sapling, herb, or flowering plant in ground.',
      points: 8,
      iconName: 'forest',
    ),
    GivingAct(
      id: 'give-2',
      title: 'Fed the Soil Without Chemicals',
      description: 'Added organic compost, biochar, or mulched earth.',
      points: 8,
      iconName: 'grass',
    ),
    GivingAct(
      id: 'give-3',
      title: 'Ate or Grew Without Poison',
      description: 'Grew or purchased 100% pesticide-free produce.',
      points: 8,
      iconName: 'eco',
    ),
    GivingAct(
      id: 'give-4',
      title: 'Left Bees & Birds Undisturbed',
      description: 'Provided water bowl or planted wild bee-friendly flowers.',
      points: 6,
      iconName: 'flutter_dash',
    ),
    GivingAct(
      id: 'give-5',
      title: 'Saved or Harvested Water',
      description: 'Collected rainwater or reused clean greywater on garden.',
      points: 8,
      iconName: 'water_drop',
    ),
    GivingAct(
      id: 'give-6',
      title: 'Fed or Sheltered a Living Creature',
      description: 'Nourished local stray animals, birds, or farm cows.',
      points: 8,
      iconName: 'pets',
    ),
    GivingAct(
      id: 'give-7',
      title: 'Shared Native Seeds or Saplings',
      description: 'Distributed desi non-GMO seeds with neighbors.',
      points: 8,
      iconName: 'share',
    ),
  ];

  final List<CostActivity> _costActivities = const [
    CostActivity(
      id: 'cost-1',
      category: 'Travel',
      label: 'Two-Wheeler / Motorbike',
      emissionFactor: 0.045,
      unit: 'km',
    ),
    CostActivity(
      id: 'cost-2',
      category: 'Travel',
      label: 'Petrol / Diesel Car',
      emissionFactor: 0.170,
      unit: 'km',
    ),
    CostActivity(
      id: 'cost-3',
      category: 'Energy',
      label: 'Grid Electricity (CEA grid)',
      emissionFactor: 0.716,
      unit: 'kWh',
    ),
    CostActivity(
      id: 'cost-4',
      category: 'Food',
      label: 'Processed / Packaging Heavy Meal',
      emissionFactor: 1.80,
      unit: 'meal',
    ),
    CostActivity(
      id: 'cost-5',
      category: 'Waste',
      label: 'Single-Use Mixed Waste',
      emissionFactor: 0.50,
      unit: 'kg',
    ),
  ];

  final List<LoggedActivity> _loggedEntries = [];
  final Map<String, double> _costQuantities = {
    'cost-1': 10.0,
    'cost-2': 15.0,
    'cost-3': 5.0,
    'cost-4': 1.0,
    'cost-5': 1.0,
  };

  void _logGiving(GivingAct act) {
    setState(() {
      final newScore = (widget.givingScore + act.points).clamp(0, 54);
      widget.onGivingUpdated(newScore);
      _loggedEntries.insert(
        0,
        LoggedActivity(
          id: 'log-${DateTime.now().millisecondsSinceEpoch}',
          name: act.title,
          amount: 1,
          unit: 'act (+${act.points} pts)',
          co2Kg: 0,
          loggedAt: DateTime.now(),
        ),
      );
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Logged: ${act.title}. Giving stays!'),
        backgroundColor: PrakritiColors.leaf,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _logCost(CostActivity cost) {
    final qty = _costQuantities[cost.id] ?? 1.0;
    final co2 = qty * cost.emissionFactor;
    setState(() {
      // 6.3 kg CO2e is daily standard budget in design document
      // Deduct from 54 lightness points gently
      final ptsToDeduct = (co2 * 3).round();
      final newScore = (widget.lightnessScore - ptsToDeduct).clamp(10, 54);
      widget.onLightnessUpdated(newScore);

      _loggedEntries.insert(
        0,
        LoggedActivity(
          id: 'log-${DateTime.now().millisecondsSinceEpoch}',
          name: cost.label,
          amount: qty,
          unit: '${cost.unit} (${co2.toStringAsFixed(2)} kg CO2e)',
          co2Kg: co2,
          loggedAt: DateTime.now(),
        ),
      );
    });
  }

  void _removeEntry(int index) {
    setState(() {
      _loggedEntries.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    // Architectural verdict line logic
    final hasGiving = widget.givingScore > 0;
    final verdict = hasGiving
        ? 'You gave something back today. That stays.'
        : 'Tomorrow, one small act of giving is enough to begin.';

    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      appBar: AppBar(
        title: const Text('108 Footprint & Giving', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Giving Leads Verdict Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: hasGiving ? PrakritiColors.mossTint : PrakritiColors.haldiTint,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: hasGiving ? PrakritiColors.leaf : PrakritiColors.haldi),
              ),
              child: Row(
                children: [
                  Icon(
                    hasGiving ? Icons.spa_outlined : Icons.wb_twilight,
                    color: hasGiving ? PrakritiColors.leaf : PrakritiColors.soil,
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      verdict,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: hasGiving ? PrakritiColors.leaf : PrakritiColors.soil,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Segmented toggle: Giving leads (first tab)!
            Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: PrakritiColors.mist,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: InkWell(
                      onTap: () => setState(() => _activeTab = 0),
                      borderRadius: BorderRadius.circular(10),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: _activeTab == 0 ? Colors.white : Colors.transparent,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: _activeTab == 0
                              ? [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4)]
                              : null,
                        ),
                        child: Center(
                          child: Text(
                            'Given Back (${widget.givingScore}/54)',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                              color: _activeTab == 0 ? PrakritiColors.leaf : PrakritiColors.inkSoft,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: InkWell(
                      onTap: () => setState(() => _activeTab = 1),
                      borderRadius: BorderRadius.circular(10),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: _activeTab == 1 ? Colors.white : Colors.transparent,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: _activeTab == 1
                              ? [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4)]
                              : null,
                        ),
                        child: Center(
                          child: Text(
                            'Cost Tracker (${widget.lightnessScore}/54)',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                              color: _activeTab == 1 ? PrakritiColors.haldi : PrakritiColors.inkSoft,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Tab 0: Giving Back Acts
            if (_activeTab == 0) ...[
              const Text(
                '7 Acts of Giving Back to Nature',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
              ),
              const SizedBox(height: 4),
              const Text(
                'Giving leads the score and is never cancelled by cost. 24 life points fills your half.',
                style: TextStyle(fontSize: 12, color: PrakritiColors.inkFaint),
              ),
              const SizedBox(height: 12),
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _givingActs.length,
                separatorBuilder: (_, __) => const SizedBox(height: 10),
                itemBuilder: (context, index) {
                  final act = _givingActs[index];
                  return Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: PrakritiColors.line),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 38,
                          height: 38,
                          decoration: BoxDecoration(
                            color: PrakritiColors.mossTint,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Icon(Icons.eco, color: PrakritiColors.leaf, size: 20),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                act.title,
                                style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: PrakritiColors.ink),
                              ),
                              Text(
                                act.description,
                                style: const TextStyle(fontSize: 11, color: PrakritiColors.inkSoft),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        ElevatedButton(
                          onPressed: () => _logGiving(act),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: PrakritiColors.leaf,
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            minimumSize: Size.zero,
                          ),
                          child: Text('+${act.points} pts', style: const TextStyle(fontSize: 12)),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ] else ...[
              // Tab 1: Cost Categories
              const Text(
                'Daily Activities & Resource Cost',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
              ),
              const SizedBox(height: 4),
              const Text(
                'Carbon figures are indicative averages from national emission factor tables.',
                style: TextStyle(fontSize: 12, color: PrakritiColors.inkFaint),
              ),
              const SizedBox(height: 12),
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _costActivities.length,
                separatorBuilder: (_, __) => const SizedBox(height: 10),
                itemBuilder: (context, index) {
                  final cost = _costActivities[index];
                  final currentQty = _costQuantities[cost.id] ?? 1.0;

                  return Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: PrakritiColors.line),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              cost.label,
                              style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: PrakritiColors.ink),
                            ),
                            Text(
                              '${cost.emissionFactor} kg CO2e/${cost.unit}',
                              style: const TextStyle(fontSize: 11, color: PrakritiColors.inkFaint),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.remove_circle_outline, size: 20),
                              onPressed: () {
                                if (currentQty > 1) {
                                  setState(() => _costQuantities[cost.id] = currentQty - 1);
                                }
                              },
                            ),
                            Text(
                              '${currentQty.toInt()} ${cost.unit}',
                              style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13),
                            ),
                            IconButton(
                              icon: const Icon(Icons.add_circle_outline, size: 20),
                              onPressed: () {
                                setState(() => _costQuantities[cost.id] = currentQty + 1);
                              },
                            ),
                            const Spacer(),
                            ElevatedButton(
                              onPressed: () => _logCost(cost),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: PrakritiColors.haldi,
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                                minimumSize: Size.zero,
                              ),
                              child: const Text('Log', style: TextStyle(fontSize: 12)),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),
            ],

            const SizedBox(height: 24),

            // Today's Logged Entries List (Removable)
            if (_loggedEntries.isNotEmpty) ...[
              const Text(
                'Today\'s Entries',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
              ),
              const SizedBox(height: 8),
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _loggedEntries.length,
                itemBuilder: (context, index) {
                  final entry = _loggedEntries[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 8),
                    child: ListTile(
                      dense: true,
                      title: Text(entry.name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                      subtitle: Text(entry.unit, style: const TextStyle(fontSize: 11, color: PrakritiColors.inkFaint)),
                      trailing: IconButton(
                        icon: const Icon(Icons.close, size: 16, color: PrakritiColors.inkFaint),
                        onPressed: () => _removeEntry(index),
                      ),
                    ),
                  );
                },
              ),
            ],
            const SizedBox(height: 30),
          ],
        ),
      ),
    );
  }
}
