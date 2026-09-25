import 'package:flutter/material.dart';
import '../../constants/theme.dart';
import '../../models/models.dart';

class CircleTab extends StatefulWidget {
  const CircleTab({super.key});

  @override
  State<CircleTab> createState() => _CircleTabState();
}

class _CircleTabState extends State<CircleTab> {
  final List<CommunityPost> _posts = [
    CommunityPost(
      id: 'post-1',
      authorName: 'Sunita Devi',
      authorArea: 'Bhopal Central Circle (~3 km)',
      type: 'meetup',
      title: 'Community Desi Seed Swap & Seedling Exchange',
      content: 'Bring your indigenous tomato, okra, and spinach seeds. We will demonstrate how to ferment and store native seeds for the monsoon season.',
      meetupTime: 'Sunday 09:00 AM',
      meetupPlace: 'Banyan Tree Community Grounds',
      rsvpCount: 14,
      isRsvped: false,
      createdAt: '3 hours ago',
    ),
    CommunityPost(
      id: 'post-2',
      authorName: 'Dr. Arvind Sharma',
      authorArea: 'North Lake Circle (~2 km)',
      type: 'knowledge',
      title: 'Jeevamrit Preparation Recipe for Vegetable Gardens',
      content: '200 litres water + 10 kg native cow dung + 10 litres cow urine + 1 kg jaggery + 1 kg besan + 1 handful fertile forest soil. Stir clockwise twice daily for 48 hours.',
      createdAt: 'Yesterday',
    ),
    CommunityPost(
      id: 'post-3',
      authorName: 'Anonymous',
      authorArea: 'Valley Circle (~1.5 km)',
      isAnonymous: true,
      type: 'swap',
      title: 'Surplus Neem Cake Bio-Fertilizer (20 kg)',
      content: 'Have 20 kg excess neem cake from our farm press. Happy to swap for organic tulsi or moringa saplings.',
      createdAt: '2 days ago',
    ),
  ];

  void _openComposer() {
    final titleCtrl = TextEditingController();
    final bodyCtrl = TextEditingController();
    final timeCtrl = TextEditingController();
    final placeCtrl = TextEditingController();
    String type = 'meetup';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
                top: 20,
                bottom: MediaQuery.of(context).viewInsets.bottom + 20,
              ),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Post to Your 3 km Local Circle', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                    const SizedBox(height: 12),
                    // Post type selector
                    Wrap(
                      spacing: 8,
                      children: ['meetup', 'knowledge', 'thought', 'swap'].map((t) {
                        final isSel = type == t;
                        return ChoiceChip(
                          label: Text(t.toUpperCase()),
                          selected: isSel,
                          onSelected: (_) => setModalState(() => type = t),
                          selectedColor: PrakritiColors.mossTint,
                          labelStyle: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            color: isSel ? PrakritiColors.leaf : PrakritiColors.inkSoft,
                          ),
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: titleCtrl,
                      decoration: const InputDecoration(labelText: 'Title', border: OutlineInputBorder()),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: bodyCtrl,
                      maxLines: 3,
                      decoration: const InputDecoration(labelText: 'Details / Practical knowledge', border: OutlineInputBorder()),
                    ),
                    if (type == 'meetup') ...[
                      const SizedBox(height: 12),
                      TextField(
                        controller: timeCtrl,
                        decoration: const InputDecoration(labelText: 'Time (e.g. Saturday 8:00 AM)', border: OutlineInputBorder()),
                      ),
                      const SizedBox(height: 12),
                      TextField(
                        controller: placeCtrl,
                        decoration: const InputDecoration(labelText: 'Place (e.g. Community Garden)', border: OutlineInputBorder()),
                      ),
                    ],
                    const SizedBox(height: 18),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        child: const Text('Publish to Neighbors'),
                        onPressed: () {
                          if (titleCtrl.text.isNotEmpty) {
                            setState(() {
                              _posts.insert(
                                0,
                                CommunityPost(
                                  id: 'post-${DateTime.now().millisecondsSinceEpoch}',
                                  authorName: 'You',
                                  authorArea: 'Your Circle (~1 km)',
                                  type: type,
                                  title: titleCtrl.text,
                                  content: bodyCtrl.text,
                                  meetupTime: type == 'meetup' ? timeCtrl.text : null,
                                  meetupPlace: type == 'meetup' ? placeCtrl.text : null,
                                  rsvpCount: 0,
                                  createdAt: 'Just now',
                                ),
                              );
                            });
                            Navigator.pop(context);
                          }
                        },
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  void _toggleRsvp(CommunityPost post) {
    setState(() {
      post.isRsvped = !post.isRsvped;
      post.rsvpCount += post.isRsvped ? 1 : -1;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(post.isRsvped ? 'RSVP confirmed! Reminder sent 2 hours before.' : 'RSVP cancelled.'),
        backgroundColor: PrakritiColors.leaf,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      appBar: AppBar(
        title: const Text('Local Circle (~3 km)', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18)),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit_note, size: 24),
            onPressed: _openComposer,
          ),
        ],
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: _posts.length,
        separatorBuilder: (_, __) => const SizedBox(height: 14),
        itemBuilder: (context, index) {
          final post = _posts[index];
          final isMeetup = post.type == 'meetup';

          return Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(
                color: isMeetup ? PrakritiColors.leaf.withOpacity(0.4) : PrakritiColors.line,
                width: isMeetup ? 1.5 : 1,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Unboxed metadata row
                Row(
                  children: [
                    Text(
                      post.type.toUpperCase(),
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 1.0,
                        color: isMeetup ? PrakritiColors.leaf : PrakritiColors.moss,
                      ),
                    ),
                    const SizedBox(width: 6),
                    const Text('·', style: TextStyle(color: PrakritiColors.inkFaint)),
                    const SizedBox(width: 6),
                    Text(
                      post.authorName,
                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: PrakritiColors.ink),
                    ),
                    const SizedBox(width: 6),
                    const Text('·', style: TextStyle(color: PrakritiColors.inkFaint)),
                    const SizedBox(width: 6),
                    Text(
                      post.createdAt,
                      style: const TextStyle(fontSize: 11, color: PrakritiColors.inkFaint),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  post.title,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
                ),
                const SizedBox(height: 6),
                Text(
                  post.content,
                  style: const TextStyle(fontSize: 13, color: PrakritiColors.inkSoft, height: 1.4),
                ),
                if (isMeetup && post.meetupTime != null) ...[
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: PrakritiColors.mist,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.event, color: PrakritiColors.leaf, size: 20),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(post.meetupTime!, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 12)),
                              Text(post.meetupPlace ?? '', style: const TextStyle(fontSize: 11, color: PrakritiColors.inkSoft)),
                            ],
                          ),
                        ),
                        ElevatedButton(
                          onPressed: () => _toggleRsvp(post),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: post.isRsvped ? PrakritiColors.moss : PrakritiColors.leaf,
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                            minimumSize: Size.zero,
                          ),
                          child: Text(post.isRsvped ? 'Going (${post.rsvpCount})' : 'RSVP (${post.rsvpCount})', style: const TextStyle(fontSize: 11)),
                        ),
                      ],
                    ),
                  ),
                ],
              ],
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: PrakritiColors.leaf,
        foregroundColor: Colors.white,
        icon: const Icon(Icons.add),
        label: const Text('Share Knowledge'),
        onPressed: _openComposer,
      ),
    );
  }
}
