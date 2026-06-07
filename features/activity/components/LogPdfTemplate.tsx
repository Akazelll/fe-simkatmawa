"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 9,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: "#1a2b5e",
    paddingBottom: 14,
  },
  logo: {
    width: 56,
    height: 56,
    marginRight: 14,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a2b5e",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#475569",
    marginBottom: 2,
  },

  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  metaCol: {
    flexDirection: "column",
    gap: 4,
  },
  metaText: {
    fontSize: 8.5,
    color: "#334155",
  },
  metaLabel: {
    fontWeight: "bold",
    color: "#0f172a",
  },

  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1a2b5e",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    minHeight: 28,
  },
  tableRowZebra: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    minHeight: 28,
  },

  headerCell: {
    paddingVertical: 7,
    paddingHorizontal: 5,
    color: "#ffffff",
    fontSize: 8,
    fontWeight: "bold",
  },
  cell: {
    paddingVertical: 7,
    paddingHorizontal: 5,
    fontSize: 7.6,
    color: "#334155",
    lineHeight: 1.3,
  },

  colNo: {
    width: "6%",
    textAlign: "center",
  },
  colWaktu: {
    width: "18%",
  },
  colPelaku: {
    width: "18%",
  },
  colAksi: {
    width: "12%",
  },
  colModul: {
    width: "18%",
  },
  colTarget: {
    width: "28%",
  },

  emptyContainer: {
    padding: 18,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 10,
    color: "#64748b",
  },

  pageNumber: {
    position: "absolute",
    fontSize: 9,
    bottom: 24,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#94a3b8",
  },
});

interface LogPdfTemplateProps {
  logs: any[];
  dateRange: { from: Date; to: Date };
  exporterName: string;
}

export function LogPdfTemplate({
  logs,
  dateRange,
  exporterName,
}: LogPdfTemplateProps) {
  const exportDate = new Date();

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.headerContainer}>
          <Image src='/logo-udinus.png' style={styles.logo} />

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>SIMKATMAWA UDINUS</Text>
            <Text style={styles.subtitle}>
              Sistem Informasi Pemeringkatan Kemahasiswaan
            </Text>
            <Text style={styles.subtitle}>
              Laporan Aktivitas Sistem Mahasiswa
            </Text>
          </View>
        </View>

        <View style={styles.metaContainer}>
          <View style={styles.metaCol}>
            <Text style={styles.metaText}>
              <Text style={styles.metaLabel}>Diekspor oleh: </Text>
              {exporterName || "-"}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.metaLabel}>Waktu Ekspor: </Text>
              {format(exportDate, "dd MMMM yyyy, HH:mm", { locale: id })} WIB
            </Text>
          </View>

          <View style={styles.metaCol}>
            <Text style={styles.metaText}>
              <Text style={styles.metaLabel}>Rentang Data: </Text>
              {format(dateRange.from, "dd MMM yyyy", { locale: id })} -{" "}
              {format(dateRange.to, "dd MMM yyyy", { locale: id })}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.metaLabel}>Total Record: </Text>
              {logs.length} baris
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.colNo]}>No</Text>
            <Text style={[styles.headerCell, styles.colWaktu]}>Waktu</Text>
            <Text style={[styles.headerCell, styles.colPelaku]}>Pelaku</Text>
            <Text style={[styles.headerCell, styles.colAksi]}>Aksi</Text>
            <Text style={[styles.headerCell, styles.colModul]}>Modul</Text>
            <Text style={[styles.headerCell, styles.colTarget]}>Target</Text>
          </View>

          {logs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Tidak ada data activity log pada rentang tanggal ini.
              </Text>
            </View>
          ) : (
            logs.map((log, index) => {
              const rowStyle =
                index % 2 === 0 ? styles.tableRow : styles.tableRowZebra;

              return (
                <View key={log.id ?? index} style={rowStyle} wrap={false}>
                  <Text style={[styles.cell, styles.colNo]}>{index + 1}</Text>
                  <Text style={[styles.cell, styles.colWaktu]}>
                    {resolveWaktu(log)}
                  </Text>
                  <Text style={[styles.cell, styles.colPelaku]}>
                    {resolvePelaku(log)}
                  </Text>
                  <Text style={[styles.cell, styles.colAksi]}>
                    {resolveAksi(log)}
                  </Text>
                  <Text style={[styles.cell, styles.colModul]}>
                    {resolveModul(log)}
                  </Text>
                  <Text style={[styles.cell, styles.colTarget]}>
                    {resolveTarget(log)}
                  </Text>
                </View>
              );
            })
          )}
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Halaman ${pageNumber} dari ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}

function resolveWaktu(log: any): string {
  const raw =
    log?.informasi_umum?.waktu ??
    log?.timestamp ??
    log?.created_at ??
    log?.createdAt;

  if (!raw) return "-";

  const date = new Date(raw);

  if (Number.isNaN(date.getTime())) {
    return String(raw);
  }

  return format(date, "dd/MM/yyyy HH:mm:ss");
}

function resolvePelaku(log: any): string {
  return (
    log?.informasi_umum?.pelaku ??
    log?.user ??
    log?.pelaku ??
    log?.causer?.name ??
    "-"
  );
}

function resolveAksi(log: any): string {
  return log?.informasi_umum?.aksi ?? log?.action ?? log?.event ?? "-";
}

function resolveModul(log: any): string {
  return log?.informasi_umum?.modul ?? log?.module ?? log?.category ?? "-";
}

function resolveTarget(log: any): string {
  const directTarget = log?.informasi_umum?.target ?? log?.target;

  if (isValidText(directTarget)) {
    return String(directTarget);
  }

  const after = log?.perubahan_data?.sesudah ?? {};
  const before = log?.perubahan_data?.sebelum ?? {};

  const fields = [
    "judul",
    "title",
    "nama",
    "name",
    "judul_kegiatan",
    "judul_prestasi",
    "nama_prestasi",
    "nama_lomba",
    "nama_kegiatan",
    "lomba",
    "nama_sertifikasi",
    "nama_sertifikat",
    "judul_sertifikasi",
    "judul_sertifikat",
    "nama_rekognisi",
    "judul_rekognisi",
  ];

  for (const field of fields) {
    if (isValidText(after?.[field])) {
      return String(after[field]);
    }
  }

  for (const field of fields) {
    if (isValidText(before?.[field])) {
      return String(before[field]);
    }
  }

  return "-";
}

function isValidText(value: unknown): boolean {
  if (value === null || value === undefined) return false;

  const text = String(value).trim();

  return text !== "" && text !== "-" && text !== "—";
}
