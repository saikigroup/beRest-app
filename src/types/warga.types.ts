export type OrgType =
  | "rt_rw"
  | "komplek"
  | "mesjid"
  | "pengajian"
  | "klub"
  | "sekolah"
  | "alumni"
  | "other";

export type MemberRole = "admin" | "treasurer" | "member";
export type DuesStatus = "unpaid" | "paid" | "partial" | "exempt";
export type TransactionType = "income" | "expense";

export interface Organization {
  id: string;
  user_id: string;
  name: string;
  type: OrgType;
  slug: string | null;
  description: string | null;
  logo_url: string | null;
  settings: Record<string, unknown>;
  created_at: string;
}

export interface OrgMember {
  id: string;
  org_id: string;
  contact_id: string | null;
  consumer_id: string | null;
  name: string;
  phone: string | null;
  role: MemberRole;
  member_code: string | null;
  joined_at: string;
}

export interface OrgDues {
  id: string;
  org_id: string;
  member_id: string;
  period: string;
  amount: number;
  status: DuesStatus;
  paid_date: string | null;
  proof_photo: string | null;
  notes: string | null;
  created_at: string;
}

export interface OrgTransaction {
  id: string;
  org_id: string;
  type: TransactionType;
  category: string | null;
  description: string;
  amount: number;
  transaction_date: string;
  proof_photo: string | null;
  donor_name: string | null;
  created_at: string;
}
