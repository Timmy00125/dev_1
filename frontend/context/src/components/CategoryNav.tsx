import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { Category, CategoryIcon } from "@/types/menu";

interface Props {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
}

// Tiny stroked icons — keeps the editorial restraint
const ICONS: Record<CategoryIcon, ReactNode> = {
  starters: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 4v6a5 5 0 0 0 10 0V4" />
      <path d="M12 14v6" />
    </svg>
  ),
  mains: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
    </svg>
  ),
  burgers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 11c0-3 4-6 9-6s9 3 9 6H3z" />
      <path d="M3 14h18" />
      <path d="M3 17c0 2 2 3 4 3h10c2 0 4-1 4-3" />
    </svg>
  ),
  salads: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12h18" />
      <path d="M5 12c0 4 3 7 7 7s7-3 7-7" />
      <path d="M9 8c0-2 1-4 3-4s3 2 3 4" />
    </svg>
  ),
  drinks: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 3h12l-2 12a4 4 0 0 1-8 0L6 3z" />
      <path d="M12 19v3" />
    </svg>
  ),
  desserts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 21h8l1-9H7l1 9z" />
      <circle cx="12" cy="6" r="3" />
    </svg>
  ),
};

export function CategoryNav({ categories, active, onChange }: Props) {
  return (
    <nav
      aria-label="Menu categories"
      className="overflow-x-auto -mx-6 px-6 pb-2"
      style={{ scrollbarWidth: "none" }}
    >
      <ul className="flex gap-3 min-w-max">
        {categories.map((cat, i) => {
          const isActive = cat.id === active;
          return (
            <motion.li
              key={cat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => onChange(cat.id)}
                className="group flex flex-col items-center gap-2 focus:outline-none"
                aria-pressed={isActive}
              >
                <span
                  className="w-[68px] h-[68px] rounded-2xl border flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isActive ? "var(--color-acid)" : "var(--color-ink-2)",
                    borderColor: isActive ? "var(--color-acid)" : "var(--color-line)",
                    color: isActive ? "var(--color-ink)" : "var(--color-bone-dim)",
                    boxShadow: isActive
                      ? "0 8px 30px -8px rgba(233,255,58,0.35)"
                      : "none",
                  }}
                >
                  <span className="w-7 h-7 block">{ICONS[cat.icon]}</span>
                </span>
                <span
                  className="eyebrow text-[10px]"
                  style={{
                    color: isActive
                      ? "var(--color-bone)"
                      : "var(--color-bone-faint)",
                  }}
                >
                  {cat.name}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}
