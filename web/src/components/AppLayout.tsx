"use client";

import { tracks } from "@/data/tracks";
import { PlayerProvider } from "@/context/PlayerContext";
import { TopBar }         from "@/components/TopBar";
import { Sidebar }        from "@/components/Sidebar";
import { PlayerBar }      from "@/components/PlayerBar";
import { FullscreenPlayer } from "@/components/FullscreenPlayer";
import { QueuePanel }     from "@/components/QueuePanel";
import { BottomNav }      from "@/components/BottomNav";

export function AppLayout({ children }: { children: React.ReactNode }) {

  return (
    <PlayerProvider initialSongs={tracks}>
      <div className="flex flex-col h-screen overflow-hidden bg-black">
        
        <TopBar />

        
        <div className="flex flex-1 min-h-0 gap-2 px-0 md:px-2 pb-0 md:pb-2 relative">
          
          <div className="hidden md:flex">
            <Sidebar />
          </div>

          
          <main className="flex-1 min-w-0 min-h-0 bg-[#121212] md:rounded-lg overflow-hidden pb-[120px] md:pb-0 relative">
            {children}
          </main>
        </div>

        
        <PlayerBar />
        
        
        <BottomNav />
      </div>

      
      <FullscreenPlayer />
      <QueuePanel />
    </PlayerProvider>
  );
}
