import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
import { EmptyState } from "@components/shared/EmptyState";
import { getEvents } from "@services/hajat.service";
import { useAuthStore } from "@stores/auth.store";
import { formatDate } from "@utils/format";
import type { HajatEvent, EventType, EventStatus } from "@app-types/hajat.types";

const TYPE_LABELS: Record<EventType, string> = { nikah: "Nikahan", khitan: "Khitanan", aqiqah: "Aqiqah", ultah: "Ulang Tahun", syukuran: "Syukuran", duka: "Duka Cita", custom: "Lainnya" };
const STATUS_MAP: Record<EventStatus, { label: string; variant: "info" | "success" | "neutral" }> = { draft: { label: "Draft", variant: "info" }, published: { label: "Terbit", variant: "success" }, completed: { label: "Selesai", variant: "neutral" } };

export default function HajatScreen() {
  const profile = useAuthStore((s) => s.profile);
  const [events, setEvents] = useState<HajatEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (profile?.id) loadData(); }, [profile?.id]);
  async function loadData() { try { setEvents(await getEvents(profile!.id)); } catch {} finally { setLoading(false); } }

  if (!loading && events.length === 0) {
    return <SafeAreaView className="flex-1 bg-light-bg" edges={["top"]}><EmptyState illustration="🎉" title="Belum ada acara" description="Bikin undangan digital atau mulai catat amplop" actionLabel="+ Buat Acara" onAction={() => router.push("/(provider)/(tabs)/hajat/create-event")} /></SafeAreaView>;
  }

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-xl font-bold text-dark-text">Hajat</Text>
        <TouchableOpacity onPress={() => router.push("/(provider)/(tabs)/hajat/create-event")} className="bg-hajat rounded-lg px-4 py-2"><Text className="text-white text-sm font-bold">+ Buat</Text></TouchableOpacity>
      </View>
      <ScrollView className="flex-1 px-4">
        {events.map((e) => {
          const s = STATUS_MAP[e.status];
          return (
            <TouchableOpacity key={e.id} onPress={() => router.push({ pathname: "/(provider)/(tabs)/hajat/event-detail", params: { eventId: e.id, eventTitle: e.title } })} activeOpacity={0.7}>
              <Card>
                <View className="flex-row items-center">
                  <View className="w-12 h-12 rounded-full bg-hajat/10 items-center justify-center mr-3"><Text className="text-xl">🎉</Text></View>
                  <View className="flex-1">
                    <Text className="text-base font-bold text-dark-text">{e.title}</Text>
                    <Text className="text-xs text-grey-text">{TYPE_LABELS[e.type]} • {formatDate(e.event_date)}</Text>
                  </View>
                  <Badge label={s.label} variant={s.variant} />
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
