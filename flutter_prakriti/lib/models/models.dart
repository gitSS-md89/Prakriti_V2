class GivingAct {
  final String id;
  final String title;
  final String description;
  final int points; // Life points (e.g. 4 to 8 points)
  final String iconName;

  const GivingAct({
    required this.id,
    required this.title,
    required this.description,
    required this.points,
    required this.iconName,
  });
}

class CostActivity {
  final String id;
  final String category; // travel, food, energy, waste, water
  final String label;
  final double emissionFactor; // kg CO2e per unit
  final String unit;

  const CostActivity({
    required this.id,
    required this.category,
    required this.label,
    required this.emissionFactor,
    required this.unit,
  });
}

class LoggedActivity {
  final String id;
  final String name;
  final double amount;
  final String unit;
  final double co2Kg;
  final DateTime loggedAt;

  LoggedActivity({
    required this.id,
    required this.name,
    required this.amount,
    required this.unit,
    required this.co2Kg,
    required this.loggedAt,
  });
}

class NewsItem {
  final String id;
  final String headline;
  final String source;
  final String url;
  final String topic; // air, water, climate, forests, wildlife, waste
  final String summary;
  final String environmentalEffect;
  final String smallStep;
  final String publishedAt;
  final String? location;

  const NewsItem({
    required this.id,
    required this.headline,
    required this.source,
    required this.url,
    required this.topic,
    required this.summary,
    required this.environmentalEffect,
    required this.smallStep,
    required this.publishedAt,
    this.location,
  });

  factory NewsItem.fromJson(Map<String, dynamic> json) {
    return NewsItem(
      id: json['id'] ?? '',
      headline: json['headline'] ?? '',
      source: json['source'] ?? 'Official Feed',
      url: json['url'] ?? '',
      topic: json['topic'] ?? 'climate',
      summary: json['summary'] ?? '',
      environmentalEffect: json['environmentalEffect'] ?? '',
      smallStep: json['smallStep'] ?? '',
      publishedAt: json['publishedAt'] ?? '',
      location: json['location'],
    );
  }
}

enum SellerTier {
  boardCertified,     // Tier 1: NPOP / Jaivik Bharat (FSSAI)
  peerCertified,      // Tier 2: PGS-India (free, for smallholders)
  communityVerified,  // Tier 3: Vouched by 3+ named neighbours
}

class MarketProduct {
  final String id;
  final String name;
  final String sellerId;
  final String sellerName;
  final String farmName;
  final SellerTier tier;
  final double distanceKm;
  final int vouchesCount;
  final double price;
  final String unit;
  final String plainWhy;
  final String imageUrl;

  const MarketProduct({
    required this.id,
    required this.name,
    required this.sellerId,
    required this.sellerName,
    required this.farmName,
    required this.tier,
    required this.distanceKm,
    required this.vouchesCount,
    required this.price,
    required this.unit,
    required this.plainWhy,
    required this.imageUrl,
  });

  String get tierBadgeLabel {
    switch (tier) {
      case SellerTier.boardCertified:
        return 'Certified by government organic board';
      case SellerTier.peerCertified:
        return 'Certified by local farmer group (PGS-India)';
      case SellerTier.communityVerified:
        return 'Vouched for by $vouchesCount neighbours';
    }
  }
}

class CommunityPost {
  final String id;
  final String authorName;
  final String authorArea;
  final bool isAnonymous;
  final String type; // 'thought', 'knowledge', 'meetup', 'swap'
  final String title;
  final String content;
  final String? meetupTime;
  final String? meetupPlace;
  int rsvpCount;
  bool isRsvped;
  final String createdAt;

  CommunityPost({
    required this.id,
    required this.authorName,
    required this.authorArea,
    this.isAnonymous = false,
    required this.type,
    required this.title,
    required this.content,
    this.meetupTime,
    this.meetupPlace,
    this.rsvpCount = 0,
    this.isRsvped = false,
    required this.createdAt,
  });
}

class WisdomVerse {
  final String id;
  final String scripture; // 'Bhagavad Gita' or 'Atharva Veda'
  final String reference;
  final String devanagari;
  final String transliteration;
  final String englishTranslation;
  final String practiceStep;

  const WisdomVerse({
    required this.id,
    required this.scripture,
    required this.reference,
    required this.devanagari,
    required this.transliteration,
    required this.englishTranslation,
    required this.practiceStep,
  });
}

class GeneratedImageModel {
  final String id;
  final String prompt;
  final String imageUrl;
  final String modelName;
  final String imageSize;
  final String aspectRatio;
  final DateTime createdAt;

  const GeneratedImageModel({
    required this.id,
    required this.prompt,
    required this.imageUrl,
    required this.modelName,
    required this.imageSize,
    required this.aspectRatio,
    required this.createdAt,
  });
}
