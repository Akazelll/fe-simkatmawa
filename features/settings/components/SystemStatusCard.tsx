import { Globe, Database, Activity, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function SystemStatusCard() {
  const statuses = [
    {
      label: "API Connection",
      value: "Connected",
      icon: Globe,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      valueColor: "text-emerald-600",
    },
    {
      label: "Database Connection",
      value: "Stable",
      icon: Database,
      color: "text-[#0F4C81]",
      bg: "bg-[#0F4C81]/10",
      valueColor: "text-[#0F4C81]",
    },
    {
      label: "Queue Service",
      value: "Running",
      icon: Activity,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      valueColor: "text-emerald-600",
    },
    {
      label: "Last Sync",
      value: "10 mins ago",
      icon: Clock,
      color: "text-slate-500",
      bg: "bg-slate-100",
      valueColor: "text-slate-600",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
      {statuses.map((item) => (
        <Card
          key={item.label}
          className='border-slate-200 shadow-sm rounded-2xl bg-white'
        >
          <CardContent className='p-6 flex items-center gap-4'>
            <div
              className={`size-12 shrink-0 rounded-xl flex items-center justify-center ${item.bg}`}
            >
              <item.icon className={item.color} size={24} />
            </div>
            <div>
              <p className='text-sm font-medium text-slate-500 line-clamp-1'>
                {item.label}
              </p>
              <p className={`text-lg font-bold ${item.valueColor}`}>
                {item.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
