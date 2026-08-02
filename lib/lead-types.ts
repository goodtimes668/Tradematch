export type LeadStatus =
  | "new"
  | "contacted"
  | "sent_to_school"
  | "enrolled"
  | "not_a_fit";

export const LEAD_STATUSES: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "sent_to_school", label: "Sent to School" },
  { value: "enrolled", label: "Enrolled" },
  { value: "not_a_fit", label: "Not a Fit" },
];

export interface Lead {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  zip: string | null;
  trade_interest: string | null;
  availability: string | null;
  message: string | null;
  quiz_result: string | null;
  status: LeadStatus;
  school: string | null;
  source: string;
}
