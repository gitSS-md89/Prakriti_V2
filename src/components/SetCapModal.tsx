import React, { useState } from 'react';
import { X, Sliders, Target, ShieldCheck, Check, Sparkles, Leaf, Droplets, Ban, Flame } from 'lucide-react';

interface SetCapModalProps {
  isOpen: boolean;
  onClose: () => void;
  isKrishna: boolean;
  dailyCarbonCap: number;
  onSaveCarbonCap: (newCap: number, waterCap: number, plasticCap: number) => void;
  dailyWaterTarget: number;
  dailyPlasticCap: number;
}

export const SetCapModal: React.FC<SetCapModalProps> = ({
  isOpen,
  onClose,
  isKrishna,
  dailyCarbonCap,
  onSaveCarbonCap,
  dailyWaterTarget,
  dailyPlasticCap,
}) => {
  const [carbonCap, setCarbonCap] = useState<number>(dailyCarbonCap);
  const [waterTarget, setWaterTarget] = useState<number>(dailyWaterTarget);
  const [plasticCap, setPlasticCap] = useState<number>(dailyPlasticCap);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveCarbonCap(carbonCap, waterTarget, plasticCap);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const presets = [
    { label: 'Satvik Minimalist', cap: 4.0, desc: 'Zero engine travel, seasonal local food' },
    { label: 'National CEA Benchmark', cap: 6.3, desc: 'India grid emission factor average' },
    { label: 'Urban Transition', cap: 8.5, desc: 'Moderate transit with public metro/bus' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl transition-all ${
          isKrishna
            ? 'bg-[#06020E] border-[#A855F7]/40 text-[#FAF5FF]'
            : 'bg-white border-[#065F46]/30 text-[#0F172A]'
        }`}
      >
        {/* Header */}
        <div
          className={`sticky top-0 z-10 px-5 py-4 border-b flex items-center justify-between backdrop-blur-md ${
            isKrishna ? 'bg-[#06020E]/90 border-[#3B1470]' : 'bg-white/90 border-[#E2E8F0]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isKrishna ? 'bg-[#A855F7]/20 text-[#FACC15]' : 'bg-[#065F46]/10 text-[#065F46]'
              }`}
            >
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight flex items-center gap-2">
                <span>Set Daily Ecological Cap</span>
                <span className="text-xs font-sanskrit opacity-75">दैनिक सीमा निर्धारण</span>
              </h2>
              <p className={`text-[11px] ${isKrishna ? 'text-[#D8B4FE]' : 'text-[#64748B]'}`}>
                Define your daily resource ceilings and Vedic 108 balance limits
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isKrishna
                ? 'hover:bg-[#200D42] text-[#D8B4FE]'
                : 'hover:bg-[#F1F5F9] text-[#64748B]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-5">
          {/* Carbon Resource Cap Slider */}
          <div
            className={`p-4 rounded-2xl border ${
              isKrishna ? 'bg-[#120826] border-[#3B1470]' : 'bg-[#F8FAFC] border-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Leaf className={`w-4 h-4 ${isKrishna ? 'text-[#FACC15]' : 'text-[#065F46]'}`} />
                <span className="font-bold text-xs">Daily Carbon / Resource Cap</span>
              </div>
              <span
                className={`text-sm font-black px-2.5 py-0.5 rounded-lg font-mono ${
                  isKrishna
                    ? 'bg-[#FACC15] text-[#06020E]'
                    : 'bg-[#065F46] text-white'
                }`}
              >
                {carbonCap.toFixed(1)} kg CO2e
              </span>
            </div>

            <p className={`text-[11px] mb-3 ${isKrishna ? 'text-[#D8B4FE]/80' : 'text-[#64748B]'}`}>
              Benchmark ceiling against CEA national grid and daily travel. The lower your score remains below this cap, the higher your Living Lightly arch climbs (up to 54 beads).
            </p>

            {/* Slider */}
            <input
              type="range"
              min="2.0"
              max="15.0"
              step="0.1"
              value={carbonCap}
              onChange={(e) => setCarbonCap(parseFloat(e.target.value))}
              className="w-full accent-[#FACC15] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] mt-1 opacity-60 font-mono">
              <span>2.0 kg (Strict)</span>
              <span>6.3 kg (CEA Baseline)</span>
              <span>15.0 kg (Upper limit)</span>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-dashed border-gray-500/20">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setCarbonCap(preset.cap)}
                  className={`p-2 rounded-xl text-left border transition-all text-[10px] ${
                    carbonCap === preset.cap
                      ? isKrishna
                        ? 'bg-[#281154] border-[#FACC15] text-[#FAF5FF]'
                        : 'bg-[#F0FDF4] border-[#065F46] text-[#0F172A]'
                      : isKrishna
                      ? 'bg-[#06020E] border-[#3B1470]/60 text-[#D8B4FE]'
                      : 'bg-white border-[#CBD5E1] text-[#475569]'
                  }`}
                >
                  <div className="font-bold leading-tight">{preset.label}</div>
                  <div className="font-mono text-[9px] mt-0.5">{preset.cap} kg</div>
                </button>
              ))}
            </div>
          </div>

          {/* Water Conservation Target */}
          <div
            className={`p-4 rounded-2xl border ${
              isKrishna ? 'bg-[#120826] border-[#3B1470]' : 'bg-[#F8FAFC] border-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Droplets className={`w-4 h-4 ${isKrishna ? 'text-[#A855F7]' : 'text-[#0284C7]'}`} />
                <span className="font-bold text-xs">Daily Water Saving Goal</span>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-lg font-mono ${
                  isKrishna ? 'bg-[#A855F7]/30 text-[#FAF5FF]' : 'bg-[#E0F2FE] text-[#0284C7]'
                }`}
              >
                {waterTarget} Litres
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="250"
              step="10"
              value={waterTarget}
              onChange={(e) => setWaterTarget(parseInt(e.target.value))}
              className="w-full accent-[#0284C7] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] mt-1 opacity-60 font-mono">
              <span>20L (Basics)</span>
              <span>100L (Rainwater & reuse)</span>
              <span>250L (Permaculture)</span>
            </div>
          </div>

          {/* Single-Use Plastic Hard Cap */}
          <div
            className={`p-4 rounded-2xl border ${
              isKrishna ? 'bg-[#120826] border-[#3B1470]' : 'bg-[#F8FAFC] border-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Ban className={`w-4 h-4 ${isKrishna ? 'text-[#EC4899]' : 'text-[#DC2626]'}`} />
                <span className="font-bold text-xs">Single-Use Plastic Cap</span>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                  plasticCap === 0
                    ? isKrishna
                      ? 'bg-[#22C55E]/20 text-[#22C55E]'
                      : 'bg-[#DCFCE7] text-[#15803D]'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {plasticCap === 0 ? 'Zero Plastic (0 items)' : `${plasticCap} allowed`}
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              {[0, 1, 2].map((num) => (
                <button
                  key={num}
                  onClick={() => setPlasticCap(num)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    plasticCap === num
                      ? isKrishna
                        ? 'bg-[#FACC15] text-[#06020E] border-[#FACC15]'
                        : 'bg-[#065F46] text-white border-[#065F46]'
                      : isKrishna
                      ? 'bg-[#06020E] border-[#3B1470] text-[#D8B4FE]'
                      : 'bg-white border-[#CBD5E1] text-[#64748B]'
                  }`}
                >
                  {num === 0 ? 'Strict Zero (0)' : `${num} Item Max`}
                </button>
              ))}
            </div>
          </div>

          {/* Sacred 108 Cap Invariant Note */}
          <div
            className={`p-3.5 rounded-2xl border flex items-start gap-2.5 text-xs ${
              isKrishna
                ? 'bg-[#160B2E] border-[#A855F7]/30 text-[#D8B4FE]'
                : 'bg-[#F0FDF4] border-[#86EFAC] text-[#065F46]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#FACC15]" />
            <div className="leading-relaxed text-[11px]">
              <strong>Sacred 108 Architecture Cap:</strong> Regardless of carbon adjustments, the Vedic 108 score is capped at <strong>54 beads for Giving</strong> and <strong>54 beads for Living Lightly</strong> (५४ + ५४ = १०८). The two arches are non-fungible and never subtracted.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-xs border transition-colors ${
                isKrishna
                  ? 'border-[#3B1470] text-[#FAF5FF] hover:bg-[#200D42]'
                  : 'border-[#CBD5E1] text-[#334155] hover:bg-[#F1F5F9]'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all ${
                savedSuccess
                  ? 'bg-green-600 text-white'
                  : isKrishna
                  ? 'bg-[#FACC15] hover:bg-[#EAB308] text-[#06020E]'
                  : 'bg-[#065F46] hover:bg-[#043E2E] text-white'
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Cap Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Save Ecological Cap</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
