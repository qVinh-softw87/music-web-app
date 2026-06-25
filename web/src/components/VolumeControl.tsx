"use client";

import { useRef, useState } from "react";
import { IconVolume } from "@/components/PlayerBar";
import { Tooltip } from "@/components/Tooltip";

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  setVolume: (v: number) => void;
  toggleMuted: () => void;
  sliderWidth?: string;
}

export function VolumeControl({
  volume,
  isMuted,
  setVolume,
  toggleMuted,
  sliderWidth = "w-24",
}: VolumeControlProps) {
  const [isHovering, setIsHovering] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const effectiveVolume = isMuted ? 0 : volume;
  const fillPercent = Math.round(effectiveVolume * 100);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    setVolume(ratio);
    if (isMuted && ratio > 0) toggleMuted();
  };

  const handleTrackMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    handleTrackClick(e);
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Tooltip content={isMuted || volume === 0 ? "Bật âm thanh" : "Tắt âm thanh"}>
        <button
          onClick={toggleMuted}
          className="text-[#ccc] hover:text-white transition shrink-0"
        >
          <IconVolume muted={isMuted} volume={volume} />
        </button>
      </Tooltip>

      <div
        ref={trackRef}
        className={`relative h-4 flex items-center cursor-pointer ${sliderWidth}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseDown={handleTrackClick}
        onMouseMove={handleTrackMouseMove}
      >
        <div className="w-full h-1 rounded-full bg-[#4d4d4d] overflow-hidden">
          <div
            className="h-full rounded-full transition-colors"
            style={{
              width: `${fillPercent}%`,
              backgroundColor: isHovering ? "var(--accent)" : "#b3b3b3",
              transition: "background-color 150ms ease",
            }}
          />
        </div>
        {isHovering && (
          <div
            className="absolute w-3 h-3 rounded-full bg-white shadow -translate-x-1/2 pointer-events-none"
            style={{ left: `${fillPercent}%` }}
          />
        )}
      </div>
    </div>
  );
}
