import React from 'react';
import { X, Sparkles, Feather, Sun, Moon, Leaf, Heart, Infinity as InfinityIcon, Compass, BookOpen, ShieldCheck } from 'lucide-react';

interface PrincipleOf108ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isKrishna: boolean;
  givingScore: number;
  lightnessScore: number;
}

export const PrincipleOf108Modal: React.FC<PrincipleOf108ModalProps> = ({
  isOpen,
  onClose,
  isKrishna,
  givingScore,
  lightnessScore,
}) => {
  if (!isOpen) return null;

  const chandrikaGold = isKrishna ? '#FFB800' : '#C58F1B';
  const kanthTeal = isKrishna ? '#00DFB6' : '#097770';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl transition-all ${
          isKrishna
            ? 'bg-[#0A1A24] border-[#1B3E52] text-[#EEF9F6]'
            : 'bg-white border-[#D2E3DB] text-[#0C1F1B]'
        }`}
      >
        {/* Header with Sacred Peacock Feather Theme */}
        <div
          className={`sticky top-0 z-20 px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
            isKrishna ? 'bg-[#0A1A24]/90 border-[#1B3E52]' : 'bg-white/90 border-[#D2E3DB]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isKrishna ? 'bg-[#00DFB6]/20 text-[#00DFB6]' : 'bg-[#097770]/15 text-[#097770]'
              }`}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight flex items-center gap-2">
                <span>The Principle of 108</span>
                <span className="text-xs font-sanskrit opacity-75">१०८ का दिव्य रहस्य</span>
              </h2>
              <p className={`text-xs ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}`}>
                The 1 · 0 · ∞ Sacred Progression & The Two Arches of 54
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isKrishna
                ? 'hover:bg-[#142C3C] text-[#9BC3B9] hover:text-[#EEF9F6]'
                : 'hover:bg-[#EDF5F1] text-[#6C837C] hover:text-[#0C1F1B]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* THE 1 -> 0 -> ∞ SACRED PROGRESSION SHOWCASE */}
          <div
            className={`p-5 rounded-2xl border text-center relative overflow-hidden ${
              isKrishna
                ? 'bg-gradient-to-r from-[#112431] via-[#0E2F3E] to-[#112431] border-[#1B3E52]'
                : 'bg-gradient-to-r from-[#F4F9F6] via-[#E7F3ED] to-[#F4F9F6] border-[#D2E3DB]'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#FFB800] mb-2">
              The Cosmic Progression of 108 (१ · ० · ∞)
            </div>

            {/* 3 Step Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left my-4">
              {/* Step 1: 1 (The Singularity) */}
              <div
                className={`p-4 rounded-xl border relative ${
                  isKrishna ? 'bg-[#07131B] border-[#FFB800]/40' : 'bg-white border-[#C58F1B]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-[#FFB800]">1</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFB800]/20 text-[#FFB800]">
                    LEFT ORIGIN
                  </span>
                </div>
                <h4 className="font-bold text-sm mt-2">The Singularity (एकम्)</h4>
                <p className={`text-xs mt-1 leading-relaxed ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}`}>
                  The individual conscious soul (Jivatma). Every planetary healing begins on the left side with a single
                  individual decision to plant, protect, or conserve.
                </p>
              </div>

              {/* Step 2: 0 (Shunya) */}
              <div
                className={`p-4 rounded-xl border relative ${
                  isKrishna ? 'bg-[#07131B] border-[#00DFB6]/40' : 'bg-white border-[#097770]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-[#00DFB6]">0</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00DFB6]/20 text-[#00DFB6]">
                    CENTER VORTEX
                  </span>
                </div>
                <h4 className="font-bold text-sm mt-2">Shunya (शून्य · The Void)</h4>
                <p className={`text-xs mt-1 leading-relaxed ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}`}>
                  Zero-ego and complete humility before nature. Discovered in India, 0 is the cosmic womb that holds all
                  possibilities, where personal pride dissolves into universal stewardship.
                </p>
              </div>

              {/* Step 3: 8 / Infinity (Ananta) */}
              <div
                className={`p-4 rounded-xl border relative ${
                  isKrishna ? 'bg-[#07131B] border-[#10B981]/40' : 'bg-white border-[#1A5F44]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-[#10B981]">∞ / 8</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981]">
                    TWO ARCHES
                  </span>
                </div>
                <h4 className="font-bold text-sm mt-2">Ananta (अनंत · Infinity)</h4>
                <p className={`text-xs mt-1 leading-relaxed ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}`}>
                  The figure 8 turned on its side forms the sacred Lemniscate. When the dual arches of <strong>54 Giving</strong> and{' '}
                  <strong>54 Lightness</strong> complete, they fuse into infinite ecological regeneration.
                </p>
              </div>
            </div>

            <div className={`text-xs italic ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}`}>
              1 (The One) + 0 (The Void) + 8 (Infinity) = 108 — The supreme harmonic constant of Vedic science and astronomy.
            </div>
          </div>

          {/* THE TWO ARCHES OF 54 (NEVER NETTED) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Compass className={`w-4 h-4 ${isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'}`} />
              <span>The Two Non-Fungible Arches of 54 (५४ + ५४ = १०८)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Arch 1: Giving (54 Points) */}
              <div
                className={`p-4 rounded-2xl border ${
                  isKrishna ? 'bg-[#142C3C] border-[#1B3E52]' : 'bg-[#FAFCF8] border-[#D2E3DB]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs"
                    style={{ backgroundColor: chandrikaGold }}
                  />
                  <h4 className="font-bold text-sm text-[#FFB800]">Arch 1: Giving (५४ Beads)</h4>
                </div>
                <p className={`text-xs leading-relaxed ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}`}>
                  Sourced from <strong>Chandrika</strong>—the golden eye at the center of the peacock feather. Measures tangible
                  acts that replenish the living earth:
                </p>
                <ul className="mt-2.5 space-y-1.5 text-xs">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#FFB800] mt-0.5">✦</span>
                    <span>Watering sacred Tulsi, Neem, Peepal, and indigenous pollinators (+5 pts)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#FFB800] mt-0.5">✦</span>
                    <span>Kitchen wet-waste composting feeding living earthworms (+8 pts)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#FFB800] mt-0.5">✦</span>
                    <span>Refilling terracotta water bowls for wild urban birds and sparrows (+6 pts)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#FFB800] mt-0.5">✦</span>
                    <span>Purchasing chemical-free indigenous heirloom produce (+7 pts)</span>
                  </li>
                </ul>
              </div>

              {/* Arch 2: Living Lightly (54 Points) */}
              <div
                className={`p-4 rounded-2xl border ${
                  isKrishna ? 'bg-[#142C3C] border-[#1B3E52]' : 'bg-[#FAFCF8] border-[#D2E3DB]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs"
                    style={{ backgroundColor: kanthTeal }}
                  />
                  <h4 className="font-bold text-sm text-[#00DFB6]">Arch 2: Living Lightly (५४ Beads)</h4>
                </div>
                <p className={`text-xs leading-relaxed ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}`}>
                  Sourced from <strong>Mayur Kanth</strong>—the glowing cyan throat of the peacock. Measures mindful resource
                  consumption without guilt or scolding:
                </p>
                <ul className="mt-2.5 space-y-1.5 text-xs">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#00DFB6] mt-0.5">✦</span>
                    <span><strong>6.3 kg CO2e</strong> daily consumption benchmark (CEA national grid factor)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#00DFB6] mt-0.5">✦</span>
                    <span>Zero single-use plastic days eliminating microplastic pollution</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#00DFB6] mt-0.5">✦</span>
                    <span>Natural fermented bio-enzymes replacing synthetic chemical detergents</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#00DFB6] mt-0.5">✦</span>
                    <span>Standby power disconnection and solar diurnal alignment</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Invariant Rule: Giving Leads, Never Netted */}
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                isKrishna ? 'bg-[#07131B] border-[#00DFB6]/30' : 'bg-[#E7F2EC] border-[#097770]/30'
              }`}
            >
              <ShieldCheck className={`w-5 h-5 shrink-0 ${isKrishna ? 'text-[#00DFB6]' : 'text-[#097770]'}`} />
              <p className="text-xs leading-relaxed">
                <strong>The Non-Fungibility Invariant:</strong> The two arches are <em>never subtracted</em> from each other.
                A flight or power bill cannot erase the tree you watered, and planting a tree cannot license wanton pollution.
                Both arches remain visible side-by-side, with <strong>Giving placed on top</strong>.
              </p>
            </div>
          </div>

          {/* COSMIC & MATHEMATICAL EVIDENCE OF 108 */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#FFB800]" />
              <span>Cosmic, Astronomical & Physiological Constants</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div
                className={`p-3 rounded-xl border ${
                  isKrishna ? 'bg-[#102B3C] border-[#1B3E52]' : 'bg-[#EDF5F1] border-[#D2E3DB]'
                }`}
              >
                <div className="font-bold text-[#FFB800] mb-1">Solar Alignment</div>
                <p className={isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}>
                  The distance from Earth to the Sun is approximately <strong>108 times</strong> the Sun’s diameter.
                </p>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isKrishna ? 'bg-[#102B3C] border-[#1B3E52]' : 'bg-[#EDF5F1] border-[#D2E3DB]'
                }`}
              >
                <div className="font-bold text-[#00DFB6] mb-1">Lunar Alignment</div>
                <p className={isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}>
                  The distance from Earth to the Moon is approximately <strong>108 times</strong> the Moon’s diameter.
                </p>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isKrishna ? 'bg-[#102B3C] border-[#1B3E52]' : 'bg-[#EDF5F1] border-[#D2E3DB]'
                }`}
              >
                <div className="font-bold text-[#10B981] mb-1">Hyper-Mathematics</div>
                <p className={isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}>
                  <code className="font-mono text-[11px]">1¹ × 2² × 3³ = 1 × 4 × 27 = 108</code> (Vedic hyper-exponential constant).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div
                className={`p-3 rounded-xl border ${
                  isKrishna ? 'bg-[#0E2433] border-[#1B3E52]' : 'bg-white border-[#D2E3DB]'
                }`}
              >
                <div className="font-bold mb-1">Ayurvedic Marma & Heart Nadis</div>
                <p className={isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}>
                  Ayurveda identifies <strong>108 Marma (vital pressure) points</strong> in the human body. Exactly 108 subtle energy
                  nadis intersect at the <em>Anahata</em> (Heart Chakra).
                </p>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isKrishna ? 'bg-[#0E2433] border-[#1B3E52]' : 'bg-white border-[#D2E3DB]'
                }`}
              >
                <div className="font-bold mb-1">Japa Mala & 108 Upanishads</div>
                <p className={isKrishna ? 'text-[#9BC3B9]' : 'text-[#4A5A51]'}>
                  A traditional meditation Mala contains <strong>108 sacred beads</strong>. There are 108 classical Upanishads preserving
                  ancient ecological and spiritual wisdom.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-4 border-t flex items-center justify-between ${
            isKrishna ? 'bg-[#07131B] border-[#1B3E52]' : 'bg-[#F4F9F6] border-[#D2E3DB]'
          }`}
        >
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold">Current Score:</span>
            <span className="font-mono font-bold text-[#FFB800]">{givingScore} Giving</span>
            <span>+</span>
            <span className="font-mono font-bold text-[#00DFB6]">{lightnessScore} Lightness</span>
            <span>=</span>
            <span className="font-mono font-bold">{givingScore + lightnessScore}/108</span>
          </div>

          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isKrishna
                ? 'bg-[#00DFB6] hover:bg-[#00C29F] text-[#07131B]'
                : 'bg-[#097770] hover:bg-[#065A54] text-white'
            }`}
          >
            Understood · कल्याणम्
          </button>
        </div>
      </div>
    </div>
  );
};
