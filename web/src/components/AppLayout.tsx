"use client";

import { PlayerProvider, usePlayer } from "@/context/PlayerContext";
import { TopBar }         from "@/components/TopBar";
import { Sidebar }        from "@/components/Sidebar";
import { PlayerBar }      from "@/components/PlayerBar";
import { FullscreenPlayer } from "@/components/FullscreenPlayer";
import { FullscreenLyrics } from "@/components/FullscreenLyrics";
import { QueuePanel }     from "@/components/QueuePanel";
import { BottomNav }      from "@/components/BottomNav";
import { Toaster }        from "sonner";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { ShortcutsHelp } from "@/components/ShortcutsHelp";
import { useState, useEffect } from "react";

function InnerLayout({ children }: { children: React.ReactNode }) {
  const { queueMode } = usePlayer();
  const isPinned = queueMode === "pinned";

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black">
      <TopBar />

      <div className="hidden md:flex flex-1 min-h-0 px-2 pb-2 gap-0">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} minSize={15} maxSize={35} className="flex flex-col">
            <div className="flex-1 min-h-0">
              <Sidebar />
            </div>
          </Panel>

          <PanelResizeHandle className="w-2 flex items-center justify-center cursor-col-resize group z-10 relative">
            <div className="w-0.5 h-full bg-transparent group-hover:bg-white/30 transition-colors rounded-full" />
          </PanelResizeHandle>

          <Panel minSize={40} className="flex flex-col">
            <main className="flex-1 min-w-0 min-h-0 bg-[#121212] rounded-lg overflow-hidden relative h-full">
              {children}
            </main>
          </Panel>
        </PanelGroup>

        <div
          className="flex-shrink-0 overflow-hidden"
          style={{
            width: isPinned ? "300px" : "0px",
          }}
        >
          <div className="w-[300px] h-full pl-2">
            {!isMobile && <QueuePanel />}
          </div>
        </div>
      </div>

      <div className="flex md:hidden flex-1 min-h-0 relative">
        <main className="flex-1 min-w-0 min-h-0 bg-[#121212] overflow-hidden pb-[120px] relative h-full">
          {children}
        </main>
      </div>

      <PlayerBar />
      <BottomNav />
      {isMobile && <QueuePanel />}

      <KeyboardShortcuts />
      <ShortcutsHelp />
      <FullscreenPlayer />
      <FullscreenLyrics />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider initialSongs={[]}>
      <InnerLayout>{children}</InnerLayout>
    </PlayerProvider>
  );
}
