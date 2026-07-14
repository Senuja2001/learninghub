import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ─── UI store ──────────────────────────────────────────────── */
interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: "light",
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: "learninghub:ui" },
  ),
);

/* ─── User / session store ──────────────────────────────────── */
interface UserState {
  savedCourseIds: string[];
  toggleSavedCourse: (id: string) => void;
  completedLessons: string[];
  markLessonComplete: (id: string) => void;
  savedRedditPostIds: string[];
  toggleSavedRedditPost: (id: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      savedCourseIds: [],
      toggleSavedCourse: (id) =>
        set((s) => ({
          savedCourseIds: s.savedCourseIds.includes(id)
            ? s.savedCourseIds.filter((x) => x !== id)
            : [...s.savedCourseIds, id],
        })),
      completedLessons: [],
      markLessonComplete: (id) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(id)
            ? s.completedLessons
            : [...s.completedLessons, id],
        })),
      savedRedditPostIds: [],
      toggleSavedRedditPost: (id) =>
        set((s) => ({
          savedRedditPostIds: s.savedRedditPostIds.includes(id)
            ? s.savedRedditPostIds.filter((x) => x !== id)
            : [...s.savedRedditPostIds, id],
        })),
    }),
    { name: "learninghub:user" },
  ),
);
