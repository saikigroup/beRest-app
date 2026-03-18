import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
import { useAuthStore } from "@stores/auth.store";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "@services/notification.service";
import { formatRelativeTime } from "@utils/format";
import { MODULE_LABELS } from "@utils/colors";
import type { Notification } from "@app-types/consumer.types";

const TYPE_ICONS: Record<string, string> = {
  order_update: "📦",
  payment_due: "💰",
  announcement: "📢",
  rsvp_reminder: "💌",
  schedule_reminder: "📅",
};

export default function NotificationsScreen() {
  const session = useAuthStore((s) => s.session);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotifications = useCallback(async () => {
    if (!session?.user.id) return;
    try {
      const data = await getNotifications(session.user.id);
      setNotifications(data);
    } catch {
      // silent
    }
  }, [session?.user.id]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  async function onRefresh() {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  }

  async function handleMarkRead(id: string) {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch {
      // silent
    }
  }

  async function handleMarkAllRead() {
    if (!session?.user.id) return;
    try {
      await markAllAsRead(session.user.id);
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch {
      // silent
    }
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // Group by date
  const grouped = notifications.reduce<Record<string, Notification[]>>(
    (acc, n) => {
      const dateKey = new Date(n.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      });
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(n);
      return acc;
    },
    {}
  );

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-border-color bg-white">
        <View className="flex-row items-center">
          <Text className="text-lg font-bold text-dark-text">Notifikasi</Text>
          {unreadCount > 0 && (
            <View className="ml-2">
              <Badge label={String(unreadCount)} variant="error" />
            </View>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={handleMarkAllRead}>
            <Text className="text-sm text-orange font-bold">
              Tandai semua dibaca
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        className="flex-1 px-4 pt-3"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {notifications.length === 0 ? (
          <View className="items-center py-16">
            <Text className="text-4xl mb-3">🔔</Text>
            <Text className="text-base font-bold text-grey-text">
              Belum ada notifikasi
            </Text>
            <Text className="text-sm text-grey-text mt-1 text-center">
              Notifikasi dari pengelola akan muncul di sini
            </Text>
          </View>
        ) : (
          Object.entries(grouped).map(([date, items]) => (
            <View key={date} className="mb-4">
              <Text className="text-xs font-bold text-grey-text mb-2">
                {date.toUpperCase()}
              </Text>
              {items.map((n) => (
                <TouchableOpacity
                  key={n.id}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!n.is_read) handleMarkRead(n.id);
                  }}
                >
                  <Card
                    className={n.is_read ? "opacity-60" : "border-l-4 border-l-orange"}
                  >
                    <View className="flex-row">
                      <Text className="text-xl mr-3">
                        {TYPE_ICONS[n.type] ?? "🔔"}
                      </Text>
                      <View className="flex-1">
                        <View className="flex-row items-center mb-1">
                          <Text className="text-sm font-bold text-dark-text flex-1">
                            {n.title}
                          </Text>
                          {!n.is_read && (
                            <View className="w-2 h-2 rounded-full bg-orange ml-2" />
                          )}
                        </View>
                        {n.body && (
                          <Text
                            className="text-sm text-grey-text mb-1"
                            numberOfLines={2}
                          >
                            {n.body}
                          </Text>
                        )}
                        <View className="flex-row items-center">
                          <Text className="text-xs text-grey-text">
                            {formatRelativeTime(n.created_at)}
                          </Text>
                          <Text className="text-xs text-grey-text mx-1">
                            {" "}·{" "}
                          </Text>
                          <Text className="text-xs text-grey-text">
                            {MODULE_LABELS[n.module]}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
