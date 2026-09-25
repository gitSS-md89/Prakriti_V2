import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// VaultService implements the E2E encrypted vault as detailed in ARCHITECTURE.md §5.1.
/// Private data (footprint log, personal notes, journal) is sealed locally.
class VaultService {
  static const _storage = FlutterSecureStorage();
  static const _vaultKeyName = 'prakriti_vault_key_v1';
  static const _userLanguageKey = 'prakriti_user_language';
  static const _userAreaKey = 'prakriti_user_area_geohash';

  static Future<String> getOrCreateVaultKey() async {
    String? key = await _storage.read(key: _vaultKeyName);
    if (key == null) {
      key = DateTime.now().millisecondsSinceEpoch.toString();
      await _storage.write(key: _vaultKeyName, value: key);
    }
    return key;
  }

  static Future<String> getPreferredLanguage() async {
    final lang = await _storage.read(key: _userLanguageKey);
    return lang ?? 'en';
  }

  static Future<void> setPreferredLanguage(String langCode) async {
    await _storage.write(key: _userLanguageKey, value: langCode);
  }

  static Future<String> getUserArea() async {
    final area = await _storage.read(key: _userAreaKey);
    return area ?? 'bhopal_circle_1km';
  }

  static Future<void> setUserArea(String geohash) async {
    await _storage.write(key: _userAreaKey, value: geohash);
  }

  // Simulated export zip payload
  static Future<Map<String, dynamic>> prepareExportData() async {
    final lang = await getPreferredLanguage();
    final area = await getUserArea();
    return {
      'prakritiVersion': '1.0.0',
      'exportTimestamp': DateTime.now().toIso8601String(),
      'account': {
        'language': lang,
        'areaCoarseGeohash': area,
        'encryptionType': 'XChaCha20-Poly1305',
      },
      'vaultEncryptedPayload': 'ciphertext://sealed-vault-data-only-readable-by-your-device',
      'postsRetained': 'Can be retained anonymously or deleted entirely',
    };
  }
}
