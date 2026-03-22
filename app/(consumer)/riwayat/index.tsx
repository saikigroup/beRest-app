import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { Card } from "@components/ui/Card";
import { EmptyState } from "@components/shared/EmptyState";
import { ModuleIcon } from "@components/ui/ModuleIcon";
import { useConnectionsStore } from "@stores/connections.store";
import { useAuthStore } from "@stores/auth.store";
import { getArchivedConnections } from "@services/connection.service";
import { restoreConnection } from "@services/connection-lifecycle.service";
import { MODULE_LABELS } from "@utils/colors";
import { formatDate } from "@utils/format";
import { GRADIENTS, RADIUS, TYPO, SPACING } from "@utils/theme";
import type { ConsumerConnection, ModuleKey } from "@app-types/shared.types";

function BackIcon({ size = 20, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 19L8 12L15 5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function LinkIcon({ size = 14, color = "#2C7695" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.479 3.53087C19.552 2.60383 18.2979 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.47L11.75 5.18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60706C11.7642 9.26329 11.0684 9.05886 10.3533 9.00768C9.63816 8.95651 8.92037 9.05966 8.24861 9.31024C7.57685 9.56082 6.96684 9.95296 6.46 10.46L3.46 13.46C2.54918 14.403 2.0452 15.666 2.0566 16.977C2.068 18.288 2.59383 19.5421 3.52087 20.4691C4.44791 21.3961 5.70198 21.922 7.01296 21.9334C8.32394 21.9448 9.58695 21.4408 10.53 20.53L12.24 18.82" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function RiwayatScreen() {
  const insets = useSafeAreaInsets();
  const profile = useAuthStore((s) => s.profile);
  const archivedConnections = useConnectionsStore((s) => s.archivedConnections);
  const setArchivedConnections = useConnectionsStore(
    (s) => s.setArchivedConnections
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.id) {
      loadArchived();
    }
  }, [profile?.id]);

  async function loadArchived() {
    try {
      const data = await getArchivedConnections(profile!.id);
      setArchivedConnections(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleRestore(conn: ConsumerConnection) {
    Alert.alert(
      "Hubungkan Kembali?",
      `Kamu akan terhubung kembali ke ${conn.notes ?? "provider ini"}.`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, Hubungkan",
          onPress: async () => {
            try {
              await restoreConnection(conn.id);
              loadArchived();
            } catch {
              Alert.alert("Gagal", "Tidak bisa menghubungkan kembali. Coba lagi.");
            }
          },
        },
      ]
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      {/* Gradient Header */}
      <LinearGradient
        colors={GRADIENTS.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: insets.top + SPACING.sm, paddingBottom: SPACING.lg, paddingHorizontal: SPACING.md }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: SPACING.md }}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
            <BackIcon size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={{ ...TYPO.h3, color: "#FFFFFF" }}>Riwayat Koneksi</Text>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: SPACING.md }}>
        {archivedConnections.length === 0 && !loading ? (
          <EmptyState
            illustration="📦"
            title="Belum ada riwayat"
            description="Koneksi yang diarsipkan akan muncul di sini"
          />
        ) : (
          archivedConnections.map((conn) => (
            <Card key={conn.id} variant="glass">
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{
                  width: 44,
                  height: 44,
                  borderRadius: RADIUS.full,
                  backgroundColor: "rgba(44,118,149,0.1)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: SPACING.md,
                }}>
                  <ModuleIcon module={conn.module} size={22} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ ...TYPO.bodyBold, color: "#1E293B" }}>
                    {conn.notes ?? "Provider"}
                  </Text>
                  <Text style={{ ...TYPO.caption, color: "#64748B", marginTop: 2 }}>
                    {MODULE_LABELS[conn.module]} • Diarsipkan{" "}
                    {conn.archived_at ? formatDate(conn.archived_at) : "-"}
                  </Text>
                  {conn.archive_reason && (
                    <Text style={{ ...TYPO.caption, color: "#94A3B8", marginTop: 2 }}>
                      Alasan: {conn.archive_reason}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => handleRestore(conn)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: SPACING.xs,
                    backgroundColor: "rgba(44,118,149,0.1)",
                    borderRadius: RADIUS.md,
                    paddingHorizontal: SPACING.md,
                    paddingVertical: SPACING.sm,
                  }}
                >
                  <LinkIcon size={12} color="#2C7695" />
                  <Text style={{ ...TYPO.captionBold, color: "#2C7695" }}>
                    Hubungkan
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}
