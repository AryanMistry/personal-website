"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";

const PROVER = "#7dd3fc";
const VERIFIER = "#6ee7b7";

type Step =
  | { kind: "prover" | "verifier"; n: number; title: string; detail: string }
  | { kind: "send"; dir: "right" | "left"; label: string; note: string };

const STEPS: Step[] = [
  { kind: "prover", n: 1, title: "run the program", detail: "produces the execution trace" },
  { kind: "prover", n: 2, title: "interpolate", detail: "one polynomial per trace column" },
  { kind: "prover", n: 3, title: "extend 8x", detail: "evaluate onto a larger coset" },
  { kind: "prover", n: 4, title: "Merkle commit", detail: "hash the extension into one root" },
  { kind: "send", dir: "right", label: "commitment", note: "32 bytes" },
  { kind: "send", dir: "left", label: "random challenge", note: "derived by hashing, not sent (Fiat-Shamir)" },
  { kind: "prover", n: 5, title: "combine 71 constraints", detail: "divide by Z(x) to get the composition polynomial" },
  { kind: "prover", n: 6, title: "FRI fold + commit", detail: "halve the degree until a constant remains" },
  { kind: "send", dir: "right", label: "proof", note: "~147 KiB" },
  { kind: "verifier", n: 7, title: "open ~24 queries", detail: "check each Merkle path against the root" },
  { kind: "verifier", n: 8, title: "recompute constraints", detail: "at those points only, never the whole trace" },
  { kind: "verifier", n: 9, title: "verify every fold", detail: "confirm the final layer is constant" },
  { kind: "verifier", n: 10, title: "accept or reject", detail: "" },
];

function Box({ step }: { step: Extract<Step, { kind: "prover" | "verifier" }> }) {
  const color = step.kind === "prover" ? PROVER : VERIFIER;
  return (
    <div
      className="rounded border border-border bg-background-primary/60 px-3 py-2"
      style={{ borderLeftWidth: 2, borderLeftColor: color }}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-[10px] tabular-nums" style={{ color }}>
          {String(step.n).padStart(2, "0")}
        </span>
        <span className="text-xs sm:text-[13px] text-text-primary">{step.title}</span>
      </div>
      {step.detail && (
        <p className="mt-0.5 pl-6 text-[11px] leading-snug text-text-secondary">
          {step.detail}
        </p>
      )}
    </div>
  );
}

function Wire({ step }: { step: Extract<Step, { kind: "send" }> }) {
  const right = step.dir === "right";
  const Icon = right ? ArrowRight : ArrowLeft;
  return (
    <div className="col-span-1 sm:col-span-2 my-1 flex items-center gap-3">
      <span className="h-px flex-1" style={{ backgroundColor: "#374151" }} />
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        {!right && <Icon size={12} style={{ color: "#9ca3af" }} aria-hidden />}
        <span className="text-[11px] text-text-primary">{step.label}</span>
        <span className="text-[11px] text-text-secondary">({step.note})</span>
        {right && <Icon size={12} style={{ color: "#9ca3af" }} aria-hidden />}
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: "#374151" }} />
    </div>
  );
}

export default function ProofPipeline() {
  return (
    <figure className="my-8">
      <div className="rounded-lg border border-border bg-background-secondary p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
          <div className="text-[11px] uppercase tracking-wider" style={{ color: PROVER }}>
            prover
          </div>
          <div className="hidden sm:block text-[11px] uppercase tracking-wider" style={{ color: VERIFIER }}>
            verifier
          </div>

          {STEPS.map((step, i) =>
            step.kind === "send" ? (
              <Wire key={i} step={step} />
            ) : (
              <div
                key={i}
                className={step.kind === "prover" ? "sm:col-start-1" : "sm:col-start-2"}
              >
                <Box step={step} />
              </div>
            )
          )}
        </div>
      </div>
      <figcaption className="mt-3 text-xs sm:text-sm text-text-secondary">
        The whole protocol. Everything on the left happens once, at proving time while
        everything on the right is what a verifier repeats, and it never touches
        the trace itself.
      </figcaption>
    </figure>
  );
}
