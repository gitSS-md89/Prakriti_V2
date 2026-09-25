import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/models.dart';
import 'api_service.dart';

class GeminiImageService {
  /// Generate high quality image with gemini-3-pro-image-preview
  /// Affordance for 1K, 2K, 4K image size and aspect ratio
  static Future<GeneratedImageModel> generateHighQualityImage({
    required String prompt,
    String imageSize = '1K', // '1K', '2K', '4K'
    String aspectRatio = '1:1', // '1:1', '16:9', '4:3', '9:16', '3:4'
  }) async {
    final uri = Uri.parse('${ApiService.baseUrl}/gemini/generate-image');
    
    final response = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'prompt': prompt,
        'imageSize': imageSize,
        'aspectRatio': aspectRatio,
      }),
    ).timeout(const Duration(seconds: 45));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return GeneratedImageModel(
        id: data['id'] ?? 'gen-${DateTime.now().millisecondsSinceEpoch}',
        prompt: prompt,
        imageUrl: data['imageUrl'],
        modelName: 'gemini-3-pro-image-preview',
        imageSize: imageSize,
        aspectRatio: aspectRatio,
        createdAt: DateTime.now(),
      );
    } else {
      final err = jsonDecode(response.body);
      throw Exception(err['error'] ?? 'Image generation failed');
    }
  }

  /// Create & edit images using gemini-3.1-flash-image-preview
  static Future<GeneratedImageModel> createOrEditImage({
    required String prompt,
    String? base64InputImage,
    String? mimeType,
  }) async {
    final uri = Uri.parse('${ApiService.baseUrl}/gemini/edit-image');

    final response = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'prompt': prompt,
        'baseImage': base64InputImage,
        'mimeType': mimeType ?? 'image/jpeg',
      }),
    ).timeout(const Duration(seconds: 45));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return GeneratedImageModel(
        id: data['id'] ?? 'edit-${DateTime.now().millisecondsSinceEpoch}',
        prompt: prompt,
        imageUrl: data['imageUrl'],
        modelName: 'gemini-3.1-flash-image-preview',
        imageSize: '1K',
        aspectRatio: '1:1',
        createdAt: DateTime.now(),
      );
    } else {
      final err = jsonDecode(response.body);
      throw Exception(err['error'] ?? 'Image editing failed');
    }
  }
}
