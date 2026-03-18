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
import { getSchedules, createSchedule } from "@services/warga-jadwal.service";
import { getMembers } from "@services/warga.service";
import { useUIStore } from "@stores/ui.store";
import { formatDate } from "@utils/format";
import type { WargaSchedule, ScheduleType } from "@app-types/sewa.types";
import type { OrgMember } from "@app-types/warga.types";

const TYPE_LABELS: Record<ScheduleType, string> = { piket: "Piket", ronda: "Ronda", kebersihan: "Kebersihan", custom: "Lainnya" };

export default function JadwalScreen() {
  const { orgId } = useLocalSearchParams<{ orgId: string }>();
  const showToast = useUIStore((s) => s.showToast);
  const [schedules, setSchedules] = useState<WargaSchedule[]>([]);
  const [members, setMembers] = useState<OrgMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [selectedMember, setSelectedMember] = useState<OrgMember | null>(null);
  const [selectedType, setSelectedType] = useState<ScheduleType>("piket");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => { if (orgId) loadData(); }, [orgId]);

  async function loadData() {
    try {
      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const [sc, mem] = await Promise.all([getSchedules(orgId!, month), getMembers(orgId!)]);
      setSchedules(sc); setMembers(mem);
    } catch {} finally { setLoading(false); }
  }

  async function handleAdd() {
    if (!title.trim() || !date || !selectedMember) return;
    setActionLoading(true);
    try {
      await createSchedule(orgId!, { title: title.trim(), type: selectedType, date, member_id: selectedMember.id, member_name: selectedMember.name });
      showToast("Jadwal ditambahkan!", "success"); setTitle(""); setDate(""); setSelectedMember(null); setShowAdd(false); loadData();
    } catch { showToast("Gagal", "error"); } finally { setActionLoading(false); }
  }

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-border-color bg-white">
        <View className="flex-row items-center"><TouchableOpacity onPress={() => router.back()} hitSlop={12}><Text className="text-lg text-navy">←</Text></TouchableOpacity><Text className="text-lg font-bold text-dark-text ml-3">Jadwal & Giliran</Text></View>
        <TouchableOpacity onPress={() => setShowAdd(true)} className="bg-warga rounded-lg px-3 py-2"><Text className="text-white text-xs font-bold">+ Tambah</Text></TouchableOpacity>
      </View>
      <ScrollView className="flex-1 px-4 pt-3">
        {!loading && schedules.length === 0 ? <EmptyState illustration="📅" title="Belum ada jadwal" actionLabel="+ Buat Jadwal" onAction={() => setShowAdd(true)} /> : (
          schedules.map((sc) => (
            <Card key={sc.id}><View className="flex-row items-center">
              <View className="flex-1">
                <Text className="text-base font-bold text-dark-text">{formatDate(sc.date)} - {sc.title}</Text>
                <Text className="text-xs text-grey-text">{sc.is_swapped ? `${sc.swap_with_name} (tukar dari ${sc.member_name})` : sc.member_name}</Text>
              </View>
              <Badge label={TYPE_LABELS[sc.type]} variant={sc.is_swapped ? "warning" : "info"} />
            </View></Card>
          ))
        )}
      </ScrollView>

      <Modal visible={showAdd} onClose={() => setShowAdd(false)} title="Tambah Jadwal">
        <Input label="Kegiatan" placeholder="contoh: Ronda Malam" value={title} onChangeText={setTitle} />
        <View className="mt-3 flex-row flex-wrap">
          {(Object.keys(TYPE_LABELS) as ScheduleType[]).map((t) => (
            <TouchableOpacity key={t} onPress={() => setSelectedType(t)} className={`px-3 py-1.5 rounded-lg mr-1 mb-1 ${selectedType === t ? "bg-warga" : "bg-gray-100"}`}>
              <Text className={`text-xs font-bold ${selectedType === t ? "text-white" : "text-grey-text"}`}>{TYPE_LABELS[t]}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="mt-3"><Input label="Tanggal (YYYY-MM-DD)" placeholder="2026-04-01" value={date} onChangeText={setDate} /></View>
        <Text className="text-sm font-medium text-dark-text mt-3 mb-1">Petugas</Text>
        <View className="flex-row flex-wrap">
          {members.map((m) => (
            <TouchableOpacity key={m.id} onPress={() => setSelectedMember(m)} className={`px-3 py-1.5 rounded-lg mr-1 mb-1 ${selectedMember?.id === m.id ? "bg-warga" : "bg-gray-100"}`}>
              <Text className={`text-xs font-bold ${selectedMember?.id === m.id ? "text-white" : "text-grey-text"}`}>{m.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="mt-4"><Button title="Tambah" onPress={handleAdd} loading={actionLoading} /></View>
      </Modal>
    </SafeAreaView>
  );
}
