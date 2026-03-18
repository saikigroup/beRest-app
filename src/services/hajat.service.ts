import { supabase } from "./supabase";
import { GEMINI_API_KEY, GEMINI_MODEL, GEMINI_API_URL } from "@config/gemini.config";
import type {
  HajatEvent,
  EventGuest,
  GiftRecord,
  EventStatus,
  RsvpStatus,
  GiftDirection,
  EventType,
  AmlopSuggestion,
} from "@app-types/hajat.types";

// ==================== EVENTS ====================

export async function createEvent(
  userId: string,
  event: Pick<HajatEvent, "title" | "type" | "event_date" | "event_time" | "location_name" | "location_address" | "location_maps_url" | "cover_photo" | "custom_message">
): Promise<HajatEvent> {
  const slug = event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const { data, error } = await supabase
    .from("hajat_events")
    .insert({ user_id: userId, slug, status: "draft" as EventStatus, template_id: null, settings: {}, ...event })
    .select().single();
  if (error) throw error;
  return data as HajatEvent;
}

export async function getEvents(userId: string): Promise<HajatEvent[]> {
  const { data, error } = await supabase.from("hajat_events").select("*").eq("user_id", userId).order("event_date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as HajatEvent[];
}

export async function getEvent(id: string): Promise<HajatEvent | null> {
  const { data, error } = await supabase.from("hajat_events").select("*").eq("id", id).single();
  if (error) return null;
  return data as HajatEvent;
}

export async function getEventBySlug(slug: string): Promise<HajatEvent | null> {
  const { data, error } = await supabase.from("hajat_events").select("*").eq("slug", slug).single();
  if (error) return null;
  return data as HajatEvent;
}

export async function updateEventStatus(id: string, status: EventStatus): Promise<void> {
  const { error } = await supabase.from("hajat_events").update({ status }).eq("id", id);
  if (error) throw error;
}

// ==================== GUESTS ====================

function generateGuestCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function addGuest(eventId: string, guest: Pick<EventGuest, "name" | "phone" | "contact_id" | "consumer_id">): Promise<EventGuest> {
  const { data, error } = await supabase
    .from("event_guests")
    .insert({ event_id: eventId, guest_code: generateGuestCode(), invitation_sent: false, invitation_opened: false, rsvp_status: "pending" as RsvpStatus, rsvp_count: 1, checked_in: false, ...guest })
    .select().single();
  if (error) throw error;
  return data as EventGuest;
}

export async function addGuestsBatch(eventId: string, guests: Pick<EventGuest, "name" | "phone">[]): Promise<EventGuest[]> {
  const rows = guests.map((g) => ({
    event_id: eventId, guest_code: generateGuestCode(), contact_id: null, consumer_id: null,
    invitation_sent: false, invitation_opened: false, rsvp_status: "pending" as RsvpStatus,
    rsvp_count: 1, checked_in: false, ...g,
  }));
  const { data, error } = await supabase.from("event_guests").insert(rows).select();
  if (error) throw error;
  return (data ?? []) as EventGuest[];
}

export async function getGuests(eventId: string): Promise<EventGuest[]> {
  const { data, error } = await supabase.from("event_guests").select("*").eq("event_id", eventId).order("name");
  if (error) throw error;
  return (data ?? []) as EventGuest[];
}

export async function getGuestByCode(eventSlug: string, guestCode: string): Promise<{ event: HajatEvent; guest: EventGuest } | null> {
  const event = await getEventBySlug(eventSlug);
  if (!event) return null;
  const { data, error } = await supabase.from("event_guests").select("*").eq("event_id", event.id).eq("guest_code", guestCode).single();
  if (error || !data) return null;
  return { event, guest: data as EventGuest };
}

export async function updateRsvp(guestId: string, status: RsvpStatus, count: number): Promise<void> {
  const { error } = await supabase.from("event_guests").update({ rsvp_status: status, rsvp_count: count }).eq("id", guestId);
  if (error) throw error;
}

export async function markInvitationSent(guestId: string): Promise<void> {
  await supabase.from("event_guests").update({ invitation_sent: true }).eq("id", guestId);
}

export async function markCheckedIn(guestId: string): Promise<void> {
  await supabase.from("event_guests").update({ checked_in: true }).eq("id", guestId);
}

export async function getRsvpSummary(eventId: string) {
  const guests = await getGuests(eventId);
  const attending = guests.filter((g) => g.rsvp_status === "attending");
  const notAttending = guests.filter((g) => g.rsvp_status === "not_attending");
  const pending = guests.filter((g) => g.rsvp_status === "pending");
  const totalPax = attending.reduce((s, g) => s + g.rsvp_count, 0);
  const checkedIn = guests.filter((g) => g.checked_in).length;
  return { total: guests.length, attending: attending.length, notAttending: notAttending.length, pending: pending.length, totalPax, checkedIn };
}

// ==================== GIFTS / AMPLOP ====================

export async function addGift(userId: string, gift: Pick<GiftRecord, "event_id" | "contact_id" | "person_name" | "direction" | "amount" | "event_type" | "event_description" | "event_date">): Promise<GiftRecord> {
  const { data, error } = await supabase.from("gift_records").insert({ user_id: userId, ...gift }).select().single();
  if (error) throw error;
  return data as GiftRecord;
}

export async function getGifts(userId: string, direction?: GiftDirection): Promise<GiftRecord[]> {
  let query = supabase.from("gift_records").select("*").eq("user_id", userId);
  if (direction) query = query.eq("direction", direction);
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as GiftRecord[];
}

export async function getGiftsByEvent(eventId: string): Promise<GiftRecord[]> {
  const { data, error } = await supabase.from("gift_records").select("*").eq("event_id", eventId).order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as GiftRecord[];
}

export async function getGiftSummary(userId: string) {
  const all = await getGifts(userId);
  const given = all.filter((g) => g.direction === "given");
  const received = all.filter((g) => g.direction === "received");
  const totalGiven = given.reduce((s, g) => s + (g.amount ?? 0), 0);
  const totalReceived = received.reduce((s, g) => s + (g.amount ?? 0), 0);
  return { totalGiven, totalReceived, balance: totalReceived - totalGiven, givenCount: given.length, receivedCount: received.length };
}

// ==================== AMPLOP SUGGESTION ====================

const AMPLOP_SUGGESTIONS: AmlopSuggestion[] = [
  { eventType: "nikah", relationship: "Keluarga dekat", minAmount: 500000, maxAmount: 2000000, suggested: 1000000 },
  { eventType: "nikah", relationship: "Teman", minAmount: 200000, maxAmount: 500000, suggested: 300000 },
  { eventType: "nikah", relationship: "Rekan kerja", minAmount: 200000, maxAmount: 500000, suggested: 300000 },
  { eventType: "nikah", relationship: "Tetangga", minAmount: 100000, maxAmount: 300000, suggested: 200000 },
  { eventType: "khitan", relationship: "Keluarga dekat", minAmount: 200000, maxAmount: 1000000, suggested: 500000 },
  { eventType: "khitan", relationship: "Teman", minAmount: 100000, maxAmount: 300000, suggested: 200000 },
  { eventType: "ultah", relationship: "Teman", minAmount: 50000, maxAmount: 200000, suggested: 100000 },
  { eventType: "syukuran", relationship: "Umum", minAmount: 50000, maxAmount: 300000, suggested: 150000 },
];

export function getAmlopSuggestion(eventType: EventType, relationship: string): AmlopSuggestion | null {
  return AMPLOP_SUGGESTIONS.find((s) => s.eventType === eventType && s.relationship === relationship) ?? null;
}

export function getAmlopSuggestionsForEvent(eventType: EventType): AmlopSuggestion[] {
  return AMPLOP_SUGGESTIONS.filter((s) => s.eventType === eventType);
}

// ==================== AI INVITATION TEXT ====================

export async function generateInvitationText(params: {
  eventType: EventType;
  hostName: string;
  eventDate: string;
  eventTime: string;
  locationName: string;
  customNote?: string;
}): Promise<string> {
  const response = await fetch(
    `${GEMINI_API_URL}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Buatkan teks undangan ${params.eventType} dalam Bahasa Indonesia yang sopan dan hangat.
Data:
- Tuan rumah: ${params.hostName}
- Tanggal: ${params.eventDate}
- Waktu: ${params.eventTime}
- Tempat: ${params.locationName}
${params.customNote ? `- Catatan: ${params.customNote}` : ""}

Format: teks undangan singkat (max 200 kata), sopan, tidak kaku, cocok untuk dikirim via WhatsApp.
Tidak perlu markdown. Langsung teks undangan.`,
          }],
        }],
      }),
    }
  );
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Gagal generate undangan.";
}
