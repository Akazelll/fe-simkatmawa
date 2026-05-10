import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface DeclarationSectionProps {
  onCancel?: () => void;
  onSubmit?: () => void;
}

export function DeclarationSection({
  onCancel,
  onSubmit,
}: DeclarationSectionProps) {
  return (
    <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
      <CardContent className='p-6 md:p-10 flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <Label
            htmlFor='form-pernyataan'
            className='text-slate-700 font-bold text-sm'
          >
            Form Pernyataan <span className='text-red-500'>*</span>
          </Label>

          <div className='flex items-start space-x-3 p-4 bg-slate-50/50 rounded-xl border border-slate-100'>
            <Checkbox
              id='terms'
              required
              className='mt-1 border-slate-300 data-[state=checked]:bg-[#0F4C81] data-[state=checked]:border-[#0F4C81]'
            />
            <div className='grid gap-1.5 leading-none'>
              <label
                htmlFor='terms'
                className='text-sm font-medium text-slate-600 leading-relaxed cursor-pointer select-none'
              >
                Dengan ini, saya menyatakan bahwa data yang saya input adalah
                benar dan sesuai dengan kenyataan. Apabila di kemudian hari
                ditemukan ketidaksesuaian atau kesalahan data, saya siap
                menerima sanksi sesuai ketentuan yang berlaku.
              </label>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-end gap-3 pt-6 border-t border-slate-100'>
          <Button
            type='button'
            variant='ghost'
            onClick={onCancel}
            className='rounded-xl font-bold text-slate-500 px-6 hover:bg-slate-100 transition-colors'
          >
            Batal
          </Button>
          <Button
            type='submit'
            onClick={onSubmit}
            className='bg-[#0F4C81] hover:bg-[#0c3e6b] text-white px-10 h-11 md:h-12 rounded-xl font-bold gap-2 shadow-sm transition-all hover:-translate-y-0.5'
          >
            <SendHorizontal />
            Kirim
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
