"use client";

import { useState, useEffect } from "react";

const shortcuts = [
  { keys: ["Space"], action: "Phát / Tạm dừng" },
  { keys: ["←", "→"], action: "Bài trước / Bài tiếp theo" },
  { keys: ["↑", "↓"], action: "Tăng / Giảm âm lượng" },
  { keys: ["M"], action: "Tắt / Bật tiếng" },
  { keys: ["L"], action: "Thích / Bỏ thích bài hiện tại" },
  { keys: ["S"], action: "Bật / Tắt trộn bài" },
  { keys: ["R"], action: "Chuyển chế độ lặp" },
  { keys: ["F"], action: "Mở / Đóng màn hình lớn" },
  { keys: ["?"], action: "Hiện phím tắt này" },
];

export function ShortcutsHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "?") setOpen((v) => !v);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
        style={{ animation: "modal-in 150ms cubic-bezier(0.4, 0, 0.2, 1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <h2 className="text-white font-bold text-base">Phím tắt</h2>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-[#aaa] hover:text-white transition"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-4 space-y-1">
          {shortcuts.map(({ keys, action }) => (
            <div key={action} className="flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-white/5 transition">
              <span className="text-sm text-[#b3b3b3]">{action}</span>
              <div className="flex items-center gap-1">
                {keys.map((k) => (
                  <kbd
                    key={k}
                    className="inline-flex items-center justify-center min-w-[28px] h-7 px-1.5 rounded-md bg-white/10 border border-white/15 text-xs font-mono text-white/80"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-white/8 text-center">
          <p className="text-xs text-[#666]">Nhấn <kbd className="inline px-1 py-0.5 rounded bg-white/10 text-white/60 font-mono text-xs">?</kbd> hoặc <kbd className="inline px-1 py-0.5 rounded bg-white/10 text-white/60 font-mono text-xs">Esc</kbd> để đóng</p>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
