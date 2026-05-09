"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const TREND_DATA = [
  { month: "Oct", submissions: 140 },
  { month: "Nov", submissions: 160 },
  { month: "Dec", submissions: 175 },
  { month: "Jan", submissions: 195 },
  { month: "Feb", submissions: 220 },
  { month: "Mar", submissions: 245 },
];

const CONFIG = {
  submissions: {
    label: "Submissions",
    color: "#0F4C81",
  },
} satisfies ChartConfig;

export function SubmissionTrendsChart() {
  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-800">
          Submission Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={CONFIG} className="h-[260px] w-full">
          <LineChart data={TREND_DATA} margin={{ left: 8, right: 16, top: 8 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              ticks={[0, 65, 130, 195, 260]}
              domain={[0, 260]}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Line
              type="monotone"
              dataKey="submissions"
              stroke="var(--color-submissions)"
              strokeWidth={2}
              dot={{ r: 5, fill: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
