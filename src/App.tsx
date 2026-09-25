import React, { useState, useEffect } from 'react';
import {
  Leaf,
  Sparkles,
  Smartphone,
  Code2,
  Download,
  Database,
  BookOpen,
  ShieldCheck,
  Mic,
  Volume2,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  Calendar,
  MapPin,
  Store,
  Users,
  Check,
  ChevronRight,
  Copy,
  Image as ImageIcon,
  CheckCircle2,
  Globe,
  Sliders,
  Radio,
  FileCode,
  FolderTree,
  Terminal,
  Flame,
  Award,
  RotateCcw,
  Sun,
  Moon,
  Monitor,
  Palette,
  Eye,
  Cloud,
  LogIn,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import {
  auth,
  db,
  testConnection,
  loginWithGoogle,
  loginAsGuest,
  logoutUser,
  handleFirestoreError,
  OperationType,
} from './firebase';
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { Sacred108Graph } from './components/Sacred108Graph';
import { PrincipleOf108Modal } from './components/PrincipleOf108Modal';

// Peacock Feather (मयूर पंख) Design System Tokens:
// Raadha Mode (Light Mode - Morning Feather Radiance / राधा भाव)
// Krishna Mode (Dark Mode - Iridescent Midnight Plumes / कृष्ण रूप / श्याम वर्ण)
// System Mode (Auto - Circadian Solar Cycle & Device Sync / प्रणाली अनुसार)

export type ThemeMode = 'radha' | 'krishna' | 'system';

export interface PeacockColorDef {
  name: string;
  hindiName: string;
  alias?: string;
  concept: string;
  bg: string;
  surface: string;
  surfaceRaised: string;
  border: string;
  kanthTeal: string; // Peacock Throat Cyan/Teal
  chandrikaGold: string; // Peacock Feather Eye Amber/Gold
  emeraldBarb: string; // Plume Barbs Emerald
  ink: string; // Primary Ink
  inkSoft: string; // Secondary Ink
  inkFaint: string; // Muted/Captions
  pillBg: string;
  glow: string;
}

export const PEACOCK_PALETTES: Record<'radha' | 'krishna', PeacockColorDef> = {
  radha: {
    name: 'Raadha Mode',
    hindiName: 'राधा भाव',
    concept: 'Morning Feather Radiance (Daylight Grace & Sacred Flora)',
    bg: '#F6FAF7', // Soft silk parchment
    surface: '#FFFFFF', // Clean feather quill white
    surfaceRaised: '#EDF5F1',
    border: '#D2E3DB',
    kanthTeal: '#097770', // Mayur Kanth (rich teal/turquoise)
    chandrikaGold: '#C58F1B', // Golden eye of peacock feather
    emeraldBarb: '#1A5F44', // Plume filaments
    ink: '#0C1F1B', // Deep peacock ink
    inkSoft: '#3E564F',
    inkFaint: '#6C837C',
    pillBg: '#E7F2EC',
    glow: 'rgba(9, 119, 112, 0.15)',
  },
  krishna: {
    name: 'Krishna Mode',
    alias: 'Krisha Mode',
    hindiName: 'कृष्ण रूप / श्याम वर्ण',
    concept: 'Iridescent Midnight Plumes (Celestial Twilight of Shyam)',
    bg: '#07131B', // Deep celestial peacock midnight
    surface: '#0D212E', // Midnight velvet peacock card
    surfaceRaised: '#142C3C',
    border: '#1B3E52',
    kanthTeal: '#00DFB6', // Glowing iridescent peacock cyan/teal
    chandrikaGold: '#FFB800', // Luminous divine gold eye ring
    emeraldBarb: '#10B981', // Vivid glowing emerald plume
    ink: '#EEF9F6', // Luminous feather fluff white
    inkSoft: '#9BC3B9',
    inkFaint: '#5E857C',
    pillBg: '#122D3D',
    glow: 'rgba(0, 223, 182, 0.25)',
  },
};

interface EcoHabit {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'sacred-flora' | 'soil-waste' | 'water' | 'energy' | 'creatures' | 'zero-waste';
  frequency: string;
  streak: number;
  bestStreak: number;
  completedToday: boolean;
  history: boolean[]; // 7 days (M, T, W, T, F, S, S)
  ecoImpact: string;
  pts: number;
}

interface Language {
  code: string;
  name: string;
  native: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
];

export default function App() {
  const [activeView, setActiveView] = useState<'simulator' | 'ai-studio' | 'codebase' | 'backend' | 'architecture'>('simulator');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('hi');
  const [copiedFile, setCopiedFile] = useState<boolean>(false);

  // Mobile Simulator state
  const [phoneFrame, setPhoneFrame] = useState<'iphone' | 'android'>('iphone');
  const [simTab, setSimTab] = useState<'today' | 'habits' | 'news' | 'footprint' | 'market' | 'circle'>('today');
  const [givingScore, setGivingScore] = useState<number>(38); // 0 to 54
  const [lightnessScore, setLightnessScore] = useState<number>(33); // 0 to 54
  const [showAssistantModal, setShowAssistantModal] = useState<boolean>(false);
  const [showSellerOnboarding, setShowSellerOnboarding] = useState<boolean>(false);
  const [showPrivacyScreen, setShowPrivacyScreen] = useState<boolean>(false);
  const [showWisdomScreen, setShowWisdomScreen] = useState<boolean>(false);
  const [showPrincipleModal, setShowPrincipleModal] = useState<boolean>(false);

  // Firebase Real-time State & Synchronization
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firebaseConnected, setFirebaseConnected] = useState<boolean>(true);
  const [isSyncingScore, setIsSyncingScore] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Initialize Firebase Connection & Auth Listener
  useEffect(() => {
    testConnection().then((ok) => setFirebaseConnected(ok));

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        try {
          const guest = await loginAsGuest();
          setCurrentUser(guest);
        } catch (err) {
          console.warn('Anonymous sign-in error:', err);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen for real-time 108 Score updates from Firestore
  useEffect(() => {
    if (!currentUser) return;

    const scoreDocRef = doc(db, 'users', currentUser.uid, 'scores', 'today');
    const unsubscribeSnapshot = onSnapshot(
      scoreDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (typeof data.givingScore === 'number') {
            setGivingScore(data.givingScore);
          }
          if (typeof data.lightnessScore === 'number') {
            setLightnessScore(data.lightnessScore);
          }
        } else {
          // Initialize user score in Firestore
          setDoc(scoreDocRef, {
            userId: currentUser.uid,
            givingScore: 38,
            lightnessScore: 33,
            totalScore108: 71,
            date: new Date().toISOString().split('T')[0],
            updatedAt: serverTimestamp(),
          }).catch((err) =>
            handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}/scores/today`)
          );
        }
      },
      (error) => {
        console.warn('Score onSnapshot notice:', error.message);
      }
    );

    return () => unsubscribeSnapshot();
  }, [currentUser]);

  // Persistent Score Updater to Firestore
  const saveScoresToFirebase = async (newGiving: number, newLightness: number) => {
    const clampedGiving = Math.max(0, Math.min(54, newGiving));
    const clampedLightness = Math.max(0, Math.min(54, newLightness));
    setGivingScore(clampedGiving);
    setLightnessScore(clampedLightness);

    if (!currentUser) return;
    try {
      setIsSyncingScore(true);
      const scoreDocRef = doc(db, 'users', currentUser.uid, 'scores', 'today');
      await setDoc(
        scoreDocRef,
        {
          userId: currentUser.uid,
          givingScore: clampedGiving,
          lightnessScore: clampedLightness,
          totalScore108: clampedGiving + clampedLightness,
          date: new Date().toISOString().split('T')[0],
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}/scores/today`);
    } finally {
      setIsSyncingScore(false);
    }
  };

  // Peacock Feather Theme Modes: Raadha Mode (Light), Krishna Mode (Dark), System Mode (Auto)
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [simulatedSystemDark, setSimulatedSystemDark] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const activeSystemIsDark = simulatedSystemDark !== null ? simulatedSystemDark : systemPrefersDark;
  const effectiveTheme: 'radha' | 'krishna' =
    themeMode === 'system' ? (activeSystemIsDark ? 'krishna' : 'radha') : themeMode;
  const isKrishna = effectiveTheme === 'krishna';
  const currentPalette = PEACOCK_PALETTES[effectiveTheme];

  // Habits State & Streaks
  const [habits, setHabits] = useState<EcoHabit[]>([
    {
      id: 'tulsi-water',
      title: 'Watering Tulsi',
      hindiTitle: 'तुलसी जलार्पण',
      category: 'sacred-flora',
      frequency: 'Daily Morning',
      streak: 12,
      bestStreak: 28,
      completedToday: true,
      history: [true, true, true, true, true, false, true],
      ecoImpact: 'Releases oxygen 20 hrs/day, protects pollinator biodiversity & cools terrace microclimate.',
      pts: 5,
    },
    {
      id: 'kitchen-compost',
      title: 'Kitchen Composting',
      hindiTitle: 'रसोई खाद निर्माण',
      category: 'soil-waste',
      frequency: 'Daily Evening',
      streak: 8,
      bestStreak: 21,
      completedToday: false,
      history: [true, true, true, true, true, true, false],
      ecoImpact: 'Diverts kitchen scraps from landfill methane emission to feed living earth worms.',
      pts: 8,
    },
    {
      id: 'bird-water',
      title: 'Wild Birds Water Pot Refill',
      hindiTitle: 'पक्षी जल सेवा',
      category: 'creatures',
      frequency: 'Daily Morning',
      streak: 15,
      bestStreak: 45,
      completedToday: true,
      history: [true, true, true, true, true, true, true],
      ecoImpact: 'Provides clean hydration for sparrows, bulbuls & wild bees in urban heat zones.',
      pts: 6,
    },
    {
      id: 'zero-plastic',
      title: 'Zero Single-Use Plastic Day',
      hindiTitle: 'एकल उपयोग प्लास्टिक त्याग',
      category: 'zero-waste',
      frequency: 'Daily',
      streak: 5,
      bestStreak: 14,
      completedToday: false,
      history: [false, true, true, true, true, false, false],
      ecoImpact: 'Eliminates disposable packaging; prevents microplastic soil & drain contamination.',
      pts: 5,
    },
    {
      id: 'bio-enzyme',
      title: 'Natural Bio-Enzyme Mopping',
      hindiTitle: 'प्राकृतिक जैव-एंजाइम',
      category: 'water',
      frequency: 'Weekly',
      streak: 3,
      bestStreak: 8,
      completedToday: false,
      history: [true, false, false, true, false, false, false],
      ecoImpact: 'Replaces toxic chemical detergents with fermented citrus enzymes to keep greywater safe.',
      pts: 7,
    },
    {
      id: 'power-down',
      title: 'Standby Power & Solar Alignment',
      hindiTitle: 'ऊर्जा सजगता',
      category: 'energy',
      frequency: 'Daily Night',
      streak: 7,
      bestStreak: 19,
      completedToday: true,
      history: [true, true, true, true, true, true, true],
      ecoImpact: 'Cuts phantom power draw by 1.2 kWh per week and aligns with daylight rhythms.',
      pts: 4,
    },
  ]);

  const [habitFilter, setHabitFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showAddHabitModal, setShowAddHabitModal] = useState<boolean>(false);
  const [newHabitTitle, setNewHabitTitle] = useState<string>('');
  const [newHabitHindiTitle, setNewHabitHindiTitle] = useState<string>('');
  const [newHabitCategory, setNewHabitCategory] = useState<EcoHabit['category']>('sacred-flora');
  const [newHabitFrequency, setNewHabitFrequency] = useState<string>('Daily Morning');
  const [newHabitImpact, setNewHabitImpact] = useState<string>('');
  const [celebratingHabitId, setCelebratingHabitId] = useState<string | null>(null);

  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const nextCompleted = !h.completedToday;
          const newStreak = nextCompleted ? h.streak + 1 : Math.max(0, h.streak - 1);
          const newBest = Math.max(h.bestStreak, newStreak);
          const newHistory = [...h.history];
          newHistory[newHistory.length - 1] = nextCompleted;

          if (nextCompleted) {
            setCelebratingHabitId(id);
            setTimeout(() => setCelebratingHabitId(null), 2500);
            const nextGiving = Math.min(54, givingScore + h.pts);
            saveScoresToFirebase(nextGiving, lightnessScore);
            speakText(`${h.title} completed. Streak is now ${newStreak} days.`);
          } else {
            const nextGiving = Math.max(0, givingScore - h.pts);
            saveScoresToFirebase(nextGiving, lightnessScore);
          }

          return {
            ...h,
            completedToday: nextCompleted,
            streak: newStreak,
            bestStreak: newBest,
            history: newHistory,
          };
        }
        return h;
      })
    );
  };

  // Giving & Footprint entries
  const [loggedActs, setLoggedActs] = useState<Array<{ id: string; name: string; pts: number }>>([
    { id: '1', name: 'Fed soil with organic kitchen compost', pts: 8 },
    { id: '2', name: 'Filled terracotta water bowl for wild birds', pts: 6 },
    { id: '3', name: 'Planted native tulsi & neem saplings', pts: 8 },
  ]);

  // AI Studio state
  const [aiMode, setAiMode] = useState<'generate' | 'edit'>('generate');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('2K');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [prompt, setPrompt] = useState<string>(
    'Organic heirloom black rice grains and golden turmeric root on hand-loomed khadi fabric, warm morning sunlight, macro texture, 8k commercial quality'
  );
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [generatedImages, setGeneratedImages] = useState<Array<{
    id: string;
    url: string;
    prompt: string;
    model: string;
    size: string;
    aspectRatio: string;
    timestamp: string;
  }>>([
    {
      id: 'sample-1',
      url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
      prompt: 'Heirloom Karuppu Kavuni black rice grain harvest, sun-dried on organic palm leaves',
      model: 'gemini-3-pro-image-preview',
      size: '2K',
      aspectRatio: '1:1',
      timestamp: 'Recently created',
    },
  ]);

  // Flutter Codebase file viewer state
  const [flutterFiles, setFlutterFiles] = useState<Array<{ path: string; name: string; size: number }>>([]);
  const [selectedFile, setSelectedFile] = useState<string>('lib/main.dart');
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);

  // Backend API test state
  const [apiEndpoint, setApiEndpoint] = useState<string>('/api/v1/news');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);

  // Assistant in simulator
  const [assistantListening, setAssistantListening] = useState<boolean>(false);
  const [assistantReply, setAssistantReply] = useState<string>(
    'Jeevo paramo dharma. The earth flourishes when we give back before taking. How can I help your fields or daily home practices today?'
  );
  const [assistantSmallStep, setAssistantSmallStep] = useState<string>(
    'Add raw vegetable peelings to a dry earthen pot today to create rich living compost without odor.'
  );

  // Time-of-day Sanskrit greeting
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());
  useEffect(() => {
    const timer = setInterval(() => setCurrentHour(new Date().getHours()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    if (currentHour >= 4 && currentHour < 12) {
      return {
        devanagari: 'सुप्रभातं',
        transliteration: 'Supravatam',
        meaning: 'Good morning',
        gradient: 'from-[#FFDAB9] to-[#FEE180]',
        textColor: 'text-[#332014]',
        subtextColor: 'text-[#6B4431]',
      };
    } else if (currentHour >= 12 && currentHour < 16) {
      return {
        devanagari: 'नमस्कार',
        transliteration: 'Namaskar',
        meaning: 'Greetings',
        gradient: 'from-[#BAE6FD] to-[#E0F2FE]',
        textColor: 'text-[#0C4A6E]',
        subtextColor: 'text-[#0369A1]',
      };
    } else if (currentHour >= 16 && currentHour < 20) {
      return {
        devanagari: 'शुभसन्ध्या',
        transliteration: 'Subhasandhya',
        meaning: 'Good evening',
        gradient: 'from-[#FED7AA] to-[#FDA4AF]',
        textColor: 'text-[#4C1D18]',
        subtextColor: 'text-[#881337]',
      };
    } else {
      return {
        devanagari: 'शुभरात्रि',
        transliteration: 'Subharatri',
        meaning: 'Good night',
        gradient: 'from-[#123A25] to-[#091710]',
        textColor: 'text-[#E2E8F0]',
        subtextColor: 'text-[#94A3B8]',
      };
    }
  };

  const greeting = getGreeting();

  // Load flutter files list
  useEffect(() => {
    fetch('/api/flutter-project/files')
      .then((res) => res.json())
      .then((data) => {
        if (data.files) {
          setFlutterFiles(data.files);
        }
      })
      .catch(() => {});
  }, []);

  // Load selected file content
  useEffect(() => {
    if (!selectedFile) return;
    setIsLoadingFile(true);
    fetch(`/api/flutter-project/file-content?path=${encodeURIComponent(selectedFile)}`)
      .then((res) => res.json())
      .then((data) => {
        setFileContent(data.content || '// Content unavailable');
        setIsLoadingFile(false);
      })
      .catch(() => {
        setFileContent('// Error loading file content');
        setIsLoadingFile(false);
      });
  }, [selectedFile]);

  // Speech helper using Web Speech API
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Image Generation Handler
  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    setIsGeneratingImage(true);

    try {
      const endpoint = aiMode === 'generate' ? '/api/gemini/generate-image' : '/api/gemini/edit-image';
      const body =
        aiMode === 'generate'
          ? { prompt, imageSize, aspectRatio }
          : { prompt, baseImage: null };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedImages([
          {
            id: data.id || `gen-${Date.now()}`,
            url: data.imageUrl,
            prompt,
            model: data.model,
            size: imageSize,
            aspectRatio,
            timestamp: 'Just now',
          },
          ...generatedImages,
        ]);
      }
    } catch (err) {
      console.error('Image generation error:', err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Test backend API
  const handleTestApi = async (endpoint: string) => {
    setApiEndpoint(endpoint);
    setIsLoadingApi(true);
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setApiResponse(data);
    } catch (e: any) {
      setApiResponse({ error: e.message });
    } finally {
      setIsLoadingApi(false);
    }
  };

  // 108 Score calculation
  const totalScore108 = Math.min(54, givingScore) + Math.min(54, lightnessScore);

  return (
    <div
      className={`min-h-screen ${
        isKrishna ? 'bg-[#07131B] text-[#EEF9F6]' : 'bg-[#F6FAF7] text-[#0C1F1B]'
      } transition-colors duration-300 flex flex-col font-sans selection:bg-[#00DFB6]/30 selection:text-white`}
    >
      {/* ----------------------------------------------------
          TOP BAR CONTRACT (Exact 3-Zone Architecture)
          Zone 1: Single text element wordmark
          Zone 2: Clean 4-6 text navigation links
          Zone 3: Peacock Theme Switcher + Language + Action
      ---------------------------------------------------- */}
      <header
        className={`sticky top-0 z-50 ${
          isKrishna
            ? 'bg-[#07131B]/95 border-[#1B3E52] text-[#EEF9F6]'
            : 'bg-[#F6FAF7]/95 border-[#D2E3DB] text-[#0C1F1B]'
        } backdrop-blur-md border-b px-6 py-3.5 flex items-center justify-between transition-colors duration-300`}
      >
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2">
          <a
            href="#simulator"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('simulator');
            }}
            className={`text-xl font-bold tracking-tight ${
              isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'
            } flex items-center gap-2`}
          >
            <span
              className={`w-8 h-8 rounded-lg ${
                isKrishna ? 'bg-[#00DFB6] text-[#07131B]' : 'bg-[#097770] text-white'
              } flex items-center justify-center font-sanskrit text-lg font-black shadow-sm transition-colors`}
            >
              प्र
            </span>
            <span>Prakriti</span>
          </a>
          <span
            className={`hidden sm:inline-block text-xs font-sanskrit ${
              isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'
            }`}
          >
            · जीवो परमो धर्मः
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav
          className={`hidden lg:flex items-center gap-7 text-sm font-medium ${
            isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
          }`}
        >
          <button
            onClick={() => setActiveView('simulator')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeView === 'simulator'
                ? isKrishna
                  ? 'text-[#00DFB6] font-semibold'
                  : 'text-[#097770] font-semibold'
                : isKrishna
                ? 'hover:text-[#EEF9F6]'
                : 'hover:text-[#0C1F1B]'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile App</span>
          </button>

          <button
            onClick={() => setActiveView('ai-studio')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeView === 'ai-studio'
                ? isKrishna
                  ? 'text-[#00DFB6] font-semibold'
                  : 'text-[#097770] font-semibold'
                : isKrishna
                ? 'hover:text-[#EEF9F6]'
                : 'hover:text-[#0C1F1B]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
            <span>Gemini AI Studio</span>
          </button>

          <button
            onClick={() => setActiveView('codebase')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeView === 'codebase'
                ? isKrishna
                  ? 'text-[#00DFB6] font-semibold'
                  : 'text-[#097770] font-semibold'
                : isKrishna
                ? 'hover:text-[#EEF9F6]'
                : 'hover:text-[#0C1F1B]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Flutter Codebase</span>
          </button>

          <button
            onClick={() => setActiveView('backend')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeView === 'backend'
                ? isKrishna
                  ? 'text-[#00DFB6] font-semibold'
                  : 'text-[#097770] font-semibold'
                : isKrishna
                ? 'hover:text-[#EEF9F6]'
                : 'hover:text-[#0C1F1B]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>API & Factors</span>
          </button>

          <button
            onClick={() => setActiveView('architecture')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeView === 'architecture'
                ? isKrishna
                  ? 'text-[#00DFB6] font-semibold'
                  : 'text-[#097770] font-semibold'
                : isKrishna
                ? 'hover:text-[#EEF9F6]'
                : 'hover:text-[#0C1F1B]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Architecture & Wisdom</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Peacock Theme Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Peacock Feather Theme Switcher */}
          <div
            className={`flex items-center p-1 rounded-xl border ${
              isKrishna
                ? 'bg-[#0D212E] border-[#1B3E52]'
                : 'bg-white border-[#D2E3DB]'
            } shadow-xs`}
            title="Peacock Feather Theme: Raadha Mode (Light) / Krishna Mode (Dark) / System Mode (Auto)"
          >
            <button
              onClick={() => {
                setThemeMode('radha');
                setSimulatedSystemDark(null);
                speakText('Raadha Mode activated. Morning peacock feather radiance.');
              }}
              className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                themeMode === 'radha'
                  ? 'bg-[#C58F1B] text-white shadow-xs'
                  : isKrishna
                  ? 'text-[#9BC3B9] hover:text-white'
                  : 'text-[#3E564F] hover:text-[#0C1F1B]'
              }`}
              title="Raadha Mode (Light Mode - Morning Feather Radiance)"
            >
              <Sun className="w-3.5 h-3.5 text-[#FFD166]" />
              <span className="hidden sm:inline">Raadha</span>
            </button>

            <button
              onClick={() => {
                setThemeMode('krishna');
                setSimulatedSystemDark(null);
                speakText('Krishna Mode activated. Iridescent peacock plumes in midnight celestial twilight.');
              }}
              className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                themeMode === 'krishna'
                  ? 'bg-[#00DFB6] text-[#07131B] shadow-xs'
                  : isKrishna
                  ? 'text-[#9BC3B9] hover:text-white'
                  : 'text-[#3E564F] hover:text-[#0C1F1B]'
              }`}
              title="Krishna Mode / Krisha Mode (Dark Mode - Iridescent Midnight Plumes)"
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Krishna</span>
            </button>

            <button
              onClick={() => {
                setThemeMode('system');
                setSimulatedSystemDark(null);
                speakText('System Mode activated. Synchronizing with circadian daylight and OS theme.');
              }}
              className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                themeMode === 'system'
                  ? isKrishna
                    ? 'bg-[#183D52] text-[#00DFB6] border border-[#00DFB6]/40'
                    : 'bg-[#EDF5F1] text-[#097770] border border-[#097770]/40'
                  : isKrishna
                  ? 'text-[#9BC3B9] hover:text-white'
                  : 'text-[#3E564F] hover:text-[#0C1F1B]'
              }`}
              title="System Mode (Auto - Circadian Solar Cycle & Device Sync)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">System</span>
            </button>
          </div>

          {/* 12-Language Selector */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                const l = LANGUAGES.find((x) => x.code === e.target.value);
                if (l) speakText(`Prakriti language switched to ${l.native}`);
              }}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none cursor-pointer border ${
                isKrishna
                  ? 'bg-[#0D212E] border-[#1B3E52] text-[#EEF9F6]'
                  : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
              }`}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className={isKrishna ? 'bg-[#0D212E]' : ''}>
                  {l.native} ({l.name})
                </option>
              ))}
            </select>
          </div>

          {/* Principle of 108 Sacred Button */}
          <button
            onClick={() => setShowPrincipleModal(true)}
            className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap ${
              isKrishna
                ? 'bg-[#102B3C] border-[#00DFB6]/40 text-[#00DFB6] hover:bg-[#15364C]'
                : 'bg-[#EDF5F1] border-[#097770]/30 text-[#097770] hover:bg-[#DCEEE5]'
            }`}
            title="Read the Sacred Principle of 108 (1 · 0 · ∞)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            <span className="hidden md:inline">Principle of 108</span>
          </button>

          {/* Firebase Connection & Auth Status Badge */}
          <div
            className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border text-xs ${
              isKrishna ? 'bg-[#0D212E] border-[#1B3E52]' : 'bg-white border-[#D2E3DB]'
            }`}
          >
            <div className="flex items-center gap-1.5" title="Firebase Firestore: Connected (startup-rig-5mn89)">
              <div
                className={`w-2 h-2 rounded-full ${
                  firebaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className={`text-[10px] font-mono hidden xl:inline ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}`}>
                {isSyncingScore ? 'Syncing...' : 'Firestore'}
              </span>
            </div>

            {currentUser && !currentUser.isAnonymous ? (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold max-w-[100px] truncate">
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </span>
                <button
                  onClick={async () => {
                    await logoutUser();
                    loginAsGuest().then(setCurrentUser);
                  }}
                  className={`p-1 rounded hover:bg-black/10 transition-colors ${
                    isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'
                  }`}
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={async () => {
                  try {
                    const u = await loginWithGoogle();
                    if (u) setCurrentUser(u);
                  } catch (e: any) {
                    setAuthError(e?.message || 'Login error');
                  }
                }}
                className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded transition-all ${
                  isKrishna
                    ? 'bg-[#00DFB6]/20 text-[#00DFB6] hover:bg-[#00DFB6]/30'
                    : 'bg-[#097770]/15 text-[#097770] hover:bg-[#097770]/25'
                }`}
                title="Connect real Google Account"
              >
                <LogIn className="w-3 h-3" />
                <span>Google Sign-In</span>
              </button>
            )}
          </div>

          {/* 1-Click ZIP Download of full Flutter project */}
          <a
            href="/api/flutter-project/download-zip"
            download="prakriti_flutter_mobile_app.zip"
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap active:scale-[0.98] ${
              isKrishna
                ? 'bg-[#00DFB6] hover:bg-[#00C29F] text-[#07131B]'
                : 'bg-[#097770] hover:bg-[#065A54] text-white'
            }`}
            title="Download full runnable Flutter source folder (Android & iOS)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Download Flutter Zip</span>
          </a>
        </div>
      </header>

      {/* ----------------------------------------------------
          MAIN VIEW CONTAINER
      ---------------------------------------------------- */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* VIEW 1: MOBILE APP SIMULATOR */}
        {activeView === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Context, Features, & Quick Controls */}
            <div className="lg:col-span-5 space-y-6">
              {/* Peacock Feather Color Themes & Dedicated System Mode Section */}
              <div
                className={`rounded-2xl p-5 border transition-all duration-300 ${
                  isKrishna
                    ? 'bg-[#0D212E] border-[#1B3E52] text-[#EEF9F6] shadow-[0_0_30px_rgba(0,223,182,0.08)]'
                    : 'bg-white border-[#D2E3DB] text-[#0C1F1B] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isKrishna ? 'bg-[#00DFB6]/20 text-[#00DFB6]' : 'bg-[#097770]/15 text-[#097770]'
                      }`}
                    >
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold leading-tight">
                        Peacock Feather Themes (मयूर पिच्छ रंग विधान)
                      </h3>
                      <p className={`text-[10px] mt-0.5 ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}`}>
                        Palette sourced directly from the sacred peacock feather (Mor Pankh)
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isKrishna
                        ? 'bg-[#00DFB6]/15 text-[#00DFB6] border border-[#00DFB6]/30'
                        : 'bg-[#C58F1B]/15 text-[#C58F1B] border border-[#C58F1B]/30'
                    }`}
                  >
                    {isKrishna ? 'Krishna / श्याम' : 'Raadha / राधा'}
                  </span>
                </div>

                {/* 3-Way Mode Pill Selector */}
                <div
                  className={`grid grid-cols-3 gap-1.5 p-1 rounded-xl border ${
                    isKrishna ? 'bg-[#07131B] border-[#1B3E52]' : 'bg-[#EDF5F1] border-[#D2E3DB]'
                  }`}
                >
                  <button
                    onClick={() => {
                      setThemeMode('radha');
                      setSimulatedSystemDark(null);
                      speakText('Switched to Raadha Mode.');
                    }}
                    className={`py-2 px-2 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      themeMode === 'radha'
                        ? 'bg-[#C58F1B] text-white shadow-sm'
                        : isKrishna
                        ? 'text-[#9BC3B9] hover:text-white'
                        : 'text-[#3E564F] hover:text-[#0C1F1B]'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-[#FFD166]" />
                      <span>Raadha</span>
                    </div>
                    <span className="text-[9px] opacity-80 font-normal">Light Mode</span>
                  </button>

                  <button
                    onClick={() => {
                      setThemeMode('krishna');
                      setSimulatedSystemDark(null);
                      speakText('Switched to Krishna Mode.');
                    }}
                    className={`py-2 px-2 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      themeMode === 'krishna'
                        ? 'bg-[#00DFB6] text-[#07131B] shadow-sm'
                        : isKrishna
                        ? 'text-[#9BC3B9] hover:text-white'
                        : 'text-[#3E564F] hover:text-[#0C1F1B]'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Moon className="w-3.5 h-3.5" />
                      <span>Krishna</span>
                    </div>
                    <span className="text-[9px] opacity-80 font-normal">Dark Mode</span>
                  </button>

                  <button
                    onClick={() => {
                      setThemeMode('system');
                      setSimulatedSystemDark(null);
                      speakText('Switched to System Mode.');
                    }}
                    className={`py-2 px-2 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      themeMode === 'system'
                        ? isKrishna
                          ? 'bg-[#183D52] text-[#00DFB6] border border-[#00DFB6]/40'
                          : 'bg-white text-[#097770] border border-[#097770]/40 shadow-xs'
                        : isKrishna
                        ? 'text-[#9BC3B9] hover:text-white'
                        : 'text-[#3E564F] hover:text-[#0C1F1B]'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Monitor className="w-3.5 h-3.5" />
                      <span>System</span>
                    </div>
                    <span className="text-[9px] opacity-80 font-normal">Auto Cycle</span>
                  </button>
                </div>

                {/* Peacock Feather Palette Swatches (Anatomy Breakdown) */}
                <div className="mt-3.5 pt-3 border-t border-current/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>Peacock Feather Palette Anatomy</span>
                    </span>
                    <span className={`text-[10px] font-normal ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}`}>
                      {effectiveTheme === 'krishna' ? 'Krishna Night Velvet' : 'Raadha Morning Radiance'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {/* Swatch 1: Chandrika Gold */}
                    <div
                      className={`p-2 rounded-xl border text-center transition-all ${
                        isKrishna ? 'bg-[#142C3C] border-[#1B3E52]' : 'bg-[#FAFCF8] border-[#D2E3DB]'
                      }`}
                    >
                      <div
                        className="w-full h-5 rounded-md mb-1.5 shadow-xs"
                        style={{
                          backgroundColor: isKrishna ? '#FFB800' : '#C58F1B',
                        }}
                      />
                      <div className="text-[10px] font-bold leading-tight truncate">Chandrika</div>
                      <div className={`text-[8px] font-mono mt-0.5 ${isKrishna ? 'text-[#FFB800]' : 'text-[#C58F1B]'}`}>
                        {isKrishna ? '#FFB800' : '#C58F1B'}
                      </div>
                      <div className="text-[8px] opacity-75 mt-0.5 truncate">Feather Eye</div>
                    </div>

                    {/* Swatch 2: Mayur Kanth */}
                    <div
                      className={`p-2 rounded-xl border text-center transition-all ${
                        isKrishna ? 'bg-[#142C3C] border-[#1B3E52]' : 'bg-[#FAFCF8] border-[#D2E3DB]'
                      }`}
                    >
                      <div
                        className="w-full h-5 rounded-md mb-1.5 shadow-xs"
                        style={{
                          backgroundColor: isKrishna ? '#00DFB6' : '#097770',
                        }}
                      />
                      <div className="text-[10px] font-bold leading-tight truncate">Mayur Kanth</div>
                      <div className={`text-[8px] font-mono mt-0.5 ${isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'}`}>
                        {isKrishna ? '#00DFB6' : '#097770'}
                      </div>
                      <div className="text-[8px] opacity-75 mt-0.5 truncate">Throat Teal</div>
                    </div>

                    {/* Swatch 3: Pankh Plumes */}
                    <div
                      className={`p-2 rounded-xl border text-center transition-all ${
                        isKrishna ? 'bg-[#142C3C] border-[#1B3E52]' : 'bg-[#FAFCF8] border-[#D2E3DB]'
                      }`}
                    >
                      <div
                        className="w-full h-5 rounded-md mb-1.5 shadow-xs"
                        style={{
                          backgroundColor: isKrishna ? '#10B981' : '#1A5F44',
                        }}
                      />
                      <div className="text-[10px] font-bold leading-tight truncate">Plumes</div>
                      <div className={`text-[8px] font-mono mt-0.5 ${isKrishna ? 'text-[#10B981]' : 'text-[#1A5F44]'}`}>
                        {isKrishna ? '#10B981' : '#1A5F44'}
                      </div>
                      <div className="text-[8px] opacity-75 mt-0.5 truncate">Emerald Barbs</div>
                    </div>

                    {/* Swatch 4: Danda / Velvet Shaft */}
                    <div
                      className={`p-2 rounded-xl border text-center transition-all ${
                        isKrishna ? 'bg-[#142C3C] border-[#1B3E52]' : 'bg-[#FAFCF8] border-[#D2E3DB]'
                      }`}
                    >
                      <div
                        className="w-full h-5 rounded-md mb-1.5 shadow-xs"
                        style={{
                          backgroundColor: isKrishna ? '#07131B' : '#F6FAF7',
                          border: isKrishna ? '1px solid #1B3E52' : '1px solid #D2E3DB',
                        }}
                      />
                      <div className="text-[10px] font-bold leading-tight truncate">Danda Shaft</div>
                      <div className={`text-[8px] font-mono mt-0.5 ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}`}>
                        {isKrishna ? '#07131B' : '#F6FAF7'}
                      </div>
                      <div className="text-[8px] opacity-75 mt-0.5 truncate">Velvet Base</div>
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    DEDICATED SECTION FOR SYSTEM MODE
                    (Requirement: "Make section for system mode as well")
                ---------------------------------------------------- */}
                <div
                  className={`mt-4 p-3.5 rounded-xl border transition-all ${
                    themeMode === 'system'
                      ? isKrishna
                        ? 'bg-[#102B3C] border-[#00DFB6]/50 shadow-[0_0_20px_rgba(0,223,182,0.15)]'
                        : 'bg-[#EDF5F1] border-[#097770]/40 shadow-xs'
                      : isKrishna
                      ? 'bg-[#07131B]/70 border-[#1B3E52]'
                      : 'bg-[#FAFCF8] border-[#D2E3DB]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Monitor className={`w-4 h-4 ${isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'}`} />
                      <span className="text-xs font-bold">
                        System Mode Section (प्रणाली अनुसार)
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        themeMode === 'system'
                          ? isKrishna
                            ? 'bg-[#00DFB6] text-[#07131B]'
                            : 'bg-[#097770] text-white'
                          : isKrishna
                          ? 'bg-[#183D52] text-[#9BC3B9]'
                          : 'bg-[#D2E3DB] text-[#3E564F]'
                      }`}
                    >
                      {themeMode === 'system' ? '● Currently Managing Theme' : 'Inactive (Manual Override)'}
                    </span>
                  </div>

                  <p className={`text-[11px] mt-2 leading-relaxed ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}`}>
                    System Mode honors the ancient Vedic principle of <strong>Ritucharya</strong> and diurnal
                    synchronization. It connects to the client device’s <code className="font-mono text-[10px] bg-black/10 px-1 rounded">prefers-color-scheme</code> API
                    to seamlessly flow from <strong>Raadha Mode</strong> (giving, sunlight, sacred greens) during the day,
                    into <strong>Krishna Mode</strong> (iridescent night peacock indigo, star cooling, reflection) at dusk.
                  </p>

                  {/* System Diagnostics & Status Grid */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                    <div
                      className={`p-2 rounded-lg border ${
                        isKrishna ? 'bg-[#07131B] border-[#1B3E52]' : 'bg-white border-[#D2E3DB]'
                      }`}
                    >
                      <span className={`block font-semibold ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}`}>
                        Hardware OS Reports:
                      </span>
                      <span className="font-bold flex items-center gap-1 mt-0.5">
                        {systemPrefersDark ? (
                          <>
                            <Moon className="w-3 h-3 text-[#00DFB6]" /> Dark Preference
                          </>
                        ) : (
                          <>
                            <Sun className="w-3 h-3 text-[#FFB800]" /> Light Preference
                          </>
                        )}
                      </span>
                    </div>

                    <div
                      className={`p-2 rounded-lg border ${
                        isKrishna ? 'bg-[#07131B] border-[#1B3E52]' : 'bg-white border-[#D2E3DB]'
                      }`}
                    >
                      <span className={`block font-semibold ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}`}>
                        Active Render Target:
                      </span>
                      <span
                        className={`font-bold flex items-center gap-1 mt-0.5 ${
                          effectiveTheme === 'krishna' ? 'text-[#00DFB6]' : 'text-[#097770]'
                        }`}
                      >
                        {effectiveTheme === 'krishna' ? '🦚 Krishna Mode (Dark)' : '🪶 Raadha Mode (Light)'}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Testing Controls for System Mode */}
                  <div className="mt-3 pt-2.5 border-t border-current/10 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setThemeMode('system');
                        setSimulatedSystemDark((prev) => (prev !== null ? !prev : !systemPrefersDark));
                        speakText('Simulating OS diurnal day/night transition in System Mode.');
                      }}
                      className={`py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                        isKrishna
                          ? 'bg-[#00DFB6] hover:bg-[#00C29F] text-[#07131B]'
                          : 'bg-[#097770] hover:bg-[#065A54] text-white'
                      }`}
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>
                        Simulate OS {activeSystemIsDark ? 'Daytime (Raadha)' : 'Nighttime (Krishna)'} Shift
                      </span>
                    </button>

                    {simulatedSystemDark !== null && (
                      <button
                        onClick={() => {
                          setSimulatedSystemDark(null);
                          speakText('Reset back to live hardware device sensor.');
                        }}
                        className={`text-[10px] underline font-semibold ${
                          isKrishna ? 'text-[#FFB800]' : 'text-[#C58F1B]'
                        }`}
                      >
                        Reset to Real Hardware Sensor
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`rounded-2xl p-6 border transition-all ${
                  isKrishna
                    ? 'bg-[#0D212E] border-[#1B3E52] text-[#EEF9F6]'
                    : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
                }`}
              >
                <div className={`flex items-center justify-between text-xs mb-2 ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#7F8E85]'}`}>
                  <span>Flutter 3.24 · Android & iOS</span>
                  <span>·</span>
                  <span>108 Double Arc</span>
                  <span>·</span>
                  <span>12 Spoken Languages</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Prakriti Mobile Simulator
                </h2>
                <p className={`text-sm mt-2 leading-relaxed ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}`}>
                  Interact with the real mobile app below. It enforces{' '}
                  <strong className={isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'}>giving leads</strong>, never scolds,
                  verifies organic sellers across 3 honest tiers, connects local circles (~3
                  km), and speaks with reverence in 12 languages.
                </p>

                {/* Device Frame Toggle */}
                <div className={`mt-5 pt-4 border-t flex items-center justify-between ${isKrishna ? 'border-[#1B3E52]' : 'border-[#D2E3DB]'}`}>
                  <span className={`text-xs font-semibold ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}`}>Preview Frame:</span>
                  <div className={`flex items-center gap-1 p-1 rounded-lg ${isKrishna ? 'bg-[#07131B]' : 'bg-[#EEF3EC]'}`}>
                    <button
                      onClick={() => setPhoneFrame('iphone')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        phoneFrame === 'iphone'
                          ? isKrishna
                            ? 'bg-[#183D52] text-[#EEF9F6] shadow-sm'
                            : 'bg-white text-[#17231D] shadow-sm'
                          : isKrishna
                          ? 'text-[#9BC3B9] hover:text-[#EEF9F6]'
                          : 'text-[#4A5A51] hover:text-[#17231D]'
                      }`}
                    >
                      iPhone 16 Pro
                    </button>
                    <button
                      onClick={() => setPhoneFrame('android')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        phoneFrame === 'android'
                          ? isKrishna
                            ? 'bg-[#183D52] text-[#EEF9F6] shadow-sm'
                            : 'bg-white text-[#17231D] shadow-sm'
                          : isKrishna
                          ? 'text-[#9BC3B9] hover:text-[#EEF9F6]'
                          : 'text-[#4A5A51] hover:text-[#17231D]'
                      }`}
                    >
                      Pixel 9 / Android
                    </button>
                  </div>
                </div>
              </div>

              {/* Full Interactive 1 -> 0 -> ∞ Scoring Graph & Principle of 108 */}
              <Sacred108Graph
                givingScore={givingScore}
                lightnessScore={lightnessScore}
                isKrishna={isKrishna}
                compact={false}
                onUpdateGiving={(val) => saveScoresToFirebase(val, lightnessScore)}
                onUpdateLightness={(val) => saveScoresToFirebase(givingScore, val)}
                onOpenPrincipleModal={() => setShowPrincipleModal(true)}
              />
              {false && (
                <div>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Leaf className={`w-4 h-4 ${isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'}`} />
                  <span>The 108 Principle (Two Halves of 54)</span>
                </h3>
                <p
                  className={`text-xs mt-1.5 leading-relaxed ${
                    isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                  }`}
                >
                  The two figures are <em>never netted against each other</em>. A heavy travel day
                  cannot erase the seeds you planted; giving trees cannot excuse pollution. Both
                  arcs stay visible, with giving on top.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div
                    className={`p-3 rounded-xl border ${
                      isKrishna
                        ? 'bg-[#142C3C] border-[#1B3E52]'
                        : 'bg-white border-[#D2E3DB]'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-1.5 text-xs font-bold ${
                        isKrishna ? 'text-[#FFB800]' : 'text-[#C58F1B]'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isKrishna ? 'bg-[#FFB800]' : 'bg-[#C58F1B]'
                        }`}
                      />
                      <span>Given Back ({givingScore}/54)</span>
                    </div>
                    <div
                      className={`text-[11px] mt-1 ${
                        isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'
                      }`}
                    >
                      7 Life Acts: Planting, feeding soil, poison-free food, wild birds.
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-xl border ${
                      isKrishna
                        ? 'bg-[#142C3C] border-[#1B3E52]'
                        : 'bg-white border-[#D2E3DB]'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-1.5 text-xs font-bold ${
                        isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isKrishna ? 'bg-[#00DFB6]' : 'text-[#097770]'
                        }`}
                      />
                      <span>Lived Lightly ({lightnessScore}/54)</span>
                    </div>
                    <div
                      className={`text-[11px] mt-1 ${
                        isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'
                      }`}
                    >
                      Resource budget: 6.3 kg CO2e benchmark against CEA grid & travel.
                    </div>
                  </div>
                </div>
              </div>
              )}

              {/* Quick Actions to trigger modals */}
              <div
                className={`rounded-2xl p-5 border space-y-2.5 transition-colors ${
                  isKrishna
                    ? 'bg-[#0D212E] border-[#1B3E52] text-[#EEF9F6]'
                    : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
                }`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'
                  }`}
                >
                  Test Dedicated Mobile Flows
                </span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setSimTab('habits')}
                    className={`p-2.5 rounded-xl text-left transition-colors flex items-center gap-2 text-xs font-semibold ${
                      isKrishna
                        ? 'bg-[#142C3C] hover:bg-[#1A384C] text-[#FFB800]'
                        : 'bg-[#EDF5F1] hover:bg-[#DCEEE5] text-[#C58F1B]'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-[#FFB800]" />
                    <span>Habits & Streaks</span>
                  </button>
                  <button
                    onClick={() => setShowAssistantModal(true)}
                    className={`p-2.5 rounded-xl text-left transition-colors flex items-center gap-2 text-xs font-semibold ${
                      isKrishna
                        ? 'bg-[#142C3C] hover:bg-[#1A384C] text-[#00DFB6]'
                        : 'bg-[#EDF5F1] hover:bg-[#DCEEE5] text-[#097770]'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    <span>Voice Assistant</span>
                  </button>
                  <button
                    onClick={() => setShowSellerOnboarding(true)}
                    className={`p-2.5 rounded-xl text-left transition-colors flex items-center gap-2 text-xs font-semibold ${
                      isKrishna
                        ? 'bg-[#142C3C] hover:bg-[#1A384C] text-[#EEF9F6]'
                        : 'bg-[#EDF5F1] hover:bg-[#DCEEE5] text-[#0C1F1B]'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Seller Onboarding</span>
                  </button>
                  <button
                    onClick={() => setShowWisdomScreen(true)}
                    className={`p-2.5 rounded-xl text-left transition-colors flex items-center gap-2 text-xs font-semibold ${
                      isKrishna
                        ? 'bg-[#142C3C] hover:bg-[#1A384C] text-[#FFB800]'
                        : 'bg-[#EDF5F1] hover:bg-[#DCEEE5] text-[#C58F1B]'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Veda & Gita Verses</span>
                  </button>
                  <button
                    onClick={() => setShowPrivacyScreen(true)}
                    className={`p-2.5 rounded-xl text-left transition-colors flex items-center gap-2 text-xs font-semibold ${
                      isKrishna
                        ? 'bg-[#142C3C] hover:bg-[#1A384C] text-[#00DFB6]'
                        : 'bg-[#EDF5F1] hover:bg-[#DCEEE5] text-[#097770]'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Privacy & Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Smartphone Shell */}
            <div className="lg:col-span-7 flex justify-center">
              <div
                className={`relative w-[385px] h-[780px] bg-black rounded-[48px] p-3 shadow-2xl border-4 transition-all duration-300 ${
                  phoneFrame === 'iphone'
                    ? isKrishna
                      ? 'border-[#1B3E52] shadow-[0_0_50px_rgba(0,223,182,0.18)]'
                      : 'border-[#333]'
                    : isKrishna
                    ? 'border-[#183D52] shadow-[0_0_50px_rgba(0,223,182,0.18)]'
                    : 'border-[#222]'
                }`}
              >
                {/* Dynamic Island / Punch Hole */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] mr-3" />
                  <div className={`w-2 h-2 rounded-full ${isKrishna ? 'bg-[#00DFB6]' : 'bg-[#0a192f]'}`} />
                </div>

                {/* Inner Screen */}
                <div
                  className={`w-full h-full ${
                    isKrishna ? 'bg-[#091A26] text-[#EEF9F6]' : 'bg-[#FAFCF8] text-[#0C1F1B]'
                  } rounded-[38px] overflow-hidden flex flex-col relative select-none transition-colors duration-300`}
                >
                  {/* Status Bar */}
                  <div
                    className={`h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-semibold ${
                      isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'
                    } z-30`}
                  >
                    <span>
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span>5G</span>
                      <div className="w-4 h-2 border border-current rounded-sm p-0.5">
                        <div className="h-full bg-current rounded-2xs w-3" />
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Screen Content */}
                  <div className="flex-1 overflow-y-auto">
                    {/* TAB: TODAY */}
                    {simTab === 'today' && (
                      <div>
                        {/* Sky Header */}
                        <div
                          className={`bg-gradient-to-b ${
                            isKrishna
                              ? 'from-[#04111D] via-[#092233] to-[#0D344B]'
                              : greeting.gradient
                          } pt-4 pb-6 px-5 rounded-b-[28px] shadow-sm transition-all duration-300`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span
                              className={`font-bold tracking-widest text-[10px] ${
                                isKrishna ? 'text-[#00DFB6]' : greeting.subtextColor
                              }`}
                            >
                              PRAKRITI · प्रकृति · {isKrishna ? 'कृष्ण रूप' : 'राधा भाव'}
                            </span>
                            <button
                              onClick={() => {
                                const phrase = `${greeting.devanagari}, ${greeting.meaning}. Welcome to Prakriti.`;
                                speakText(phrase);
                              }}
                              className={`p-1 rounded-full ${
                                isKrishna
                                  ? 'bg-white/10 text-[#00DFB6] hover:bg-white/20'
                                  : 'bg-white/30 text-[#17231D] hover:bg-white/50'
                              } transition-colors`}
                              title="Listen to spoken greeting"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h1
                            className={`font-sanskrit text-3xl font-bold mt-2 ${
                              isKrishna ? 'text-[#FFB800]' : greeting.textColor
                            }`}
                          >
                            {greeting.devanagari}
                          </h1>
                          <div
                            className={`text-xs font-semibold ${
                              isKrishna ? 'text-[#9BC3B9]' : greeting.subtextColor
                            } flex items-center gap-1 mt-0.5`}
                          >
                            <span>{greeting.transliteration}</span>
                            <span>·</span>
                            <span>{greeting.meaning}</span>
                          </div>
                          <p
                            className={`text-[11px] italic mt-1 ${
                              isKrishna ? 'text-[#EEF9F6]/80' : 'text-[#17231D]/80'
                            }`}
                          >
                            Jeevo paramo dharma — Life itself is the highest duty
                          </p>
                        </div>

                        {/* 108 Sacred 1 -> 0 -> ∞ Scoring Graph */}
                        <div className="p-3">
                          <Sacred108Graph
                            givingScore={givingScore}
                            lightnessScore={lightnessScore}
                            isKrishna={isKrishna}
                            compact={true}
                            onUpdateGiving={(val) => saveScoresToFirebase(val, lightnessScore)}
                            onUpdateLightness={(val) => saveScoresToFirebase(givingScore, val)}
                            onOpenPrincipleModal={() => setShowPrincipleModal(true)}
                          />
                        </div>

                          {/* Daily Small Step */}
                          <div
                            className={`mt-3.5 p-3.5 rounded-2xl border transition-colors ${
                              isKrishna
                                ? 'bg-[#102B3C] border-[#1B3E52] text-[#EEF9F6]'
                                : 'bg-[#EDF5F1] border-[#D2E3DB] text-[#0C1F1B]'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                              <span className={isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'}>
                                Daily Small Step
                              </span>
                              <span className={isKrishna ? 'text-[#10B981]' : 'text-[#1A5F44]'}>
                                No-Cost Action
                              </span>
                            </div>
                            <h4 className="text-xs font-bold">
                              Feed garden soil with organic vegetable scraps
                            </h4>
                            <p
                              className={`text-[11px] mt-1 leading-normal ${
                                isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                              }`}
                            >
                              Raw kitchen peelings nourish beneficial earthworms and retain soil
                              moisture during peak daylight.
                            </p>
                          </div>

                          {/* Gemini AI Eco Studio Card in App */}
                          <button
                            onClick={() => setActiveView('ai-studio')}
                            className={`mt-3 w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-[0.98] ${
                              isKrishna
                                ? 'bg-gradient-to-r from-[#0C2D3A] to-[#124C58] border-[#00DFB6]/30 text-white'
                                : 'bg-gradient-to-r from-[#E8F5E9] to-[#C8E6C9] border-[#097770]/30 text-[#0C1F1B]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                  isKrishna ? 'bg-[#00DFB6] text-[#07131B]' : 'bg-[#097770] text-white'
                                }`}
                              >
                                <Sparkles className="w-4 h-4 text-[#FFB800]" />
                              </div>
                              <div>
                                <div className="text-xs font-bold">
                                  Gemini AI Eco Studio
                                </div>
                                <div
                                  className={`text-[10px] ${
                                    isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'
                                  }`}
                                >
                                  Create & edit images with 3.1 Flash & 3 Pro (1K, 2K, 4K)
                                </div>
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 ${isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'}`}
                            />
                          </button>

                          {/* Verse of the Day Card */}
                          <div
                            className={`mt-3.5 p-3.5 rounded-2xl border transition-colors ${
                              isKrishna
                                ? 'bg-[#0D212E] border-[#1B3E52]'
                                : 'bg-white border-[#D2E3DB]'
                            }`}
                          >
                            <div
                              className={`text-[9px] font-bold uppercase tracking-wider ${
                                isKrishna ? 'text-[#FFB800]' : 'text-[#C58F1B]'
                              }`}
                            >
                              Atharva Veda 12.1.12 · Bhumi Sukta
                            </div>
                            <div className="font-sanskrit text-base font-semibold mt-1">
                              माता भूमिः पुत्रो अहं पृथिव्याः
                            </div>
                            <div
                              className={`text-[11px] italic mt-0.5 ${
                                isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                              }`}
                            >
                              "Earth is my mother, and I am her child."
                            </div>
                            <div
                              className={`mt-2 text-[10px] font-semibold p-2 rounded-lg ${
                                isKrishna
                                  ? 'text-[#00DFB6] bg-[#00DFB6]/10 border border-[#00DFB6]/20'
                                  : 'text-[#097770] bg-[#EDF5F1] border border-[#D2E3DB]'
                              }`}
                            >
                              Practice step: Treat every patch of open soil with reverence; leave no
                              plastic behind.
                            </div>
                          </div>

                          {/* Daily Habits Quick Widget in Today View */}
                          <div
                            className={`mt-3.5 p-3.5 rounded-2xl border space-y-2 transition-colors ${
                              isKrishna
                                ? 'bg-[#0D212E] border-[#1B3E52]'
                                : 'bg-white border-[#D2E3DB]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Flame className="w-4 h-4 text-[#FFB800]" />
                                <span className="text-xs font-bold">Daily Eco Habits</span>
                              </div>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                  isKrishna
                                    ? 'text-[#00DFB6] bg-[#00DFB6]/15'
                                    : 'text-[#097770] bg-[#EDF5F1]'
                                }`}
                              >
                                {habits.filter((h) => h.completedToday).length}/{habits.length} Done Today
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {habits.slice(0, 2).map((h) => (
                                <div
                                  key={h.id}
                                  onClick={() => handleToggleHabit(h.id)}
                                  className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer border transition-colors ${
                                    isKrishna
                                      ? 'bg-[#142C3C] border-[#1B3E52] hover:bg-[#1A384C]'
                                      : 'bg-[#FAFCF8] border-[#D2E3DB] hover:bg-[#EDF5F1]'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                        h.completedToday
                                          ? isKrishna
                                            ? 'bg-[#00DFB6] border-[#00DFB6] text-[#07131B]'
                                            : 'bg-[#097770] border-[#097770] text-white'
                                          : isKrishna
                                          ? 'border-[#5E857C] bg-[#07131B]'
                                          : 'border-[#7F8E85] bg-white'
                                      }`}
                                    >
                                      {h.completedToday && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <span
                                      className={`font-medium ${
                                        h.completedToday
                                          ? 'line-through opacity-50'
                                          : ''
                                      }`}
                                    >
                                      {h.title}
                                    </span>
                                  </div>
                                  <span
                                    className={`text-[10px] font-bold flex items-center gap-0.5 ${
                                      isKrishna ? 'text-[#FFB800]' : 'text-[#C58F1B]'
                                    }`}
                                  >
                                    <Flame className="w-3 h-3 text-[#FFB800]" /> {h.streak}d
                                  </span>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => setSimTab('habits')}
                              className={`w-full text-center text-[11px] font-bold hover:underline pt-1 flex items-center justify-center gap-1 ${
                                isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'
                              }`}
                            >
                              <span>Open Habits tracker & streak counter</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                    )}

                    {/* TAB: HABITS & STREAKS */}
                    {simTab === 'habits' && (
                      <div className="p-4 space-y-3.5">
                        {/* Tab Title & Header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3
                                className={`text-base font-bold ${
                                  isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'
                                }`}
                              >
                                Ecological Habits
                              </h3>
                              <span
                                className={`font-sanskrit text-xs font-semibold ${
                                  isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'
                                }`}
                              >
                                दैनिक साधना
                              </span>
                            </div>
                            <p
                              className={`text-[10px] mt-0.5 ${
                                isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                              }`}
                            >
                              Daily recurring acts that keep soil, flora & birds thriving.
                            </p>
                          </div>
                          <button
                            onClick={() => setShowAddHabitModal(true)}
                            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold shadow-sm ${
                              isKrishna
                                ? 'bg-[#00DFB6] hover:bg-[#00C29F] text-[#07131B]'
                                : 'bg-[#097770] hover:bg-[#065A54] text-white'
                            }`}
                            title="Add Custom Ecological Habit"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>

                        {/* Top Streaks Highlight Banner */}
                        <div
                          className={`p-3.5 rounded-2xl shadow-md space-y-2.5 transition-colors ${
                            isKrishna
                              ? 'bg-gradient-to-r from-[#0C2D3A] via-[#103D4E] to-[#124C58] border border-[#00DFB6]/30 text-white'
                              : 'bg-gradient-to-r from-[#097770] to-[#1A5F44] text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm ${
                                  isKrishna ? 'bg-black/30' : 'bg-white/20'
                                }`}
                              >
                                <Flame className="w-5 h-5 text-[#FFB800]" />
                              </div>
                              <div>
                                <div className="text-[10px] font-medium text-white/80 uppercase tracking-wider">
                                  Current Rhythm
                                </div>
                                <div className="text-sm font-extrabold flex items-center gap-1.5">
                                  <span>
                                    {habits.filter((h) => h.completedToday).length} of {habits.length} Done Today
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] font-medium text-white/80">
                                Longest Streak
                              </div>
                              <div className="text-base font-black text-[#FFB800] flex items-center justify-end gap-1">
                                <span>{Math.max(...habits.map((h) => h.streak), 0)} days</span>
                              </div>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="space-y-1">
                            <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  isKrishna ? 'bg-[#FFB800]' : 'bg-[#FFD166]'
                                }`}
                                style={{
                                  width: `${(habits.filter((h) => h.completedToday).length / Math.max(habits.length, 1)) * 100}%`,
                                }}
                              />
                            </div>
                            <div className="flex justify-between text-[9px] text-white/85 font-medium">
                              <span>Consistent small acts protect ecosystems</span>
                              <span className="font-bold">
                                +{habits.reduce((acc, h) => acc + (h.completedToday ? h.pts : 0), 0)} Giving pts
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Celebration Toast (when habit completed) */}
                        {celebratingHabitId && (
                          <div
                            className={`p-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold border ${
                              isKrishna
                                ? 'bg-[#142C3C] border-[#FFB800]/50 text-[#FFB800]'
                                : 'bg-[#FFF9EB] border-[#C58F1B]/40 text-[#6B4431]'
                            }`}
                          >
                            <Sparkles className="w-4 h-4 text-[#FFB800] shrink-0" />
                            <span>
                              Sadhu! Daily rhythm sustained. Your streak increased!
                            </span>
                          </div>
                        )}

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-1.5 text-xs">
                          {(
                            [
                              { key: 'all', label: `All (${habits.length})` },
                              {
                                key: 'pending',
                                label: `To Do (${habits.filter((h) => !h.completedToday).length})`,
                              },
                              {
                                key: 'completed',
                                label: `Done (${habits.filter((h) => h.completedToday).length})`,
                              },
                            ] as const
                          ).map((tab) => (
                            <button
                              key={tab.key}
                              onClick={() => setHabitFilter(tab.key)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors border ${
                                habitFilter === tab.key
                                  ? isKrishna
                                    ? 'bg-[#00DFB6] text-[#07131B] border-[#00DFB6]'
                                    : 'bg-[#097770] text-white border-[#097770]'
                                  : isKrishna
                                  ? 'bg-[#102B3C] text-[#9BC3B9] border-[#1B3E52] hover:bg-[#183D52]'
                                  : 'bg-white text-[#3E564F] border-[#D2E3DB] hover:bg-[#EDF5F1]'
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>

                        {/* Habit Cards */}
                        <div className="space-y-2.5">
                          {habits
                            .filter((h) => {
                              if (habitFilter === 'pending') return !h.completedToday;
                              if (habitFilter === 'completed') return h.completedToday;
                              return true;
                            })
                            .map((habit) => (
                              <div
                                key={habit.id}
                                className={`p-3 rounded-2xl border transition-all ${
                                  habit.completedToday
                                    ? isKrishna
                                      ? 'bg-[#0D2636] border-[#00DFB6]/30'
                                      : 'bg-[#FAFCF8] border-[#097770]/30 shadow-xs'
                                    : isKrishna
                                    ? 'bg-[#0D212E] border-[#1B3E52] hover:border-[#00DFB6]/40'
                                    : 'bg-white border-[#D2E3DB] shadow-xs hover:border-[#097770]/40'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2.5">
                                  {/* Checkbox circle */}
                                  <button
                                    onClick={() => handleToggleHabit(habit.id)}
                                    className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                                      habit.completedToday
                                        ? isKrishna
                                          ? 'bg-[#00DFB6] border-[#00DFB6] text-[#07131B] shadow-xs'
                                          : 'bg-[#097770] border-[#097770] text-white shadow-xs'
                                        : isKrishna
                                        ? 'border-[#42645C] bg-[#07131B] hover:border-[#00DFB6]'
                                        : 'border-[#98ABA2] bg-white hover:border-[#097770]'
                                    }`}
                                    title={habit.completedToday ? 'Mark as not done' : 'Mark as done today'}
                                  >
                                    {habit.completedToday && (
                                      <Check className="w-4 h-4 stroke-[3]" />
                                    )}
                                  </button>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <h4
                                          className={`text-xs font-bold leading-tight ${
                                            habit.completedToday
                                              ? 'line-through opacity-60'
                                              : isKrishna
                                              ? 'text-[#EEF9F6]'
                                              : 'text-[#0C1F1B]'
                                          }`}
                                        >
                                          {habit.title}
                                        </h4>
                                        <span
                                          className={`font-sanskrit text-[10px] font-semibold ${
                                            isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'
                                          }`}
                                        >
                                          {habit.hindiTitle}
                                        </span>
                                      </div>

                                      {/* Streak Badge */}
                                      <div
                                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                                          habit.completedToday
                                            ? isKrishna
                                              ? 'bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40'
                                              : 'bg-[#FFF4D9] text-[#7C530A] border border-[#C58F1B]'
                                            : isKrishna
                                            ? 'bg-[#102B3C] text-[#9BC3B9]'
                                            : 'bg-[#EDF5F1] text-[#3E564F]'
                                        }`}
                                      >
                                        <Flame
                                          className={`w-3 h-3 ${
                                            habit.completedToday ? 'text-[#FFB800]' : 'opacity-40'
                                          }`}
                                        />
                                        <span>{habit.streak}d streak</span>
                                      </div>
                                    </div>

                                    {/* Eco Impact note */}
                                    <p
                                      className={`text-[10px] mt-1 leading-snug ${
                                        isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                                      }`}
                                    >
                                      {habit.ecoImpact}
                                    </p>

                                    {/* Footer: Frequency, 7-Day History dots, Points */}
                                    <div
                                      className={`mt-2.5 pt-2 border-t flex items-center justify-between gap-2 ${
                                        isKrishna ? 'border-[#1B3E52]' : 'border-[#D2E3DB]'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span
                                          className={`text-[9px] font-bold uppercase tracking-wider ${
                                            isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'
                                          }`}
                                        >
                                          {habit.frequency}
                                        </span>

                                        {/* 7-Day Rhythm Dots */}
                                        <div className="flex items-center gap-1">
                                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, dIdx) => {
                                            const isDone = habit.history[dIdx];
                                            return (
                                              <span
                                                key={dIdx}
                                                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold ${
                                                  isDone
                                                    ? isKrishna
                                                      ? 'bg-[#00DFB6] text-[#07131B]'
                                                      : 'bg-[#097770] text-white'
                                                    : isKrishna
                                                    ? 'bg-[#142C3C] text-[#5E857C]'
                                                    : 'bg-[#EDF5F1] text-[#98ABA2]'
                                                }`}
                                                title={`${day}: ${isDone ? 'Completed' : 'Missed'}`}
                                              >
                                                {day}
                                              </span>
                                            );
                                          })}
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-1.5">
                                        <span
                                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                            isKrishna
                                              ? 'text-[#00DFB6] bg-[#00DFB6]/15'
                                              : 'text-[#097770] bg-[#EDF5F1]'
                                          }`}
                                        >
                                          +{habit.pts} Giving
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Reset / Demo Footer */}
                        <div
                          className={`pt-2 flex items-center justify-between text-[10px] ${
                            isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'
                          }`}
                        >
                          <button
                            onClick={() => {
                              setHabits((prev) =>
                                prev.map((h) => ({
                                  ...h,
                                  completedToday: false,
                                  history: [...h.history.slice(0, 6), false],
                                }))
                              );
                              speakText('Daily habits reset for testing.');
                            }}
                            className={`flex items-center gap-1 font-semibold ${
                              isKrishna
                                ? 'text-[#9BC3B9] hover:text-[#00DFB6]'
                                : 'text-[#3E564F] hover:text-[#097770]'
                            }`}
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset Today's Checks for Testing</span>
                          </button>
                          <span>Best: 45 days</span>
                        </div>
                      </div>
                    )}

                    {/* TAB: NEWS */}
                    {simTab === 'news' && (
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-base font-bold ${
                              isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'
                            }`}
                          >
                            Environmental Updates
                          </h3>
                          <span
                            className={`text-[10px] ${
                              isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'
                            }`}
                          >
                            Verified Feeds
                          </span>
                        </div>
                        {/* Topic chips */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                          {['All', 'Forests', 'Water', 'Climate', 'Air'].map((t, idx) => (
                            <button
                              key={t}
                              className={`px-2.5 py-1 rounded-full whitespace-nowrap text-[11px] font-medium border ${
                                idx === 0
                                  ? isKrishna
                                    ? 'bg-[#00DFB6] text-[#07131B] border-[#00DFB6]'
                                    : 'bg-[#097770] text-white border-[#097770]'
                                  : isKrishna
                                  ? 'bg-[#102B3C] text-[#9BC3B9] border-[#1B3E52]'
                                  : 'bg-white text-[#3E564F] border-[#D2E3DB]'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>

                        {/* News Items */}
                        {[
                          {
                            title: 'Western Ghats Community Restores 40 Hectares of Sacred Groves',
                            topic: 'Forests',
                            time: '2h ago',
                            effect: 'Protected critical water aquifers and 32 endemic bird species.',
                            step: 'Leave native shrubs along boundary walls undisturbed for wild bees.',
                          },
                          {
                            title: 'Solar-Powered Irrigation Cooperatives Eliminate Diesel Runoff',
                            topic: 'Water',
                            time: '5h ago',
                            effect: 'Eliminated 18,000 litres of diesel fumes and toxic soil seepage.',
                            step: 'Check home taps today and replace worn rubber washers to end silent leaks.',
                          },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-2xl border space-y-2 transition-colors ${
                              isKrishna
                                ? 'bg-[#0D212E] border-[#1B3E52] text-[#EEF9F6]'
                                : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
                            }`}
                          >
                            <div className="flex items-center gap-2 text-[10px] font-bold">
                              <span className={isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'}>
                                {item.topic.toUpperCase()}
                              </span>
                              <span>·</span>
                              <span className={isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}>
                                {item.time}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold leading-snug">
                              {item.title}
                            </h4>
                            <div
                              className={`p-2.5 rounded-xl space-y-1 text-[11px] ${
                                isKrishna ? 'bg-[#142C3C]' : 'bg-[#EDF5F1]'
                              }`}
                            >
                              <div>
                                <span
                                  className={`font-semibold ${
                                    isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                                  }`}
                                >
                                  Effect:{' '}
                                </span>
                                <span>{item.effect}</span>
                              </div>
                              <div
                                className={`font-semibold ${
                                  isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'
                                }`}
                              >
                                <span>Small step: </span>
                                <span>{item.step}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB: FOOTPRINT & GIVING */}
                    {simTab === 'footprint' && (
                      <div className="p-4 space-y-3">
                        <h3
                          className={`text-base font-bold ${
                            isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'
                          }`}
                        >
                          108 Footprint & Giving
                        </h3>
                        {/* Verdict Banner (Never Scold!) */}
                        <div
                          className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
                            isKrishna
                              ? 'bg-[#102B3C] border-[#00DFB6]/30 text-[#00DFB6]'
                              : 'bg-[#EDF5F1] border-[#097770]/30 text-[#097770]'
                          }`}
                        >
                          <Leaf className="w-4 h-4 shrink-0" />
                          <span>You gave something back today. That stays.</span>
                        </div>

                        {/* 7 Giving Acts */}
                        <div className="space-y-2 pt-1">
                          <span
                            className={`text-xs font-bold ${
                              isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'
                            }`}
                          >
                            7 Acts of Giving Back
                          </span>
                          {[
                            { name: 'Planted a Tree or Native Plant', pts: 8 },
                            { name: 'Fed Soil Without Chemicals', pts: 8 },
                            { name: 'Grew or Purchased Without Poison', pts: 8 },
                            { name: 'Left Bees & Birds Undisturbed', pts: 6 },
                            { name: 'Saved or Harvested Clean Water', pts: 8 },
                            { name: 'Fed or Sheltered a Living Creature', pts: 8 },
                            { name: 'Shared Native Desi Seeds', pts: 8 },
                          ].map((act, i) => (
                            <div
                              key={i}
                              className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                                isKrishna
                                  ? 'bg-[#0D212E] border-[#1B3E52] text-[#EEF9F6]'
                                  : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                                    isKrishna
                                      ? 'bg-[#142C3C] text-[#00DFB6]'
                                      : 'bg-[#EDF5F1] text-[#097770]'
                                  }`}
                                >
                                  {i + 1}
                                </span>
                                <span className="font-medium">{act.name}</span>
                              </div>
                              <button
                                onClick={() => {
                                  const nextGiving = Math.min(54, givingScore + act.pts);
                                  saveScoresToFirebase(nextGiving, lightnessScore);
                                  setLoggedActs([
                                    { id: String(Date.now()), name: act.name, pts: act.pts },
                                    ...loggedActs,
                                  ]);
                                }}
                                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                                  isKrishna
                                    ? 'bg-[#00DFB6] hover:bg-[#00C29F] text-[#07131B]'
                                    : 'bg-[#097770] hover:bg-[#065A54] text-white'
                                }`}
                              >
                                +{act.pts} pts
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Today's Logged Entries */}
                        {loggedActs.length > 0 && (
                          <div className="space-y-1.5 pt-2">
                            <span
                              className={`text-xs font-bold ${
                                isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'
                              }`}
                            >
                              Today's Acts
                            </span>
                            {loggedActs.map((entry, index) => (
                              <div
                                key={entry.id}
                                className={`p-2 rounded-lg border flex items-center justify-between text-[11px] ${
                                  isKrishna
                                    ? 'bg-[#142C3C] border-[#1B3E52] text-[#EEF9F6]'
                                    : 'bg-[#FAFCF8] border-[#D2E3DB] text-[#0C1F1B]'
                                }`}
                              >
                                <span>{entry.name}</span>
                                <button
                                  onClick={() => {
                                    setLoggedActs(loggedActs.filter((_, idx) => idx !== index));
                                    const nextGiving = Math.max(0, givingScore - entry.pts);
                                    saveScoresToFirebase(nextGiving, lightnessScore);
                                  }}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB: MARKET */}
                    {simTab === 'market' && (
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-base font-bold ${
                              isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'
                            }`}
                          >
                            Genuine Organic Market
                          </h3>
                          <button
                            onClick={() => setShowSellerOnboarding(true)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                              isKrishna
                                ? 'bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40'
                                : 'bg-[#FBEFD2] text-[#6B4431]'
                            }`}
                          >
                            Sell Here
                          </button>
                        </div>

                        {/* Three Tiers explanation */}
                        <div
                          className={`p-2.5 rounded-xl text-[10px] space-y-0.5 border ${
                            isKrishna
                              ? 'bg-[#102B3C] border-[#1B3E52] text-[#9BC3B9]'
                              : 'bg-[#EDF5F1] border-[#D2E3DB] text-[#3E564F]'
                          }`}
                        >
                          <span
                            className={`font-bold ${
                              isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'
                            }`}
                          >
                            3 Honest Tiers:{' '}
                          </span>
                          <span>
                            Tier 1 (Board Certified) · Tier 2 (PGS-India Peer Certified) · Tier 3
                            (Vouched by 3+ Neighbours).
                          </span>
                        </div>

                        {/* Product Cards */}
                        {[
                          {
                            name: 'Desi A2 Gir Cow Ghee (Bilona Method)',
                            farm: 'Surabhi Goshala',
                            dist: '4.2 km',
                            tier: 'Tier 1: Government Board Certified',
                            price: '₹950',
                            why: 'Curd churned using wooden bilona, grass-fed native Gir cows.',
                          },
                          {
                            name: 'Heirloom Black Rice (Karuppu Kavuni)',
                            farm: 'Vayal Heritage Organics',
                            dist: '8.5 km',
                            tier: 'Tier 2: Local Farmer Group (PGS-India)',
                            price: '₹180',
                            why: 'Zero synthetic sprays, inspected by local PGS group.',
                          },
                          {
                            name: 'Cold-Pressed Sesame Oil (Ghani)',
                            farm: 'Pind Heritage Fields',
                            dist: '12 km',
                            tier: 'Tier 3: Vouched by 5 Neighbours',
                            price: '₹320',
                            why: 'Wood pressed without heat. Neighbors vouch for soil.',
                          },
                        ].map((prod, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-2xl border space-y-1.5 transition-colors ${
                              isKrishna
                                ? 'bg-[#0D212E] border-[#1B3E52] text-[#EEF9F6]'
                                : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold">{prod.name}</span>
                              <span
                                className={`text-xs font-extrabold ${
                                  isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'
                                }`}
                              >
                                {prod.price}
                              </span>
                            </div>
                            <div
                              className={`text-[10px] ${
                                isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'
                              }`}
                            >
                              {prod.farm} · {prod.dist}
                            </div>
                            <div
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-md inline-block ${
                                isKrishna
                                  ? 'text-[#00DFB6] bg-[#00DFB6]/15'
                                  : 'text-[#097770] bg-[#EDF5F1]'
                              }`}
                            >
                              {prod.tier}
                            </div>
                            <p
                              className={`text-[11px] ${
                                isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                              }`}
                            >
                              {prod.why}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB: CIRCLE */}
                    {simTab === 'circle' && (
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-base font-bold ${
                              isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'
                            }`}
                          >
                            Local Circle (~3 km)
                          </h3>
                          <span
                            className={`text-[10px] ${
                              isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'
                            }`}
                          >
                            Meetups & Knowledge
                          </span>
                        </div>

                        {[
                          {
                            type: 'MEETUP',
                            author: 'Sunita Devi',
                            title: 'Community Desi Seed Swap & Seedling Exchange',
                            details:
                              'Sunday 09:00 AM at Banyan Tree Grounds. Bring heirloom seeds.',
                            rsvps: 14,
                          },
                          {
                            type: 'KNOWLEDGE',
                            author: 'Dr. Arvind Sharma',
                            title: 'Jeevamrit Preparation Recipe for Vegetable Beds',
                            details:
                              '200L water + 10kg cow dung + 10L cow urine + 1kg jaggery + 1kg besan. Ferment 48h.',
                            rsvps: null,
                          },
                        ].map((post, idx) => (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-2xl border space-y-2 transition-colors ${
                              isKrishna
                                ? 'bg-[#0D212E] border-[#1B3E52] text-[#EEF9F6]'
                                : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className={isKrishna ? 'text-[#FFB800]' : 'text-[#C58F1B]'}>
                                {post.type}
                              </span>
                              <span className={isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}>
                                {post.author}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold">{post.title}</h4>
                            <p
                              className={`text-[11px] ${
                                isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                              }`}
                            >
                              {post.details}
                            </p>
                            {post.rsvps !== null && (
                              <button
                                onClick={() => speakText(`RSVP confirmed for ${post.title}`)}
                                className={`w-full mt-2 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                  isKrishna
                                    ? 'bg-[#00DFB6] hover:bg-[#00C29F] text-[#07131B]'
                                    : 'bg-[#097770] hover:bg-[#065A54] text-white'
                                }`}
                              >
                                RSVP to Meetup ({post.rsvps} going)
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* BOTTOM TAB BAR (Tabs + Raised Center Mic) */}
                  <div
                    className={`h-16 border-t px-1.5 flex items-center justify-between z-30 shrink-0 transition-colors duration-300 ${
                      isKrishna
                        ? 'bg-[#07131B] border-[#1B3E52]'
                        : 'bg-white border-[#D2E3DB]'
                    }`}
                  >
                    <button
                      onClick={() => setSimTab('today')}
                      className={`flex flex-col items-center text-[9px] font-semibold px-1 transition-colors ${
                        simTab === 'today'
                          ? isKrishna
                            ? 'text-[#00DFB6]'
                            : 'text-[#097770]'
                          : isKrishna
                          ? 'text-[#9BC3B9]/60 hover:text-[#9BC3B9]'
                          : 'text-[#6C837C] hover:text-[#0C1F1B]'
                      }`}
                    >
                      <Leaf className="w-4 h-4" />
                      <span>Today</span>
                    </button>

                    <button
                      onClick={() => setSimTab('habits')}
                      className={`flex flex-col items-center text-[9px] font-semibold px-1 relative transition-colors ${
                        simTab === 'habits'
                          ? isKrishna
                            ? 'text-[#00DFB6]'
                            : 'text-[#097770]'
                          : isKrishna
                          ? 'text-[#9BC3B9]/60 hover:text-[#9BC3B9]'
                          : 'text-[#6C837C] hover:text-[#0C1F1B]'
                      }`}
                    >
                      <Flame className={`w-4 h-4 ${simTab === 'habits' ? 'text-[#FFB800]' : ''}`} />
                      <span>Habits</span>
                      {habits.some((h) => !h.completedToday) && (
                        <span className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                      )}
                    </button>

                    {/* Raised Center Mic (Voice Assistant) */}
                    <button
                      onClick={() => setShowAssistantModal(true)}
                      className={`-mt-5 w-11 h-11 rounded-full flex items-center justify-center shadow-lg border-2 active:scale-95 transition-transform shrink-0 ${
                        isKrishna
                          ? 'bg-[#00DFB6] text-[#07131B] border-[#07131B] shadow-[0_0_15px_rgba(0,223,182,0.4)]'
                          : 'bg-[#097770] text-white border-white'
                      }`}
                      title="Open Prakriti Voice Assistant"
                    >
                      <Mic className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setSimTab('news')}
                      className={`flex flex-col items-center text-[9px] font-semibold px-1 transition-colors ${
                        simTab === 'news'
                          ? isKrishna
                            ? 'text-[#00DFB6]'
                            : 'text-[#097770]'
                          : isKrishna
                          ? 'text-[#9BC3B9]/60 hover:text-[#9BC3B9]'
                          : 'text-[#6C837C] hover:text-[#0C1F1B]'
                      }`}
                    >
                      <Globe className="w-4 h-4" />
                      <span>News</span>
                    </button>

                    <button
                      onClick={() => setSimTab('market')}
                      className={`flex flex-col items-center text-[9px] font-semibold px-1 transition-colors ${
                        simTab === 'market'
                          ? isKrishna
                            ? 'text-[#00DFB6]'
                            : 'text-[#097770]'
                          : isKrishna
                          ? 'text-[#9BC3B9]/60 hover:text-[#9BC3B9]'
                          : 'text-[#6C837C] hover:text-[#0C1F1B]'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Market</span>
                    </button>

                    <button
                      onClick={() => setSimTab('circle')}
                      className={`flex flex-col items-center text-[9px] font-semibold px-1 transition-colors ${
                        simTab === 'circle'
                          ? isKrishna
                            ? 'text-[#00DFB6]'
                            : 'text-[#097770]'
                          : isKrishna
                          ? 'text-[#9BC3B9]/60 hover:text-[#9BC3B9]'
                          : 'text-[#6C837C] hover:text-[#0C1F1B]'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>Circle</span>
                    </button>
                  </div>

                  {/* MODAL OVERLAYS (Assistant, Seller, Privacy, Wisdom, Add Habit) */}
                  {/* 0. Add Custom Habit Modal */}
                  {showAddHabitModal && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                      <div
                        className={`rounded-2xl p-4 w-full max-w-xs border shadow-xl space-y-3 transition-colors ${
                          isKrishna
                            ? 'bg-[#0D212E] border-[#1B3E52] text-[#EEF9F6]'
                            : 'bg-[#FAFCF8] border-[#D2E3DB] text-[#0C1F1B]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-[#FFB800]" />
                            <span>New Ecological Habit</span>
                          </h4>
                          <button
                            onClick={() => setShowAddHabitModal(false)}
                            className={`text-xs p-1 ${
                              isKrishna ? 'text-[#9BC3B9] hover:text-white' : 'text-[#6C837C] hover:text-[#0C1F1B]'
                            }`}
                          >
                            ✕
                          </button>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <label
                              className={`text-[10px] font-bold block mb-0.5 ${
                                isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                              }`}
                            >
                              Habit Name
                            </label>
                            <input
                              type="text"
                              value={newHabitTitle}
                              onChange={(e) => setNewHabitTitle(e.target.value)}
                              placeholder="e.g. Watering Tulsi, Earthen Khamba"
                              className={`w-full p-2 border rounded-lg text-xs ${
                                isKrishna
                                  ? 'bg-[#07131B] border-[#1B3E52] text-[#EEF9F6]'
                                  : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
                              }`}
                            />
                          </div>

                          <div>
                            <label
                              className={`text-[10px] font-bold block mb-0.5 ${
                                isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                              }`}
                            >
                              Hindi / Regional Subtitle
                            </label>
                            <input
                              type="text"
                              value={newHabitHindiTitle}
                              onChange={(e) => setNewHabitHindiTitle(e.target.value)}
                              placeholder="e.g. तुलसी जलार्पण"
                              className={`w-full p-2 border rounded-lg text-xs ${
                                isKrishna
                                  ? 'bg-[#07131B] border-[#1B3E52] text-[#EEF9F6]'
                                  : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
                              }`}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label
                                className={`text-[10px] font-bold block mb-0.5 ${
                                  isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                                }`}
                              >
                                Frequency
                              </label>
                              <select
                                value={newHabitFrequency}
                                onChange={(e) => setNewHabitFrequency(e.target.value)}
                                className={`w-full p-1.5 border rounded-lg text-[11px] ${
                                  isKrishna
                                    ? 'bg-[#07131B] border-[#1B3E52] text-[#EEF9F6]'
                                    : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
                                }`}
                              >
                                <option value="Daily Morning">Daily Morning</option>
                                <option value="Daily Evening">Daily Evening</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                              </select>
                            </div>
                            <div>
                              <label
                                className={`text-[10px] font-bold block mb-0.5 ${
                                  isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                                }`}
                              >
                                Category
                              </label>
                              <select
                                value={newHabitCategory}
                                onChange={(e) => setNewHabitCategory(e.target.value as any)}
                                className={`w-full p-1.5 border rounded-lg text-[11px] ${
                                  isKrishna
                                    ? 'bg-[#07131B] border-[#1B3E52] text-[#EEF9F6]'
                                    : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
                                }`}
                              >
                                <option value="sacred-flora">Sacred Flora</option>
                                <option value="soil-waste">Soil & Compost</option>
                                <option value="water">Clean Water</option>
                                <option value="creatures">Wild Creatures</option>
                                <option value="zero-waste">Zero Waste</option>
                                <option value="energy">Clean Energy</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label
                              className={`text-[10px] font-bold block mb-0.5 ${
                                isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                              }`}
                            >
                              Direct Ecological Benefit
                            </label>
                            <input
                              type="text"
                              value={newHabitImpact}
                              onChange={(e) => setNewHabitImpact(e.target.value)}
                              placeholder="e.g. Oxygen enrichment and pollinator refuge"
                              className={`w-full p-2 border rounded-lg text-xs ${
                                isKrishna
                                  ? 'bg-[#07131B] border-[#1B3E52] text-[#EEF9F6]'
                                  : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() => setShowAddHabitModal(false)}
                            className={`flex-1 py-1.5 border rounded-lg text-xs font-semibold ${
                              isKrishna
                                ? 'border-[#1B3E52] text-[#9BC3B9] hover:bg-[#142C3C]'
                                : 'border-[#D2E3DB] text-[#3E564F] hover:bg-[#EDF5F1]'
                            }`}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              if (!newHabitTitle.trim()) return;
                              const newHabit: EcoHabit = {
                                id: `habit-${Date.now()}`,
                                title: newHabitTitle.trim(),
                                hindiTitle: newHabitHindiTitle.trim() || 'दैनिक साधना',
                                category: newHabitCategory,
                                frequency: newHabitFrequency,
                                streak: 1,
                                bestStreak: 1,
                                completedToday: true,
                                history: [false, false, false, false, false, false, true],
                                ecoImpact: newHabitImpact.trim() || 'Strengthens daily living harmony with nature.',
                                pts: 6,
                              };
                              setHabits([newHabit, ...habits]);
                              setGivingScore((g) => Math.min(54, g + 6));
                              setNewHabitTitle('');
                              setNewHabitHindiTitle('');
                              setNewHabitImpact('');
                              setShowAddHabitModal(false);
                              speakText(`Added ${newHabit.title} to your daily habits.`);
                            }}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                              isKrishna
                                ? 'bg-[#00DFB6] hover:bg-[#00C29F] text-[#07131B]'
                                : 'bg-[#097770] hover:bg-[#065A54] text-white'
                            }`}
                          >
                            Save Habit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1. Voice Assistant Modal */}
                  {showAssistantModal && (
                    <div
                      className={`absolute inset-0 z-50 p-5 flex flex-col justify-between transition-colors ${
                        isKrishna ? 'bg-[#091A26] text-[#EEF9F6]' : 'bg-[#FAFCF8] text-[#0C1F1B]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'
                          }`}
                        >
                          Prakriti Voice Assistant
                        </span>
                        <button
                          onClick={() => setShowAssistantModal(false)}
                          className={`p-1 rounded-full ${
                            isKrishna ? 'text-[#9BC3B9] hover:text-white' : 'text-[#7F8E85] hover:text-[#17231D]'
                          }`}
                        >
                          ✕
                        </button>
                      </div>

                      {/* Breathing Orb */}
                      <div className="flex flex-col items-center my-auto">
                        <div
                          onClick={() => {
                            setAssistantListening(!assistantListening);
                            if (!assistantListening) {
                              speakText(
                                'Jeevo paramo dharma. To naturally repel pests, prepare fermented neem leaf water and spray before sunrise.'
                              );
                            }
                          }}
                          className={`w-28 h-28 rounded-full bg-gradient-to-tr ${
                            isKrishna
                              ? 'from-[#07131B] via-[#0A4150] to-[#00DFB6] shadow-[0_0_30px_rgba(0,223,182,0.3)]'
                              : 'from-[#065A54] via-[#097770] to-[#1A5F44] shadow-xl'
                          } flex items-center justify-center text-white cursor-pointer transition-all ${
                            assistantListening ? 'scale-110' : 'scale-100'
                          }`}
                        >
                          <Mic className="w-10 h-10 animate-pulse" />
                        </div>
                        <span
                          className={`text-xs font-semibold mt-4 ${
                            isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'
                          }`}
                        >
                          {assistantListening ? 'Listening with reverence...' : 'Tap orb to speak'}
                        </span>
                        <p
                          className={`text-xs text-center mt-3 max-w-[260px] ${
                            isKrishna ? 'text-[#9BC3B9]' : 'text-[#3E564F]'
                          }`}
                        >
                          {assistantReply}
                        </p>
                        <div
                          className={`mt-3 p-2.5 rounded-xl text-[11px] font-medium text-center border ${
                            isKrishna
                              ? 'bg-[#102B3C] border-[#1B3E52] text-[#EEF9F6]'
                              : 'bg-[#EDF5F1] border-[#D2E3DB] text-[#097770]'
                          }`}
                        >
                          <strong>Small Step:</strong> {assistantSmallStep}
                        </div>
                      </div>

                      <div
                        className={`text-[10px] text-center ${
                          isKrishna ? 'text-[#9BC3B9]/70' : 'text-[#7F8E85]'
                        }`}
                      >
                        Audio is processed on-device and never retained or uploaded.
                      </div>
                    </div>
                  )}

                  {/* 2. Seller Onboarding Modal (3 Spoken Yes/No Questions) */}
                  {showSellerOnboarding && (
                    <div
                      className={`absolute inset-0 z-50 p-5 flex flex-col justify-between transition-colors ${
                        isKrishna ? 'bg-[#091A26] text-[#EEF9F6]' : 'bg-[#FAFCF8] text-[#0C1F1B]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isKrishna ? 'text-[#FFB800]' : 'text-[#C58F1B]'
                          }`}
                        >
                          Farmer Onboarding · किसान पंजीकरण
                        </span>
                        <button
                          onClick={() => setShowSellerOnboarding(false)}
                          className={`p-1 rounded-full ${
                            isKrishna ? 'text-[#9BC3B9] hover:text-white' : 'text-[#7F8E85]'
                          }`}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="my-auto text-center space-y-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                            isKrishna ? 'bg-[#FFB800]/20 text-[#FFB800]' : 'bg-[#FBEFD2] text-[#6B4431]'
                          }`}
                        >
                          <Store className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold">
                          Do you have an organic certificate from the government board?
                        </h4>
                        <p
                          className={`text-xs ${
                            isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'
                          }`}
                        >
                          क्या आपके पास सरकारी बोर्ड से जैविक प्रमाणपत्र है?
                        </p>
                        <div className="grid grid-cols-2 gap-3 pt-4">
                          <button
                            onClick={() => {
                              speakText('Great! You will be certified under Tier 1 government board.');
                              setShowSellerOnboarding(false);
                            }}
                            className={`py-3 font-bold rounded-xl text-sm transition-colors ${
                              isKrishna
                                ? 'bg-[#00DFB6] hover:bg-[#00C29F] text-[#07131B]'
                                : 'bg-[#097770] hover:bg-[#065A54] text-white'
                            }`}
                          >
                            Yes · हाँ
                          </button>
                          <button
                            onClick={() => {
                              speakText('That is fine. Your neighbours can vouch for you, and we will help you get certified for free later.');
                              setShowSellerOnboarding(false);
                            }}
                            className={`py-3 border font-bold rounded-xl text-sm transition-colors ${
                              isKrishna
                                ? 'bg-[#102B3C] border-[#1B3E52] text-[#EEF9F6] hover:bg-[#183D52]'
                                : 'bg-white border-[#D2E3DB] text-[#0C1F1B] hover:bg-[#EDF5F1]'
                            }`}
                          >
                            No · नहीं
                          </button>
                        </div>
                      </div>

                      <div
                        className={`text-[10px] text-center ${
                          isKrishna ? 'text-[#9BC3B9]/70' : 'text-[#7F8E85]'
                        }`}
                      >
                        No jargon. Tier 3 is an honest ladder toward PGS-India certification.
                      </div>
                    </div>
                  )}

                  {/* 3. Privacy Screen Modal */}
                  {showPrivacyScreen && (
                    <div
                      className={`absolute inset-0 z-50 p-5 overflow-y-auto transition-colors ${
                        isKrishna ? 'bg-[#091A26] text-[#EEF9F6]' : 'bg-[#FAFCF8] text-[#0C1F1B]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-xs font-bold ${
                            isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'
                          }`}
                        >
                          Privacy & Data Sovereignty
                        </span>
                        <button
                          onClick={() => setShowPrivacyScreen(false)}
                          className={`p-1 rounded-full ${
                            isKrishna ? 'text-[#9BC3B9] hover:text-white' : 'text-[#7F8E85]'
                          }`}
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-3 text-xs">
                        <div
                          className={`p-3 rounded-xl border ${
                            isKrishna
                              ? 'bg-[#0D212E] border-[#1B3E52] text-[#9BC3B9]'
                              : 'bg-white border-[#D2E3DB] text-[#4A5A51]'
                          }`}
                        >
                          <strong className={isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'}>
                            1. XChaCha20-Poly1305 Vault:
                          </strong>
                          <p className="mt-1">Footprint & journal encrypted on phone; server holds only ciphertext.</p>
                        </div>
                        <div
                          className={`p-3 rounded-xl border ${
                            isKrishna
                              ? 'bg-[#0D212E] border-[#1B3E52] text-[#9BC3B9]'
                              : 'bg-white border-[#D2E3DB] text-[#4A5A51]'
                          }`}
                        >
                          <strong className={isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'}>
                            2. Coarsened Location:
                          </strong>
                          <p className="mt-1">~1 km cell only. Exact GPS coordinates are never transmitted.</p>
                        </div>
                        <div
                          className={`p-3 rounded-xl border ${
                            isKrishna
                              ? 'bg-[#0D212E] border-[#1B3E52] text-[#9BC3B9]'
                              : 'bg-white border-[#D2E3DB] text-[#4A5A51]'
                          }`}
                        >
                          <strong className={isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'}>
                            3. Export Before Deletion:
                          </strong>
                          <p className="mt-1">Download encrypted archive zip first before account termination.</p>
                        </div>
                        <a
                          href="/api/flutter-project/download-zip"
                          className={`block text-center py-2 font-bold rounded-xl transition-colors ${
                            isKrishna
                              ? 'bg-[#00DFB6] hover:bg-[#00C29F] text-[#07131B]'
                              : 'bg-[#097770] hover:bg-[#065A54] text-white'
                          }`}
                        >
                          Download Data Archive
                        </a>
                      </div>
                    </div>
                  )}

                  {/* 4. Wisdom Screen Modal */}
                  {showWisdomScreen && (
                    <div
                      className={`absolute inset-0 z-50 p-5 overflow-y-auto transition-colors ${
                        isKrishna ? 'bg-[#091A26] text-[#EEF9F6]' : 'bg-[#FAFCF8] text-[#0C1F1B]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-xs font-bold ${
                            isKrishna ? 'text-[#FFB800]' : 'text-[#C58F1B]'
                          }`}
                        >
                          Bhagavad Gita & Atharva Veda
                        </span>
                        <button
                          onClick={() => setShowWisdomScreen(false)}
                          className={`p-1 rounded-full ${
                            isKrishna ? 'text-[#9BC3B9] hover:text-white' : 'text-[#7F8E85]'
                          }`}
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div
                          className={`p-3 rounded-xl border ${
                            isKrishna ? 'bg-[#0D212E] border-[#1B3E52]' : 'bg-white border-[#D2E3DB]'
                          }`}
                        >
                          <div
                            className={`text-[10px] font-bold ${
                              isKrishna ? 'text-[#FFB800]' : 'text-[#C58F1B]'
                            }`}
                          >
                            GITA 3.14
                          </div>
                          <div className="font-sanskrit text-sm font-bold mt-1">
                            अन्नाद्भवन्ति भूतानि पर्जन्यादन्नसम्भवः
                          </div>
                          <p
                            className={`text-[11px] mt-1 ${
                              isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'
                            }`}
                          >
                            All bodies subsist on grains from rains; rains come from giving back to nature.
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded-xl border ${
                            isKrishna ? 'bg-[#0D212E] border-[#1B3E52]' : 'bg-white border-[#D2E3DB]'
                          }`}
                        >
                          <div
                            className={`text-[10px] font-bold ${
                              isKrishna ? 'text-[#FFB800]' : 'text-[#C58F1B]'
                            }`}
                          >
                            BHUMI SUKTA 12.1.35
                          </div>
                          <div className="font-sanskrit text-sm font-bold mt-1">
                            यत् ते भूमे विखनामि क्षिप्रं तद् अपि रोहतु
                          </div>
                          <p
                            className={`text-[11px] mt-1 ${
                              isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'
                            }`}
                          >
                            Whatever I dig up of thee, O Earth, may that quickly grow over again.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: GEMINI AI ECO IMAGE STUDIO */}
        {activeView === 'ai-studio' && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="bg-white rounded-2xl p-6 border border-[#D6E0D3]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#7F8E85]">
                    <span className="font-semibold text-[#1F5E3B]">Gemini AI Studio</span>
                    <span>·</span>
                    <span>gemini-3-pro-image-preview</span>
                    <span>·</span>
                    <span>gemini-3.1-flash-image-preview</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#17231D] tracking-tight mt-1">
                    AI Ecological Image Studio
                  </h2>
                  <p className="text-sm text-[#4A5A51] mt-1">
                    Generate high-resolution visual assets for organic produce, regenerative soil,
                    desi cow breeds, and community agroforestry.
                  </p>
                </div>

                {/* Mode Selector */}
                <div className="flex items-center p-1 bg-[#EEF3EC] rounded-xl self-start md:self-auto">
                  <button
                    onClick={() => setAiMode('generate')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      aiMode === 'generate'
                        ? 'bg-white text-[#17231D] shadow-sm'
                        : 'text-[#4A5A51] hover:text-[#17231D]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E3A018]" />
                    <span>High-Quality (3 Pro)</span>
                  </button>
                  <button
                    onClick={() => setAiMode('edit')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      aiMode === 'edit'
                        ? 'bg-white text-[#17231D] shadow-sm'
                        : 'text-[#4A5A51] hover:text-[#17231D]'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#1F5E3B]" />
                    <span>Create & Edit (3.1 Flash)</span>
                  </button>
                </div>
              </div>

              {/* Controls bar */}
              <div className="mt-6 pt-5 border-t border-[#D6E0D3] grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Prompt input */}
                <div className="md:col-span-8">
                  <label className="block text-xs font-bold text-[#17231D] mb-1.5">
                    {aiMode === 'generate' ? 'Image Generation Prompt' : 'Create / Edit Prompt'}
                  </label>
                  <textarea
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your organic scene, soil biodiversity, or farm produce..."
                    className="w-full bg-[#FAFCF8] border border-[#D6E0D3] rounded-xl p-3 text-sm text-[#17231D] focus:outline-none focus:border-[#1F5E3B] resize-none"
                  />
                  {/* Preset prompt pills */}
                  <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1 text-xs">
                    <span className="text-[11px] text-[#7F8E85] shrink-0 font-medium">Presets:</span>
                    {[
                      'Organic heirloom black rice grains and golden turmeric root',
                      'Sacred grove canopy in Western Ghats with mossy banyan roots',
                      'Regenerative soil cross-section with earthworms and desi seeds',
                      'Desi Gir cows grazing freely under shade trees',
                    ].map((sample, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(sample)}
                        className="bg-[#EEF3EC] hover:bg-[#E3EBD6] text-[#4A5A51] text-[11px] px-2.5 py-1 rounded-lg shrink-0 transition-colors"
                      >
                        {sample.slice(0, 30)}...
                      </button>
                    ))}
                  </div>
                </div>

                {/* Affordances: Image Size (1K, 2K, 4K) & Aspect Ratio */}
                <div className="md:col-span-4 space-y-4">
                  {aiMode === 'generate' && (
                    <div>
                      <label className="block text-xs font-bold text-[#17231D] mb-1.5">
                        Image Size Affordance (Resolution)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['1K', '2K', '4K'] as const).map((size) => (
                          <button
                            key={size}
                            onClick={() => setImageSize(size)}
                            className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                              imageSize === size
                                ? 'bg-[#1F5E3B] text-white border-[#1F5E3B]'
                                : 'bg-[#FAFCF8] text-[#4A5A51] border-[#D6E0D3] hover:border-[#1F5E3B]'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#17231D] mb-1.5">
                      Aspect Ratio
                    </label>
                    <div className="grid grid-cols-5 gap-1.5 text-xs">
                      {['1:1', '16:9', '4:3', '9:16', '3:4'].map((ratio) => (
                        <button
                          key={ratio}
                          onClick={() => setAspectRatio(ratio)}
                          className={`py-1.5 rounded-lg border font-medium text-center ${
                            aspectRatio === ratio
                              ? 'bg-[#1F5E3B] text-white border-[#1F5E3B]'
                              : 'bg-[#FAFCF8] text-[#4A5A51] border-[#D6E0D3]'
                          }`}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage || !prompt.trim()}
                    className="w-full py-2.5 bg-[#1F5E3B] hover:bg-[#123A25] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isGeneratingImage ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating Visual...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>
                          Generate {aiMode === 'generate' ? `(${imageSize})` : '(3.1 Flash)'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Generated Gallery */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#17231D]">Generated Visual Assets</h3>
                <span className="text-xs text-[#7F8E85]">
                  {generatedImages.length} image{generatedImages.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedImages.map((img) => (
                  <div
                    key={img.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#D6E0D3] shadow-sm flex flex-col"
                  >
                    <div className="relative aspect-square bg-[#EEF3EC]">
                      <img
                        src={img.url}
                        alt={img.prompt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback container
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                        {img.size} · {img.aspectRatio}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-[#7F8E85] font-semibold mb-1">
                          <span className="text-[#1F5E3B]">{img.model}</span>
                          <span>{img.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#17231D] font-medium leading-relaxed">
                          {img.prompt}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#D6E0D3] flex items-center justify-between">
                        <a
                          href={img.url}
                          download={`prakriti_visual_${img.id}.png`}
                          className="text-xs font-semibold text-[#1F5E3B] hover:text-[#123A25] flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Save Image</span>
                        </a>
                        <button
                          onClick={() => {
                            setPrompt(`Refine and edit this: ${img.prompt}`);
                            setAiMode('edit');
                          }}
                          className="text-xs font-semibold text-[#6B4431] hover:underline"
                        >
                          Edit Image
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: FLUTTER MOBILE CODEBASE EXPLORER */}
        {activeView === 'codebase' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#D6E0D3]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#7F8E85]">
                    <span className="font-semibold text-[#1F5E3B]">
                      Production Flutter Mobile App
                    </span>
                    <span>·</span>
                    <span>Dart 3.5+</span>
                    <span>·</span>
                    <span>Android SDK 34 & iOS Xcode 15</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#17231D] tracking-tight mt-1">
                    Flutter Project Codebase (`/flutter_prakriti/`)
                  </h2>
                  <p className="text-sm text-[#4A5A51] mt-1">
                    The entire native mobile source code for Android and iOS is ready in your
                    workspace. You can run it locally with{' '}
                    <code className="bg-[#EEF3EC] px-1.5 py-0.5 rounded text-xs font-mono text-[#1F5E3B]">
                      flutter run
                    </code>{' '}
                    or download the full zipped archive.
                  </p>
                </div>

                <a
                  href="/api/flutter-project/download-zip"
                  download="prakriti_flutter_mobile_app.zip"
                  className="px-4 py-2.5 bg-[#1F5E3B] hover:bg-[#123A25] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Flutter ZIP</span>
                </a>
              </div>

              {/* Terminal Quick-Start Instructions */}
              <div className="mt-5 bg-[#123A25] text-[#FAFCF8] rounded-xl p-4 font-mono text-xs overflow-x-auto">
                <div className="flex items-center justify-between text-[#7A9A45] text-[11px] mb-2 font-sans font-bold">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Run Locally on Your Machine:</span>
                  </span>
                </div>
                <div className="space-y-1 text-slate-300">
                  <p className="text-[#68D391]"># 1. Enter the Flutter folder</p>
                  <p>cd flutter_prakriti</p>
                  <p className="text-[#68D391] mt-2"># 2. Get packages</p>
                  <p>flutter pub get</p>
                  <p className="text-[#68D391] mt-2"># 3. Launch on Android emulator or connected device</p>
                  <p>flutter run -d android</p>
                  <p className="text-[#68D391] mt-2"># Or run on iOS simulator (Mac)</p>
                  <p>flutter run -d ios</p>
                </div>
              </div>
            </div>

            {/* File Explorer & Code Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* File Tree Navigator */}
              <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#D6E0D3]">
                <div className="flex items-center justify-between pb-3 border-b border-[#D6E0D3]">
                  <span className="text-xs font-bold text-[#17231D] flex items-center gap-1.5">
                    <FolderTree className="w-4 h-4 text-[#1F5E3B]" />
                    <span>Project Tree ({flutterFiles.length} files)</span>
                  </span>
                </div>
                <div className="mt-3 max-h-[500px] overflow-y-auto space-y-1 text-xs">
                  {flutterFiles.map((file) => {
                    const isSelected = selectedFile === file.path;
                    return (
                      <button
                        key={file.path}
                        onClick={() => setSelectedFile(file.path)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-[#1F5E3B] text-white font-semibold'
                            : 'text-[#4A5A51] hover:bg-[#EEF3EC]'
                        }`}
                      >
                        <span className="truncate flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 shrink-0 opacity-70" />
                          <span className="truncate">{file.path}</span>
                        </span>
                        <span className="text-[10px] opacity-60 ml-2 shrink-0">
                          {(file.size / 1024).toFixed(1)}k
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code Display Panel */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-[#D6E0D3] overflow-hidden flex flex-col">
                <div className="px-4 py-3 bg-[#EEF3EC] border-b border-[#D6E0D3] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1F5E3B]" />
                    <span className="text-xs font-mono font-bold text-[#17231D]">
                      flutter_prakriti/{selectedFile}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(fileContent);
                      setCopiedFile(true);
                      setTimeout(() => setCopiedFile(false), 2000);
                    }}
                    className="px-2.5 py-1 bg-white border border-[#D6E0D3] rounded-lg text-xs font-semibold text-[#1F5E3B] hover:bg-[#FAFCF8] flex items-center gap-1"
                  >
                    {copiedFile ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-[#0F172A] text-slate-100 font-mono text-xs overflow-x-auto max-h-[550px] leading-relaxed">
                  {isLoadingFile ? (
                    <div className="flex items-center gap-2 text-slate-400 py-12 justify-center">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Loading file content...</span>
                    </div>
                  ) : (
                    <pre>
                      <code>{fileContent}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: BACKEND API & ENVIRONMENTAL FACTORS */}
        {activeView === 'backend' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#D6E0D3]">
              <h2 className="text-2xl font-bold text-[#17231D] tracking-tight">
                Backend API & Sourced Factor Engine
              </h2>
              <p className="text-sm text-[#4A5A51] mt-1">
                The Prakriti Express server handles real identity tokens, news curation, 108
                footprint factors, organic seller ladders, and local community circles under{' '}
                <code className="text-[#1F5E3B] font-mono">/api/v1/*</code>.
              </p>

              {/* Endpoint buttons */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { label: 'News Updates', url: '/api/v1/news' },
                  { label: 'Habits & Streaks', url: '/api/v1/habits' },
                  { label: 'Sourced Factors', url: '/api/v1/factors' },
                  { label: 'Market Products', url: '/api/v1/market/products' },
                  { label: 'Community Posts', url: '/api/v1/community/posts' },
                  { label: 'Languages (12)', url: '/api/v1/languages' },
                  { label: 'Health Status', url: '/api/health' },
                ].map((ep) => (
                  <button
                    key={ep.url}
                    onClick={() => handleTestApi(ep.url)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                      apiEndpoint === ep.url
                        ? 'bg-[#1F5E3B] text-white border-[#1F5E3B]'
                        : 'bg-white text-[#4A5A51] border-[#D6E0D3] hover:border-[#1F5E3B]'
                    }`}
                  >
                    {ep.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive API Tester Panel */}
            <div className="bg-white rounded-2xl border border-[#D6E0D3] p-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#D6E0D3]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#E3EBD6] text-[#1F5E3B] text-xs font-mono font-bold rounded">
                    GET
                  </span>
                  <span className="text-xs font-mono text-[#17231D]">{apiEndpoint}</span>
                </div>
                <button
                  onClick={() => handleTestApi(apiEndpoint)}
                  disabled={isLoadingApi}
                  className="px-3 py-1 bg-[#EEF3EC] hover:bg-[#D6E0D3] text-xs font-semibold text-[#1F5E3B] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingApi ? 'animate-spin' : ''}`} />
                  <span>Execute Request</span>
                </button>
              </div>

              <div className="mt-4 bg-[#0F172A] text-slate-200 p-4 rounded-xl font-mono text-xs max-h-96 overflow-y-auto">
                <pre>
                  <code>
                    {apiResponse
                      ? JSON.stringify(apiResponse, null, 2)
                      : '// Click "Execute Request" or select an endpoint above'}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: SYSTEM ARCHITECTURE & WISDOM */}
        {activeView === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#D6E0D3]">
              <h2 className="text-2xl font-bold text-[#17231D] tracking-tight">
                Prakriti System Architecture & Sacred Ecology
              </h2>
              <p className="text-sm text-[#4A5A51] mt-1">
                Rooted in the eternal principle{' '}
                <em className="font-sanskrit text-[#1F5E3B]">Jeevo paramo dharma</em> (Life itself
                is the highest duty), Prakriti merges on-device cryptographic security with
                authentic Indian agricultural realities.
              </p>

              {/* Architecture Pillars */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#FAFCF8] p-4 rounded-xl border border-[#D6E0D3]">
                  <h3 className="text-sm font-bold text-[#1F5E3B] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Cryptographic Vault</span>
                  </h3>
                  <p className="text-xs text-[#4A5A51] mt-2 leading-relaxed">
                    Private data (journal, daily footprint acts) is sealed using XChaCha20-Poly1305.
                    Keys never leave Keychain/Keystore; the server holds only ciphertext.
                  </p>
                </div>

                <div className="bg-[#FAFCF8] p-4 rounded-xl border border-[#D6E0D3]">
                  <h3 className="text-sm font-bold text-[#6B4431] flex items-center gap-2">
                    <Store className="w-4 h-4" />
                    <span>Three Honest Tiers</span>
                  </h3>
                  <p className="text-xs text-[#4A5A51] mt-2 leading-relaxed">
                    Instead of fragile web scraping, farmers join directly: Tier 1 (NPOP / Jaivik
                    Bharat), Tier 2 (PGS-India free group certification), and Tier 3 (Vouched by 3
                    named neighbours).
                  </p>
                </div>

                <div className="bg-[#FAFCF8] p-4 rounded-xl border border-[#D6E0D3]">
                  <h3 className="text-sm font-bold text-[#E3A018] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>12 Spoken Languages</span>
                  </h3>
                  <p className="text-xs text-[#4A5A51] mt-2 leading-relaxed">
                    Spoken seller questions, Sanskrit greetings, and voice assistant replies in
                    Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Malayalam, Odia,
                    Punjabi, Assamese, and English.
                  </p>
                </div>
              </div>
            </div>

            {/* Sacred Verses from Atharva Veda & Gita */}
            <div className="bg-white rounded-2xl p-6 border border-[#D6E0D3] space-y-4">
              <h3 className="text-lg font-bold text-[#17231D]">
                Sacred Ecology from the Atharva Veda & Bhagavad Gita
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#EEF3EC] rounded-xl border border-[#D6E0D3]">
                  <span className="text-[10px] font-bold text-[#6B4431] uppercase tracking-wider">
                    Atharva Veda 12.1 (Bhumi Sukta)
                  </span>
                  <div className="font-sanskrit text-lg font-semibold text-[#17231D] mt-1">
                    माता भूमिः पुत्रो अहं पृथिव्याः
                  </div>
                  <div className="text-xs italic text-[#4A5A51] mt-1">
                    "Earth is my mother, and I am her child."
                  </div>
                  <p className="text-xs text-[#1F5E3B] font-semibold mt-2">
                    Practice: Treat every square meter of earth with maternal reverence.
                  </p>
                </div>

                <div className="p-4 bg-[#EEF3EC] rounded-xl border border-[#D6E0D3]">
                  <span className="text-[10px] font-bold text-[#6B4431] uppercase tracking-wider">
                    Bhagavad Gita 3.14
                  </span>
                  <div className="font-sanskrit text-lg font-semibold text-[#17231D] mt-1">
                    अन्नाद्भवन्ति भूतानि पर्जन्यादन्नसम्भवः
                  </div>
                  <div className="text-xs italic text-[#4A5A51] mt-1">
                    "All creatures subsist on grains, which come from rain; rain comes from giving back."
                  </div>
                  <p className="text-xs text-[#1F5E3B] font-semibold mt-2">
                    Practice: Rain and soil health are sustained only when we perform acts of giving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Principle of 108 Sacred Modal */}
      <PrincipleOf108Modal
        isOpen={showPrincipleModal}
        onClose={() => setShowPrincipleModal(false)}
        isKrishna={isKrishna}
        givingScore={givingScore}
        lightnessScore={lightnessScore}
      />

      {/* Footer */}
      <footer
        className={`border-t py-6 px-6 text-center text-xs transition-colors duration-300 ${
          isKrishna
            ? 'bg-[#040C12] border-[#1B3E52] text-[#9BC3B9]'
            : 'bg-[#FAFCF8] border-[#D2E3DB] text-[#6C837C]'
        }`}
      >
        <p
          className={`font-sanskrit text-sm font-semibold ${
            isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'
          }`}
        >
          जीवो परमो धर्मः · सर्वभूतहिते रताः
        </p>
        <p className="mt-1">
          Prakriti Ecological Ecosystem · Full-Stack Web + Complete Flutter Mobile Codebase (Android & iOS) · Peacock Feather Design System (मयूर पिच्छ)
        </p>
      </footer>
    </div>
  );
}
