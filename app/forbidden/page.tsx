"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full max-w-md text-center border-red-100 shadow-lg'>
        <CardHeader>
          <div className='flex justify-center mb-4'>
            <ShieldAlert className='size-16 text-red-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-red-700'>
            Akses Ditolak
          </CardTitle>
          <CardDescription>
            Anda tidak memiliki izin (privilege) untuk mengakses halaman ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className='w-full'>
            <Link href='/dashboard'>Kembali ke Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
