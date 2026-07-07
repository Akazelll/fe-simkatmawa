"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
          Tren Pengajuan
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className='h-[260px] flex items-center justify-center text-sm text-slate-400'>
            Belum ada data.
          </div>
        ) : (
          <ChartContainer config={TREND_CONFIG} className='h-[260px] w-full'>
            <AreaChart data={chartData} margin={{ left: 8, right: 16, top: 8 }}>
              <defs>
                <linearGradient
                  id='fillSubmissions'
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  {/* Gradient sky -> indigo (opsi B) */}
                  <stop offset='5%' stopColor='#38bdf8' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#6366f1' stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='4 4' vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator='line' />}
              />
              <Area
                type='monotone'
                dataKey='submissions'
                stroke='var(--color-submissions)'
                strokeWidth={2}
                fill='url(#fillSubmissions)'
                fillOpacity={1}
                dot={{ r: 4, fill: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
