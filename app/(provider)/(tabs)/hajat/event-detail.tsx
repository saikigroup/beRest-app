import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Modal } from "@components/ui/Modal";
import { EmptyState } from "@components/shared/EmptyState";
import { getGuests, addGuest, getRsvpSummary, markInvitationSent, markCheckedIn, updateEventStatus, getGiftsByEvent, addGift } from "@services/hajat.service";
import { shareToWhatsApp, generateInvitationMessage } from "@services/wa-share.service";
import { generateDeepLink } from "@services/deep-link.service";
import { useAuthStore } from "@stores/auth.store";
import { useUIStore } from "@stores/ui.store";
import { formatRupiah } from "@utils/format";
import { CurrencyInput } from "@components/shared/CurrencyInput";
import type { EventGuest, GiftRecord, RsvpStatus } from "@app-types/hajat.types";

const RSVP_MAP: Record<RsvpStatus, { label: string; variant: "success" | "error" | "warning" | "info" }> = {
  pending: { label: "Pending", variant: "warning" }, attending: { label: "Hadir", variant: "success" },
  not_attending: { label: "Tidak Hadir", variant: "error" }, maybe: { label: "Mungkin", variant: "info" },
};

type Tab = "guests" | "rsvp" | "checkin" | "amplop";

export default function EventDetailScreen() {
  const { eventId, eventTitle } = useLocalSearchParams<{ eventId: string; eventTitle: string }>();
  const profile = useAuthStore((s) => s.profile);
  const showToast = useUIStore((s) => s.showToast);
  const [tab, setTab] = useState<Tab>("guests");
  const [guests, setGuests] = useState<EventGuest[]>([]);
  const [gifts, setGifts] = useState<GiftRecord[]>([]);
  const [summary, setSummary] = useState({ total: 0, attending: 0, notAttending: 0, pending: 0, totalPax: 0, checkedIn: 0 });
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [showAddGift, setShowAddGift] = useState(false);
  const [gName, setGName] = useState("");
  const [gPhone, setGPhone] = useState("");
  const [giftName, setGiftName] = useState("");
  const [giftAmount, setGiftAmount] = useState(0);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => { if (eventId) loadAll(); }, [eventId, tab]);

  async function loadAll() {
    try {
      const [g, s] = await Promise.all([getGuests(eventId!), getRsvpSummary(eventId!)]);
      setGuests(g); setSummary(s);
      if (tab === "amplop") setGifts(await getGiftsByEvent(eventId!));
    } catch {}
  }

  async function handleAddGuest() {
    if (!gName.trim()) return;
    setActionLoading(true);
    try { await addGuest(eventId!, { name: gName.trim(), phone: gPhone.trim() || null, contact_id: null, consumer_id: null }); showToast("Tamu ditambahkan!", "success"); setGName(""); setGPhone(""); setShowAddGuest(false); loadAll(); }
    catch { showToast("Gagal", "error"); } finally { setActionLoading(false); }
  }

  async function handleSendInvitation(guest: EventGuest) {
    if (!guest.phone) { showToast("Tamu tidak punya nomor HP", "error"); return; }
    const url = generateDeepLink("hj", "event", guest.guest_code ?? "");
    const msg = generateInvitationMessage(eventTitle ?? "Acara", guest.name, url);
    await shareToWhatsApp(guest.phone, msg);
    await markInvitationSent(guest.id);
    loadAll();
  }

  async function handleCheckIn(guest: EventGuest) {
    try { await markCheckedIn(guest.id); showToast(`${guest.name} checked in!`, "success"); loadAll(); }
    catch { showToast("Gagal", "error"); }
  }

  async function handleAddGift() {
    if (!giftName.trim() || giftAmount <= 0 || !profile?.id) return;
    setActionLoading(true);
    try { await addGift(profile.id, { event_id: eventId!, contact_id: null, person_name: giftName.trim(), direction: "received", amount: giftAmount, event_type: null, event_description: eventTitle ?? null, event_date: null }); showToast("Amplop dicatat!", "success"); setGiftName(""); setGiftAmount(0); setShowAddGift(false); loadAll(); }
    catch { showToast("Gagal", "error"); } finally { setActionLoading(false); }
  }

  async function handlePublish() {
    try { await updateEventStatus(eventId!, "published"); showToast("Undangan dipublish!", "success"); }
    catch { showToast("Gagal", "error"); }
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "guests", label: "Tamu" }, { key: "rsvp", label: "RSVP" },
    { key: "checkin", label: "Check-in" }, { key: "amplop", label: "Amplop" },
  ];

  const totalAmplop = gifts.reduce((s, g) => s + (g.amount ?? 0), 0);

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-border-color bg-white">
        <View className="flex-row items-center"><TouchableOpacity onPress={() => router.back()} hitSlop={12}><Text className="text-lg text-navy">←</Text></TouchableOpacity><Text className="text-lg font-bold text-dark-text ml-3" numberOfLines={1}>{eventTitle}</Text></View>
        <TouchableOpacity onPress={handlePublish} className="bg-hajat rounded-lg px-3 py-1.5"><Text className="text-white text-xs font-bold">Publish</Text></TouchableOpacity>
      </View>

      {/* Summary */}
      <View className="flex-row px-4 pt-3">
        <Card className="flex-1 mr-1"><Text className="text-xs text-grey-text">Tamu</Text><Text className="text-xl font-bold text-dark-text">{summary.total}</Text></Card>
        <Card className="flex-1 mx-1"><Text className="text-xs text-grey-text">Hadir</Text><Text className="text-xl font-bold text-hajat">{summary.attending}</Text></Card>
        <Card className="flex-1 ml-1"><Text className="text-xs text-grey-text">Check-in</Text><Text className="text-xl font-bold text-dark-text">{summary.checkedIn}</Text></Card>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white border-b border-border-color mt-2">
        {tabs.map((t) => (
          <TouchableOpacity key={t.key} onPress={() => setTab(t.key)} className={`flex-1 py-3 items-center ${tab === t.key ? "border-b-2 border-hajat" : ""}`}>
            <Text className={`text-xs font-bold ${tab === t.key ? "text-hajat" : "text-grey-text"}`}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 px-4 pt-3">
        {tab === "guests" && (
          <>
            <Button title="+ Tambah Tamu" variant="secondary" onPress={() => setShowAddGuest(true)} />
            <View className="mt-3">{guests.map((g) => (
              <Card key={g.id}>
                <View className="flex-row items-center">
                  <View className="flex-1"><Text className="text-base font-bold text-dark-text">{g.name}</Text>{g.phone && <Text className="text-xs text-grey-text">{g.phone}</Text>}</View>
                  {!g.invitation_sent && g.phone ? (
                    <TouchableOpacity onPress={() => handleSendInvitation(g)} className="bg-[#25D366] rounded-lg px-3 py-1.5"><Text className="text-white text-xs font-bold">Kirim</Text></TouchableOpacity>
                  ) : g.invitation_sent ? <Badge label="Terkirim" variant="success" /> : <Badge label="No HP" variant="neutral" />}
                </View>
              </Card>
            ))}{guests.length === 0 && <EmptyState illustration="👥" title="Belum ada tamu" />}</View>
          </>
        )}

        {tab === "rsvp" && guests.map((g) => {
          const r = RSVP_MAP[g.rsvp_status];
          return (
            <Card key={g.id}><View className="flex-row items-center">
              <View className="flex-1"><Text className="text-base font-bold text-dark-text">{g.name}</Text><Text className="text-xs text-grey-text">{g.rsvp_count} orang</Text></View>
              <Badge label={r.label} variant={r.variant} />
            </View></Card>
          );
        })}

        {tab === "checkin" && guests.filter((g) => g.rsvp_status === "attending").map((g) => (
          <TouchableOpacity key={g.id} onPress={() => !g.checked_in && handleCheckIn(g)} activeOpacity={g.checked_in ? 1 : 0.7}>
            <Card><View className="flex-row items-center">
              <View className={`w-6 h-6 rounded border-2 items-center justify-center mr-3 ${g.checked_in ? "bg-hajat border-hajat" : "border-border-color"}`}>
                {g.checked_in && <Text className="text-white text-xs font-bold">✓</Text>}
              </View>
              <Text className="text-base font-bold text-dark-text flex-1">{g.name}</Text>
              <Text className="text-xs text-grey-text">{g.rsvp_count} pax</Text>
            </View></Card>
          </TouchableOpacity>
        ))}

        {tab === "amplop" && (
          <>
            <Card><Text className="text-xs text-grey-text">Total Amplop</Text><Text className="text-2xl font-bold text-hajat">{formatRupiah(totalAmplop)}</Text><Text className="text-xs text-grey-text">{gifts.length} amplop</Text></Card>
            <Button title="+ Catat Amplop" variant="secondary" onPress={() => setShowAddGift(true)} />
            <View className="mt-3">{gifts.map((g) => (
              <Card key={g.id}><View className="flex-row items-center"><View className="flex-1"><Text className="text-base font-bold text-dark-text">{g.person_name}</Text></View><Text className="text-base font-bold text-hajat">{formatRupiah(g.amount ?? 0)}</Text></View></Card>
            ))}</View>
          </>
        )}
      </ScrollView>

      <Modal visible={showAddGuest} onClose={() => setShowAddGuest(false)} title="Tambah Tamu">
        <Input label="Nama" placeholder="contoh: Pak Andi" value={gName} onChangeText={setGName} />
        <View className="mt-3"><Input label="No HP (untuk kirim undangan)" placeholder="08123456789" value={gPhone} onChangeText={setGPhone} keyboardType="phone-pad" /></View>
        <View className="mt-4"><Button title="Tambah" onPress={handleAddGuest} loading={actionLoading} /></View>
      </Modal>

      <Modal visible={showAddGift} onClose={() => setShowAddGift(false)} title="Catat Amplop">
        <Input label="Dari" placeholder="contoh: Pak Andi" value={giftName} onChangeText={setGiftName} />
        <View className="mt-3"><CurrencyInput label="Jumlah" value={giftAmount} onChangeValue={setGiftAmount} /></View>
        <View className="mt-4"><Button title="Simpan" onPress={handleAddGift} loading={actionLoading} /></View>
      </Modal>
    </SafeAreaView>
  );
}
