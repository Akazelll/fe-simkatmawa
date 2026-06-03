"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { APPROVAL_CONFIG } from "../constants";

export function ApprovalRateChart({ data }: { data?: any[] }) {
  // Jika data kosong, tampilkan fallback array kosong
  const chartData = data || [];

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
      <CardHeader>
        <CardTitle className='text-base font-semibold text-slate-800'>
          Approval Rate by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className='h-[260px] flex items-center justify-center text-sm text-slate-400'>
            Belum ada data.
          </div>
        ) : (
          <ChartContainer config={APPROVAL_CONFIG} className='h-[260px] w-full'>
            <BarChart data={chartData} margin={{ left: 8, right: 16, top: 8 }}>
              <CartesianGrid strokeDasharray='4 4' vertical={false} />
              <XAxis
                dataKey='category'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent indicator='dot' />} />
              <Bar
                dataKey='approved'
                fill='var(--color-approved)'
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey='rejected'
                fill='var(--color-rejected)'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
