import { redirect } from "next/navigation";

/**
 * Root dashboard group page — redirects to the main dashboard.
 * The real dashboard UI lives at /dashboard.
 */
export default function DashboardGroupRootPage() {
  redirect("/dashboard");
}
