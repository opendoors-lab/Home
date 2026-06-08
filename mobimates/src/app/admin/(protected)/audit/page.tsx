"use client";

import { useEffect, useState } from "react";
import type { AuditLogDto } from "@company/shared";
import { adminApi } from "@/lib/admin-api";

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLogDto[]>([]);

  useEffect(() => {
    adminApi.auditLog().then(setLogs).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
        Audit log
      </h1>
      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--color-line)] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--color-line)] bg-[var(--color-cream-200)]/40">
            <tr>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Target</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-[var(--color-line)] last:border-0">
                <td className="px-4 py-3 text-[var(--color-ink-soft)]">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-medium">{log.action}</td>
                <td className="px-4 py-3 text-[var(--color-ink-soft)]">
                  {log.targetType} {log.targetId?.slice(0, 8)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!logs.length && <p className="p-6 text-[var(--color-ink-soft)]">No audit entries yet.</p>}
      </div>
    </div>
  );
}
