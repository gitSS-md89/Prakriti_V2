import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../models/models.dart';
import '../services/gemini_image_service.dart';

class ImageStudioScreen extends StatefulWidget {
  const ImageStudioScreen({super.key});

  @override
  State<ImageStudioScreen> createState() => _ImageStudioScreenState();
}

class _ImageStudioScreenState extends State<ImageStudioScreen> {
  int _studioMode = 0; // 0: High-Quality Generation (gemini-3-pro-image-preview), 1: Create & Edit (gemini-3.1-flash-image-preview)

  // Parameters for High-Quality Generation
  String _selectedSize = '1K'; // '1K', '2K', '4K'
  String _selectedAspectRatio = '1:1'; // '1:1', '16:9', '4:3', '9:16', '3:4'

  final TextEditingController _promptController = TextEditingController();
  bool _isGenerating = false;
  GeneratedImageModel? _latestImage;
  String? _errorMessage;

  // Preset ecological prompts
  final List<String> _samplePrompts = [
    'Organic heirloom black rice grains and golden turmeric root on hand-loomed khadi fabric, warm morning sunlight, macro texture, 8k botanical documentary',
    'Sacred grove in the Western Ghats with ancient banyan roots, mossy stones, wild endemic orchids, soft golden hour mist',
    'Rich regenerative soil cross-section teeming with earthworms, mycorrhizal fungal networks, and sprouted native desi seeds',
    'Desi Gir cows grazing freely in lush monsoon pasture with natural shade trees and butterfly pollinators, editorial quality',
  ];

  void _generateImage() async {
    final prompt = _promptController.text.trim();
    if (prompt.isEmpty) return;

    setState(() {
      _isGenerating = true;
      _errorMessage = null;
    });

    try {
      GeneratedImageModel result;
      if (_studioMode == 0) {
        // High Quality with gemini-3-pro-image-preview & 1K/2K/4K affordance
        result = await GeminiImageService.generateHighQualityImage(
          prompt: prompt,
          imageSize: _selectedSize,
          aspectRatio: _selectedAspectRatio,
        );
      } else {
        // Create & edit with gemini-3.1-flash-image-preview
        result = await GeminiImageService.createOrEditImage(
          prompt: prompt,
        );
      }

      setState(() {
        _latestImage = result;
        _isGenerating = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = e.toString().replaceAll('Exception: ', '');
        _isGenerating = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PrakritiColors.paper,
      appBar: AppBar(
        title: const Text('Gemini AI Eco Studio', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Mode Selector
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
                      onTap: () => setState(() => _studioMode = 0),
                      borderRadius: BorderRadius.circular(10),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: _studioMode == 0 ? Colors.white : Colors.transparent,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: _studioMode == 0
                              ? [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4)]
                              : null,
                        ),
                        child: Center(
                          child: Text(
                            'High-Quality (3 Pro)',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                              color: _studioMode == 0 ? PrakritiColors.leaf : PrakritiColors.inkSoft,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: InkWell(
                      onTap: () => setState(() => _studioMode = 1),
                      borderRadius: BorderRadius.circular(10),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: _studioMode == 1 ? Colors.white : Colors.transparent,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: _studioMode == 1
                              ? [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4)]
                              : null,
                        ),
                        child: Center(
                          child: Text(
                            'Create & Edit (3.1 Flash)',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                              color: _studioMode == 1 ? PrakritiColors.leaf : PrakritiColors.inkSoft,
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

            // Explainer banner
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: PrakritiColors.line),
              ),
              child: Row(
                children: [
                  Icon(
                    _studioMode == 0 ? Icons.high_quality : Icons.brush,
                    color: PrakritiColors.leaf,
                    size: 20,
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      _studioMode == 0
                          ? 'Using model gemini-3-pro-image-preview. Configurable resolution: 1K, 2K, 4K.'
                          : 'Using model gemini-3.1-flash-image-preview. Text prompts to create or iteratively edit images.',
                      style: const TextStyle(fontSize: 11, color: PrakritiColors.inkSoft),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Affordances for High-Quality Mode (1K, 2K, 4K)
            if (_studioMode == 0) ...[
              const Text(
                'Image Size Resolution Affordance',
                style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
              ),
              const SizedBox(height: 8),
              Row(
                children: ['1K', '2K', '4K'].map((size) {
                  final isSel = _selectedSize == size;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: ChoiceChip(
                      label: Text(size, style: TextStyle(fontWeight: FontWeight.w700, fontSize: 12, color: isSel ? PrakritiColors.leaf : PrakritiColors.inkSoft)),
                      selected: isSel,
                      onSelected: (_) => setState(() => _selectedSize = size),
                      selectedColor: PrakritiColors.mossTint,
                      side: BorderSide(color: isSel ? PrakritiColors.leaf : PrakritiColors.line),
                    ),
                  );
                }).toList(),
              ),

              const SizedBox(height: 12),
              const Text(
                'Aspect Ratio',
                style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: ['1:1', '16:9', '4:3', '9:16', '3:4'].map((ratio) {
                  final isSel = _selectedAspectRatio == ratio;
                  return ChoiceChip(
                    label: Text(ratio, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: isSel ? PrakritiColors.leaf : PrakritiColors.inkSoft)),
                    selected: isSel,
                    onSelected: (_) => setState(() => _selectedAspectRatio = ratio),
                    selectedColor: PrakritiColors.mossTint,
                    side: BorderSide(color: isSel ? PrakritiColors.leaf : PrakritiColors.line),
                  );
                }).toList(),
              ),
              const SizedBox(height: 16),
            ],

            // Prompt Input
            const Text(
              'Ecological Description / Edit Prompt',
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
            ),
            const SizedBox(height: 8),
            TextField(
              controller: _promptController,
              maxLines: 3,
              decoration: InputDecoration(
                hintText: _studioMode == 0
                    ? 'Describe your high-quality ecological scene, farm produce, or soil...'
                    : 'Enter text prompt to create or edit: "Add wild flowering clover under the fruit tree"...',
                hintStyle: const TextStyle(fontSize: 13, color: PrakritiColors.inkFaint),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: const BorderSide(color: PrakritiColors.leaf),
                ),
              ),
            ),

            const SizedBox(height: 10),

            // Sample prompt chips
            Wrap(
              spacing: 6,
              runSpacing: 6,
              children: _samplePrompts.map((p) {
                return InkWell(
                  onTap: () => setState(() => _promptController.text = p),
                  borderRadius: BorderRadius.circular(8),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: PrakritiColors.mist,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: PrakritiColors.line),
                    ),
                    child: Text(
                      p.length > 40 ? '${p.substring(0, 40)}...' : p,
                      style: const TextStyle(fontSize: 10, color: PrakritiColors.inkSoft),
                    ),
                  ),
                );
              }).toList(),
            ),

            const SizedBox(height: 16),

            // Generate Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                icon: _isGenerating
                    ? const SizedBox(
                        width: 18,
                        height: 18,
                        child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                      )
                    : const Icon(Icons.auto_awesome, size: 20),
                label: Text(
                  _isGenerating
                      ? 'Generating Visual with Gemini...'
                      : _studioMode == 0
                          ? 'Generate High-Quality Image ($_selectedSize)'
                          : 'Create / Edit Image (3.1 Flash)',
                ),
                onPressed: _isGenerating ? null : _generateImage,
              ),
            ),

            if (_errorMessage != null) ...[
              const SizedBox(height: 14),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFFFEE2E2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  _errorMessage!,
                  style: const TextStyle(fontSize: 12, color: PrakritiColors.danger),
                ),
              ),
            ],

            const SizedBox(height: 24),

            // Result Display
            if (_latestImage != null) ...[
              const Text(
                'Generated Image Result',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: PrakritiColors.ink),
              ),
              const SizedBox(height: 8),
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: PrakritiColors.line),
                  boxShadow: [
                    BoxShadow(color: Colors.black.withOpacity(0.06), blurRadius: 10),
                  ],
                ),
                clipBehavior: Clip.antiAlias,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Image.network(
                      _latestImage!.imageUrl,
                      fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) => Container(
                        height: 220,
                        color: PrakritiColors.mist,
                        child: const Center(
                          child: Icon(Icons.image, size: 48, color: PrakritiColors.moss),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(
                                _latestImage!.modelName,
                                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: PrakritiColors.leaf),
                              ),
                              const Spacer(),
                              Text(
                                '${_latestImage!.imageSize} · ${_latestImage!.aspectRatio}',
                                style: const TextStyle(fontSize: 11, color: PrakritiColors.inkFaint),
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Text(
                            _latestImage!.prompt,
                            style: const TextStyle(fontSize: 12, color: PrakritiColors.inkSoft),
                          ),
                        ],
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
}
