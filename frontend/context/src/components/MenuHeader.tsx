import { motion } from "motion/react";

function timeOfDay() {
  const h = new Date().getHours();
  if (h < 5) return "Late Night";
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  if (h < 21) return "Good Evening";
  return "Good Night";
}

export function MenuHeader() {
  const greeting = timeOfDay();

  return (
    <header className="relative pt-6 pb-8">
      {/* Top utility bar */}
      <div
        className="flex items-center justify-between mb-10"
        style={{ color: "var(--color-bone-dim)" }}
      >
        <span className="eyebrow">Menu</span>
        <div className="flex items-center gap-5">
          <button aria-label="Currency" className="text-sm font-medium">
            $
          </button>
          <button aria-label="Toggle theme" className="text-sm font-medium">
            ◐
          </button>
          <button aria-label="Language" className="eyebrow text-[10px]">
            EN
          </button>
          <button
            aria-label="Account"
            className="w-7 h-7 rounded-full border hairline flex items-center justify-center text-xs"
          >
            ⌬
          </button>
        </div>
      </div>

      {/* The headline — bold typography hero */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative"
      >
        <p
          className="font-display italic text-sm mb-3"
          style={{
            color: "var(--color-amber)",
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}
        >
          {greeting}
        </p>
        <h1 className="headline">
          <span className="block text-[clamp(2.5rem,9vw,5.5rem)]">THE</span>
          <span
            className="block text-[clamp(2.8rem,11vw,7rem)]"
            style={{ marginTop: "-0.18em" }}
          >
            <em className="it">Golden</em> OAK
          </span>
        </h1>

        {/* Decorative oak leaves — pure SVG, no asset dependency */}
        <svg
          className="absolute -top-2 right-2 w-12 h-12 opacity-60"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ color: "var(--color-amber)" }}
          aria-hidden="true"
        >
          <path d="M32 8c4 4 6 10 4 16-1 3-4 5-4 5s-3-2-4-5c-2-6 0-12 4-16z" />
          <path d="M16 22c5 1 10 5 12 11 1 3 0 6 0 6s-3 1-6 0c-6-2-10-7-11-12 0-2 1-5 5-5z" />
          <path d="M48 22c-5 1-10 5-12 11-1 3 0 6 0 6s3 1 6 0c6-2 10-7 11-12 0-2-1-5-5-5z" />
          <path d="M32 28v28" />
        </svg>
      </motion.div>
    </header>
  );
}
