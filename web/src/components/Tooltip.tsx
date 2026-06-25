"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export function Tooltip({ children, content }: { children: React.ReactNode; content: string }) {
  if (!content) return <>{children}</>;
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className="z-[9999] bg-[#282828] text-white text-xs font-semibold px-2.5 py-1.5 rounded shadow-xl animate-in fade-in zoom-in-95"
            sideOffset={10}
            side="top"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[#282828]" width={10} height={5} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
