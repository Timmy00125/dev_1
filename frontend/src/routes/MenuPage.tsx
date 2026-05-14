import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MenuHeader } from "@/components/MenuHeader";
import { CategoryNav } from "@/components/CategoryNav";
import { SearchBar } from "@/components/SearchBar";
import { MenuItemCard } from "@/components/MenuItemCard";
import { useMenu } from "@/hooks/useMenu";

type Filter = "all" | "veg" | "non";

export default function MenuPage() {
  const { categories, items, loading } = useMenu();
  const [activeCat, setActiveCat] = useState<string>("starters");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  // Veg / non-veg filter is heuristic on ingredients — replace with a real
  // boolean field on MenuItem when you've curated the data set.
  const filtered = useMemo(() => {
    const meatRx = /chicken|beef|wagyu|prosciutto|lobster|ribeye|pork|fish|bacon/i;
    return items.filter((item) => {
      if (item.categoryId !== activeCat) return false;
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter === "all") return true;
      const meaty = meatRx.test(item.ingredients.join(" ") + " " + item.name);
      return filter === "veg" ? !meaty : meaty;
    });
  }, [items, activeCat, filter, search]);

  const activeCategoryName =
    categories.find((c) => c.id === activeCat)?.name ?? "";

  return (
    <main className="max-w-xl mx-auto px-6 pb-24">
      <MenuHeader />

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="eyebrow">Categories</p>
          <button className="eyebrow text-[10px]" style={{ color: "var(--color-amber)" }}>
            Swipe List ✨
          </button>
        </div>
        <CategoryNav
          categories={categories}
          active={activeCat}
          onChange={setActiveCat}
        />
      </div>

      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Section header — bold editorial */}
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-[28px] font-display"
          style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          {activeCategoryName}
        </h2>
        <div className="flex items-center gap-2">
          {(["all", "veg", "non"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="chip"
              data-active={filter === f}
            >
              {f === "all" ? "All" : f === "veg" ? "Veg" : "Non"}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={activeCat + filter + search}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="border-t hairline"
        >
          {loading ? (
            <li className="py-12 text-center eyebrow">Loading…</li>
          ) : filtered.length === 0 ? (
            <li
              className="py-12 text-center font-display italic text-sm"
              style={{ color: "var(--color-bone-faint)" }}
            >
              No dishes match. Try another filter.
            </li>
          ) : (
            filtered.map((item, i) => (
              <MenuItemCard key={item.id} item={item} index={i} />
            ))
          )}
        </motion.ul>
      </AnimatePresence>

      {/* Footer translation strip — mirrors the reference */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-xs"
        style={{
          background: "var(--color-ink-2)",
          border: "1px solid var(--color-line)",
          fontFamily: "var(--font-sans)",
          color: "var(--color-bone-dim)",
        }}
      >
        <span aria-hidden>🌐</span>
        Translation Available
        <button aria-label="Refresh" className="ml-1">↻</button>
      </div>
    </main>
  );
}
