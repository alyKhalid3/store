"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; poster: string; label: string; className?: string };

/** A 9:16 product video in a phone-like frame. Plays muted on loop; one tap for sound. */
export function ReelVideo({ src, poster, label, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Respect reduced motion: show the poster until the visitor presses play.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      v.removeAttribute("autoplay");
    }
  }, []);

  function toggleSound() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) {
      v.currentTime = 0;
      void v.play();
    }
    setMuted(v.muted);
  }

  return (
    <div className={`relative mx-auto w-full max-w-[300px] ${className}`}>
      <div className="overflow-hidden rounded-[28px] border-[6px] border-ink bg-ink shadow-[0_30px_60px_-20px_rgba(15,42,74,0.45)]">
        <video
          ref={ref}
          src={src}
          poster={poster}
          aria-label={label}
          className="block aspect-[9/16] w-full bg-ink object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
        />
      </div>
      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-4 right-4 rounded-full bg-ink/85 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur hover:bg-ink"
        aria-pressed={!muted}
      >
        {muted ? "Sound on" : "Mute"}
      </button>
    </div>
  );
}
