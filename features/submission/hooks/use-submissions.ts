"use client";
import { useState, useEffect } from "react";
import {
  Submission,
  SubmissionActivityLog,
} from "@/lib/submission/submission-types";
import { useAuth } from "@/features/auth/hooks/use-auth";

const DUMMY_SUBMISSIONS: Submission[] = [
  {
    id: "S-001",
    type: "prestasi",
    title: "Juara 1 Hackathon",
    studentName: "Adam Raga",
    studentNim: "A11.2024.15598",
    status: "PENDING",
    submittedAt: new Date().toISOString(),
    createdBy: "user-mahasiswa-001",
  },
  {
    id: "S-002",
    type: "sertifikat",
    title: "AWS Cloud Practitioner",
    studentName: "Syakira Fara",
    studentNim: "A11.2024.15594",
    status: "PENDING",
    submittedAt: new Date().toISOString(),
    createdBy: "user-mahasiswa-002",
  },
];

export function useSubmissions() {
  const { currentUser } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("simkatmawa_submissions");
    if (stored) setSubmissions(JSON.parse(stored));
    else {
      localStorage.setItem(
        "simkatmawa_submissions",
        JSON.stringify(DUMMY_SUBMISSIONS),
      );
      setSubmissions(DUMMY_SUBMISSIONS);
    }
  }, []);

  const saveSubmissions = (newSubs: Submission[]) => {
    setSubmissions(newSubs);
    localStorage.setItem("simkatmawa_submissions", JSON.stringify(newSubs));
  };

  const logActivity = (
    action: "submission.approved" | "submission.rejected",
    sub: Submission,
    desc: string,
  ) => {
    if (!currentUser) return;
    const log: SubmissionActivityLog = {
      id: crypto.randomUUID(),
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentUser.role,
      action,
      subjectType: sub.type,
      subjectId: sub.id,
      subjectTitle: sub.title,
      description: desc,
      createdAt: new Date().toISOString(),
    };
    const existingLogs = JSON.parse(
      localStorage.getItem("simkatmawa_activity") || "[]",
    );
    localStorage.setItem(
      "simkatmawa_activity",
      JSON.stringify([log, ...existingLogs]),
    );
  };

  const approveSubmission = (id: string) => {
    const now = new Date().toISOString();
    const updated = submissions.map((s) => {
      if (s.id === id && s.status === "PENDING") {
        const updatedSub = {
          ...s,
          status: "APPROVED_UNSYNCED" as const,
          approvedBy: currentUser?.name,
          approvedAt: now,
          processedBy: currentUser?.name,
          processedAt: now,
        };
        logActivity(
          "submission.approved",
          updatedSub,
          `Menerima pengajuan ${updatedSub.type}`,
        );
        return updatedSub;
      }
      return s;
    });
    saveSubmissions(updated);
  };

  const rejectSubmission = (id: string, reason: string) => {
    const now = new Date().toISOString();
    const updated = submissions.map((s) => {
      if (s.id === id && s.status === "PENDING") {
        const updatedSub = {
          ...s,
          status: "REJECTED" as const,
          rejectedBy: currentUser?.name,
          rejectedAt: now,
          processedBy: currentUser?.name,
          processedAt: now,
          rejectionReason: reason,
        };
        logActivity(
          "submission.rejected",
          updatedSub,
          `Menolak pengajuan ${updatedSub.type}`,
        );
        return updatedSub;
      }
      return s;
    });
    saveSubmissions(updated);
  };

  return { submissions, approveSubmission, rejectSubmission };
}
