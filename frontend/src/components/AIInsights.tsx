import { motion } from "motion/react";
import type { TastingNote } from "@/types/menu";

interface Props {
  note: TastingNote | null;
  loading: boolean;
}

export function AIInsights({ note, loading }: Props) {
  if (loading) {
    return (
      <div className="space-y-3" aria-live="polite" aria-busy="true">
        <Skeleton w="35%" h="0.65rem" />
        <Skeleton w="100%" h="0.95rem" />
        <Skeleton w="88%" h="0.95rem" />
        <Skeleton w="60%" h="0.95rem" />
      </div>
    );
  }

  if (!note) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      <p className="eyebrow">Sommelier · AI tasting note</p>
      <p
        className="text-[17px] leading-[1.45]"
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 300,
          color: "var(--color-bone)",
          letterSpacing: "-0.01em",
        }}
      >
        “{note.description}”
      </p>

      {note.pairing && (
        <p className="text-xs" style={{ color: "var(--color-bone-dim)" }}>
          <span className="eyebrow mr-2">Pair with</span>
          {note.pairing}
        </p>
      )}

      {note.highlights && note.highlights.length > 0 && (
        <ul className="flex flex-wrap gap-2 pt-1">
          {note.highlights.map((h) => (
            <li key={h} className="chip">
              {h}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

function Skeleton({ w, h }: { w: string; h: string }) {
  return (
    <div
      className="rounded animate-pulse"
      style={{
        width: w,
        height: h,
        background: "var(--color-ink-3)",
      }}
    />
  );
}
