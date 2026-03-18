import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Modal } from "@components/ui/Modal";
import { CurrencyInput } from "@components/shared/CurrencyInput";
import { EmptyState } from "@components/shared/EmptyState";
import { createRentalItem, getRentalItems, createRentalTransaction, getRentalTransactions, returnRental } from "@services/rental.service";
import { useAuthStore } from "@stores/auth.store";
import { useUIStore } from "@stores/ui.store";
import { formatRupiah, formatDate } from "@utils/format";
import type { RentalItem, RentalTransaction, RentalStatus } from "@app-types/sewa.types";

const STATUS_MAP: Record<RentalStatus, { label: string; variant: "info" | "success" | "error" }> = {
  active: { label: "Dipinjam", variant: "info" }, returned: { label: "Dikembalikan", variant: "success" }, overdue: { label: "Terlambat", variant: "error" },
};

type Tab = "items" | "active" | "history";

export default function RentalScreen() {
  const profile = useAuthStore((s) => s.profile);
  const showToast = useUIStore((s) => s.showToast);
  const [tab, setTab] = useState<Tab>("items");
  const [items, setItems] = useState<RentalItem[]>([]);
  const [activeTx, setActiveTx] = useState<RentalTransaction[]>([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showBorrow, setShowBorrow] = useState<RentalItem | null>(null);
  const [iName, setIName] = useState(""); const [iRate, setIRate] = useState(0); const [iStock, setIStock] = useState(1);
  const [bName, setBName] = useState(""); const [bPhone, setBPhone] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => { if (profile?.id) loadData(); }, [profile?.id, tab]);

  async function loadData() {
    if (!profile?.id) return;
    try {
      if (tab === "items") setItems(await getRentalItems(profile.id));
      if (tab === "active") setActiveTx(await getRentalTransactions(profile.id, true));
      if (tab === "history") setActiveTx(await getRentalTransactions(profile.id, false));
    } catch {}
  }

  async function handleAddItem() {
    if (!iName.trim() || iRate <= 0 || !profile?.id) return;
    setActionLoading(true);
    try {
      await createRentalItem(profile.id, { name: iName.trim(), description: null, photo_url: null, daily_rate: iRate, deposit_amount: 0, total_stock: iStock });
      showToast("Barang ditambahkan!", "success"); setIName(""); setIRate(0); setIStock(1); setShowAddItem(false); loadData();
    } catch { showToast("Gagal", "error"); } finally { setActionLoading(false); }
  }

  async function handleBorrow() {
    if (!bName.trim() || !showBorrow || !profile?.id) return;
    setActionLoading(true);
    try {
      await createRentalTransaction(showBorrow.id, profile.id, { borrower_name: bName.trim(), borrower_phone: bPhone.trim() || null, consumer_id: null, quantity: 1, daily_rate: showBorrow.daily_rate, deposit_collected: showBorrow.deposit_amount, start_date: new Date().toISOString(), expected_return: null, notes: null });
      showToast("Pinjaman dicatat!", "success"); setBName(""); setBPhone(""); setShowBorrow(null); loadData();
    } catch { showToast("Gagal", "error"); } finally { setActionLoading(false); }
  }

  async function handleReturn(tx: RentalTransaction) {
    Alert.alert("Tandai Dikembalikan?", `${tx.borrower_name} mengembalikan barang.`, [
      { text: "Batal", style: "cancel" },
      { text: "Ya", onPress: async () => {
        try { await returnRental(tx.id, null); showToast("Barang dikembalikan!", "success"); loadData(); }
        catch { showToast("Gagal", "error"); }
      }},
    ]);
  }

  const tabs: { key: Tab; label: string }[] = [{ key: "items", label: "Barang" }, { key: "active", label: "Aktif" }, { key: "history", label: "Riwayat" }];

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={["top"]}>
      <View className="flex-row items-center px-4 py-3 border-b border-border-color bg-white">
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}><Text className="text-lg text-navy">←</Text></TouchableOpacity>
        <Text className="text-lg font-bold text-dark-text ml-3">Rental</Text>
      </View>
      <View className="flex-row bg-white border-b border-border-color">
        {tabs.map((t) => (<TouchableOpacity key={t.key} onPress={() => setTab(t.key)} className={`flex-1 py-3 items-center ${tab === t.key ? "border-b-2 border-sewa" : ""}`}><Text className={`text-xs font-bold ${tab === t.key ? "text-sewa" : "text-grey-text"}`}>{t.label}</Text></TouchableOpacity>))}
      </View>
      <ScrollView className="flex-1 px-4 pt-3">
        {tab === "items" && (<>
          <Button title="+ Tambah Barang" variant="secondary" onPress={() => setShowAddItem(true)} />
          <View className="mt-3">{items.map((item) => (
            <Card key={item.id}><View className="flex-row items-center">
              <View className="flex-1"><Text className="text-base font-bold text-dark-text">{item.name}</Text><Text className="text-xs text-grey-text">{formatRupiah(item.daily_rate)}/hari • Stok: {item.available_stock}/{item.total_stock}</Text></View>
              {item.available_stock > 0 && <TouchableOpacity onPress={() => setShowBorrow(item)} className="bg-sewa rounded-lg px-3 py-1.5"><Text className="text-white text-xs font-bold">Pinjamkan</Text></TouchableOpacity>}
            </View></Card>
          ))}{items.length === 0 && <EmptyState illustration="📦" title="Belum ada barang rental" />}</View>
        </>)}
        {(tab === "active" || tab === "history") && activeTx.map((tx) => {
          const s = STATUS_MAP[tx.status]; const txData = tx as RentalTransaction & { rental_items?: { name: string } };
          return (
            <Card key={tx.id}><View className="flex-row items-center justify-between mb-1"><Text className="text-xs text-grey-text font-mono">{tx.rental_code}</Text><Badge label={s.label} variant={s.variant} /></View>
              <Text className="text-base font-bold text-dark-text">{tx.borrower_name}</Text>
              <Text className="text-xs text-grey-text">{txData.rental_items?.name} • {formatDate(tx.start_date)}</Text>
              {tx.total_cost != null && <Text className="text-sm font-bold text-sewa mt-1">{formatRupiah(tx.total_cost)}</Text>}
              {tx.status === "active" && <TouchableOpacity onPress={() => handleReturn(tx)} className="bg-green-50 rounded-lg px-3 py-1.5 mt-2 self-start"><Text className="text-xs font-bold text-green-600">Dikembalikan</Text></TouchableOpacity>}
            </Card>
          );
        })}
      </ScrollView>

      <Modal visible={showAddItem} onClose={() => setShowAddItem(false)} title="Tambah Barang Rental">
        <Input label="Nama Barang" placeholder="contoh: Tenda Camping" value={iName} onChangeText={setIName} />
        <View className="mt-3"><CurrencyInput label="Harga Sewa/Hari" value={iRate} onChangeValue={setIRate} /></View>
        <View className="mt-3"><Input label="Jumlah Stok" placeholder="1" value={String(iStock)} onChangeText={(t) => setIStock(parseInt(t) || 1)} keyboardType="numeric" /></View>
        <View className="mt-4"><Button title="Tambah" onPress={handleAddItem} loading={actionLoading} /></View>
      </Modal>

      <Modal visible={!!showBorrow} onClose={() => setShowBorrow(null)} title="Pinjamkan Barang">
        <Input label="Nama Peminjam" placeholder="contoh: Pak Andi" value={bName} onChangeText={setBName} />
        <View className="mt-3"><Input label="No HP (opsional)" placeholder="08123456789" value={bPhone} onChangeText={setBPhone} keyboardType="phone-pad" /></View>
        <View className="mt-4"><Button title="Catat Pinjaman" onPress={handleBorrow} loading={actionLoading} /></View>
      </Modal>
    </SafeAreaView>
  );
}
