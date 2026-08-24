"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileX2,
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useAlasanPenolakan } from "@/features/settings/hooks/useAlasanPenolakan";
import { AlasanPenolakanFormModal } from "./AlasanPenolakanFormModal";
import { AlasanPenolakanDeleteModal } from "./AlasanPenolakanDeleteModal";
import type { AlasanPenolakan, AlasanPenolakanInput } from "@/features/settings/types";
import { formatDateTime } from "@/lib/utils/dateFormat";

export function AlasanPenolakanManagementCard() {
  const {
    list,
    meta,
    isLoading,
    isSubmitting,
    search,
    setSearch,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
    createItem,
    updateItem,
    toggleStatus,
    deleteItem,
  } = useAlasanPenolakan();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AlasanPenolakan | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<AlasanPenolakan | null>(null);

  const handleOpenAdd = () => {
    setSelectedItem(null);
    setFormModalOpen(true);
  };

  const handleOpenEdit = (item: AlasanPenolakan) => {
    setSelectedItem(item);
    setFormModalOpen(true);
  };

  const handleOpenDelete = (item: AlasanPenolakan) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (data: AlasanPenolakanInput) => {
    if (selectedItem) {
      return updateItem(selectedItem.id, data);
    } else {
      return createItem(data);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return false;
    return deleteItem(itemToDelete.id);
  };

  return (
    <>
      <Card className='mx-auto max-w-3xl overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm'>
        <CardContent className='space-y-6 p-6 sm:p-8'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <div className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600'>
                <FileX2 className='h-6 w-6' />
              </div>
              <div className='flex flex-col gap-0.5'>
                <h2 className='text-lg font-bold leading-tight text-slate-800'>
                  Master Alasan Penolakan
                </h2>
                <p className='text-sm text-slate-500'>
                  Kelola template alasan penolakan cepat verifikasi pengajuan
                </p>
              </div>
            </div>

            <Button
              onClick={handleOpenAdd}
              className='flex items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0c3e6b] shrink-0'
            >
              <Plus className='h-4 w-4' /> Tambah Alasan
            </Button>
          </div>

          {/* Filter & Search Bar */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-slate-100 pt-5'>
            <div className='relative flex-1'>
              <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
              <Input
                placeholder='Cari judul atau isi alasan penolakan...'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className='pl-10 h-10 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-[#0F4C81]'
              />
            </div>

            <div className='flex items-center gap-2 shrink-0'>
              <Filter className='h-4 w-4 text-slate-400 hidden sm:block' />
              <div className='flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold'>
                <button
                  type='button'
                  onClick={() => {
                    setStatusFilter("all");
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    statusFilter === "all"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Semua
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setStatusFilter("active");
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    statusFilter === "active"
                      ? "bg-white text-emerald-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Aktif
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setStatusFilter("inactive");
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    statusFilter === "inactive"
                      ? "bg-white text-rose-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Non-Aktif
                </button>
              </div>
            </div>
          </div>

          {/* Table List */}
          <div className='rounded-xl border border-slate-200 overflow-hidden bg-white'>
            {isLoading ? (
              <div className='p-8 text-center space-y-3'>
                <div className='mx-auto h-6 w-6 border-2 border-[#0F4C81] border-t-transparent rounded-full animate-spin' />
                <p className='text-xs text-slate-500 font-medium'>Memuat data alasan penolakan...</p>
              </div>
            ) : list.length === 0 ? (
              <div className='p-8 text-center space-y-2'>
                <FileX2 className='mx-auto h-8 w-8 text-slate-300' />
                <p className='text-sm font-semibold text-slate-600'>Tidak ada alasan penolakan</p>
                <p className='text-xs text-slate-400'>
                  {search
                    ? "Tidak ditemukan data yang cocok dengan pencarian."
                    : "Belum ada template alasan penolakan yang ditambahkan."}
                </p>
              </div>
            ) : (
              <div className='divide-y divide-slate-100'>
                {list.map((item) => (
                  <div
                    key={item.id}
                    className='p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4'
                  >
                    <div className='space-y-1 flex-1 pr-2'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <h4 className='text-sm font-bold text-slate-800 leading-snug'>
                          {item.judul}
                        </h4>
                        <button
                          type='button'
                          onClick={() => toggleStatus(item)}
                          title='Klik untuk mengubah status'
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border transition-colors ${
                            item.is_active
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                          }`}
                        >
                          {item.is_active ? (
                            <>
                              <CheckCircle2 size={12} /> Aktif
                            </>
                          ) : (
                            <>
                              <XCircle size={12} /> Non-Aktif
                            </>
                          )}
                        </button>
                      </div>
                      <p className='text-xs text-slate-600 leading-relaxed line-clamp-2'>
                        {item.alasan}
                      </p>
                      <div className='text-[11px] text-slate-400 pt-1'>
                        Dibuat oleh:{" "}
                        <span className='font-medium text-slate-600'>
                          {item.creator?.name || "Super Admin"}
                        </span>
                        {item.created_at && ` • ${formatDateTime(item.created_at)}`}
                      </div>
                    </div>

                    <div className='flex items-center gap-1.5 shrink-0 self-end sm:self-center'>
                      <Button
                        type='button'
                        size='sm'
                        variant='ghost'
                        onClick={() => handleOpenEdit(item)}
                        className='h-8 w-8 p-0 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                        title='Edit Alasan'
                      >
                        <Pencil size={15} />
                      </Button>
                      <Button
                        type='button'
                        size='sm'
                        variant='ghost'
                        onClick={() => handleOpenDelete(item)}
                        className='h-8 w-8 p-0 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50'
                        title='Hapus Alasan'
                      >
                        <Trash2 size={15} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && meta.last_page > 1 && (
            <div className='flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500'>
              <div>
                Halaman <span className='font-bold text-slate-700'>{meta.current_page}</span> dari{" "}
                <span className='font-bold text-slate-700'>{meta.last_page}</span> ({meta.total} total)
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  type='button'
                  size='sm'
                  variant='outline'
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className='h-8 px-3 rounded-lg text-xs border-slate-200'
                >
                  <ChevronLeft className='h-3.5 w-3.5 mr-1' /> Prev
                </Button>
                <Button
                  type='button'
                  size='sm'
                  variant='outline'
                  disabled={page >= meta.last_page}
                  onClick={() => setPage((p) => p + 1)}
                  className='h-8 px-3 rounded-lg text-xs border-slate-200'
                >
                  Next <ChevronRight className='h-3.5 w-3.5 ml-1' />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AlasanPenolakanFormModal
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        item={selectedItem}
        isSubmitting={isSubmitting}
        onSubmit={handleFormSubmit}
      />

      <AlasanPenolakanDeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        item={itemToDelete}
        isSubmitting={isSubmitting}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}