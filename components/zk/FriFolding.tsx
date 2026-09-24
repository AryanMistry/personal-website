"use client";

import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const LAYERS = [64, 32, 16, 8, 4, 2, 1];
const FULL = LAYERS.length;

export default function FriFolding() {
  // Starts complete and paused, so the whole fold is visible at a glance and
  // nothing shifts unless the reader asks for it.
  const [shown, setShown] = useState(FULL);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (shown >= FULL) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setShown((v) => v + 1), 750);
    return () => clearTimeout(id);
  }, [playing, shown]);

  const toggle = () => {
    if (playing) setPlaying(false);
    else if (shown >= FULL) {
      setShown(1);
      setPlaying(true);
    } else setPlaying(true);
  };

  const label = playing ? "pause" : shown >= FULL ? "replay" : "play";
  const Icon = playing ? Pause : shown >= FULL ? RotateCcw : Play;

  return (
    <figure className="my-8">
      <div className="rounded-lg border border-border bg-background-secondary p-4 sm:p-5">
        {/* All layers always render, so the block keeps a constant height and
            playing the animation never pushes the surrounding text around. */}
        <div className="space-y-2">
          {LAYERS.map((count, layer) => {
            const visible = layer < shown;
            const isCurrent = playing && layer === shown - 1;
            return (
              <div
                key={layer}
                aria-hidden={!visible}
                className="flex items-center gap-3"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: "opacity 220ms ease-out",
                }}
              >
                <span className="w-16 shrink-0 text-right text-[11px] text-text-secondary">
                  {count === 1 ? "constant" : count}
                </span>
                <div className="flex flex-1 gap-[2px]">
                  {Array.from({ length: count }).map((_, i) => (
                    <span
                      key={i}
                      className="h-4 flex-1 rounded-[1px]"
                      style={{
                        backgroundColor:
                          count === 1
                            ? "#6ee7b7"
                            : isCurrent
                              ? "#7dd3fc"
                              : "rgba(125,211,252,0.28)",
                        transition: "background-color 220ms ease-out",
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-[11px] text-text-secondary">
            each round halves the degree, until only a constant is left
          </p>
          <button
            onClick={toggle}
            aria-label={`${label} folding animation`}
            className="flex shrink-0 items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors duration-150 hover:border-text-secondary hover:text-text-primary"
          >
            <Icon size={13} aria-hidden />
            {label}
          </button>
        </div>
      </div>
      <figcaption className="mt-3 text-xs sm:text-sm text-text-secondary">
        FRI halves the polynomial every round. A degree-1000 polynomial reaches a
        constant in about ten folds, so the verifier checks ten small things
        instead of one enormous one.
      </figcaption>
    </figure>
  );
}
