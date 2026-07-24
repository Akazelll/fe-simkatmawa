"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Check, Info, Search } from "lucide-react";
import { referensiService } from "@/features/shared/services/referensiService";
import type { AlasanPenolakanReferensi } from "@/features/settings/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onReject: (payload: {
    alasan_penolakan_id?: number;
    alasan_penolakan?: string;
  }) => void | Promise<void>;
  title: string;
  isProcessing?: boolean;
}

export function RejectSubmissionModal({
  isOpen,
  onClose,
  onReject,
  title,
  isProcessing = false,
}: Props) {
  const [templateReasons, setTemplateReasons] = useState<AlasanPenolakanReferensi[]>([]);
  const [selectedReasonId, setSelectedReasonId] = useState<number | null>(null);
  const [templateSearch, setTemplateSearch] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedReasonId(null);
      setTemplateSearch("");
      setNote("");
      setError("");
      return;
    }

    const fetchTemplates = async () => {
      try {
        setIsLoadingTemplates(true);
        const data = await referensiService.getAlasanPenolakan();
        setTemplateReasons(data || []);
      } catch (err) {
        console.error("Gagal memuat template alasan penolakan:", err);
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, [isOpen]);

  const selectedTemplate = templateReasons.find((t) => t.id === selectedReasonId);

  const filteredTemplates = templateReasons.filter(
    (t) =>
      t.judul.toLowerCase().includes(templateSearch.toLowerCase()) ||
      t.alasan.toLowerCase().includes(templateSearch.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!selectedReasonId && note.trim().length < 10) {
      setError("Jika tidak memilih template, detail alasan penolakan wajib diisi minimal 10 karakter.");
      return;
    }

    const payload: { alasan_penolakan_id?: number; alasan_penolakan?: string } = {};

    if (selectedReasonId) {
      payload.alasan_penolakan_id = selectedReasonId;
      if (note.trim()) {
        payload.alasan_penolakan = note.trim();
      }
    } else {
      payload.alasan_penolakan = note.trim();
    }

    await onReject(payload);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isProcessing) onClose();
      }}
    >
      <DialogContent className='sm:max-w-lg overflow-hidden p-0 rounded-2xl border-slate-200/60 shadow-lg'>
        <DialogHeader className='p-6 pb-0'>
          <div className='flex items-start gap-4'>
            <div className='flex-shrink-0 flex items-center justify-center w-12 h-12 bg-rose-50 rounded-full border border-rose-100'>
              <X className='text-rose-600' strokeWidth={2.5} size={24} />
            </div>
            <div className='flex flex-col gap-1'>
              <DialogTitle className='text-lg font-bold text-slate-900 text-left'>
                Tolak Pengajuan
              </DialogTitle>
              <p className='text-sm text-slate-500 leading-relaxed text-left'>
                Pilih alasan penolakan dari master template atau ketik catatan penolakan untuk{" "}
                <span className='font-semibold text-slate-800'>"{title}"</span>.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className='px-6 py-4 space-y-4 max-h-[75vh] overflow-y-auto'>
          {/* Section Pilihan Template Alasan */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                Pilih Template Alasan Cepat
              </Label>
              {selectedReasonId && (
                <button
                  type='button'
                  onClick={() => setSelectedReasonId(null)}
                  className='text-xs font-semibold text-sky-600 hover:underline'
                >
                  Reset / Gunakan Teks Manual
                </button>
              )}
            </div>

            {/* Input pencarian internal jika template cukup banyak */}
            {templateReasons.length > 3 && (
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400' />
                <Input
                  placeholder='Cari template alasan...'
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  className='pl-9 h-8 text-xs rounded-lg border-slate-200'
                />
              </div>
            )}

            {isLoadingTemplates ? (
              <div className='p-3 text-center text-xs text-slate-400 animate-pulse bg-slate-50 rounded-xl border border-slate-200'>
                Memuat template alasan penolakan...
              </div>
            ) : templateReasons.length === 0 ? (
              <div className='p-3 text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2'>
                <Info size={14} className='text-slate-400 shrink-0' />
                <span>Belum ada template alasan. Anda dapat mengetikkan detail alasan secara manual di bawah.</span>
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className='p-3 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200'>
                Tidak ditemukan template yang sesuai pencarian.
              </div>
            ) : (
              /* Container dengan fixed max-height dan scroll internal */
              <div className='grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1 text-left custom-scrollbar'>
                {filteredTemplates.map((t) => {
                  const isSelected = selectedReasonId === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        if (isProcessing) return;
                        setSelectedReasonId(isSelected ? null : t.id);
                        if (error) setError("");
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-rose-50/70 border-rose-300 ring-2 ring-rose-500/20"
                          : "bg-slate-50/60 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <div className='flex items-center justify-between gap-2'>
                        <span className='text-xs font-bold text-slate-800'>{t.judul}</span>
                        {isSelected && <Check size={14} className='text-rose-600 shrink-0' />}
                      </div>
                      <p className='text-xs text-slate-500 line-clamp-2 mt-0.5'>{t.alasan}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected Template Preview */}
          {selectedTemplate && (
            <div className='p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1 text-left'>
              <div className='font-semibold text-amber-800 flex items-center gap-1.5'>
                <Info size={14} /> Template Dipilih: {selectedTemplate.judul}
              </div>
              <p className='text-amber-700 leading-relaxed pl-5'>{selectedTemplate.alasan}</p>
            </div>
          )}

          {/* Textarea Input Alasan / Catatan Tambahan */}
          <div className='flex flex-col gap-1.5 text-left'>
            <Label className='text-sm font-semibold text-slate-700'>
              {selectedReasonId ? "Catatan Tambahan (Opsional)" : "Detail Alasan Penolakan"}
              {!selectedReasonId && <span className='text-rose-500'> *</span>}
            </Label>
            <Textarea
              placeholder={
                selectedReasonId
                  ? "Tulis catatan tambahan jika ada (misal: Mohon unggah ulang sertifikat asli berstempel)..."
                  : "Ketik detail alasan penolakan secara spesifik di sini..."
              }
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                if (error) setError("");
              }}
              disabled={isProcessing}
              className={`min-h-[90px] resize-none rounded-xl text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-0 ${
                error
                  ? "border-rose-300 focus-visible:ring-rose-500/30 bg-rose-50/30"
                  : "border-slate-200 focus-visible:ring-slate-300 bg-slate-50/50"
              }`}
            />
            {error && (
              <p className='text-xs text-rose-500 font-medium tracking-wide'>
                {error}
              </p>
            )}
          </div>
        </div>

        <div className='flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100'>
          <Button
            type='button'
            variant='outline'
            className='h-10 px-5 rounded-xl text-sm font-semibold bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors'
            onClick={onClose}
            disabled={isProcessing}
          >
            Batal
          </Button>

          <Button
            type='button'
            onClick={handleSubmit}
            disabled={isProcessing}
            className='h-10 px-6 gap-2 rounded-xl text-sm font-semibold bg-rose-500 text-white shadow-sm hover:bg-rose-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0'
          >
            {isProcessing ? "Memproses..." : "Ya, Tolak"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
