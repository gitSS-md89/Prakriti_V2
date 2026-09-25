# Prakriti — Flutter Mobile Application (Android & iOS)

*Jeevo paramo dharma.* Life itself is the highest duty — and life means every creature, every tree, every living thing, not only human beings.

This is the complete Flutter mobile application for **Prakriti**, designed for both **Android** and **iOS**. It connects to the Prakriti backend API (`/api/v1`) and the Gemini AI studio endpoints for generating and editing ecological images.

---

## 1. System Requirements

- **Flutter SDK**: 3.24.x or newer (Dart 3.5+)
- **Android**: Android Studio with Android SDK 34 (minSdkVersion 24)
- **iOS**: macOS with Xcode 15+ and CocoaPods (`pod install`)
- **Backend**: The Prakriti server running locally at `http://localhost:3000` (or tunneled via Cloudflare / ngrok for real physical phones).

---

## 2. Quick Start

### Step 1: Install Dependencies
```bash
cd flutter_prakriti
flutter pub get
```

### Step 2: Configure Environment
Copy `.env.example` or configure `lib/services/api_service.dart`:
- **Android Emulator**: Uses `http://10.0.2.2:3000`
- **iOS Simulator**: Uses `http://localhost:3000`
- **Physical Phone**: Use your machine's LAN IP or a secure tunnel (e.g. `https://xxxx.trycloudflare.com`).

### Step 3: Run the App
```bash
# List available devices
flutter devices

# Run on Android (Emulator or Phone)
flutter run -d android

# Run on iOS (Simulator or iPhone)
flutter run -d ios

# Run in Chrome for Web Preview
flutter run -d chrome
```

---

## 3. Architecture & Folder Structure

```
flutter_prakriti/
├── lib/
│   ├── main.dart                      # Application bootstrap & route switch
│   ├── constants/
│   │   ├── theme.dart                 # Leaf (#1F5E3B), Haldi (#E3A018), Paper, Ink
│   │   ├── greetings.dart             # Sanskrit greetings (Supravatam, Namaskar, etc.)
│   │   └── languages.dart             # 12 Languages with native script
│   ├── models/
│   │   └── models.dart                # Footprint, NewsItem, MarketProduct, Post, Verse
│   ├── services/
│   │   ├── api_service.dart           # Backend HTTP client (/api/v1/*)
│   │   ├── vault_service.dart         # Encrypted local keystore & vault
│   │   └── gemini_image_service.dart  # Gemini 3.1 Flash & Gemini 3 Pro image service
│   ├── widgets/
│   │   ├── score_ring.dart            # CustomPainter for 108 double concentric arc
│   │   ├── sky_header.dart            # Time-of-day sky gradient with Sanskrit greeting
│   │   └── assistant_orb.dart         # Breathing speech orb animation
│   └── screens/
│       ├── language_screen.dart       # First screen: choose 1 of 12 spoken languages
│       ├── sign_in_screen.dart        # Apple / Google sign-in with privacy notice
│       ├── main_navigation_screen.dart# 5-tab scaffold + raised center mic
│       ├── tabs/
│       │   ├── today_tab.dart         # Sky, 108 Ring, daily step, verse of day
│       │   ├── news_tab.dart          # Environmental stories with impact & small steps
│       │   ├── footprint_tab.dart     # 7 acts of giving + carbon cost calculator
│       │   ├── market_tab.dart        # 3-tier organic marketplace + verify ladder
│       │   └── circle_tab.dart        # Local community (~3km) with meetups & RSVPs
│       ├── assistant_modal.dart       # Voice assistant with live speech & Sanskrit wisdom
│       ├── seller_onboarding_screen.dart # 3 spoken plain-language yes/no questions
│       ├── wisdom_screen.dart         # Gita & Atharva Veda Bhumi Sukta verses
│       ├── privacy_screen.dart        # E2E encryption, export zip, delete account
│       └── image_studio_screen.dart   # Gemini image creation & editing (1K, 2K, 4K)
├── android/                           # Native Android configuration
└── ios/                               # Native iOS configuration
```

---

## 4. Key Highlights

1. **The 108 Principle**: Custom painted double concentric arc: Outer leaf green (Given back to life 0-54) and inner haldi amber (Lived lightly 0-54).
2. **Sanskrit Time-of-Day Skies**:
   - `04:00 - 11:59`: सुप्रभातं (Supravatam) — Dawn peach into pale gold
   - `12:00 - 15:59`: नमस्कार (Namaskar) — Bright open blue
   - `16:00 - 19:59`: शुभसन्ध्या (Subhasandhya) — Amber into rose
   - `20:00 - 03:59`: शुभरात्रि (Subharatri) — Deep leaf into near-black
3. **12 Spoken Languages**: English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese.
4. **Gemini AI Studio Integration**:
   - Image Creation & Editing via `gemini-3.1-flash-image-preview`
   - High-Quality 1K / 2K / 4K Image Generation via `gemini-3-pro-image-preview`
5. **Three Honest Market Tiers**: Board certified (Tier 1), Peer certified PGS-India (Tier 2), and Community vouched (Tier 3).
