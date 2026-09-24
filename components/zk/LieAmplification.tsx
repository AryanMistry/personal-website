"use client";

import { useMemo, useState } from "react";

const HONEST = [0, 1, 1, 2, 3, 5, 8, 13];
const SAMPLES = 240;
const CHECKS = 64;

const HONEST_COLOR = "#7dd3fc";
const TAMPER_COLOR = "#f87171";
const GRID_COLOR = "#374151";
const MUTED = "#9ca3af";

function lagrange(ys: number[], x: number): number {
  let sum = 0;
  for (let i = 0; i < ys.length; i++) {
    let term = ys[i];
    for (let j = 0; j < ys.length; j++) {
      if (i !== j) term *= (x - j) / (i - j);
    }
    sum += term;
  }
  return sum;
}

const W = 680;
const H = 300;
const PAD_X = 44;
const PAD_Y = 26;
const Y_MIN = -14;
const Y_MAX = 26;

const sx = (x: number) => PAD_X + (x / (HONEST.length - 1)) * (W - 2 * PAD_X);
const sy = (y: number) =>
  H - PAD_Y - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (H - 2 * PAD_Y);

function curve(ys: number[]): string {
  const pts: string[] = [];
  for (let k = 0; k < SAMPLES; k++) {
    const x = (k / (SAMPLES - 1)) * (HONEST.length - 1);
    const y = Math.max(Y_MIN - 40, Math.min(Y_MAX + 40, lagrange(ys, x)));
    pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
}

export default function LieAmplification() {
  const [values, setValues] = useState<number[]>(HONEST);
  const tampered = values.some((v, i) => v !== HONEST[i]);

  const honestPath = useMemo(() => curve(HONEST), []);
  const tamperedPath = useMemo(() => curve(values), [values]);

  const agree = useMemo(() => {
    if (!tampered) return CHECKS;
    let same = 0;
    for (let k = 0; k < CHECKS; k++) {
      const x = (k / (CHECKS - 1)) * (HONEST.length - 1);
      if (Math.abs(lagrange(HONEST, x) - lagrange(values, x)) < 1e-9) same++;
    }
    return same;
  }, [values, tampered]);

  const bump = (i: number) =>
    setValues((v) => v.map((x, j) => (j === i ? (x + 1) % 20 : x)));

  return (
    <figure className="my-8">
      <div className="rounded-lg border border-border bg-background-secondary p-4 sm:p-5">
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full min-w-[520px]"
            role="img"
            aria-label="Interactive chart: changing one trace value changes the interpolating polynomial everywhere"
          >
            <line
              x1={PAD_X}
              y1={sy(0)}
              x2={W - PAD_X}
              y2={sy(0)}
              stroke={GRID_COLOR}
              strokeWidth={1}
            />

            <path
              d={honestPath}
              fill="none"
              stroke={HONEST_COLOR}
              strokeWidth={2}
              strokeDasharray={tampered ? "5 5" : undefined}
              opacity={tampered ? 0.7 : 1}
            />
            {tampered && (
              <path
                d={tamperedPath}
                fill="none"
                stroke={TAMPER_COLOR}
                strokeWidth={2}
              />
            )}

            {values.map((v, i) => {
              const changed = v !== HONEST[i];
              return (
                <g
                  key={i}
                  onClick={() => bump(i)}
                  className="cursor-pointer"
                  role="button"
                  aria-label={`row ${i}, value ${v}`}
                >
                  <circle cx={sx(i)} cy={sy(v)} r={16} fill="transparent" />
                  <circle
                    cx={sx(i)}
                    cy={sy(v)}
                    r={changed ? 6.5 : 5}
                    fill={changed ? TAMPER_COLOR : HONEST_COLOR}
                  />
                  <text
                    x={sx(i)}
                    y={H - 7}
                    textAnchor="middle"
                    fill={MUTED}
                    fontSize={11}
                  >
                    row {i}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm">
          <span className="flex items-center gap-2 text-text-secondary">
            <span
              className="inline-block h-px w-5"
              style={{ backgroundColor: HONEST_COLOR }}
            />
            honest
          </span>
          {tampered && (
            <span className="flex items-center gap-2 text-text-secondary">
              <span
                className="inline-block h-px w-5"
                style={{ backgroundColor: TAMPER_COLOR }}
              />
              tampered
            </span>
          )}
          <span className="text-text-secondary">
            {tampered ? (
              <>
                agrees at only{" "}
                <span style={{ color: TAMPER_COLOR }}>
                  {agree} of {CHECKS}
                </span>{" "}
                checkable points
              </>
            ) : (
              "click any dot to change one value"
            )}
          </span>
          {tampered && (
            <button
              onClick={() => setValues(HONEST)}
              className="ml-auto rounded border border-border px-2.5 py-1 text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary"
            >
              reset
            </button>
          )}
        </div>
      </div>
      <figcaption className="mt-3 text-xs sm:text-sm text-text-secondary">
        Change one row and the whole curve moves. A cheater cannot make a small, local lie.
      </figcaption>
    </figure>
  );
}
