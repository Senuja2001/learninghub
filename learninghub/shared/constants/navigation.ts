import {
  LayoutDashboard,
  BookOpen,
  Route,
  Users,
  Newspaper,
  Bookmark,
  Bell,
  Award,
  Settings,
  CircleHelp,
} from "lucide-react";

export const dashboardNavigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Learning Paths",
    href: "/learning-paths",
    icon: Route,
  },
  {
    title: "Community",
    href: "/community",
    icon: Users,
  },
  {
    title: "News",
    href: "/news",
    icon: Newspaper,
  },
  {
    title: "Bookmarks",
    href: "/bookmarks",
    icon: Bookmark,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Certificates",
    href: "/certificates",
    icon: Award,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/help-support",
    icon: CircleHelp,
  },
];