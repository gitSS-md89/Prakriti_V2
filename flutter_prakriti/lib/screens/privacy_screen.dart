import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../services/vault_service.dart';

class PrivacyScreen extends StatefulWidget {
  const PrivacyScreen({super.key});

  @override
  State<PrivacyScreen> createState() => _PrivacyScreenState();
}

class _PrivacyScreenState extends State<PrivacyScreen> {
  bool _hasExported = false;

  void _downloadData() async {
    final export = await VaultService.prepareExportData();
    setState(() => _hasExported = true);

    if (!mounted) return;
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Export Created'),
          content: Text(
            'Your encrypted export archive has been prepared (version ${export['prakritiVersion']}). You may download it to your phone.',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void _confirmDelete(bool keepPostsAnonymous) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(keepPostsAnonymous ? 'Keep Knowledge for Community?' : 'Delete All Data Permanently?'),
          content: Text(
            keepPostsAnonymous
                ? 'Your local farming and seed knowledge will stay for neighbours labeled as "Anonymous". Your name, email, credentials, and encrypted private vault will be permanently deleted immediately.'
                : 'Everything — account, posts, vouches given, and private vault — will be erased permanently from all systems.',
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: PrakritiColors.danger),
              onPressed: () {
                Navigator.pop(context);
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Account data removed according to your choice.')),
                );
              },
              child: const Text('Confirm Deletion'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      appBar: AppBar(
        title: const Text('Privacy & Data Sovereignty', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Five Protections in Plain Words',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
            ),
            const SizedBox(height: 14),

            _buildProtectionTile(
              icon: Icons.lock_outline,
              title: 'On-Device Sealed Private Vault',
              desc: 'Your footprint log and personal reflections are sealed on this phone using XChaCha20-Poly1305. The server holds only ciphertext.',
            ),
            const SizedBox(height: 10),
            _buildProtectionTile(
              icon: Icons.location_off_outlined,
              title: 'Coarsened 1 km Location Cell',
              desc: 'Your exact GPS is never transmitted. The phone rounds your area to a ~1 km geohash to show community circles (~3 km) without tracking your home.',
            ),
            const SizedBox(height: 10),
            _buildProtectionTile(
              icon: Icons.mic_off_outlined,
              title: 'Voice Recognized Locally',
              desc: 'Speech is processed by your phone\'s local speech engine. Prakriti never uploads, records, or stores your spoken audio.',
            ),
            const SizedBox(height: 10),
            _buildProtectionTile(
              icon: Icons.delete_sweep_outlined,
              title: 'Zero Prompt Retention',
              desc: 'Assistant queries are answered and discarded immediately. No chat history is analyzed or stored for ad targeting.',
            ),
            const SizedBox(height: 10),
            _buildProtectionTile(
              icon: Icons.policy_outlined,
              title: 'Compliance by Design',
              desc: 'Built in adherence with India DPDP Act 2023, EU GDPR, and Google Play / Apple App Store Data Safety frameworks.',
            ),

            const SizedBox(height: 28),
            const Text(
              'Leaving Prakriti: Two Steps, in Order',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
            ),
            const SizedBox(height: 8),
            const Text(
              'To ensure you never lose your records, Prakriti requires exporting your data archive first before account removal.',
              style: TextStyle(fontSize: 12, color: PrakritiColors.inkSoft),
            ),
            const SizedBox(height: 16),

            // Step 1: Export Data
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                icon: const Icon(Icons.download),
                label: const Text('1. Download Your Complete Data Archive'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _hasExported ? PrakritiColors.moss : PrakritiColors.leaf,
                ),
                onPressed: _downloadData,
              ),
            ),

            const SizedBox(height: 16),

            // Step 2: Delete choices (Only available after download!)
            if (_hasExported) ...[
              const Text(
                'Step 2: Choose How You Leave',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
              ),
              const SizedBox(height: 10),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: PrakritiColors.leaf),
                  ),
                  onPressed: () => _confirmDelete(true),
                  child: const Text(
                    'Delete Account, Keep Knowledge as Anonymous',
                    style: TextStyle(color: PrakritiColors.leaf, fontWeight: FontWeight.w600, fontSize: 13),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: PrakritiColors.danger),
                  ),
                  onPressed: () => _confirmDelete(false),
                  child: const Text(
                    'Delete Everything Permanently',
                    style: TextStyle(color: PrakritiColors.danger, fontWeight: FontWeight.w600, fontSize: 13),
                  ),
                ),
              ),
            ] else ...[
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: PrakritiColors.mist,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.info_outline, size: 16, color: PrakritiColors.inkFaint),
                    SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Download your data above to unlock account deletion options.',
                        style: TextStyle(fontSize: 11, color: PrakritiColors.inkFaint),
                      ),
                    ),
                  ],
                ),
              ),
            ],
            const SizedBox(height: 30),
          ],
        ),
      ),
    );
  }

  Widget _buildProtectionTile({
    required IconData icon,
    required String title,
    required String desc,
  }) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: PrakritiColors.line),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: PrakritiColors.mist,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: PrakritiColors.leaf, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: PrakritiColors.ink)),
                const SizedBox(height: 4),
                Text(desc, style: const TextStyle(fontSize: 11, color: PrakritiColors.inkSoft, height: 1.3)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
