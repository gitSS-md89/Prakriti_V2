import 'package:flutter/material.dart';
import '../../constants/theme.dart';
import '../../models/models.dart';
import '../seller_onboarding_screen.dart';

class MarketTab extends StatefulWidget {
  const MarketTab({super.key});

  @override
  State<MarketTab> createState() => _MarketTabState();
}

class _MarketTabState extends State<MarketTab> {
  String _filter = 'Nearest'; // Nearest, Within 20 km, Most trusted

  final List<MarketProduct> _products = const [
    MarketProduct(
      id: 'prod-1',
      name: 'Desi A2 Gir Cow Ghee (Bilona Method)',
      sellerId: 'sel-1',
      sellerName: 'Ramesh Patel',
      farmName: 'Surabhi Goshala & Natural Farm',
      tier: SellerTier.boardCertified,
      distanceKm: 4.2,
      vouchesCount: 18,
      price: 950,
      unit: '500 ml',
      plainWhy: 'Cultured curd churned using wooden bilona, grass-fed native Gir cows, certified Jaivik Bharat.',
      imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300',
    ),
    MarketProduct(
      id: 'prod-2',
      name: 'Heirloom Black Rice (Karuppu Kavuni)',
      sellerId: 'sel-2',
      sellerName: 'Anandi Ammal',
      farmName: 'Vayal Heritage Organics',
      tier: SellerTier.peerCertified,
      distanceKm: 8.5,
      vouchesCount: 12,
      price: 180,
      unit: '1 kg',
      plainWhy: 'Free from synthetic pesticides, inspected annually by local PGS-India farmer group.',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
    ),
    MarketProduct(
      id: 'prod-3',
      name: 'Cold-Pressed Native Sesame Oil (Ghani)',
      sellerId: 'sel-3',
      sellerName: 'Balwinder Singh',
      farmName: 'Pind Heritage Fields',
      tier: SellerTier.communityVerified,
      distanceKm: 12.1,
      vouchesCount: 5,
      price: 320,
      unit: '1 L',
      plainWhy: 'Wood pressed without heat. Vouched by 5 neighboring organic farmers in village circle.',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300',
    ),
    MarketProduct(
      id: 'prod-4',
      name: 'Forest Raw Wild Honey (Multi-Floral)',
      sellerId: 'sel-4',
      sellerName: 'Tribal Co-op Group',
      farmName: 'Satpura Van Samiti',
      tier: SellerTier.peerCertified,
      distanceKm: 16.4,
      vouchesCount: 22,
      price: 450,
      unit: '500 g',
      plainWhy: 'Ethically harvested from wild cliff combs without harming bee swarms, peer verified.',
      imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300',
    ),
  ];

  List<MarketProduct> get _filteredProducts {
    final list = List<MarketProduct>.from(_products);
    if (_filter == 'Nearest') {
      list.sort((a, b) => a.distanceKm.compareTo(b.distanceKm));
    } else if (_filter == 'Within 20 km') {
      return list.where((p) => p.distanceKm <= 20).toList();
    } else if (_filter == 'Most trusted') {
      list.sort((a, b) {
        final tierComparison = a.tier.index.compareTo(b.tier.index);
        if (tierComparison != 0) return tierComparison;
        return b.vouchesCount.compareTo(a.vouchesCount);
      });
    }
    return list;
  }

  void _showProductDetails(MarketProduct product) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(color: PrakritiColors.line, borderRadius: BorderRadius.circular(2)),
                ),
              ),
              const SizedBox(height: 16),
              Text(product.name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
              const SizedBox(height: 4),
              Text(
                '₹${product.price.toInt()} / ${product.unit}',
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: PrakritiColors.leaf),
              ),
              const SizedBox(height: 12),

              // Trust Tier Explainer
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: PrakritiColors.mossTint,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: PrakritiColors.moss.withOpacity(0.4)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.verified, color: PrakritiColors.leaf, size: 20),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            product.tierBadgeLabel,
                            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: PrakritiColors.leaf),
                          ),
                          const Text(
                            'Verified through official registry & neighbour vouching pipeline.',
                            style: TextStyle(fontSize: 11, color: PrakritiColors.inkSoft),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 14),
              const Text('Why this produce is genuine:', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
              const SizedBox(height: 4),
              Text(product.plainWhy, style: const TextStyle(fontSize: 13, color: PrakritiColors.inkSoft, height: 1.4)),

              const SizedBox(height: 16),
              Row(
                children: [
                  const Icon(Icons.location_on_outlined, size: 16, color: PrakritiColors.inkFaint),
                  const SizedBox(width: 4),
                  Text('${product.farmName} · ${product.distanceKm} km away', style: const TextStyle(fontSize: 12, color: PrakritiColors.inkFaint)),
                ],
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  icon: const Icon(Icons.handshake_outlined),
                  label: const Text('Connect with Farmer Directly'),
                  onPressed: () {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Contact details for ${product.sellerName} opened directly.')),
                    );
                  },
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
    final list = _filteredProducts;

    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      appBar: AppBar(
        title: const Text('Genuine Organic Market', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18)),
      ),
      body: Column(
        children: [
          // Filter Tabs
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: ['Nearest', 'Within 20 km', 'Most trusted'].map((f) {
                final isSelected = _filter == f;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(f),
                    selected: isSelected,
                    onSelected: (_) => setState(() => _filter = f),
                    selectedColor: PrakritiColors.mossTint,
                    backgroundColor: Colors.white,
                    labelStyle: TextStyle(
                      fontSize: 12,
                      fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                      color: isSelected ? PrakritiColors.leaf : PrakritiColors.inkSoft,
                    ),
                    side: BorderSide(color: isSelected ? PrakritiColors.leaf : PrakritiColors.line),
                  ),
                );
              }).toList(),
            ),
          ),

          // Products List
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: list.length,
              separatorBuilder: (_, __) => const SizedBox(height: 14),
              itemBuilder: (context, index) {
                final item = list[index];
                return InkWell(
                  onTap: () => _showProductDetails(item),
                  borderRadius: BorderRadius.circular(18),
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(color: PrakritiColors.line),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    item.name,
                                    style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15, color: PrakritiColors.ink),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '${item.farmName} · ${item.distanceKm} km away',
                                    style: const TextStyle(fontSize: 12, color: PrakritiColors.inkFaint),
                                  ),
                                ],
                              ),
                            ),
                            Text(
                              '₹${item.price.toInt()}',
                              style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16, color: PrakritiColors.leaf),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        // Plain-words trust badge (Tier is shown honestly, not dressed up!)
                        Row(
                          children: [
                            const Icon(Icons.check_circle_outline, size: 14, color: PrakritiColors.moss),
                            const SizedBox(width: 6),
                            Expanded(
                              child: Text(
                                item.tierBadgeLabel,
                                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: PrakritiColors.inkSoft),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Text(
                          item.plainWhy,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontSize: 12, color: PrakritiColors.inkSoft),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),

          // "Sell here" button at the foot of the market as specified in DESIGN.md §6
          Padding(
            padding: const EdgeInsets.all(16),
            child: SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                icon: const Icon(Icons.mic, size: 18),
                label: const Text('Sell here · Are you a farmer?'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: PrakritiColors.soil,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const SellerOnboardingScreen()),
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
