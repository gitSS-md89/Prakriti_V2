import React, { useState } from 'react';
import { Sparkles, Info, RefreshCw, Heart, Sun, Feather, Check, Award, ArrowRight } from 'lucide-react';

interface Sacred108GraphProps {
  givingScore: number; // 0 to 54
  lightnessScore: number; // 0 to 54
  isKrishna: boolean;
  onUpdateGiving?: (score: number) => void;
  onUpdateLightness?: (score: number) => void;
  compact?: boolean; // For mobile simulator view
  onOpenPrincipleModal?: () => void;
}

export const Sacred108Graph: React.FC<Sacred108GraphProps> = ({
  givingScore,
  lightnessScore,
  isKrishna,
  onUpdateGiving,
  onUpdateLightness,
  compact = false,
  onOpenPrincipleModal,
}) => {
  const [hoveredSection, setHoveredSection] = useState<'1' | '0' | 'infinity' | 'giving' | 'lightness' | null>(null);

  const totalScore = Math.min(54, Math.max(0, givingScore)) + Math.min(54, Math.max(0, lightnessScore));
  const givingPercent = Math.min(100, (givingScore / 54) * 100);
  const lightnessPercent = Math.min(100, (lightnessScore / 54) * 100);
  const totalPercent = Math.min(100, (totalScore / 108) * 100);

  // SVG dimensions: 360 x 180
  // Left node 1 at (30, 90)
  // Center node 0 at (180, 90)
  // Left Loop (Giving Arch): (180,90) -> (120,25) -> (55,35) -> (55,90) -> (55,145) -> (120,155) -> (180,90)
  // Right Loop (Lightness Arch): (180,90) -> (240,25) -> (305,35) -> (305,90) -> (305,145) -> (240,155) -> (180,90)

  // Estimated perimeter of each loop is ~330px
  const loopLength = 330;
  const givingOffset = loopLength - (loopLength * Math.min(54, givingScore)) / 54;
  const lightnessOffset = loopLength - (loopLength * Math.min(54, lightnessScore)) / 54;

  // Path connecting 1 -> 0
  const path1to0Length = 160;
  const path1to0Offset = path1to0Length - (path1to0Length * Math.min(1, totalScore / 10));

  const chandrikaGold = isKrishna ? '#FFB800' : '#C58F1B';
  const kanthTeal = isKrishna ? '#00DFB6' : '#097770';
  const emeraldPlume = isKrishna ? '#10B981' : '#1A5F44';

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        compact
          ? isKrishna
            ? 'bg-[#0D212E] border-[#1B3E52]'
            : 'bg-white border-[#D2E3DB]'
          : isKrishna
          ? 'bg-gradient-to-br from-[#091D2A] via-[#0D2738] to-[#081824] border-[#1B3E52] shadow-[0_4px_30px_rgba(0,223,182,0.1)]'
          : 'bg-gradient-to-br from-[#FFFFFF] via-[#F4F9F6] to-[#EDF5F1] border-[#D2E3DB] shadow-sm'
      } ${compact ? 'p-3.5' : 'p-5'}`}
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              isKrishna ? 'bg-[#00DFB6]/20 text-[#00DFB6]' : 'bg-[#097770]/15 text-[#097770]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3
              className={`font-bold leading-tight flex items-center gap-1.5 ${
                compact ? 'text-xs' : 'text-sm'
              }`}
            >
              <span>1 · 0 · ∞ Sacred Scoring Graph</span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  isKrishna
                    ? 'bg-[#00DFB6]/15 text-[#00DFB6] border border-[#00DFB6]/30'
                    : 'bg-[#097770]/10 text-[#097770] border border-[#097770]/20'
                }`}
              >
                {totalScore}/108
              </span>
            </h3>
            <p className={`text-[10px] ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}`}>
              Starts at 1, expands to 0, weaves into ∞ (Infinity) with dual 54 arches
            </p>
          </div>
        </div>

        {onOpenPrincipleModal && (
          <button
            onClick={onOpenPrincipleModal}
            className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
              isKrishna
                ? 'bg-[#00DFB6]/15 text-[#00DFB6] hover:bg-[#00DFB6]/25 border border-[#00DFB6]/30'
                : 'bg-[#097770]/10 text-[#097770] hover:bg-[#097770]/20 border border-[#097770]/20'
            }`}
            title="Read the deep sacred principle of 108"
          >
            <Info className="w-3 h-3" />
            <span>Principle of 108</span>
          </button>
        )}
      </div>

      {/* SVG Canvas for the 1 -> 0 -> ∞ Lemniscate Graph */}
      <div className="relative w-full aspect-[2/1] max-h-56 flex items-center justify-center overflow-hidden rounded-xl bg-black/10 backdrop-blur-xs select-none">
        <svg
          viewBox="0 0 360 180"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Glow filters */}
            <filter id="sacred-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient: Left Arch (Giving - Chandrika Gold) */}
            <linearGradient id="givingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isKrishna ? '#FFE082' : '#E6AF34'} />
              <stop offset="50%" stopColor={isKrishna ? '#FFB800' : '#C58F1B'} />
              <stop offset="100%" stopColor={isKrishna ? '#D97706' : '#976A0E'} />
            </linearGradient>

            {/* Gradient: Right Arch (Lightness - Mayur Kanth Peacock Teal) */}
            <linearGradient id="lightnessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isKrishna ? '#6EE7B7' : '#14B8A6'} />
              <stop offset="50%" stopColor={isKrishna ? '#00DFB6' : '#097770'} />
              <stop offset="100%" stopColor={isKrishna ? '#059669' : '#0F5148'} />
            </linearGradient>

            {/* Gradient: 1 to 0 Trajectory */}
            <linearGradient id="flow1to0Gradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor={chandrikaGold} stopOpacity="0.9" />
              <stop offset="50%" stopColor={emeraldPlume} stopOpacity="0.8" />
              <stop offset="100%" stopColor={kanthTeal} stopOpacity="0.9" />
            </linearGradient>

            {/* Fills for completed areas */}
            <radialGradient id="radial0Fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={kanthTeal} stopOpacity={0.25 + (totalScore / 108) * 0.35} />
              <stop offset="70%" stopColor={chandrikaGold} stopOpacity={0.15 + (totalScore / 108) * 0.2} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="leftArchFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={chandrikaGold} stopOpacity={0.06 + (givingScore / 54) * 0.28} />
              <stop offset="100%" stopColor={chandrikaGold} stopOpacity="0.02" />
            </linearGradient>

            <linearGradient id="rightArchFill" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={kanthTeal} stopOpacity={0.06 + (lightnessScore / 54) * 0.28} />
              <stop offset="100%" stopColor={kanthTeal} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* BACKGROUND AMBIENT GUIDES */}
          {/* Subtle horizontal balance axis */}
          <line
            x1="20"
            y1="90"
            x2="340"
            y2="90"
            stroke={isKrishna ? '#1A3344' : '#DCEEE5'}
            strokeWidth="1"
            strokeDasharray="3 4"
            opacity="0.6"
          />

          {/* 1 -> 0 STARTING BRIDGE PATH (From left side "1" to center "0") */}
          {/* Background track */}
          <path
            d="M 32 90 C 70 50, 130 50, 180 90"
            fill="none"
            stroke={isKrishna ? '#142A38' : '#E2EBE5'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Active 1 -> 0 Flow */}
          <path
            d="M 32 90 C 70 50, 130 50, 180 90"
            fill="none"
            stroke="url(#flow1to0Gradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={path1to0Length}
            strokeDashoffset={path1to0Offset}
            filter="url(#soft-glow)"
            className="transition-all duration-700 ease-out"
          />

          {/* TWO ARCHES: LEMNISCATE FIGURE 8 (INFINITY) */}
          {/* LEFT ARCH: GIVING (Chandrika Gold - 54 max) */}
          {/* Left Arch Path: Center(180,90) -> upper left -> outer left(55,90) -> lower left -> Center(180,90) */}
          {/* Filled Area */}
          <path
            d="M 180 90 C 130 30, 60 30, 60 90 C 60 150, 130 150, 180 90 Z"
            fill="url(#leftArchFill)"
            className="transition-all duration-700 ease-out"
          />
          {/* Background Track */}
          <path
            d="M 180 90 C 130 30, 60 30, 60 90 C 60 150, 130 150, 180 90 Z"
            fill="none"
            stroke={isKrishna ? '#261F0A' : '#FDF4DF'}
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Active Giving Arch Stroke */}
          <path
            d="M 180 90 C 130 30, 60 30, 60 90 C 60 150, 130 150, 180 90 Z"
            fill="none"
            stroke="url(#givingGradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={loopLength}
            strokeDashoffset={givingOffset}
            filter={givingScore > 20 ? 'url(#sacred-glow)' : undefined}
            className="transition-all duration-700 ease-out"
          />

          {/* RIGHT ARCH: LIGHTNESS (Mayur Kanth Teal - 54 max) */}
          {/* Right Arch Path: Center(180,90) -> upper right -> outer right(300,90) -> lower right -> Center(180,90) */}
          {/* Filled Area */}
          <path
            d="M 180 90 C 230 30, 300 30, 300 90 C 300 150, 230 150, 180 90 Z"
            fill="url(#rightArchFill)"
            className="transition-all duration-700 ease-out"
          />
          {/* Background Track */}
          <path
            d="M 180 90 C 230 30, 300 30, 300 90 C 300 150, 230 150, 180 90 Z"
            fill="none"
            stroke={isKrishna ? '#082533' : '#DCF3E9'}
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Active Lightness Arch Stroke */}
          <path
            d="M 180 90 C 230 30, 300 30, 300 90 C 300 150, 230 150, 180 90 Z"
            fill="none"
            stroke="url(#lightnessGradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={loopLength}
            strokeDashoffset={lightnessOffset}
            filter={lightnessScore > 20 ? 'url(#sacred-glow)' : undefined}
            className="transition-all duration-700 ease-out"
          />

          {/* MALA TICK BEADS ON LEMNISCATE (Subtle Vedic points along the loops) */}
          {/* Left loop ticks (Giving beads) */}
          {[10, 20, 30, 40, 50].map((step, idx) => {
            const angle = (idx / 5) * Math.PI * 2;
            const cx = 110 + Math.cos(angle) * 35;
            const cy = 90 + Math.sin(angle) * 28;
            const active = givingScore >= step;
            return (
              <circle
                key={`giving-tick-${idx}`}
                cx={cx}
                cy={cy}
                r={active ? '2.5' : '1.5'}
                fill={active ? chandrikaGold : isKrishna ? '#33270A' : '#E8D4A8'}
                className="transition-all duration-500"
              />
            );
          })}

          {/* Right loop ticks (Lightness beads) */}
          {[10, 20, 30, 40, 50].map((step, idx) => {
            const angle = (idx / 5) * Math.PI * 2;
            const cx = 250 + Math.cos(angle) * 35;
            const cy = 90 + Math.sin(angle) * 28;
            const active = lightnessScore >= step;
            return (
              <circle
                key={`lightness-tick-${idx}`}
                cx={cx}
                cy={cy}
                r={active ? '2.5' : '1.5'}
                fill={active ? kanthTeal : isKrishna ? '#0C3540' : '#A9DEC7'}
                className="transition-all duration-500"
              />
            );
          })}

          {/* ---------------------------------------------
              KEY NODES: 1 (Left), 0 (Center), ∞ (Fusion)
          ---------------------------------------------- */}

          {/* NODE 1: LEFT ORIGIN (The Singularity / Ekam) */}
          <g
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredSection('1')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Halo pulse */}
            <circle
              cx="32"
              cy="90"
              r="18"
              fill={chandrikaGold}
              fillOpacity={isKrishna ? '0.15' : '0.1'}
              className="animate-pulse"
            />
            <circle
              cx="32"
              cy="90"
              r="13"
              fill={isKrishna ? '#1A180E' : '#FFFFFF'}
              stroke={chandrikaGold}
              strokeWidth="2.5"
              filter="url(#soft-glow)"
            />
            {/* Numeral 1 */}
            <text
              x="32"
              y="95"
              textAnchor="middle"
              className="font-bold text-xs"
              fill={chandrikaGold}
              fontWeight="900"
            >
              1
            </text>
            {/* Label */}
            <text
              x="32"
              y="120"
              textAnchor="middle"
              className="text-[8px] font-bold tracking-wider"
              fill={isKrishna ? '#FFE082' : '#976A0E'}
            >
              THE ONE
            </text>
            <text
              x="32"
              y="130"
              textAnchor="middle"
              className="text-[7px]"
              fill={isKrishna ? '#9BC3B9' : '#6C837C'}
            >
              एकम् · Atman
            </text>
          </g>

          {/* NODE 0: CENTER VORTEX (Shunya / The Void / Ego Dissolution) */}
          <g
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredSection('0')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Central cosmic aura */}
            <circle
              cx="180"
              cy="90"
              r="26"
              fill="url(#radial0Fill)"
              className="transition-all duration-700"
            />
            <circle
              cx="180"
              cy="90"
              r="16"
              fill={isKrishna ? '#071A24' : '#FFFFFF'}
              stroke={totalScore > 0 ? kanthTeal : isKrishna ? '#1E3E4F' : '#CFE3D8'}
              strokeWidth={totalScore > 50 ? '3' : '2'}
              filter={totalScore > 40 ? 'url(#soft-glow)' : undefined}
              className="transition-all duration-500"
            />
            {/* Numeral 0 */}
            <text
              x="180"
              y="95"
              textAnchor="middle"
              className="font-black text-sm"
              fill={totalScore > 0 ? (isKrishna ? '#00DFB6' : '#097770') : isKrishna ? '#9BC3B9' : '#6C837C'}
              fontWeight="900"
            >
              0
            </text>
            {/* Label */}
            <text
              x="180"
              y="120"
              textAnchor="middle"
              className="text-[8px] font-bold tracking-wider"
              fill={isKrishna ? '#00DFB6' : '#097770'}
            >
              SHUNYA
            </text>
            <text
              x="180"
              y="130"
              textAnchor="middle"
              className="text-[7px]"
              fill={isKrishna ? '#9BC3B9' : '#6C837C'}
            >
              शून्य · Void/Whole
            </text>
          </g>

          {/* NODE INFINITY (∞): RIGHT APEX & FUSION */}
          <g
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredSection('infinity')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Floating Infinity Glyph at Center Top */}
            <circle
              cx="180"
              cy="36"
              r="14"
              fill={isKrishna ? '#0B2433' : '#EDF8F3'}
              stroke={totalScore >= 100 ? emeraldPlume : isKrishna ? '#1B3E52' : '#D2E3DB'}
              strokeWidth="1.5"
            />
            <text
              x="180"
              y="41"
              textAnchor="middle"
              className="font-extrabold text-sm"
              fill={totalScore >= 100 ? (isKrishna ? '#00DFB6' : '#097770') : isKrishna ? '#EEF9F6' : '#0C1F1B'}
            >
              ∞
            </text>
            <text
              x="180"
              y="18"
              textAnchor="middle"
              className="text-[8px] font-bold tracking-wider"
              fill={totalScore >= 108 ? chandrikaGold : isKrishna ? '#9BC3B9' : '#6C837C'}
            >
              ANANTA · अनंत (8)
            </text>
          </g>

          {/* LEFT ARCH LABEL (GIVING 54) */}
          <g>
            <text
              x="110"
              y="78"
              textAnchor="middle"
              className="font-black text-sm"
              fill={chandrikaGold}
            >
              {givingScore}
            </text>
            <text
              x="110"
              y="90"
              textAnchor="middle"
              className="text-[8px] font-bold"
              fill={isKrishna ? '#FFE082' : '#976A0E'}
            >
              / 54
            </text>
            <text
              x="110"
              y="104"
              textAnchor="middle"
              className="text-[8px] font-semibold"
              fill={isKrishna ? '#FFE082' : '#C58F1B'}
            >
              Arch 1: Giving
            </text>
          </g>

          {/* RIGHT ARCH LABEL (LIGHTNESS 54) */}
          <g>
            <text
              x="250"
              y="78"
              textAnchor="middle"
              className="font-black text-sm"
              fill={kanthTeal}
            >
              {lightnessScore}
            </text>
            <text
              x="250"
              y="90"
              textAnchor="middle"
              className="text-[8px] font-bold"
              fill={isKrishna ? '#9BC3B9' : '#097770'}
            >
              / 54
            </text>
            <text
              x="250"
              y="104"
              textAnchor="middle"
              className="text-[8px] font-semibold"
              fill={isKrishna ? '#00DFB6' : '#097770'}
            >
              Arch 2: Lightness
            </text>
          </g>

          {/* BOTTOM TOTAL SUMMARY BADGE */}
          <g>
            <rect
              x="120"
              y="146"
              width="120"
              height="26"
              rx="13"
              fill={isKrishna ? '#071822' : '#FFFFFF'}
              stroke={isKrishna ? '#1B3E52' : '#D2E3DB'}
              strokeWidth="1.5"
            />
            <text
              x="180"
              y="163"
              textAnchor="middle"
              className="font-black text-xs"
              fill={isKrishna ? '#EEF9F6' : '#0C1F1B'}
            >
              TOTAL: {totalScore} OF 108
            </text>
          </g>
        </svg>

        {/* Hover Explainer Tooltip */}
        {hoveredSection && (
          <div
            className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md shadow-md border ${
              isKrishna
                ? 'bg-[#07131B]/90 text-[#EEF9F6] border-[#00DFB6]/30'
                : 'bg-white/95 text-[#0C1F1B] border-[#097770]/20'
            }`}
          >
            {hoveredSection === '1' && '1 (The Singularity): The individual soul (Atman) initiating righteous action.'}
            {hoveredSection === '0' && '0 (Shunya): The sacred void where ego dissolves and complete harmony is born.'}
            {hoveredSection === 'infinity' && '∞ / 8 (Ananta): The dual completed arches (54 Giving + 54 Lightness) fuse into eternity.'}
          </div>
        )}
      </div>

      {/* DYNAMIC PROGRESS BAR & SUMMARY */}
      <div className="mt-3.5 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                totalScore >= 108
                  ? 'bg-[#10B981] animate-ping'
                  : isKrishna
                  ? 'bg-[#00DFB6]'
                  : 'bg-[#097770]'
              }`}
            />
            <span className={isKrishna ? 'text-[#EEF9F6]' : 'text-[#0C1F1B]'}>
              108 Sacred Balance Progression: {totalPercent.toFixed(0)}%
            </span>
          </span>
          <span className={isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}>
            {totalScore >= 108 ? '★ Cosmic Lemniscate Realized' : `${108 - totalScore} pts to complete`}
          </span>
        </div>

        {/* Segmented Dual Bar */}
        <div
          className={`h-2.5 w-full rounded-full overflow-hidden flex border p-0.5 ${
            isKrishna ? 'bg-[#07131B] border-[#1B3E52]' : 'bg-[#E7F2EC] border-[#D2E3DB]'
          }`}
        >
          {/* Giving segment (Chandrika) */}
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(givingScore / 108) * 100}%`,
              backgroundColor: chandrikaGold,
            }}
            title={`Giving Arch: ${givingScore}/54`}
          />
          {/* Spacer */}
          <div className="w-1" />
          {/* Lightness segment (Kanth) */}
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(lightnessScore / 108) * 100}%`,
              backgroundColor: kanthTeal,
            }}
            title={`Lightness Arch: ${lightnessScore}/54`}
          />
        </div>

        {/* Quick Stepper Controls (if callbacks provided) */}
        {(onUpdateGiving || onUpdateLightness) && (
          <div className="pt-2 grid grid-cols-2 gap-2 text-[11px]">
            {/* Giving Control */}
            <div
              className={`p-2 rounded-xl border flex items-center justify-between ${
                isKrishna ? 'bg-[#142C3C] border-[#1B3E52]' : 'bg-white border-[#D2E3DB]'
              }`}
            >
              <div>
                <span className="font-bold block" style={{ color: chandrikaGold }}>
                  Giving Arch
                </span>
                <span className={`text-[10px] ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}`}>
                  {givingScore}/54 (Chandrika)
                </span>
              </div>
              <div className="flex items-center gap-1">
                {onUpdateGiving && (
                  <>
                    <button
                      onClick={() => onUpdateGiving(Math.max(0, givingScore - 2))}
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                        isKrishna ? 'bg-[#07131B] hover:bg-[#1A384C] text-[#EEF9F6]' : 'bg-[#EDF5F1] hover:bg-[#D2E3DB] text-[#0C1F1B]'
                      }`}
                    >
                      -
                    </button>
                    <button
                      onClick={() => onUpdateGiving(Math.min(54, givingScore + 2))}
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                        isKrishna ? 'bg-[#FFB800] text-[#07131B]' : 'bg-[#C58F1B] text-white'
                      }`}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Lightness Control */}
            <div
              className={`p-2 rounded-xl border flex items-center justify-between ${
                isKrishna ? 'bg-[#142C3C] border-[#1B3E52]' : 'bg-white border-[#D2E3DB]'
              }`}
            >
              <div>
                <span className="font-bold block" style={{ color: kanthTeal }}>
                  Lightness Arch
                </span>
                <span className={`text-[10px] ${isKrishna ? 'text-[#9BC3B9]' : 'text-[#6C837C]'}`}>
                  {lightnessScore}/54 (Kanth)
                </span>
              </div>
              <div className="flex items-center gap-1">
                {onUpdateLightness && (
                  <>
                    <button
                      onClick={() => onUpdateLightness(Math.max(0, lightnessScore - 2))}
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                        isKrishna ? 'bg-[#07131B] hover:bg-[#1A384C] text-[#EEF9F6]' : 'bg-[#EDF5F1] hover:bg-[#D2E3DB] text-[#0C1F1B]'
                      }`}
                    >
                      -
                    </button>
                    <button
                      onClick={() => onUpdateLightness(Math.min(54, lightnessScore + 2))}
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                        isKrishna ? 'bg-[#00DFB6] text-[#07131B]' : 'bg-[#097770] text-white'
                      }`}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
