"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Lead, LEAD_STATUSES, LeadStatus } from "@/lib/lead-types";
import { getTrade } from "@/lib/trades";

export default function AdminClient({ initialLeads }: { initialLeads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [savingId, setSavingId] = useState<number | null>(null);

  const stats = useMemo(() => {
    const byStatus: Record<string, number> = {};
    for (const l of leads) byStatus[l.status] = (byStatus[l.status] ?? 0) + 1;
    return byStatus;
  }, [leads]);

  const visibleLeads = useMemo(() => {
    if (statusFilter === "all") return leads;
    return leads.filter((l) => l.status === statusFilter);
  }, [leads, statusFilter]);

  async function updateStatus(id: number, status: LeadStatus) {
    setSavingId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const { lead } = await res.json();
      setLeads((prev) => prev.map((l) => (l.id === id ? lead : l)));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSavingId(null);
    }
  }

  async function updateSchool(id: number, school: string) {
    setSavingId(id);
    try {
      const current = leads.find((l) => l.id === id);
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: current?.status ?? "new", school }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const { lead } = await res.json();
      setLeads((prev) => prev.map((l) => (l.id === id ? lead : l)));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSavingId(null);
    }
  }

  function exportCsv() {
    const headers = [
      "id", "created_at", "name", "email", "phone", "zip",
      "trade_interest", "availability", "quiz_result", "status", "school", "source", "message",
    ];
    const rows = leads.map((l) =>
      headers.map((h) => csvEscape(String((l as any)[h] ?? ""))).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tradematch-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Lead Tracker</h1>
          <p className="text-sm text-gray-500">
            Your spreadsheet-CRM replacement. Track students end-to-end from
            application to school placement.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportCsv}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-ink hover:border-brand-600"
          >
            Export CSV
          </button>
          <button
            onClick={logout}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-500 hover:border-red-400 hover:text-red-600"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total" value={leads.length} />
        {LEAD_STATUSES.map((s) => (
          <StatCard key={s.value} label={s.label} value={stats[s.value] ?? 0} />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Filter:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        >
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Trade</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">School</th>
              <th className="px-4 py-3">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visibleLeads.map((lead) => (
              <tr key={lead.id} className={savingId === lead.id ? "opacity-50" : ""}>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 font-medium text-ink">{lead.name}</td>
                <td className="px-4 py-3 text-gray-600">
                  <div>{lead.email}</div>
                  {lead.phone && <div className="text-xs text-gray-400">{lead.phone}</div>}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {getTrade(lead.trade_interest ?? undefined)?.name ?? lead.trade_interest ?? "—"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {formatAvailability(lead.availability)}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status}
                    disabled={savingId === lead.id}
                    onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                    className="rounded-md border border-gray-300 px-2 py-1 text-xs"
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    defaultValue={lead.school ?? ""}
                    disabled={savingId === lead.id}
                    placeholder="School name"
                    onBlur={(e) => {
                      if (e.target.value !== (lead.school ?? "")) {
                        updateSchool(lead.id, e.target.value);
                      }
                    }}
                    className="w-32 rounded-md border border-gray-300 px-2 py-1 text-xs"
                  />
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{lead.source}</td>
              </tr>
            ))}
            {visibleLeads.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-400">
                  No leads yet. Once students apply, they&apos;ll show up here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
      <div className="text-xl font-bold text-ink">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function formatAvailability(value: string | null) {
  switch (value) {
    case "asap":
      return "ASAP";
    case "1-3_months":
      return "1–3 months";
    case "3-6_months":
      return "3–6 months";
    case "just_exploring":
      return "Exploring";
    default:
      return "—";
  }
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
