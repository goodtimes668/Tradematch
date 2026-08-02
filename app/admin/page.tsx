import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/auth";
import { listLeads } from "@/lib/db";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminSession())) {
    redirect("/admin/login");
  }

  const leads = listLeads();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminClient initialLeads={leads} />
    </div>
  );
}
