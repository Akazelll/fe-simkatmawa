import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function SyncConfigCard() {
  const [autoSync, setAutoSync] = useState(true);

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col h-full'>
      <CardHeader>
        <CardTitle className='text-lg font-bold text-slate-800'>
          Sync Configuration
        </CardTitle>
        <CardDescription className='text-sm text-slate-500'>
          Atur interval dan metode sinkronisasi data otomatis.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 flex flex-col gap-5'>
        {/* Custom Toggle Switch */}
        <div className='flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50'>
          <div className='flex flex-col'>
            <Label
              className='text-sm font-semibold text-slate-700 cursor-pointer'
              onClick={() => setAutoSync(!autoSync)}
            >
              Auto Sync
            </Label>
            <span className='text-xs text-slate-500'>
              Jalankan sinkronisasi secara otomatis di latar belakang.
            </span>
          </div>
          <button
            type='button'
            onClick={() => setAutoSync(!autoSync)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:ring-offset-2 ${autoSync ? "bg-[#0F4C81]" : "bg-slate-300"}`}
          >
            <span
              className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${autoSync ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>

        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-slate-700'>
            Sync Interval (Minutes)
          </Label>
          <Input
            type='number'
            defaultValue='60'
            className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <Label className='text-sm font-semibold text-slate-700'>
              Max Retry Attempts
            </Label>
            <Input
              type='number'
              defaultValue='3'
              className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className='text-sm font-semibold text-slate-700'>
              Retry Delay (Seconds)
            </Label>
            <Input
              type='number'
              defaultValue='300'
              className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='pt-6 border-t border-slate-100'>
        <Button className='bg-[#0F4C81] hover:bg-[#0c3e6b] text-white rounded-xl font-bold px-6 shadow-sm w-full sm:w-auto'>
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  );
}
