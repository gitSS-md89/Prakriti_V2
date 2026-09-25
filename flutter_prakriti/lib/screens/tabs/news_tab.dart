import 'package:flutter/material.dart';
import '../../constants/theme.dart';
import '../../models/models.dart';
import '../../services/api_service.dart';

class NewsTab extends StatefulWidget {
  const NewsTab({super.key});

  @override
  State<NewsTab> createState() => _NewsTabState();
}

class _NewsTabState extends State<NewsTab> {
  final List<String> _topics = ['All', 'Air', 'Water', 'Climate', 'Forests', 'Wildlife', 'Waste'];
  String _selectedTopic = 'All';
  List<NewsItem> _news = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadNews();
  }

  Future<void> _loadNews() async {
    setState(() => _isLoading = true);
    final items = await ApiService.getNews(topic: _selectedTopic);
    setState(() {
      _news = items;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      appBar: AppBar(
        title: const Text(
          'Environmental Updates',
          style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, size: 20),
            onPressed: _loadNews,
          ),
        ],
      ),
      body: Column(
        children: [
          // Topic chips
          SizedBox(
            height: 48,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: _topics.length,
              itemBuilder: (context, index) {
                final topic = _topics[index];
                final isSelected = _selectedTopic == topic;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(topic),
                    selected: isSelected,
                    onSelected: (val) {
                      setState(() => _selectedTopic = topic);
                      _loadNews();
                    },
                    selectedColor: PrakritiColors.mossTint,
                    backgroundColor: Colors.white,
                    labelStyle: TextStyle(
                      fontSize: 12,
                      fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                      color: isSelected ? PrakritiColors.leaf : PrakritiColors.inkSoft,
                    ),
                    side: BorderSide(
                      color: isSelected ? PrakritiColors.leaf : PrakritiColors.line,
                    ),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 8),

          // News cards
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator(color: PrakritiColors.leaf))
                : RefreshIndicator(
                    color: PrakritiColors.leaf,
                    onRefresh: _loadNews,
                    child: ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      itemCount: _news.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 16),
                      itemBuilder: (context, index) {
                        final item = _news[index];
                        return Container(
                          padding: const EdgeInsets.all(18),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: PrakritiColors.line),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Unboxed metadata row
                              Row(
                                children: [
                                  Text(
                                    item.topic.toUpperCase(),
                                    style: const TextStyle(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w700,
                                      letterSpacing: 1.0,
                                      color: PrakritiColors.moss,
                                    ),
                                  ),
                                  const SizedBox(width: 6),
                                  const Text('·', style: TextStyle(color: PrakritiColors.inkFaint)),
                                  const SizedBox(width: 6),
                                  Text(
                                    item.publishedAt,
                                    style: const TextStyle(
                                      fontSize: 11,
                                      color: PrakritiColors.inkFaint,
                                    ),
                                  ),
                                  if (item.location != null) ...[
                                    const SizedBox(width: 6),
                                    const Text('·', style: TextStyle(color: PrakritiColors.inkFaint)),
                                    const SizedBox(width: 6),
                                    Text(
                                      item.location!,
                                      style: const TextStyle(
                                        fontSize: 11,
                                        color: PrakritiColors.inkFaint,
                                      ),
                                    ),
                                  ],
                                ],
                              ),
                              const SizedBox(height: 8),
                              // Headline
                              Text(
                                item.headline,
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700,
                                  color: PrakritiColors.ink,
                                  height: 1.25,
                                ),
                              ),
                              const SizedBox(height: 8),
                              // Summary
                              Text(
                                item.summary,
                                style: const TextStyle(
                                  fontSize: 13,
                                  color: PrakritiColors.inkSoft,
                                  height: 1.4,
                                ),
                              ),
                              const SizedBox(height: 12),

                              // Effect on Environment & Living Things
                              Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: PrakritiColors.mist,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text(
                                      'EFFECT ON LIVING THINGS',
                                      style: TextStyle(
                                        fontSize: 10,
                                        fontWeight: FontWeight.w700,
                                        letterSpacing: 0.8,
                                        color: PrakritiColors.inkSoft,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      item.environmentalEffect,
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: PrakritiColors.ink,
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    const Text(
                                      'ONE SMALL STEP',
                                      style: TextStyle(
                                        fontSize: 10,
                                        fontWeight: FontWeight.w700,
                                        letterSpacing: 0.8,
                                        color: PrakritiColors.leaf,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      item.smallStep,
                                      style: const TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600,
                                        color: PrakritiColors.leaf,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 12),
                              // Source link
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    'Source: ${item.source}',
                                    style: const TextStyle(
                                      fontSize: 11,
                                      color: PrakritiColors.inkFaint,
                                    ),
                                  ),
                                  const Text(
                                    'Read source ↗',
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: PrakritiColors.leaf,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
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
