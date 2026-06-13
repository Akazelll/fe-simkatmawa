import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";

export function LoginCard() {
  return (
    <Card className='w-full max-w-[420px] shadow-md rounded-2xl border-0 animate-fade-up'>
      <CardContent className='pt-8 pb-4 px-8'>
        <div className='mb-6'>
          <h2 className='text-xl font-bold text-foreground'>Selamat Datang</h2>
          <p className='text-sm text-muted-foreground mt-0.5'>
            Masukkan Email dan Password Anda
          </p>
        </div>

        <LoginForm />
      </CardContent>
    </Card>
  );
}
