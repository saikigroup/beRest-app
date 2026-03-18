import { supabase } from "./supabase";
import type { WargaSchedule, ScheduleType } from "@app-types/sewa.types";

export async function createSchedule(orgId: string, schedule: Pick<WargaSchedule, "title" | "type" | "date" | "member_id" | "member_name">): Promise<WargaSchedule> {
  const { data, error } = await supabase.from("warga_schedules").insert({ org_id: orgId, is_swapped: false, ...schedule }).select().single();
  if (error) throw error;
  return data as WargaSchedule;
}

export async function createBulkSchedule(orgId: string, title: string, type: ScheduleType, dates: string[], members: { id: string; name: string }[]): Promise<WargaSchedule[]> {
  const rows = dates.map((date, i) => {
    const member = members[i % members.length];
    return { org_id: orgId, title, type, date, member_id: member.id, member_name: member.name, is_swapped: false };
  });
  const { data, error } = await supabase.from("warga_schedules").insert(rows).select();
  if (error) throw error;
  return (data ?? []) as WargaSchedule[];
}

export async function getSchedules(orgId: string, month?: string): Promise<WargaSchedule[]> {
  let query = supabase.from("warga_schedules").select("*").eq("org_id", orgId);
  if (month) {
    query = query.gte("date", `${month}-01`).lte("date", `${month}-31`);
  }
  const { data, error } = await query.order("date");
  if (error) throw error;
  return (data ?? []) as WargaSchedule[];
}

export async function requestSwap(scheduleId: string, swapWithId: string, swapWithName: string): Promise<void> {
  const { error } = await supabase.from("warga_schedules").update({ is_swapped: true, swap_with_id: swapWithId, swap_with_name: swapWithName }).eq("id", scheduleId);
  if (error) throw error;
}

export async function getMySchedules(orgId: string, memberId: string): Promise<WargaSchedule[]> {
  const { data, error } = await supabase.from("warga_schedules").select("*").eq("org_id", orgId).or(`member_id.eq.${memberId},swap_with_id.eq.${memberId}`).order("date");
  if (error) throw error;
  return (data ?? []) as WargaSchedule[];
}
