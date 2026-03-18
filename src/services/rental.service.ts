import { supabase } from "./supabase";
import type { RentalItem, RentalTransaction, RentalStatus } from "@app-types/sewa.types";

function generateRentalCode(): string {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `RNT-${day}${rand}`;
}

// ==================== ITEMS ====================

export async function createRentalItem(userId: string, item: Pick<RentalItem, "name" | "description" | "photo_url" | "daily_rate" | "deposit_amount" | "total_stock">): Promise<RentalItem> {
  const { data, error } = await supabase.from("rental_items").insert({ user_id: userId, available_stock: item.total_stock, is_active: true, ...item }).select().single();
  if (error) throw error;
  return data as RentalItem;
}

export async function getRentalItems(userId: string): Promise<RentalItem[]> {
  const { data, error } = await supabase.from("rental_items").select("*").eq("user_id", userId).eq("is_active", true).order("name");
  if (error) throw error;
  return (data ?? []) as RentalItem[];
}

// ==================== TRANSACTIONS ====================

export async function createRentalTransaction(itemId: string, userId: string, tx: Pick<RentalTransaction, "borrower_name" | "borrower_phone" | "consumer_id" | "quantity" | "daily_rate" | "deposit_collected" | "start_date" | "expected_return" | "notes">): Promise<RentalTransaction> {
  const { data, error } = await supabase.from("rental_transactions").insert({ item_id: itemId, user_id: userId, rental_code: generateRentalCode(), status: "active" as RentalStatus, total_cost: null, return_photo: null, actual_return: null, ...tx }).select().single();
  if (error) throw error;

  // Decrease available stock
  await supabase.rpc("decrease_rental_stock", { p_item_id: itemId, p_qty: tx.quantity });

  return data as RentalTransaction;
}

export async function getRentalTransactions(userId: string, activeOnly = true): Promise<RentalTransaction[]> {
  let query = supabase.from("rental_transactions").select("*, rental_items(name)").eq("user_id", userId);
  if (activeOnly) query = query.eq("status", "active");
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as RentalTransaction[];
}

export async function returnRental(id: string, returnPhoto: string | null): Promise<RentalTransaction> {
  const { data: tx } = await supabase.from("rental_transactions").select("*, rental_items(daily_rate)").eq("id", id).single();
  if (!tx) throw new Error("Transaksi tidak ditemukan");

  const startDate = new Date(tx.start_date);
  const now = new Date();
  const days = Math.max(1, Math.ceil((now.getTime() - startDate.getTime()) / 86400000));
  const totalCost = days * tx.daily_rate * tx.quantity;

  const { data, error } = await supabase.from("rental_transactions").update({
    status: "returned" as RentalStatus, actual_return: now.toISOString(), return_photo: returnPhoto, total_cost: totalCost,
  }).eq("id", id).select().single();
  if (error) throw error;

  // Restore stock
  await supabase.rpc("increase_rental_stock", { p_item_id: tx.item_id, p_qty: tx.quantity });

  return data as RentalTransaction;
}

export async function getRentalByCode(code: string): Promise<(RentalTransaction & { rental_items?: { name: string } }) | null> {
  const { data, error } = await supabase.from("rental_transactions").select("*, rental_items(name)").eq("rental_code", code.toUpperCase()).single();
  if (error) return null;
  return data as RentalTransaction & { rental_items?: { name: string } };
}
