import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { Card } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
import { ModuleIcon } from "@components/ui/ModuleIcon";
import { useAuthStore } from "@stores/auth.store";
import { useModulesStore } from "@stores/modules.store";
import {
  getLapakAnalytics,
  getSewaAnalytics,
  getWargaAnalytics,
  getHajatAnalytics,
} from "@services/analytics.service";
import type { AnalyticsSummary, AnalyticsMetric } from "@services/analytics.service";
import { MODULE_COLORS } from "@utils/colors";
import { GRADIENTS, RADIUS, TYPO, SPACING } from "@utils/theme";
import type { ModuleKey } from "@app-types/shared.types";

const FETCH_MAP: Record<ModuleKey, (userId: string) => Promise<AnalyticsSummary>> = {
  lapak: getLapakAnalytics,
  sewa: getSewaAnalytics,
  warga: getWargaAnalytics,
  hajat: getHajatAnalytics,
};

function BackIcon({ size = 20, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 19L8 12L15 5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChartIcon({ size = 48, color = "#94A3B8" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M18 20V10M12 20V4M6 20V14" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function TrendBadge({ metric }: { metric: AnalyticsMetric }) {
  if (!metric.trend || metric.trend === "flat") return null;
  const isUp = metric.trend === "up";
  return (
    <Badge
      label={`${isUp ? "↑" : "↓"} ${metric.trendPercent ?? 0}%`}
      variant={isUp ? "success" : "error"}
    />
  );
}

export default function AnalyticsScreen() {
  const insets = useSafeAreaInsets();
  const session = useAuthStore((s) => s.session);
  const activeModules = useModulesStore((s) => s.activeModules);
  const [summaries, setSummaries] = useState<AnalyticsSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user.id || activeModules.length === 0) {
      setLoading(false);
      return;
    }

    async function fetchAll() {
      setLoading(true);
      try {
        const results = await Promise.all(
          activeModules.map((mod) => FETCH_MAP[mod](session!.user.id))
        );
        setSummaries(results);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [session?.user.id, activeModules]);

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
          <Text style={{ ...TYPO.h3, color: "#FFFFFF" }}>Analitik</Text>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
        {loading ? (
          <View style={{ alignItems: "center", paddingVertical: SPACING.xxl * 1.5 }}>
            <ActivityIndicator size="large" color="#2C7695" />
            <Text style={{ ...TYPO.body, color: "#64748B", marginTop: SPACING.md }}>
              Memuat analitik...
            </Text>
          </View>
        ) : summaries.length === 0 ? (
          <View style={{ alignItems: "center", paddingVertical: SPACING.xxl * 1.5 }}>
            <ChartIcon size={48} color="#94A3B8" />
            <Text style={{ ...TYPO.bodyBold, color: "#64748B", marginTop: SPACING.md }}>
              Belum ada data
            </Text>
            <Text style={{ ...TYPO.caption, color: "#64748B", marginTop: SPACING.xs, textAlign: "center" }}>
              Aktifkan modul dan mulai catat transaksi
            </Text>
          </View>
        ) : (
          summaries.map((summary) => (
            <View key={summary.module} style={{ marginBottom: SPACING.lg }}>
              {/* Module header */}
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: SPACING.sm, gap: SPACING.sm }}>
                <View style={{
                  width: 36,
                  height: 36,
                  borderRadius: RADIUS.md,
                  backgroundColor: `${MODULE_COLORS[summary.module]}15`,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <ModuleIcon module={summary.module} size={20} />
                </View>
                <Text
                  style={{ ...TYPO.bodyBold, color: MODULE_COLORS[summary.module] }}
                >
                  {summary.label}
                </Text>
              </View>

              {summary.metrics.length === 0 ? (
                <Card variant="glass">
                  <Text style={{ ...TYPO.body, color: "#64748B", textAlign: "center" }}>
                    Belum ada data untuk modul ini
                  </Text>
                </Card>
              ) : (
                <Card variant="glass">
                  {summary.metrics.map((metric, idx) => (
                    <View
                      key={metric.key}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingBottom: idx < summary.metrics.length - 1 ? SPACING.md : 0,
                        marginBottom: idx < summary.metrics.length - 1 ? SPACING.md : 0,
                        borderBottomWidth: idx < summary.metrics.length - 1 ? 1 : 0,
                        borderBottomColor: "#E2E8F0",
                      }}
                    >
                      <Text style={{ ...TYPO.body, color: "#64748B", flex: 1 }}>
                        {metric.label}
                      </Text>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: SPACING.sm }}>
                        <Text style={{ ...TYPO.bodyBold, color: "#1E293B" }}>
                          {metric.formatted}
                        </Text>
                        <TrendBadge metric={metric} />
                      </View>
                    </View>
                  ))}
                </Card>
              )}
            </View>
          ))
        )}

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>
    </View>
  );
}
