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

export function ApiConfigCard() {
  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col h-full'>
      <CardHeader>
        <CardTitle className='text-lg font-bold text-slate-800'>
          API Configuration
        </CardTitle>
        <CardDescription className='text-sm text-slate-500'>
          Atur koneksi ke API Kemdikbud atau sistem eksternal lainnya.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-slate-700'>
            API Endpoint
          </Label>
          <Input
            defaultValue='https://api.kemdikbud.go.id/v1'
            className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-slate-700'>
            API Token
          </Label>
          <Input
            type='password'
            defaultValue='••••••••••••••••••••••••'
            className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-slate-700'>
            Timeout (ms)
          </Label>
          <Input
            type='number'
            defaultValue='5000'
            className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
          />
        </div>
      </CardContent>
      <CardFooter className='gap-3 pt-6 border-t border-slate-100 flex-wrap justify-end'>
        <Button
          variant='outline'
          className='rounded-xl font-bold text-[#0F4C81] border-[#0F4C81]/20 hover:bg-[#0F4C81]/5 shadow-sm w-full sm:w-[200px] h-11'
        >
          Test Connection
        </Button>
        <Button className='bg-[#0F4C81] hover:bg-[#0c3e6b] text-white rounded-xl font-bold shadow-sm w-full sm:w-[200px] h-11'>
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  );
}
