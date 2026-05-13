import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useMenu } from "@/hooks/useMenu";
import { useGeminiInsights } from "@/hooks/useGeminiInsights";
import { ARViewer } from "@/components/ARViewer";
import { AIInsights } from "@/components/AIInsights";

export default function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, loading } = useMenu();
  const item = items.find((i) => i.id === id) ?? null;
  const [showAR, setShowAR] = useState(false);

  const { note, loading: noteLoading } = useGeminiInsights(item);

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center eyebrow">
        Loading…
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h2 className="font-display text-3xl">Dish not found</h2>
        <Link to="/" className="eyebrow underline">
          Back to menu
        </Link>
      </div>
    );
  }

  const hasModel = Boolean(item.modelUrl);

  return (
    <main className="max-w-xl mx-auto px-6 pb-32 min-h-dvh">
      {/* Top bar */}
      <div className="flex items-center justify-between pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-10 h-10 rounded-full flex items-center justify-center border hairline"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-4 h-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <p className="eyebrow">The Golden Oak</p>
        <button
          aria-label="Save"
          className="w-10 h-10 rounded-full flex items-center justify-center border hairline"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-4 h-4"
          >
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M9 11h6" />
          </svg>
        </button>
      </div>

      {/* Hero — image OR AR viewer */}
      <div
        className="relative aspect-square rounded-3xl overflow-hidden mb-8"
        style={{ background: "var(--color-ink-2)" }}
      >
        <AnimatePresence mode="wait">
          {showAR && hasModel ? (
            <motion.div
              key="ar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <ARViewer item={item} />
              <button
                onClick={() => setShowAR(false)}
                className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-[10px] eyebrow"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(8px)",
                }}
              >
                ← Image
              </button>
            </motion.div>
          ) : (
            <motion.img
              key="img"
              src={item.imageUrl}
              alt={item.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover"
            />
          )}
        </AnimatePresence>

        {/* Carousel arrows — visual only, ready to wire up */}
        <button
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
        >
          ‹
        </button>
        <button
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
        >
          ›
        </button>
      </div>

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-6"
      >
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 6.5vw, 3rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          {item.name}
          {item.isRecommended && (
            <span
              className="inline-block ml-2 align-middle text-base"
              style={{ color: "var(--color-blood)" }}
            >
              ▰
            </span>
          )}
        </h1>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span
            className="font-display"
            style={{
              fontSize: "1.6rem",
              color: "var(--color-amber)",
              fontWeight: 400,
            }}
          >
            ${item.price.toFixed(2)}
          </span>
          <span
            className="eyebrow text-[10px]"
            style={{ color: "var(--color-bone-faint)" }}
          >
            · {item.calories} Cal
          </span>
        </div>
      </motion.div>

      {/* Ingredient chips — exactly the reference language */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {item.ingredients.map((ing) => (
          <li
            key={ing}
            className="px-3 py-1.5 rounded-full border text-[11px] tracking-[0.16em] uppercase"
            style={{
              borderColor: "var(--color-amber)",
              color: "var(--color-amber)",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
            }}
          >
            {ing}
          </li>
        ))}
      </motion.ul>

      {/* Add to order — primary CTA */}
      <button
        type="button"
        className="btn-acid w-full py-4 rounded-full text-sm mb-3"
      >
        Add to Order
      </button>

      {/* AR CTA — only renders when there's a model */}
      {hasModel && (
        <button
          type="button"
          onClick={() => setShowAR(true)}
          className="w-full py-3 text-sm flex items-center justify-center gap-2 rounded-full"
          style={{
            color: "var(--color-acid)",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-3.5 h-3.5"
          >
            <path d="M12 2 3 7v10l9 5 9-5V7l-9-5z" />
            <path d="M3 7l9 5 9-5" />
            <path d="M12 12v10" />
          </svg>
          View on your table
        </button>
      )}

      <p
        className="text-center eyebrow text-[10px] mt-2 mb-10"
        style={{ color: "var(--color-bone-faint)" }}
      >
        Tap to review ⌃
      </p>

      {/* AI Insights */}
      <section
        className="rounded-3xl border hairline p-6 mb-6"
        style={{ background: "var(--color-ink-2)" }}
      >
        <AIInsights note={note} loading={noteLoading} />
      </section>

      {/* Description */}
      <section>
        <p className="eyebrow mb-3">About this dish</p>
        <p
          className="text-[15px] leading-relaxed"
          style={{ color: "var(--color-bone-dim)" }}
        >
          {item.description}
        </p>
      </section>
    </main>
  );
}
