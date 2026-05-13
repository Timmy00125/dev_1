import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Category, MenuItem } from "@/types/menu";

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
        if (!cancelled) {
          setState({
            categories: res.data.categories || [],
            items: res.data.items || [],
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        console.error("[useMenu] fetch failed:", err);
        if (!cancelled) {
          setState({
            categories: [],
            items: [],
            loading: false,
            error: (err as Error).message,
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
