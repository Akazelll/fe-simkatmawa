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
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  // Header Styles
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#1a2b5e",
    paddingBottom: 15,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a2b5e",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: "#475569",
    marginBottom: 2,
  },
  // Metadata Styles
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
    fontSize: 9,
    color: "#334155",
  },
  metaLabel: {
    fontWeight: "bold",
    color: "#0f172a",
  },
  // Table Styles
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
  tableHeaderCell: {
    flex: 1,
    padding: 8,
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tableRowZebra: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 9,
    color: "#334155",
  },
  // Footer Styles
  pageNumber: {
    position: "absolute",
    fontSize: 9,
    bottom: 30,
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
        {/* HEADER: Logo & Judul */}
        <View style={styles.headerContainer}>
          <Image src='/logo-udinus.png' style={styles.logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>SIMKATMAWA UDINUS</Text>
            <Text style={styles.subtitle}>
              Sistem Informasi Pemeringkatan Kemahasiswaan
            </Text>
            <Text style={styles.subtitle}>
              Laporan Aktivitas Sistem (Activity Logs)
            </Text>
          </View>
        </View>

        {/* METADATA: Informasi Ekspor */}
        <View style={styles.metaContainer}>
          <View style={styles.metaCol}>
            <Text style={styles.metaText}>
              <Text style={styles.metaLabel}>Diekspor oleh: </Text>
              {exporterName}
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

        {/* TABEL DATA */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>User</Text>
            <Text style={styles.tableHeaderCell}>Action</Text>
            <Text style={styles.tableHeaderCell}>Timestamp</Text>
          </View>

          {logs.map((log, index) => (
            <View
              key={log.id}
              style={index % 2 === 0 ? styles.tableRow : styles.tableRowZebra}
            >
              <Text style={styles.tableCell}>{log.user}</Text>
              <Text style={styles.tableCell}>{log.action}</Text>
              <Text style={styles.tableCell}>
                {format(new Date(log.timestamp), "dd/MM/yyyy HH:mm:ss")}
              </Text>
            </View>
          ))}
        </View>

        {/* NOMOR HALAMAN (Otomatis) */}
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
