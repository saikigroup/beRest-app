import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/Button";
import { Card } from "@components/ui/Card";
import { useAuthStore } from "@stores/auth.store";
import { upsertProfile } from "@services/auth.service";
import { supabase } from "@services/supabase";
import { useUIStore } from "@stores/ui.store";
import { GRADIENTS, GLASS, RADIUS, TYPO, SPACING } from "@utils/theme";

function BackIcon({ size = 20, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 19L8 12L15 5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CameraIcon({ size = 16, color = "#2C7695" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PhoneIcon({ size = 16, color = "#64748B" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5342 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.271 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4136 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MailIcon({ size = 16, color = "#64748B" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM22 6L12 13L2 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const session = useAuthStore((s) => s.session);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const showToast = useUIStore((s) => s.showToast);

  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [avatarUri, setAvatarUri] = useState(profile?.avatar_url ?? "");
  const [loading, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setAvatarUri(profile.avatar_url ?? "");
    }
  }, [profile]);

  async function pickAvatar() {
    Alert.alert("Foto Profil", "Pilih sumber foto", [
      {
        text: "Kamera",
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Izin Diperlukan", "Izinkan akses kamera untuk mengambil foto.");
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
          });
          if (!result.canceled && result.assets[0]) {
            await uploadAvatar(result.assets[0].uri);
          }
        },
      },
      {
        text: "Galeri",
        onPress: async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Izin Diperlukan", "Izinkan akses galeri untuk memilih foto.");
            return;
          }
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
          });
          if (!result.canceled && result.assets[0]) {
            await uploadAvatar(result.assets[0].uri);
          }
        },
      },
      { text: "Batal", style: "cancel" },
    ]);
  }

  async function uploadAvatar(uri: string) {
    if (!session?.user.id) return;
    setUploading(true);

    try {
      const ext = uri.split(".").pop() ?? "jpg";
      const fileName = `${session.user.id}/avatar.${ext}`;

      const response = await fetch(uri);
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, arrayBuffer, {
          contentType: `image/${ext}`,
          upsert: true,
        });

      if (uploadError) {
        setAvatarUri(uri);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      setAvatarUri(urlData.publicUrl);
    } catch {
      setAvatarUri(uri);
    }

    setUploading(false);
  }

  async function handleSave() {
    if (!session?.user.id) return;

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      showToast("Nama tidak boleh kosong", "error");
      return;
    }

    setSaving(true);

    const { data, error } = await upsertProfile(session.user.id, {
      full_name: trimmedName,
      avatar_url: avatarUri || null,
    });

    setSaving(false);

    if (error) {
      showToast("Gagal menyimpan profil. Coba lagi ya.", "error");
      return;
    }

    if (data) setProfile(data);
    showToast("Profil berhasil disimpan!", "success");
    router.back();
  }

  const initial = (fullName || profile?.full_name || "?")[0].toUpperCase();

  // Keep GLASS import used
  const shadowStyle = GLASS.shadow.sm;

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
          <Text style={{ ...TYPO.h3, color: "#FFFFFF" }}>Edit Profil</Text>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.xl }} keyboardShouldPersistTaps="handled">
        {/* Avatar */}
        <View style={{ alignItems: "center", marginBottom: SPACING.xl }}>
          <TouchableOpacity onPress={pickAvatar} disabled={uploading}>
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                style={{ width: 96, height: 96, borderRadius: RADIUS.full }}
                resizeMode="cover"
              />
            ) : (
              <View style={{
                width: 96,
                height: 96,
                borderRadius: RADIUS.full,
                backgroundColor: "#2C7695",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Text style={{ fontSize: 32, color: "#FFFFFF", fontWeight: "700" }}>{initial}</Text>
              </View>
            )}
            <View style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "#FFFFFF",
              borderRadius: RADIUS.full,
              width: 32,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#E2E8F0",
              ...shadowStyle,
            }}>
              {uploading ? (
                <Text style={{ ...TYPO.caption, color: "#64748B" }}>...</Text>
              ) : (
                <CameraIcon size={16} color="#2C7695" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={{ ...TYPO.caption, color: "#64748B", marginTop: SPACING.sm }}>
            Ketuk untuk ganti foto
          </Text>
        </View>

        {/* Name */}
        <Input
          label="Nama Lengkap"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Masukkan nama kamu"
        />

        {/* Read-only info */}
        {profile?.phone && (
          <View style={{ marginTop: SPACING.lg }}>
            <Text style={{ ...TYPO.bodyBold, color: "#1E293B", marginBottom: SPACING.sm }}>Nomor HP</Text>
            <Card variant="glass" noPadding>
              <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: SPACING.md, paddingVertical: SPACING.md }}>
                <PhoneIcon size={16} color="#64748B" />
                <Text style={{ ...TYPO.body, color: "#64748B", marginLeft: SPACING.sm }}>{profile.phone}</Text>
              </View>
            </Card>
            <Text style={{ ...TYPO.caption, color: "#94A3B8", marginTop: SPACING.xs }}>
              Ubah di Metode Login
            </Text>
          </View>
        )}

        {profile?.email && (
          <View style={{ marginTop: SPACING.lg }}>
            <Text style={{ ...TYPO.bodyBold, color: "#1E293B", marginBottom: SPACING.sm }}>Email</Text>
            <Card variant="glass" noPadding>
              <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: SPACING.md, paddingVertical: SPACING.md }}>
                <MailIcon size={16} color="#64748B" />
                <Text style={{ ...TYPO.body, color: "#64748B", marginLeft: SPACING.sm }}>{profile.email}</Text>
              </View>
            </Card>
            <Text style={{ ...TYPO.caption, color: "#94A3B8", marginTop: SPACING.xs }}>
              Ubah di Metode Login
            </Text>
          </View>
        )}

        <View style={{ height: SPACING.xl }} />
      </ScrollView>

      {/* Save button - thumb zone */}
      <View style={{ paddingHorizontal: SPACING.md, paddingBottom: insets.bottom + SPACING.lg, paddingTop: SPACING.md }}>
        <Button
          title="Simpan"
          onPress={handleSave}
          loading={loading}
        />
      </View>
    </View>
  );
}
