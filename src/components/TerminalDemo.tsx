"use client";

import { useEffect, useState } from "react";
import type { DemoLine } from "@/lib/products";

// Replays a skill session line by line. Typed commands appear character by character;
// steps and output appear at reading pace. Reduced-motion users see the finished session.
export function TerminalDemo({ lines, title }: { lines: DemoLine[]; title: string }) {
  const [shown, setShown] = useState(0); // fully shown lines
  const [typed, setTyped] = useState(0); // chars typed of the current cmd line
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(lines.length);
      setDone(true);
      return;
    }
    if (shown >= lines.length) {
      setDone(true);
      return;
    }
    const line = lines[shown];
    if (line.kind === "cmd" && typed < line.text.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), 28);
      return () => clearTimeout(t);
    }
    const delay = line.kind === "cmd" ? 350 : line.kind === "step" ? 650 : 220;
    const t = setTimeout(() => {
      setShown((n) => n + 1);
      setTyped(0);
    }, delay);
    return () => clearTimeout(t);
  }, [shown, typed, lines]);

  const replay = () => {
    setShown(0);
    setTyped(0);
    setDone(false);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-term-line bg-term text-[13.5px] leading-6 shadow-[0_30px_60px_-20px_rgba(15,42,74,0.45)]">
      <div className="flex items-center justify-between border-b border-term-line px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a5578]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a5578]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a5578]" />
        </div>
        <span className="truncate px-3 font-mono text-xs text-[#8ea6c4]">{title}</span>
        <button
          onClick={replay}
          disabled={!done}
          className="font-mono text-xs text-[#8ea6c4] hover:text-white disabled:invisible"
        >
          Replay
        </button>
      </div>

      <div className="min-h-[300px] px-5 py-4 font-mono" aria-live="off">
        {lines.slice(0, Math.min(shown + 1, lines.length)).map((line, i) => {
          const isCurrent = i === shown && !done;
          if (line.kind === "cmd") {
            const text = isCurrent ? line.text.slice(0, typed) : line.text;
            return (
              <p key={i} className="text-white">
                <span className="mr-2 text-amber">›</span>
                {text}
                {isCurrent && <span className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-amber" />}
              </p>
            );
          }
          if (isCurrent) return null; // steps/output appear whole once their delay passes
          if (line.kind === "step") {
            return (
              <p key={i} className="text-[#8ea6c4]">
                <span className="mr-2 text-[#5fd3a5]">✓</span>
                {line.text}
              </p>
            );
          }
          return (
            <p key={i} className="mt-2 text-[#dbe6f3] first:mt-0">
              {line.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
