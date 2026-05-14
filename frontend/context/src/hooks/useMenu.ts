import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Category, MenuItem } from "@/types/menu";
import { CATEGORIES, MENU } from "@/data/mockMenu";

interface MenuState {
  categories: Category[];
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

export function useMenu(restaurantId = "golden-oak"): MenuState {
  const [state, setState] = useState<MenuState>({
    categories: [],
    items: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await api.get(`/menu/${restaurantId}`);
        const cats: Category[] = res.data.categories || [];
        const items: MenuItem[] = res.data.items || [];

        if (!cancelled) {
          // Fallback to mock data when API returns empty
          setState({
            categories: cats.length ? cats : CATEGORIES,
            items: items.length ? items : MENU,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        console.error("[useMenu] fetch failed:", err);
        if (!cancelled) {
          setState({
            categories: CATEGORIES,
            items: MENU,
            loading: false,
            error: null,
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [restaurantId]);

  return state;
}
