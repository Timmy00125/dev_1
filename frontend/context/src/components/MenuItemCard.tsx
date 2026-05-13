import { motion } from "motion/react";
import { Link } from "react-router-dom";
import type { MenuItem } from "@/types/menu";

interface Props {
  item: MenuItem;
  index: number;
}

export function MenuItemCard({ item, index }: Props) {
  const arReady = Boolean(item.modelUrl);

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
      className="border-b hairline last:border-b-0"
    >
      <Link
        to={`/item/${item.id}`}
        className="flex items-center gap-4 py-5 group"
      >
        <div
          className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0"
          style={{ background: "var(--color-ink-2)" }}
        >
          <img
            src={item.imageUrl}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {arReady && (
            <span
              className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[8px] tracking-[0.18em] font-semibold"
              style={{
                background: "var(--color-acid)",
                color: "var(--color-ink)",
                fontFamily: "var(--font-sans)",
              }}
            >
              AR
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="text-[15px] font-semibold truncate"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {item.name}
            </h3>
            {item.isRecommended && (
              <span
                aria-label="Recommended"
                className="text-[10px]"
                style={{ color: "var(--color-blood)" }}
              >
                ▰
              </span>
            )}
          </div>
          <p
            className="text-[11px] tracking-[0.14em] uppercase"
            style={{ color: "var(--color-bone-faint)" }}
          >
            {item.calories} cal
          </p>
        </div>

        <div className="text-right">
          <p
            className="text-lg"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-amber)",
            }}
          >
            ${item.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.li>
  );
}
