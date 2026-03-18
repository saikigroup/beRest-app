import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Modal } from "@components/ui/Modal";
import { CurrencyInput } from "@components/shared/CurrencyInput";
import { EmptyState } from "@components/shared/EmptyState";
import { getGifts, addGift, getGiftSummary } from "@services/hajat.service";
import { useAuthStore } from "@stores/auth.store";
import { useUIStore } from "@stores/ui.store";
import { formatRupiah, formatDate } from "@utils/format";
import type { GiftRecord, GiftDirection } from "@app-types/hajat.types";

type Tab = "invitations" | "amplop" | "calendar";

export default function ConsumerHajatScreen() {
  const profile = useAuthStore((s) => s.profile);
  const showToast = useUIStore((s) => s.showToast);
  const [tab, setTab] = useState<Tab>("invitations");
  const [gifts, setGifts] = useState<GiftRecord[]>([]);
  const [summary, setSummary] = useState({ totalGiven: 0, totalReceived: 0, balance: 0, givenCount: 0, receivedCount: 0 });
  const [showAddGift, setShowAddGift] = useState(false);
  const [giftName, setGiftName] = useState("");
  const [giftAmount, setGiftAmount] = useState(0);
  const [giftDir, setGiftDir] = useState<GiftDirection>("given");
  const [giftEventDesc, setGiftEventDesc] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => { if (profile?.id) loadData(); }, [profile?.id, tab]);

  async function loadData() {
    if (!profile?.id) return;
    try {
      const [g, s] = await Promise.all([getGifts(profile.id), getGiftSummary(profile.id)]);
      setGifts(g); setSummary(s);
    } catch {}
  }

  async function handleAddGift() {
    if (!giftName.trim() || giftAmount <= 0 || !profile?.id) return;
    setActionLoading(true);
    try {
      await addGift(profile.id, { event_id: null, contact_id: null, person_name: giftName.trim(), direction: giftDir, amount: giftAmount, event_type: null, event_description: giftEventDesc.trim() || null, event_date: new Date().toISOString().split("T")[0] });
      showToast("Amplop dicatat!", "success"); setGiftName(""); setGiftAmount(0); setGiftEventDesc(""); setShowAddGift(false); loadData();
    } catch { showToast("Gagal", "error"); } finally { setActionLoading(false); }
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "invitations", label: "Undangan" }, { key: "amplop", label: "Amplop" }, { key: "calendar", label: "Kalender" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={["top"]}>
      <View className="px-4 py-3"><Text className="text-xl font-bold text-dark-text">Hajat</Text></View>

      <View className="flex-row bg-white border-b border-border-color">
        {tabs.map((t) => (
          <TouchableOpacity key={t.key} onPress={() => setTab(t.key)} className={`flex-1 py-3 items-center ${tab === t.key ? "border-b-2 border-hajat" : ""}`}>
            <Text className={`text-xs font-bold ${tab === t.key ? "text-hajat" : "text-grey-text"}`}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 px-4 pt-3">
        {tab === "invitations" && (
          <EmptyState illustration="💌" title="Belum ada undangan masuk" description="Undangan dari penyelenggara acara akan muncul di sini" />
        )}

        {tab === "amplop" && (
          <>
            <Card>
              <View className="flex-row">
                <View className="flex-1"><Text className="text-xs text-grey-text">Diberikan</Text><Text className="text-lg font-bold text-red-500">{formatRupiah(summary.totalGiven)}</Text></View>
                <View className="flex-1"><Text className="text-xs text-grey-text">Diterima</Text><Text className="text-lg font-bold text-hajat">{formatRupiah(summary.totalReceived)}</Text></View>
              </View>
              <View className="mt-2 pt-2 border-t border-border-color"><Text className="text-xs text-grey-text">Selisih</Text><Text className="text-xl font-bold text-dark-text">{formatRupiah(summary.balance)}</Text></View>
            </Card>
            <Button title="+ Catat Amplop" variant="secondary" onPress={() => setShowAddGift(true)} />
            <View className="mt-3">
              {gifts.map((g) => (
                <Card key={g.id}>
                  <View className="flex-row items-center">
                    <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${g.direction === "given" ? "bg-red-100" : "bg-green-100"}`}>
                      <Text className="text-sm">{g.direction === "given" ? "↑" : "↓"}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-bold text-dark-text">{g.person_name}</Text>
                      {g.event_description && <Text className="text-xs text-grey-text">{g.event_description}</Text>}
                      {g.event_date && <Text className="text-xs text-grey-text">{formatDate(g.event_date)}</Text>}
                    </View>
                    <Text className={`text-base font-bold ${g.direction === "given" ? "text-red-500" : "text-hajat"}`}>
                      {g.direction === "given" ? "-" : "+"}{formatRupiah(g.amount ?? 0)}
                    </Text>
                  </View>
                </Card>
              ))}
              {gifts.length === 0 && <EmptyState illustration="💰" title="Belum ada catatan amplop" />}
            </View>
          </>
        )}

        {tab === "calendar" && (
          <EmptyState illustration="📅" title="Kalender Hajatan" description="Acara yang kamu diundang akan muncul di kalender" />
        )}
      </ScrollView>

      <Modal visible={showAddGift} onClose={() => setShowAddGift(false)} title="Catat Amplop">
        <View className="flex-row mb-3">
          {(["given", "received"] as GiftDirection[]).map((d) => (
            <TouchableOpacity key={d} onPress={() => setGiftDir(d)} className={`flex-1 py-2 rounded-lg mr-1 items-center ${giftDir === d ? "bg-hajat" : "bg-gray-100"}`}>
              <Text className={`text-xs font-bold ${giftDir === d ? "text-white" : "text-grey-text"}`}>{d === "given" ? "Kasih" : "Terima"}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Input label={giftDir === "given" ? "Untuk siapa" : "Dari siapa"} placeholder="contoh: Pak Andi" value={giftName} onChangeText={setGiftName} />
        <View className="mt-3"><CurrencyInput label="Jumlah" value={giftAmount} onChangeValue={setGiftAmount} /></View>
        <View className="mt-3"><Input label="Acara (opsional)" placeholder="contoh: Nikahan Budi" value={giftEventDesc} onChangeText={setGiftEventDesc} /></View>
        <View className="mt-4"><Button title="Simpan" onPress={handleAddGift} loading={actionLoading} /></View>
      </Modal>
    </SafeAreaView>
  );
}
