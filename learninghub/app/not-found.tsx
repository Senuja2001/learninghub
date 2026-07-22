import ComingSoon from "@/components/ComingSoon";

/**
 * Global 404 handler — shown for any unknown route.
 * Uses the same ComingSoon component so it matches the rest of the app.
 */
export default function NotFound() {
  return (
    <ComingSoon
      backHref="/"
      backLabel="Back to Home"
      feature="Page Not Found"
    />
  );
}
