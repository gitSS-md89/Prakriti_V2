import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../models/models.dart';

class WisdomScreen extends StatelessWidget {
  const WisdomScreen({super.key});

  final List<WisdomVerse> _verses = const [
    WisdomVerse(
      id: 'w-1',
      scripture: 'Atharva Veda (Bhumi Sukta)',
      reference: '12.1.12',
      devanagari: 'माता भूमिः पुत्रो अहं पृथिव्याः',
      transliteration: 'Mātā bhūmiḥ putro ahaṁ pṛthivyāḥ',
      englishTranslation: 'Earth is my mother, and I am her child.',
      practiceStep: 'Walk mindfully on bare soil today, ensuring no non-biodegradable trash is left behind.',
    ),
    WisdomVerse(
      id: 'w-2',
      scripture: 'Atharva Veda (Bhumi Sukta)',
      reference: '12.1.35',
      devanagari: 'यत् ते भूमे विखनामि क्षिप्रं तद् अपि रोहतु । मा ते मर्म विमृग्वरि मा ते हृदयमर्पिपम् ॥',
      transliteration: 'Yat te bhūme vikhanāmi kṣipraṁ tad api rohatu | Mā te marma vimṛgvari mā te hṛdayamarpipam ||',
      englishTranslation: 'Whatever I dig up of thee, O Earth, may that quickly grow over again; may we not hurt thy vitals nor thy heart.',
      practiceStep: 'Whenever harvesting crops or pruning branches, give back organic mulch so soil regenerates quickly.',
    ),
    WisdomVerse(
      id: 'w-3',
      scripture: 'Bhagavad Gita',
      reference: '3.14',
      devanagari: 'अन्नाद्भवन्ति भूतानि पर्जन्यादन्नसम्भवः । यज्ञाद्भवति पर्जन्यो यज्ञः कर्मसमुद्भवः ॥',
      transliteration: 'Annād bhavanti bhūtāni parjanyād anna-sambhavaḥ | Yajñād bhavati parjanyo yajñaḥ karma-samudbhavaḥ ||',
      englishTranslation: 'All living bodies subsist on food grains, which are produced from rains. Rains are produced by performance of sacred duty (giving back to nature).',
      practiceStep: 'Treat feeding birds, preserving clean water, and nurturing soil as daily sacred duty.',
    ),
    WisdomVerse(
      id: 'w-4',
      scripture: 'Bhagavad Gita',
      reference: '7.8',
      devanagari: 'रसोऽहमप्सु कौन्तेय प्रभास्मि शशिसूर्ययोः । प्रणवः सर्ववेदेषु शब्दः खे पौरुषं नृषु ॥',
      transliteration: 'Raso \'ham apsu kaunteya prabhāsmi śaśi-sūryayoḥ | Praṇavaḥ sarva-vedeṣu śabdaḥ khe pauruṣaṁ nṛṣu ||',
      englishTranslation: 'I am the pure taste in water, the radiance in the sun and the moon, the sacred sound in all Vedas, and the life energy in all living beings.',
      practiceStep: 'Reflect upon water as pure divine essence; never contaminate lakes, rivers, or wells with synthetic detergents.',
    ),
    WisdomVerse(
      id: 'w-5',
      scripture: 'Bhagavad Gita',
      reference: '17.20',
      devanagari: 'दातव्यमिति यद्दानं दीयतेऽनुपकारिणे । देशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम् ॥',
      transliteration: 'Dātavyam iti yad dānaṁ dīyate \'nupakāriṇe | Deśe kāle ca pātre ca tad dānaṁ sāttvikaṁ smṛtam ||',
      englishTranslation: 'Charity given to one from whom no return is expected, with the feeling that it is one\'s duty to give, at the proper time and place, is pure and noble.',
      practiceStep: 'Give seeds and plant saplings freely to stray creatures and community grounds without asking for reward.',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      appBar: AppBar(
        title: const Text('Sacred Ecology & Wisdom', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(20),
        itemCount: _verses.length,
        separatorBuilder: (_, __) => const SizedBox(height: 16),
        itemBuilder: (context, index) {
          final v = _verses[index];
          return Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: PrakritiColors.line),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '${v.scripture.toUpperCase()} · ${v.reference}',
                      style: const TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 1.0,
                        color: PrakritiColors.soil,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.volume_up_outlined, size: 20, color: PrakritiColors.leaf),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Playing Sanskrit recitation for ${v.reference}')),
                        );
                      },
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  v.devanagari,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: PrakritiColors.ink,
                    fontFamily: 'serif',
                    height: 1.3,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  v.transliteration,
                  style: const TextStyle(
                    fontSize: 12,
                    fontStyle: FontStyle.italic,
                    color: PrakritiColors.inkSoft,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  v.englishTranslation,
                  style: const TextStyle(
                    fontSize: 13,
                    color: PrakritiColors.ink,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: PrakritiColors.mossTint,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.spa, color: PrakritiColors.leaf, size: 16),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          'Practice step: ${v.practiceStep}',
                          style: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                            color: PrakritiColors.leaf,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
