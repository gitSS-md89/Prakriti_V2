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
} from 'lucide-react';

// Design tokens from DESIGN.md
// Leaf #1F5E3B, Haldi #E3A018, Moss #7A9A45, Soil #6B4431, Mist #EEF3EC, Paper #FAFCF8, Ink #17231D

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
            setGivingScore((g) => Math.min(54, g + h.pts));
            speakText(`${h.title} completed. Streak is now ${newStreak} days.`);
          } else {
            setGivingScore((g) => Math.max(0, g - h.pts));
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
    <div className="min-h-screen bg-[#FAFCF8] text-[#17231D] flex flex-col font-sans selection:bg-[#E3EBD6] selection:text-[#1F5E3B]">
      {/* ----------------------------------------------------
          TOP BAR CONTRACT (Exact 3-Zone Architecture)
          Zone 1: Single text element wordmark
          Zone 2: Clean 4-6 text navigation links
          Zone 3: Primary action button + Language selector
      ---------------------------------------------------- */}
      <header className="sticky top-0 z-50 bg-[#FAFCF8]/95 backdrop-blur-md border-b border-[#D6E0D3] px-6 py-3.5 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2">
          <a
            href="#simulator"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('simulator');
            }}
            className="text-xl font-bold tracking-tight text-[#17231D] flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-[#1F5E3B] text-white flex items-center justify-center font-sanskrit text-lg shadow-sm">
              प्र
            </span>
            <span>Prakriti</span>
          </a>
          <span className="hidden sm:inline-block text-xs text-[#7F8E85] font-sanskrit">
            · जीवो परमो धर्मः
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A5A51]">
          <button
            onClick={() => setActiveView('simulator')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeView === 'simulator' ? 'text-[#1F5E3B] font-semibold' : 'hover:text-[#17231D]'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile App</span>
          </button>

          <button
            onClick={() => setActiveView('ai-studio')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeView === 'ai-studio' ? 'text-[#1F5E3B] font-semibold' : 'hover:text-[#17231D]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#E3A018]" />
            <span>Gemini AI Studio</span>
          </button>

          <button
            onClick={() => setActiveView('codebase')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeView === 'codebase' ? 'text-[#1F5E3B] font-semibold' : 'hover:text-[#17231D]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Flutter Codebase</span>
          </button>

          <button
            onClick={() => setActiveView('backend')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeView === 'backend' ? 'text-[#1F5E3B] font-semibold' : 'hover:text-[#17231D]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>API & Factors</span>
          </button>

          <button
            onClick={() => setActiveView('architecture')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeView === 'architecture' ? 'text-[#1F5E3B] font-semibold' : 'hover:text-[#17231D]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Architecture & Wisdom</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Quick Switcher */}
        <div className="flex items-center gap-3">
          {/* 12-Language Selector */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                const l = LANGUAGES.find((x) => x.code === e.target.value);
                if (l) speakText(`Prakriti language switched to ${l.native}`);
              }}
              className="bg-white border border-[#D6E0D3] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#17231D] focus:outline-none focus:border-[#1F5E3B] cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native} ({l.name})
                </option>
              ))}
            </select>
          </div>

          {/* 1-Click ZIP Download of full Flutter project */}
          <a
            href="/api/flutter-project/download-zip"
            download="prakriti_flutter_mobile_app.zip"
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1F5E3B] hover:bg-[#123A25] rounded-lg transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap active:scale-[0.98]"
            title="Download full runnable Flutter source folder (Android & iOS)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Flutter Zip</span>
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
              <div className="bg-white rounded-2xl p-6 border border-[#D6E0D3]">
                <div className="flex items-center justify-between text-xs text-[#7F8E85] mb-2">
                  <span>Flutter 3.24 · Android & iOS</span>
                  <span>·</span>
                  <span>108 Double Arc</span>
                  <span>·</span>
                  <span>12 Spoken Languages</span>
                </div>
                <h2 className="text-2xl font-bold text-[#17231D] tracking-tight">
                  Prakriti Mobile Simulator
                </h2>
                <p className="text-sm text-[#4A5A51] mt-2 leading-relaxed">
                  Interact with the real mobile app below. It enforces{' '}
                  <strong className="text-[#1F5E3B]">giving leads</strong>, never scolds,
                  verifies organic sellers across 3 honest tiers, connects local circles (~3
                  km), and speaks with reverence in 12 languages.
                </p>

                {/* Device Frame Toggle */}
                <div className="mt-5 pt-4 border-t border-[#D6E0D3] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#4A5A51]">Preview Frame:</span>
                  <div className="flex items-center gap-1 p-1 bg-[#EEF3EC] rounded-lg">
                    <button
                      onClick={() => setPhoneFrame('iphone')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        phoneFrame === 'iphone'
                          ? 'bg-white text-[#17231D] shadow-sm'
                          : 'text-[#4A5A51] hover:text-[#17231D]'
                      }`}
                    >
                      iPhone 16 Pro
                    </button>
                    <button
                      onClick={() => setPhoneFrame('android')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        phoneFrame === 'android'
                          ? 'bg-white text-[#17231D] shadow-sm'
                          : 'text-[#4A5A51] hover:text-[#17231D]'
                      }`}
                    >
                      Pixel 9 / Android
                    </button>
                  </div>
                </div>
              </div>

              {/* 108 Principle Quick Explainer Card */}
              <div className="bg-[#EEF3EC] rounded-2xl p-5 border border-[#D6E0D3]">
                <h3 className="text-sm font-bold text-[#17231D] flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-[#1F5E3B]" />
                  <span>The 108 Principle (Two Halves of 54)</span>
                </h3>
                <p className="text-xs text-[#4A5A51] mt-1.5 leading-relaxed">
                  The two figures are <em>never netted against each other</em>. A heavy travel day
                  cannot erase the seeds you planted; giving trees cannot excuse pollution. Both
                  arcs stay visible, with giving on top.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-[#D6E0D3]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F5E3B]">
                      <span className="w-2 h-2 rounded-full bg-[#1F5E3B]" />
                      <span>Given Back ({givingScore}/54)</span>
                    </div>
                    <div className="text-[11px] text-[#7F8E85] mt-1">
                      7 Life Acts: Planting, feeding soil, poison-free food, wild birds.
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#D6E0D3]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#E3A018]">
                      <span className="w-2 h-2 rounded-full bg-[#E3A018]" />
                      <span>Lived Lightly ({lightnessScore}/54)</span>
                    </div>
                    <div className="text-[11px] text-[#7F8E85] mt-1">
                      Resource budget: 6.3 kg CO2e benchmark against CEA grid & travel.
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions to trigger modals */}
              <div className="bg-white rounded-2xl p-5 border border-[#D6E0D3] space-y-2.5">
                <span className="text-xs font-bold text-[#7F8E85] uppercase tracking-wider">
                  Test Dedicated Mobile Flows
                </span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setSimTab('habits')}
                    className="p-2.5 bg-[#EEF3EC] hover:bg-[#E3EBD6] rounded-xl text-left transition-colors flex items-center gap-2 text-xs font-semibold text-[#6B4431]"
                  >
                    <Flame className="w-4 h-4 text-[#E3A018]" />
                    <span>Habits & Streaks</span>
                  </button>
                  <button
                    onClick={() => setShowAssistantModal(true)}
                    className="p-2.5 bg-[#EEF3EC] hover:bg-[#E3EBD6] rounded-xl text-left transition-colors flex items-center gap-2 text-xs font-semibold text-[#1F5E3B]"
                  >
                    <Mic className="w-4 h-4 text-[#1F5E3B]" />
                    <span>Voice Assistant</span>
                  </button>
                  <button
                    onClick={() => setShowSellerOnboarding(true)}
                    className="p-2.5 bg-[#EEF3EC] hover:bg-[#E3EBD6] rounded-xl text-left transition-colors flex items-center gap-2 text-xs font-semibold text-[#6B4431]"
                  >
                    <Store className="w-4 h-4 text-[#6B4431]" />
                    <span>Seller Onboarding</span>
                  </button>
                  <button
                    onClick={() => setShowWisdomScreen(true)}
                    className="p-2.5 bg-[#EEF3EC] hover:bg-[#E3EBD6] rounded-xl text-left transition-colors flex items-center gap-2 text-xs font-semibold text-[#17231D]"
                  >
                    <BookOpen className="w-4 h-4 text-[#7A9A45]" />
                    <span>Veda & Gita Verses</span>
                  </button>
                  <button
                    onClick={() => setShowPrivacyScreen(true)}
                    className="p-2.5 bg-[#EEF3EC] hover:bg-[#E3EBD6] rounded-xl text-left transition-colors flex items-center gap-2 text-xs font-semibold text-[#17231D]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#1F5E3B]" />
                    <span>Privacy & Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Smartphone Shell */}
            <div className="lg:col-span-7 flex justify-center">
              <div
                className={`relative w-[385px] h-[780px] bg-black rounded-[48px] p-3 shadow-2xl border-4 ${
                  phoneFrame === 'iphone' ? 'border-[#333]' : 'border-[#222]'
                }`}
              >
                {/* Dynamic Island / Punch Hole */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] mr-3" />
                  <div className="w-2 h-2 rounded-full bg-[#0a192f]" />
                </div>

                {/* Inner Screen */}
                <div className="w-full h-full bg-[#FAFCF8] rounded-[38px] overflow-hidden flex flex-col relative select-none">
                  {/* Status Bar */}
                  <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-semibold text-[#17231D] z-30">
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
                          className={`bg-gradient-to-b ${greeting.gradient} pt-4 pb-6 px-5 rounded-b-[28px] shadow-sm`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span
                              className={`font-bold tracking-widest text-[10px] ${greeting.subtextColor}`}
                            >
                              PRAKRITI · प्रकृति
                            </span>
                            <button
                              onClick={() => {
                                const phrase = `${greeting.devanagari}, ${greeting.meaning}. Welcome to Prakriti.`;
                                speakText(phrase);
                              }}
                              className="p-1 rounded-full bg-white/30 text-[#17231D] hover:bg-white/50 transition-colors"
                              title="Listen to spoken greeting"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h1
                            className={`font-sanskrit text-3xl font-bold mt-2 ${greeting.textColor}`}
                          >
                            {greeting.devanagari}
                          </h1>
                          <div
                            className={`text-xs font-semibold ${greeting.subtextColor} flex items-center gap-1 mt-0.5`}
                          >
                            <span>{greeting.transliteration}</span>
                            <span>·</span>
                            <span>{greeting.meaning}</span>
                          </div>
                          <p className="text-[11px] italic text-[#17231D]/80 mt-1">
                            Jeevo paramo dharma — Life itself is the highest duty
                          </p>
                        </div>

                        {/* 108 Double Concentric Arc Ring */}
                        <div className="p-4">
                          <div className="bg-white rounded-2xl p-4 border border-[#D6E0D3] shadow-sm flex items-center gap-4">
                            {/* SVG Arc Ring */}
                            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                                {/* Outer track (Giving) */}
                                <circle
                                  cx="60"
                                  cy="60"
                                  r="48"
                                  fill="none"
                                  stroke="#E3EBD6"
                                  strokeWidth="8"
                                />
                                <circle
                                  cx="60"
                                  cy="60"
                                  r="48"
                                  fill="none"
                                  stroke="#1F5E3B"
                                  strokeWidth="8"
                                  strokeDasharray="301"
                                  strokeDashoffset={301 - (301 * (givingScore / 54))}
                                  strokeLinecap="round"
                                />
                                {/* Inner track (Lived lightly) */}
                                <circle
                                  cx="60"
                                  cy="60"
                                  r="36"
                                  fill="none"
                                  stroke="#FBEFD2"
                                  strokeWidth="8"
                                />
                                <circle
                                  cx="60"
                                  cy="60"
                                  r="36"
                                  fill="none"
                                  stroke="#E3A018"
                                  strokeWidth="8"
                                  strokeDasharray="226"
                                  strokeDashoffset={226 - (226 * (lightnessScore / 54))}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-2xl font-extrabold text-[#17231D] leading-none">
                                  {totalScore108}
                                </span>
                                <span className="text-[9px] font-bold text-[#7F8E85] tracking-wider mt-0.5">
                                  OF 108
                                </span>
                              </div>
                            </div>

                            {/* Side stats: Giving stays on top! */}
                            <div className="flex-1 space-y-2.5">
                              <div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F5E3B]">
                                  <span className="w-2 h-2 rounded-full bg-[#1F5E3B]" />
                                  <span>{givingScore} of 54</span>
                                </div>
                                <div className="text-[11px] text-[#4A5A51]">
                                  Given back to life
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#E3A018]">
                                  <span className="w-2 h-2 rounded-full bg-[#E3A018]" />
                                  <span>{lightnessScore} of 54</span>
                                </div>
                                <div className="text-[11px] text-[#4A5A51]">
                                  Lived lightly today
                                </div>
                              </div>
                              <button
                                onClick={() => setSimTab('footprint')}
                                className="text-[11px] font-semibold text-[#1F5E3B] border border-[#1F5E3B] rounded-lg px-2.5 py-1 hover:bg-[#1F5E3B] hover:text-white transition-colors"
                              >
                                + Log Act
                              </button>
                            </div>
                          </div>

                          {/* Daily Small Step */}
                          <div className="mt-3.5 bg-[#EEF3EC] p-3.5 rounded-2xl border border-[#D6E0D3]">
                            <div className="flex items-center justify-between text-[10px] font-bold text-[#1F5E3B] uppercase tracking-wider mb-1">
                              <span>Daily Small Step</span>
                              <span className="text-[#7A9A45]">No-Cost Action</span>
                            </div>
                            <h4 className="text-xs font-bold text-[#17231D]">
                              Feed garden soil with organic vegetable scraps
                            </h4>
                            <p className="text-[11px] text-[#4A5A51] mt-1 leading-normal">
                              Raw kitchen peelings nourish beneficial earthworms and retain soil
                              moisture during peak daylight.
                            </p>
                          </div>

                          {/* Gemini AI Eco Studio Card in App */}
                          <button
                            onClick={() => setActiveView('ai-studio')}
                            className="mt-3 w-full bg-gradient-to-r from-[#E8F5E9] to-[#C8E6C9] p-3 rounded-2xl border border-[#7A9A45]/30 text-left flex items-center justify-between transition-transform active:scale-[0.98]"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-[#1F5E3B] text-white flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-[#E3A018]" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-[#123A25]">
                                  Gemini AI Eco Studio
                                </div>
                                <div className="text-[10px] text-[#4A5A51]">
                                  Create & edit images with 3.1 Flash & 3 Pro (1K, 2K, 4K)
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#1F5E3B]" />
                          </button>

                          {/* Verse of the Day Card */}
                          <div className="mt-3.5 bg-white p-3.5 rounded-2xl border border-[#D6E0D3]">
                            <div className="text-[9px] font-bold text-[#6B4431] uppercase tracking-wider">
                              Atharva Veda 12.1.12 · Bhumi Sukta
                            </div>
                            <div className="font-sanskrit text-base font-semibold text-[#17231D] mt-1">
                              माता भूमिः पुत्रो अहं पृथिव्याः
                            </div>
                            <div className="text-[11px] italic text-[#4A5A51] mt-0.5">
                              "Earth is my mother, and I am her child."
                            </div>
                            <div className="mt-2 text-[10px] font-semibold text-[#1F5E3B] bg-[#E3EBD6] p-2 rounded-lg">
                              Practice step: Treat every patch of open soil with reverence; leave no
                              plastic behind.
                            </div>
                          </div>

                          {/* Daily Habits Quick Widget in Today View */}
                          <div className="mt-3.5 bg-white p-3.5 rounded-2xl border border-[#D6E0D3] space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Flame className="w-4 h-4 text-[#E3A018]" />
                                <span className="text-xs font-bold text-[#17231D]">Daily Eco Habits</span>
                              </div>
                              <span className="text-[10px] font-semibold text-[#1F5E3B] bg-[#E3EBD6] px-2 py-0.5 rounded-md">
                                {habits.filter((h) => h.completedToday).length}/{habits.length} Done Today
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {habits.slice(0, 2).map((h) => (
                                <div
                                  key={h.id}
                                  onClick={() => handleToggleHabit(h.id)}
                                  className="flex items-center justify-between p-2 rounded-xl bg-[#FAFCF8] border border-[#D6E0D3] text-xs cursor-pointer hover:bg-[#EEF3EC] transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                        h.completedToday
                                          ? 'bg-[#1F5E3B] border-[#1F5E3B] text-white'
                                          : 'border-[#7F8E85] bg-white'
                                      }`}
                                    >
                                      {h.completedToday && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <span
                                      className={`font-medium ${
                                        h.completedToday ? 'line-through text-[#7F8E85]' : 'text-[#17231D]'
                                      }`}
                                    >
                                      {h.title}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-bold text-[#6B4431] flex items-center gap-0.5">
                                    <Flame className="w-3 h-3 text-[#E3A018]" /> {h.streak}d
                                  </span>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => setSimTab('habits')}
                              className="w-full text-center text-[11px] font-bold text-[#1F5E3B] hover:underline pt-1 flex items-center justify-center gap-1"
                            >
                              <span>Open Habits tracker & streak counter</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
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
                              <h3 className="text-base font-bold text-[#17231D]">
                                Ecological Habits
                              </h3>
                              <span className="font-sanskrit text-xs text-[#7A9A45] font-semibold">
                                दैनिक साधना
                              </span>
                            </div>
                            <p className="text-[10px] text-[#4A5A51] mt-0.5">
                              Daily recurring acts that keep soil, flora & birds thriving.
                            </p>
                          </div>
                          <button
                            onClick={() => setShowAddHabitModal(true)}
                            className="p-1.5 bg-[#1F5E3B] text-white rounded-lg hover:bg-[#123A25] transition-colors flex items-center gap-1 text-[11px] font-bold shadow-sm"
                            title="Add Custom Ecological Habit"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>

                        {/* Top Streaks Highlight Banner */}
                        <div className="bg-gradient-to-r from-[#1F5E3B] to-[#2B7A4F] text-white p-3.5 rounded-2xl shadow-md space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Flame className="w-5 h-5 text-[#FEE180]" />
                              </div>
                              <div>
                                <div className="text-[10px] font-medium text-white/80 uppercase tracking-wider">
                                  Current Rhythm
                                </div>
                                <div className="text-sm font-extrabold flex items-center gap-1.5">
                                  <span>{habits.filter((h) => h.completedToday).length} of {habits.length} Done Today</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] font-medium text-white/80">
                                Longest Streak
                              </div>
                              <div className="text-base font-black text-[#FEE180] flex items-center justify-end gap-1">
                                <span>{Math.max(...habits.map((h) => h.streak), 0)} days</span>
                              </div>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="space-y-1">
                            <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-[#E3A018] h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${(habits.filter((h) => h.completedToday).length / Math.max(habits.length, 1)) * 100}%`,
                                }}
                              />
                            </div>
                            <div className="flex justify-between text-[9px] text-white/75 font-medium">
                              <span>Consistent small acts protect ecosystems</span>
                              <span>+{habits.reduce((acc, h) => acc + (h.completedToday ? h.pts : 0), 0)} Giving pts</span>
                            </div>
                          </div>
                        </div>

                        {/* Celebration Toast (when habit completed) */}
                        {celebratingHabitId && (
                          <div className="bg-[#FBEFD2] border border-[#E3A018] p-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold text-[#6B4431]">
                            <Sparkles className="w-4 h-4 text-[#E3A018] shrink-0" />
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
                                  ? 'bg-[#1F5E3B] text-white border-[#1F5E3B]'
                                  : 'bg-white text-[#4A5A51] border-[#D6E0D3] hover:bg-[#EEF3EC]'
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
                                    ? 'bg-[#FAFCF8] border-[#7A9A45]/40 shadow-xs'
                                    : 'bg-white border-[#D6E0D3] shadow-xs hover:border-[#1F5E3B]/40'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2.5">
                                  {/* Checkbox circle */}
                                  <button
                                    onClick={() => handleToggleHabit(habit.id)}
                                    className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                                      habit.completedToday
                                        ? 'bg-[#1F5E3B] border-[#1F5E3B] text-white shadow-xs'
                                        : 'border-[#7F8E85] bg-white hover:border-[#1F5E3B]'
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
                                              ? 'line-through text-[#7F8E85]'
                                              : 'text-[#17231D]'
                                          }`}
                                        >
                                          {habit.title}
                                        </h4>
                                        <span className="font-sanskrit text-[10px] text-[#7A9A45] font-semibold">
                                          {habit.hindiTitle}
                                        </span>
                                      </div>

                                      {/* Streak Badge */}
                                      <div
                                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                                          habit.completedToday
                                            ? 'bg-[#FBEFD2] text-[#6B4431] border border-[#E3A018]'
                                            : 'bg-[#EEF3EC] text-[#4A5A51]'
                                        }`}
                                      >
                                        <Flame
                                          className={`w-3 h-3 ${
                                            habit.completedToday ? 'text-[#E3A018]' : 'text-[#7F8E85]'
                                          }`}
                                        />
                                        <span>{habit.streak}d streak</span>
                                      </div>
                                    </div>

                                    {/* Eco Impact note */}
                                    <p className="text-[10px] text-[#4A5A51] mt-1 leading-snug">
                                      {habit.ecoImpact}
                                    </p>

                                    {/* Footer: Frequency, 7-Day History dots, Points */}
                                    <div className="mt-2.5 pt-2 border-t border-[#D6E0D3]/60 flex items-center justify-between gap-2">
                                      <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-bold text-[#7F8E85] uppercase tracking-wider">
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
                                                    ? 'bg-[#1F5E3B] text-white'
                                                    : 'bg-[#EEF3EC] text-[#7F8E85]'
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
                                        <span className="text-[9px] font-bold text-[#1F5E3B] bg-[#E3EBD6] px-1.5 py-0.5 rounded">
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
                        <div className="pt-2 flex items-center justify-between text-[10px] text-[#7F8E85]">
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
                            className="flex items-center gap-1 text-[#4A5A51] hover:text-[#1F5E3B] font-semibold"
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
                          <h3 className="text-base font-bold text-[#17231D]">
                            Environmental Updates
                          </h3>
                          <span className="text-[10px] text-[#7F8E85]">Verified Feeds</span>
                        </div>
                        {/* Topic chips */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                          {['All', 'Forests', 'Water', 'Climate', 'Air'].map((t, idx) => (
                            <button
                              key={t}
                              className={`px-2.5 py-1 rounded-full whitespace-nowrap text-[11px] font-medium border ${
                                idx === 0
                                  ? 'bg-[#1F5E3B] text-white border-[#1F5E3B]'
                                  : 'bg-white text-[#4A5A51] border-[#D6E0D3]'
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
                            className="bg-white p-3.5 rounded-2xl border border-[#D6E0D3] space-y-2"
                          >
                            <div className="flex items-center gap-2 text-[10px] text-[#7A9A45] font-bold">
                              <span>{item.topic.toUpperCase()}</span>
                              <span>·</span>
                              <span className="text-[#7F8E85]">{item.time}</span>
                            </div>
                            <h4 className="text-xs font-bold text-[#17231D] leading-snug">
                              {item.title}
                            </h4>
                            <div className="bg-[#EEF3EC] p-2.5 rounded-xl space-y-1 text-[11px]">
                              <div className="text-[#17231D]">
                                <span className="font-semibold text-[#4A5A51]">Effect: </span>
                                {item.effect}
                              </div>
                              <div className="text-[#1F5E3B] font-semibold">
                                <span>Small step: </span>
                                {item.step}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB: FOOTPRINT & GIVING */}
                    {simTab === 'footprint' && (
                      <div className="p-4 space-y-3">
                        <h3 className="text-base font-bold text-[#17231D]">108 Footprint & Giving</h3>
                        {/* Verdict Banner (Never Scold!) */}
                        <div className="bg-[#E3EBD6] p-3 rounded-xl border border-[#1F5E3B]/20 flex items-center gap-2 text-xs font-semibold text-[#1F5E3B]">
                          <Leaf className="w-4 h-4 shrink-0" />
                          <span>You gave something back today. That stays.</span>
                        </div>

                        {/* 7 Giving Acts */}
                        <div className="space-y-2 pt-1">
                          <span className="text-xs font-bold text-[#17231D]">
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
                              className="bg-white p-2.5 rounded-xl border border-[#D6E0D3] flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-[#EEF3EC] text-[#1F5E3B] flex items-center justify-center font-bold text-[10px]">
                                  {i + 1}
                                </span>
                                <span className="font-medium text-[#17231D]">{act.name}</span>
                              </div>
                              <button
                                onClick={() => {
                                  setGivingScore((prev) => Math.min(54, prev + act.pts));
                                  setLoggedActs([
                                    { id: String(Date.now()), name: act.name, pts: act.pts },
                                    ...loggedActs,
                                  ]);
                                }}
                                className="px-2 py-1 bg-[#1F5E3B] text-white rounded-lg text-[10px] font-bold hover:bg-[#123A25] transition-colors"
                              >
                                +{act.pts} pts
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Today's Logged Entries */}
                        {loggedActs.length > 0 && (
                          <div className="space-y-1.5 pt-2">
                            <span className="text-xs font-bold text-[#7F8E85]">Today's Acts</span>
                            {loggedActs.map((entry, index) => (
                              <div
                                key={entry.id}
                                className="bg-[#FAFCF8] p-2 rounded-lg border border-[#D6E0D3] flex items-center justify-between text-[11px]"
                              >
                                <span className="text-[#17231D]">{entry.name}</span>
                                <button
                                  onClick={() => {
                                    setLoggedActs(loggedActs.filter((_, idx) => idx !== index));
                                    setGivingScore((prev) => Math.max(0, prev - entry.pts));
                                  }}
                                  className="text-[#7F8E85] hover:text-[#B3412F]"
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
                          <h3 className="text-base font-bold text-[#17231D]">
                            Genuine Organic Market
                          </h3>
                          <button
                            onClick={() => setShowSellerOnboarding(true)}
                            className="text-xs font-bold text-[#6B4431] bg-[#FBEFD2] px-2.5 py-1 rounded-lg"
                          >
                            Sell Here
                          </button>
                        </div>

                        {/* Three Tiers explanation */}
                        <div className="bg-[#EEF3EC] p-2.5 rounded-xl text-[10px] text-[#4A5A51] space-y-0.5">
                          <span className="font-bold text-[#1F5E3B]">3 Honest Tiers: </span>
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
                            className="bg-white p-3 rounded-2xl border border-[#D6E0D3] space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#17231D]">{prod.name}</span>
                              <span className="text-xs font-extrabold text-[#1F5E3B]">
                                {prod.price}
                              </span>
                            </div>
                            <div className="text-[10px] text-[#7F8E85]">
                              {prod.farm} · {prod.dist}
                            </div>
                            <div className="text-[10px] font-semibold text-[#1F5E3B] bg-[#E3EBD6] px-2 py-0.5 rounded-md inline-block">
                              {prod.tier}
                            </div>
                            <p className="text-[11px] text-[#4A5A51]">{prod.why}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB: CIRCLE */}
                    {simTab === 'circle' && (
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-[#17231D]">
                            Local Circle (~3 km)
                          </h3>
                          <span className="text-[10px] text-[#7F8E85]">Meetups & Knowledge</span>
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
                            className="bg-white p-3.5 rounded-2xl border border-[#D6E0D3] space-y-2"
                          >
                            <div className="flex items-center justify-between text-[10px] text-[#7A9A45] font-bold">
                              <span>{post.type}</span>
                              <span className="text-[#7F8E85]">{post.author}</span>
                            </div>
                            <h4 className="text-xs font-bold text-[#17231D]">{post.title}</h4>
                            <p className="text-[11px] text-[#4A5A51]">{post.details}</p>
                            {post.rsvps !== null && (
                              <button
                                onClick={() => speakText(`RSVP confirmed for ${post.title}`)}
                                className="w-full mt-2 py-1.5 bg-[#1F5E3B] text-white rounded-lg text-xs font-semibold hover:bg-[#123A25] transition-colors"
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
                  <div className="h-16 bg-white border-t border-[#D6E0D3] px-1.5 flex items-center justify-between z-30 shrink-0">
                    <button
                      onClick={() => setSimTab('today')}
                      className={`flex flex-col items-center text-[9px] font-semibold px-1 ${
                        simTab === 'today' ? 'text-[#1F5E3B]' : 'text-[#7F8E85]'
                      }`}
                    >
                      <Leaf className="w-4 h-4" />
                      <span>Today</span>
                    </button>

                    <button
                      onClick={() => setSimTab('habits')}
                      className={`flex flex-col items-center text-[9px] font-semibold px-1 relative ${
                        simTab === 'habits' ? 'text-[#1F5E3B]' : 'text-[#7F8E85]'
                      }`}
                    >
                      <Flame className={`w-4 h-4 ${simTab === 'habits' ? 'text-[#E3A018]' : ''}`} />
                      <span>Habits</span>
                      {habits.some((h) => !h.completedToday) && (
                        <span className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full bg-[#E3A018]" />
                      )}
                    </button>

                    {/* Raised Center Mic (Voice Assistant) */}
                    <button
                      onClick={() => setShowAssistantModal(true)}
                      className="-mt-5 w-11 h-11 rounded-full bg-[#1F5E3B] text-white flex items-center justify-center shadow-lg border-2 border-white active:scale-95 transition-transform shrink-0"
                      title="Open Prakriti Voice Assistant"
                    >
                      <Mic className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setSimTab('news')}
                      className={`flex flex-col items-center text-[9px] font-semibold px-1 ${
                        simTab === 'news' ? 'text-[#1F5E3B]' : 'text-[#7F8E85]'
                      }`}
                    >
                      <Globe className="w-4 h-4" />
                      <span>News</span>
                    </button>

                    <button
                      onClick={() => setSimTab('market')}
                      className={`flex flex-col items-center text-[9px] font-semibold px-1 ${
                        simTab === 'market' ? 'text-[#1F5E3B]' : 'text-[#7F8E85]'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Market</span>
                    </button>

                    <button
                      onClick={() => setSimTab('circle')}
                      className={`flex flex-col items-center text-[9px] font-semibold px-1 ${
                        simTab === 'circle' ? 'text-[#1F5E3B]' : 'text-[#7F8E85]'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>Circle</span>
                    </button>
                  </div>

                  {/* MODAL OVERLAYS (Assistant, Seller, Privacy, Wisdom, Add Habit) */}
                  {/* 0. Add Custom Habit Modal */}
                  {showAddHabitModal && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                      <div className="bg-[#FAFCF8] rounded-2xl p-4 w-full max-w-xs border border-[#D6E0D3] shadow-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[#17231D] flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-[#E3A018]" />
                            <span>New Ecological Habit</span>
                          </h4>
                          <button
                            onClick={() => setShowAddHabitModal(false)}
                            className="text-xs text-[#7F8E85] hover:text-[#17231D] p-1"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <label className="text-[10px] font-bold text-[#4A5A51] block mb-0.5">
                              Habit Name
                            </label>
                            <input
                              type="text"
                              value={newHabitTitle}
                              onChange={(e) => setNewHabitTitle(e.target.value)}
                              placeholder="e.g. Watering Tulsi, Earthen Khamba"
                              className="w-full p-2 bg-white border border-[#D6E0D3] rounded-lg text-xs text-[#17231D]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-[#4A5A51] block mb-0.5">
                              Hindi / Regional Subtitle
                            </label>
                            <input
                              type="text"
                              value={newHabitHindiTitle}
                              onChange={(e) => setNewHabitHindiTitle(e.target.value)}
                              placeholder="e.g. तुलसी जलार्पण"
                              className="w-full p-2 bg-white border border-[#D6E0D3] rounded-lg text-xs text-[#17231D]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-bold text-[#4A5A51] block mb-0.5">
                                Frequency
                              </label>
                              <select
                                value={newHabitFrequency}
                                onChange={(e) => setNewHabitFrequency(e.target.value)}
                                className="w-full p-1.5 bg-white border border-[#D6E0D3] rounded-lg text-[11px] text-[#17231D]"
                              >
                                <option value="Daily Morning">Daily Morning</option>
                                <option value="Daily Evening">Daily Evening</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-[#4A5A51] block mb-0.5">
                                Category
                              </label>
                              <select
                                value={newHabitCategory}
                                onChange={(e) => setNewHabitCategory(e.target.value as any)}
                                className="w-full p-1.5 bg-white border border-[#D6E0D3] rounded-lg text-[11px] text-[#17231D]"
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
                            <label className="text-[10px] font-bold text-[#4A5A51] block mb-0.5">
                              Direct Ecological Benefit
                            </label>
                            <input
                              type="text"
                              value={newHabitImpact}
                              onChange={(e) => setNewHabitImpact(e.target.value)}
                              placeholder="e.g. Oxygen enrichment and pollinator refuge"
                              className="w-full p-2 bg-white border border-[#D6E0D3] rounded-lg text-xs text-[#17231D]"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() => setShowAddHabitModal(false)}
                            className="flex-1 py-1.5 border border-[#D6E0D3] text-[#4A5A51] rounded-lg text-xs font-semibold"
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
                            className="flex-1 py-1.5 bg-[#1F5E3B] text-white rounded-lg text-xs font-bold hover:bg-[#123A25]"
                          >
                            Save Habit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1. Voice Assistant Modal */}
                  {showAssistantModal && (
                    <div className="absolute inset-0 bg-[#FAFCF8] z-50 p-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1F5E3B]">Prakriti Voice Assistant</span>
                        <button
                          onClick={() => setShowAssistantModal(false)}
                          className="p-1 rounded-full text-[#7F8E85] hover:text-[#17231D]"
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
                          className={`w-28 h-28 rounded-full bg-gradient-to-tr from-[#123A25] via-[#1F5E3B] to-[#7A9A45] flex items-center justify-center text-white cursor-pointer shadow-xl transition-all ${
                            assistantListening ? 'scale-110 shadow-[#1F5E3B]/50' : 'scale-100'
                          }`}
                        >
                          <Mic className="w-10 h-10 animate-pulse" />
                        </div>
                        <span className="text-xs font-semibold text-[#1F5E3B] mt-4">
                          {assistantListening ? 'Listening with reverence...' : 'Tap orb to speak'}
                        </span>
                        <p className="text-xs text-[#4A5A51] text-center mt-3 max-w-[260px]">
                          {assistantReply}
                        </p>
                        <div className="mt-3 bg-[#E3EBD6] p-2.5 rounded-xl text-[11px] text-[#1F5E3B] font-medium text-center">
                          <strong>Small Step:</strong> {assistantSmallStep}
                        </div>
                      </div>

                      <div className="text-[10px] text-[#7F8E85] text-center">
                        Audio is processed on-device and never retained or uploaded.
                      </div>
                    </div>
                  )}

                  {/* 2. Seller Onboarding Modal (3 Spoken Yes/No Questions) */}
                  {showSellerOnboarding && (
                    <div className="absolute inset-0 bg-[#FAFCF8] z-50 p-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#6B4431]">
                          Farmer Onboarding · किसान पंजीकरण
                        </span>
                        <button
                          onClick={() => setShowSellerOnboarding(false)}
                          className="p-1 rounded-full text-[#7F8E85]"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="my-auto text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-[#FBEFD2] text-[#6B4431] flex items-center justify-center mx-auto">
                          <Store className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-[#17231D]">
                          Do you have an organic certificate from the government board?
                        </h4>
                        <p className="text-xs text-[#4A5A51]">
                          क्या आपके पास सरकारी बोर्ड से जैविक प्रमाणपत्र है?
                        </p>
                        <div className="grid grid-cols-2 gap-3 pt-4">
                          <button
                            onClick={() => {
                              speakText('Great! You will be certified under Tier 1 government board.');
                              setShowSellerOnboarding(false);
                            }}
                            className="py-3 bg-[#1F5E3B] text-white font-bold rounded-xl text-sm"
                          >
                            Yes · हाँ
                          </button>
                          <button
                            onClick={() => {
                              speakText('That is fine. Your neighbours can vouch for you, and we will help you get certified for free later.');
                              setShowSellerOnboarding(false);
                            }}
                            className="py-3 bg-white border border-[#D6E0D3] text-[#17231D] font-bold rounded-xl text-sm"
                          >
                            No · नहीं
                          </button>
                        </div>
                      </div>

                      <div className="text-[10px] text-[#7F8E85] text-center">
                        No jargon. Tier 3 is an honest ladder toward PGS-India certification.
                      </div>
                    </div>
                  )}

                  {/* 3. Privacy Screen Modal */}
                  {showPrivacyScreen && (
                    <div className="absolute inset-0 bg-[#FAFCF8] z-50 p-5 overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#1F5E3B]">
                          Privacy & Data Sovereignty
                        </span>
                        <button
                          onClick={() => setShowPrivacyScreen(false)}
                          className="p-1 rounded-full text-[#7F8E85]"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-3 text-xs text-[#4A5A51]">
                        <div className="bg-white p-3 rounded-xl border border-[#D6E0D3]">
                          <strong className="text-[#17231D]">1. XChaCha20-Poly1305 Vault:</strong>
                          <p className="mt-1">Footprint & journal encrypted on phone; server holds only ciphertext.</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-[#D6E0D3]">
                          <strong className="text-[#17231D]">2. Coarsened Location:</strong>
                          <p className="mt-1">~1 km cell only. Exact GPS coordinates are never transmitted.</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-[#D6E0D3]">
                          <strong className="text-[#17231D]">3. Export Before Deletion:</strong>
                          <p className="mt-1">Download encrypted archive zip first before account termination.</p>
                        </div>
                        <a
                          href="/api/flutter-project/download-zip"
                          className="block text-center py-2 bg-[#1F5E3B] text-white font-bold rounded-xl"
                        >
                          Download Data Archive
                        </a>
                      </div>
                    </div>
                  )}

                  {/* 4. Wisdom Screen Modal */}
                  {showWisdomScreen && (
                    <div className="absolute inset-0 bg-[#FAFCF8] z-50 p-5 overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#6B4431]">
                          Bhagavad Gita & Atharva Veda
                        </span>
                        <button
                          onClick={() => setShowWisdomScreen(false)}
                          className="p-1 rounded-full text-[#7F8E85]"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded-xl border border-[#D6E0D3]">
                          <div className="text-[10px] text-[#6B4431] font-bold">GITA 3.14</div>
                          <div className="font-sanskrit text-sm font-bold text-[#17231D] mt-1">
                            अन्नाद्भवन्ति भूतानि पर्जन्यादन्नसम्भवः
                          </div>
                          <p className="text-[11px] text-[#4A5A51] mt-1">
                            All bodies subsist on grains from rains; rains come from giving back to nature.
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-[#D6E0D3]">
                          <div className="text-[10px] text-[#6B4431] font-bold">BHUMI SUKTA 12.1.35</div>
                          <div className="font-sanskrit text-sm font-bold text-[#17231D] mt-1">
                            यत् ते भूमे विखनामि क्षिप्रं तद् अपि रोहतु
                          </div>
                          <p className="text-[11px] text-[#4A5A51] mt-1">
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

      {/* Footer */}
      <footer className="border-t border-[#D6E0D3] py-6 px-6 text-center text-xs text-[#7F8E85] bg-[#FAFCF8]">
        <p className="font-sanskrit text-sm text-[#1F5E3B] font-semibold">
          जीवो परमो धर्मः · सर्वभूतहिते रताः
        </p>
        <p className="mt-1">
          Prakriti Ecological Ecosystem · Full-Stack Web + Complete Flutter Mobile Codebase (Android & iOS)
        </p>
      </footer>
    </div>
  );
}
