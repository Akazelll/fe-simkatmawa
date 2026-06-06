import Image from "next/image";

export function LoginBrand() {
  return (
    <div className='flex flex-col items-center gap-2 animate-fade-down'>
      <div className='w-10 h-10 rounded-lg bg-white grid place-items-center'>
        <Image
          src='/logo-udinus.png'
          alt='Logo Udinus'
          width={60}
          height={60}
          className='object-contain'
          priority
        />
      </div>

      <h1 className='text-2xl font-extrabold text-[#1a2b5e] tracking-wide'>
        SIMKATMAWA
      </h1>

      <p className='text-[10px] font-semibold text-muted-foreground text-center tracking-widest uppercase leading-relaxed md:w-[448px]'>
        Sistem Informasi Manajemen Pemeringkatan
        <br />
        Kemahasiswaan
      </p>
    </div>
  );
}
