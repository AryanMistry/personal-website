"use client";

import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

type Row = { pc: number; op: string; a: number; b: number; cnt: number };

// Real cycles of the Fibonacci loop, in the order the VM executes them.
const ROWS: Row[] = [
  { pc: 0, op: "LOAD", a: 0, b: 1, cnt: 0 },
  { pc: 1, op: "JMPIF", a: 0, b: 1, cnt: 4 },
  { pc: 3, op: "ADD", a: 0, b: 1, cnt: 4 },
  { pc: 4, op: "ADD", a: 0, b: 1, cnt: 4 },
  { pc: 5, op: "ADD", a: 1, b: 1, cnt: 4 },
  { pc: 6, op: "SUB", a: 1, b: 1, cnt: 4 },
  { pc: 7, op: "JMP", a: 1, b: 1, cnt: 3 },
  { pc: 1, op: "JMPIF", a: 1, b: 1, cnt: 3 },
  { pc: 3, op: "ADD", a: 1, b: 1, cnt: 3 },
  { pc: 4, op: "ADD", a: 1, b: 2, cnt: 3 },
];

const COLS: { key: keyof Row; label: string }[] = [
  { key: "pc", label: "pc" },
  { key: "op", label: "opcode" },
  { key: "a", label: "r2 (a)" },
  { key: "b", label: "r3 (b)" },
  { key: "cnt", label: "r4 (cnt)" },
];

const FULL = ROWS.length;

export default function TraceTable() {
  // Starts complete and paused: the figure is readable before you touch it,
  // and nothing moves on its own.
  const [shown, setShown] = useState(FULL);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (shown >= FULL) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setShown((v) => v + 1), 420);
    return () => clearTimeout(id);
  }, [playing, shown]);

  const toggle = () => {
    if (playing) setPlaying(false);
    else if (shown >= FULL) {
      setShown(0);
      setPlaying(true);
    } else setPlaying(true);
  };

  const label = playing ? "pause" : shown >= FULL ? "replay" : "play";
  const Icon = playing ? Pause : shown >= FULL ? RotateCcw : Play;

  return (
    <figure className="my-8">
      <div className="rounded-lg border border-border bg-background-secondary p-4 sm:p-5">
        <div className="overflow-x-auto">
          {/* Every row is always rendered so the height never changes; only
              opacity varies. Otherwise each tick would shove the page down. */}
          <table className="w-full min-w-[380px] text-xs sm:text-sm">
            <thead>
              <tr className="text-text-secondary">
                <th className="pb-2 text-left font-normal">step</th>
                {COLS.map((c) => (
                  <th key={c.key} className="pb-2 text-left font-normal">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => {
                const visible = i < shown;
                const isLatest = playing && i === shown - 1;
                return (
                  <tr
                    key={i}
                    aria-hidden={!visible}
                    className={isLatest ? "" : "text-text-secondary"}
                    style={{
                      opacity: visible ? 1 : 0,
                      color: isLatest ? "#7dd3fc" : undefined,
                      transition: "opacity 180ms ease-out",
                    }}
                  >
                    <td className="py-[3px] pr-4 text-text-secondary opacity-60">
                      {i}
                    </td>
                    {COLS.map((c) => (
                      <td key={c.key} className="py-[3px] pr-4">
                        {row[c.key]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-[11px] text-text-secondary">
            pc jumps 7 back to 1: that is the loop. 256 rows in the real trace.
          </p>
          <button
            onClick={toggle}
            aria-label={`${label} trace animation`}
            className="flex shrink-0 items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors duration-150 hover:border-text-secondary hover:text-text-primary"
          >
            <Icon size={13} aria-hidden />
            {label}
          </button>
        </div>
      </div>
      <figcaption className="mt-3 text-xs sm:text-sm text-text-secondary">
        The execution trace. One row per clock cycle, recording the entire state
        of the machine. This table is the thing being proven.
      </figcaption>
    </figure>
  );
}
