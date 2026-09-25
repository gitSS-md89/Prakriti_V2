import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/models.dart';

class ApiService {
  // Configurable API URL - works with localhost, android 10.0.2.2 or production tunnel
  static String baseUrl = 'http://localhost:3000/api';

  static void setBaseUrl(String url) {
    baseUrl = url;
  }

  // Fetch news
  static Future<List<NewsItem>> getNews({String? topic}) async {
    try {
      final uri = Uri.parse('$baseUrl/v1/news${topic != null && topic != 'All' ? '?topic=$topic' : ''}');
      final response = await http.get(uri).timeout(const Duration(seconds: 4));
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final list = (data['items'] as List).map((i) => NewsItem.fromJson(i)).toList();
        return list;
      }
    } catch (_) {}
    return _mockNews;
  }

  // Ask Voice/Text Assistant
  static Future<Map<String, dynamic>> askAssistant(String question, String language) async {
    try {
      final uri = Uri.parse('$baseUrl/v1/assistant');
      final response = await http.post(
        uri,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'question': question, 'language': language}),
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (_) {}
    return {
      'reply': 'Jeevo paramo dharma. The earth provides abundantly when treated with reverence. For your question, consider planting indigenous saplings or sharing surplus seeds with neighbours.',
      'smallStep': 'Compost your kitchen vegetable peels today to enrich soil without chemicals.',
    };
  }

  // Fallback demo news
  static final List<NewsItem> _mockNews = [
    const NewsItem(
      id: 'news-1',
      headline: 'Western Ghats Community Restores 40 Hectares of Sacred Groves',
      source: 'Forestry & Indigenous Ecology Bulletin',
      url: 'https://example.com/sacred-groves',
      topic: 'Forests',
      summary: 'Local farmers and tribal elders re-established endemic tree canopies without chemical fertilizers.',
      environmentalEffect: 'Preserved habitat for 32 endemic bird species and protected critical groundwater aquifers.',
      smallStep: 'Leave native shrubs along boundary walls undisturbed for wild pollinators.',
      publishedAt: '2 hours ago',
      location: 'Western Ghats, MH',
    ),
    const NewsItem(
      id: 'news-2',
      headline: 'Solar-Powered Irrigation Cooperatives Eliminate Diesel Runoff in Punjab',
      source: 'Clean Energy & Water Times',
      url: 'https://example.com/solar-irrigation',
      topic: 'Water',
      summary: 'Fifty smallholder farms linked solar pumps to shared micro-canals, reducing fossil fuel use.',
      environmentalEffect: 'Eliminated 18,000 litres of diesel emissions and stopped toxic fuel seepage into canals.',
      smallStep: 'Inspect home taps today and replace worn rubber washers to eliminate silent drips.',
      publishedAt: '5 hours ago',
      location: 'Amritsar District, PB',
    ),
    const NewsItem(
      id: 'news-3',
      headline: 'Indigenous Desi Cotton Revival Brings Beneficial Insects Back to Soil',
      source: 'Organic Agriculture Research',
      url: 'https://example.com/organic-cotton',
      topic: 'Climate',
      summary: 'Drought-hardy native seeds required zero synthetic sprays and 60% less irrigation.',
      environmentalEffect: 'Revived earthworm and ladybug populations across 200 family farms.',
      smallStep: 'Choose unbleached organic cotton or swap clothes locally instead of buying synthetic blends.',
      publishedAt: 'Yesterday',
      location: 'Vidarbha, MH',
    ),
  ];
}
