import { Clock, RefreshCcw, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function QueueStats() {
  const stats = [
    {
      label: "Pending Jobs",
      value: "12",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Processing",
      value: "3",
      icon: RefreshCcw,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Failed Jobs",
      value: "2",
      icon: AlertCircle,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
      {stats.map((item) => (
        <Card
          key={item.label}
          className='border-slate-200 shadow-sm rounded-2xl bg-white'
        >
          <CardContent className='p-6 flex items-center gap-4'>
            <div
              className={`size-12 rounded-xl flex items-center justify-center ${item.bg}`}
            >
              <item.icon className={item.color} size={24} />
            </div>
            <div>
              <p className='text-sm font-medium text-slate-500'>{item.label}</p>
              <p className='text-2xl font-bold text-slate-800'>{item.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
