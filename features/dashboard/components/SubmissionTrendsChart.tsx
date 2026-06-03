"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TREND_CONFIG } from "../constants";

export function SubmissionTrendsChart({ data }: { data?: any[] }) {
  const chartData = data || [];

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
      <CardHeader>
        <CardTitle className='text-base font-semibold text-slate-800'>
          Submission Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className='h-[260px] flex items-center justify-center text-sm text-slate-400'>
            Belum ada data.
          </div>
        ) : (
          <ChartContainer config={TREND_CONFIG} className='h-[260px] w-full'>
            <LineChart data={chartData} margin={{ left: 8, right: 16, top: 8 }}>
              <CartesianGrid strokeDasharray='4 4' vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                content={<ChartTooltipContent indicator='line' />}
              />
              <Line
                type='monotone'
                dataKey='submissions'
                stroke='var(--color-submissions)'
                strokeWidth={2}
                dot={{ r: 5, fill: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
