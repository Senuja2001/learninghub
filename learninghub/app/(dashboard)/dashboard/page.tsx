import { BookOpen, Clock, Flame, Trophy } from "lucide-react";

const stats = [
  { label: "Active courses", value: "8", icon: BookOpen },
  { label: "Learning hours", value: "42", icon: Clock },
  { label: "Current streak", value: "12", icon: Flame },
  { label: "Certificates", value: "5", icon: Trophy },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-black tracking-normal text-slate-950">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Track your learning activity and jump back into your developer growth.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-black text-slate-950">
                    {stat.value}
                  </p>
                </div>
                <div className="grid size-11 place-items-center rounded-lg bg-violet-100 text-violet-700">
                  <Icon className="size-5" />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
