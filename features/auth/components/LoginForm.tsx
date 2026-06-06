import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useLoginForm } from "../hooks/useLoginForm";

export function LoginForm() {
  const {
    email,
    password,
    error,
    isLoading,
    showPassword,
    keepSigned,
    setEmail,
    setPassword,
    setShowPassword,
    setKeepSigned,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {error && (
        <div className='flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100'>
          <AlertCircle className='w-4 h-4 shrink-0' />
          <span className='font-medium'>{error}</span>
        </div>
      )}

      <div className='space-y-1.5'>
        <Label
          htmlFor='email'
          className='text-[11px] font-bold uppercase tracking-widest text-foreground'
        >
          Email
        </Label>

        <div className='relative'>
          <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />

          <Input
            id='email'
            type='email'
            placeholder='username@mhs.dinus.ac.id'
            required
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='h-12 pl-9 bg-muted/50 border-border focus-visible:ring-[#1a2b5e]/20 focus-visible:border-[#1a2b5e]'
          />
        </div>
      </div>

      <div className='space-y-1.5'>
        <div className='flex items-center justify-between'>
          <Label
            htmlFor='password'
            className='text-[11px] font-bold uppercase tracking-widest text-foreground'
          >
            Password
          </Label>
        </div>

        <div className='relative'>
          <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />

          <Input
            id='password'
            type={showPassword ? "text" : "password"}
            placeholder='••••••••••••'
            required
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='h-12 pl-9 pr-10 bg-muted/50 border-border focus-visible:ring-[#1a2b5e]/20 focus-visible:border-[#1a2b5e]'
          />

          <button
            type='button'
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
          >
            {showPassword ? (
              <EyeOff className='h-4 w-4' />
            ) : (
              <Eye className='h-4 w-4' />
            )}
          </button>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Checkbox
          id='keep-signed'
          checked={keepSigned}
          onCheckedChange={(value) => setKeepSigned(Boolean(value))}
          className='data-[state=checked]:bg-[#1a2b5e] data-[state=checked]:border-[#1a2b5e]'
        />

        <Label
          htmlFor='keep-signed'
          className='text-sm font-medium text-muted-foreground cursor-pointer'
        >
          Keep me signed in
        </Label>
      </div>

      <Button
        type='submit'
        disabled={isLoading}
        className='w-full bg-gradient-to-r from-[#1a2b5e] to-[#2563eb] hover:from-[#243570] hover:to-[#3b82f6] text-white font-bold tracking-wide rounded-2xl h-11 shadow-md shadow-[#1a2b5e]/25 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#1a2b5e]/30 active:translate-y-0 mt-1'
      >
        {isLoading ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
