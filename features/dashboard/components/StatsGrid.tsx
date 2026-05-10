import { StatCard } from "./StatCard";
import { STATS_DATA } from "../constants";

export function StatsGrid() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {STATS_DATA.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
