"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

// Measured with `cargo run --release --example benchmark`, blinding enabled.
const DATA = [
  { rows: 256, prove: 7.57, verify: 0.75 },
  { rows: 512, prove: 15.51, verify: 0.87 },
  { rows: 1024, prove: 31.92, verify: 0.99 },
  { rows: 2048, prove: 67.01, verify: 1.15 },
  { rows: 4096, prove: 141.62, verify: 1.35 },
  { rows: 8192, prove: 292.71, verify: 1.63 },
];

const PROVE_COLOR = "#f87171";
const VERIFY_COLOR = "#7dd3fc";
const GRID = "#374151";
const MUTED = "#9ca3af";

const W = 680;
const H = 320;
const L = 58;
const R = 118;
const T = 22;
const B = 46;

const x = (i: number) => L + (i / (DATA.length - 1)) * (W - L - R);
const y = (ms: number) => {
  const t =
    (Math.log10(ms) - Math.log10(0.5)) / (Math.log10(500) - Math.log10(0.5));
  return H - B - t * (H - T - B);
};

const path = (key: "prove" | "verify") =>
  `M ${DATA.map((d, i) => `${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(" L ")}`;

export default function ScalingChart() {
  const last = DATA[DATA.length - 1];
  // 0 = drawn already, static. Bumping it remounts the paths to redraw them,
  // so the animation only ever runs when the reader asks for it.
  const [run, setRun] = useState(0);

  const line = (key: "prove" | "verify", color: string, delay: number) =>
    run === 0 ? (
      <path d={path(key)} fill="none" stroke={color} strokeWidth={2} />
    ) : (
      <motion.path
        key={`${key}-${run}`}
        d={path(key)}
        fill="none"
        stroke={color}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, delay }}
      />
    );

  return (
    <figure className="my-8">
      <div className="rounded-lg border border-border bg-background-secondary p-4 sm:p-5">
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full min-w-[540px]"
            role="img"
            aria-label="Chart: proving time rises steeply with trace length while verification stays nearly flat"
          >
            {[0.5, 5, 50, 500].map((ms) => (
              <g key={ms}>
                <line
                  x1={L}
                  y1={y(ms)}
                  x2={W - R}
                  y2={y(ms)}
                  stroke={GRID}
                  strokeWidth={1}
                />
                <text
                  x={L - 10}
                  y={y(ms) + 4}
                  textAnchor="end"
                  fill={MUTED}
                  fontSize={11}
                >
                  {ms}ms
                </text>
              </g>
            ))}

            {line("prove", PROVE_COLOR, 0)}
            {line("verify", VERIFY_COLOR, 0.2)}

            {DATA.map((d, i) => (
              <g key={i}>
                <circle cx={x(i)} cy={y(d.prove)} r={3.5} fill={PROVE_COLOR} />
                <circle cx={x(i)} cy={y(d.verify)} r={3.5} fill={VERIFY_COLOR} />
                <text
                  x={x(i)}
                  y={H - 22}
                  textAnchor="middle"
                  fill={MUTED}
                  fontSize={11}
                >
                  {d.rows}
                </text>
              </g>
            ))}

            <text
              x={x(DATA.length - 1) + 12}
              y={y(last.prove) + 4}
              fill={PROVE_COLOR}
              fontSize={12}
            >
              prove
            </text>
            <text
              x={x(DATA.length - 1) + 12}
              y={y(last.verify) + 4}
              fill={VERIFY_COLOR}
              fontSize={12}
            >
              verify
            </text>
            <text
              x={x(DATA.length - 1) + 12}
              y={y(last.verify) + 20}
              fill={MUTED}
              fontSize={11}
            >
              32x to 2.2x
            </text>

            <text
              x={(L + W - R) / 2}
              y={H - 4}
              textAnchor="middle"
              fill={MUTED}
              fontSize={11}
            >
              execution trace length (rows)
            </text>
          </svg>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-[11px] text-text-secondary">
            32x more computation, 2.2x the verification cost
          </p>
          <button
            onClick={() => setRun((r) => r + 1)}
            aria-label="replay chart animation"
            className="flex shrink-0 items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors duration-150 hover:border-text-secondary hover:text-text-primary"
          >
            <RotateCcw size={13} aria-hidden />
            replay
          </button>
        </div>
      </div>
      <figcaption className="mt-3 text-xs sm:text-sm text-text-secondary">
        Log scale. The computation grows 32x, proving grows 38.6x, verification
        only 2.2x. That widening gap is the entire reason STARKs exist.
      </figcaption>
    </figure>
  );
}
