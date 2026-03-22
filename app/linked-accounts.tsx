import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Badge } from "@components/ui/Badge";
import { useAuthStore } from "@stores/auth.store";
import { useUIStore } from "@stores/ui.store";
import {
  getLinkedAuthMethods,
  linkPhone,
  linkEmail,
  linkGoogle,
  syncLinkedMethods,
} from "@services/auth.service";
import { formatPhoneE164, formatPhoneDisplay } from "@utils/format";
import type { AuthMethod } from "@app-types/shared.types";

const METHOD_LABELS: Record<AuthMethod, string> = {
  phone: "Nomor HP (WhatsApp/SMS)",
  email: "Email",
  google: "Google",
};

const METHOD_DESCRIPTIONS: Record<AuthMethod, string> = {
  phone: "Login via kode OTP ke WhatsApp/SMS",
  email: "Login via kode OTP ke email",
  google: "Login langsung via akun Google",
};

export default function LinkedAccountsScreen() {
  const session = useAuthStore((s) => s.session);
  const profile = useAuthStore((s) => s.profile);
  const showToast = useUIStore((s) => s.showToast);

  const [linkedMethods, setLinkedMethods] = useState<AuthMethod[]>([]);
  const [linkingMethod, setLinkingMethod] = useState<AuthMethod | null>(null);

  // Link phone state
  const [phoneInput, setPhoneInput] = useState("");
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneLinking, setPhoneLinking] = useState(false);

  // Link email state
  const [emailInput, setEmailInput] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailLinking, setEmailLinking] = useState(false);

  const [error, setError] = useState("");

  const loadMethods = useCallback(async () => {
    if (!session?.user.id) return;
    const methods = await getLinkedAuthMethods(session.user.id);
    setLinkedMethods(methods);
  }, [session?.user.id]);

  useEffect(() => {
    loadMethods();
  }, [loadMethods]);

  async function handleLinkPhone() {
    if (phoneInput.length < 10) {
      setError("Nomor HP minimal 10 digit ya");
      return;
    }

    setPhoneLinking(true);
    setError("");
    const formatted = formatPhoneE164(phoneInput);
    const { error: linkError } = await linkPhone(formatted);
    setPhoneLinking(false);

    if (linkError) {
      setError(linkError.message);
      return;
    }

    showToast("Nomor HP berhasil dihubungkan!", "success");
    setShowPhoneForm(false);
    setPhoneInput("");

    if (session?.user.id) {
      const methods = await syncLinkedMethods(session.user.id);
      setLinkedMethods(methods);
    }
  }

  async function handleLinkEmail() {
    const trimmed = emailInput.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Masukkan alamat email yang valid ya");
      return;
    }

    setEmailLinking(true);
    setError("");
    const { error: linkError } = await linkEmail(trimmed);
    setEmailLinking(false);

    if (linkError) {
      setError(linkError.message);
      return;
    }

    showToast("Email berhasil dihubungkan! Cek inbox untuk konfirmasi.", "success");
    setShowEmailForm(false);
    setEmailInput("");

    if (session?.user.id) {
      const methods = await syncLinkedMethods(session.user.id);
      setLinkedMethods(methods);
    }
  }

  async function handleLinkGoogle() {
    setLinkingMethod("google");
    const { error: linkError } = await linkGoogle();
    setLinkingMethod(null);

    if (linkError) {
      showToast("Gagal menghubungkan Google. Coba lagi ya.", "error");
      return;
    }

    showToast("Akun Google berhasil dihubungkan!", "success");
    if (session?.user.id) {
      const methods = await syncLinkedMethods(session.user.id);
      setLinkedMethods(methods);
    }
  }

  const isLinked = (method: AuthMethod) => linkedMethods.includes(method);
  const allMethods: AuthMethod[] = ["phone", "email", "google"];

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-border-color bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-3 py-1">
          <Text className="text-navy text-base font-bold">{"<"} Kembali</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-dark-text">Metode Login</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-3">
        {/* Info */}
        <Card>
          <Text className="text-sm text-dark-text">
            Hubungkan beberapa metode login supaya kamu tetap bisa masuk kalau salah satu metode bermasalah.
          </Text>
        </Card>

        {/* Methods */}
        {allMethods.map((method) => {
          const linked = isLinked(method);
          return (
            <Card key={method}>
              <View className="flex-row items-center justify-between">
                <View className="flex-1 mr-3">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-base font-bold text-dark-text">
                      {METHOD_LABELS[method]}
                    </Text>
                    {linked && (
                      <Badge label="Terhubung" variant="success" />
                    )}
                  </View>
                  <Text className="text-xs text-grey-text">
                    {METHOD_DESCRIPTIONS[method]}
                  </Text>
                  {linked && method === "phone" && profile?.phone && (
                    <Text className="text-xs text-grey-text mt-1">
                      {formatPhoneDisplay(profile.phone)}
                    </Text>
                  )}
                  {linked && method === "email" && profile?.email && (
                    <Text className="text-xs text-grey-text mt-1">
                      {profile.email}
                    </Text>
                  )}
                </View>
                {!linked && (
                  <TouchableOpacity
                    className="bg-navy/10 rounded-lg px-3 py-2"
                    onPress={() => {
                      setError("");
                      if (method === "phone") {
                        setShowPhoneForm(true);
                        setShowEmailForm(false);
                      } else if (method === "email") {
                        setShowEmailForm(true);
                        setShowPhoneForm(false);
                      } else {
                        handleLinkGoogle();
                      }
                    }}
                    disabled={linkingMethod === method}
                  >
                    <Text className="text-navy text-xs font-bold">
                      {linkingMethod === method ? "..." : "Hubungkan"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Inline link phone form */}
              {method === "phone" && showPhoneForm && !linked && (
                <View className="mt-4 pt-4 border-t border-border-color">
                  <Input
                    placeholder="contoh: 08123456789"
                    value={phoneInput}
                    onChangeText={(text) => {
                      setPhoneInput(text.replace(/\D/g, ""));
                      setError("");
                    }}
                    keyboardType="phone-pad"
                    label="Nomor HP baru"
                    error={error && showPhoneForm ? error : undefined}
                  />
                  <View className="flex-row mt-3">
                    <View className="flex-1 mr-2">
                      <Button
                        title="Batal"
                        variant="secondary"
                        onPress={() => {
                          setShowPhoneForm(false);
                          setPhoneInput("");
                          setError("");
                        }}
                      />
                    </View>
                    <View className="flex-1 ml-2">
                      <Button
                        title="Hubungkan"
                        onPress={handleLinkPhone}
                        loading={phoneLinking}
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* Inline link email form */}
              {method === "email" && showEmailForm && !linked && (
                <View className="mt-4 pt-4 border-t border-border-color">
                  <Input
                    placeholder="contoh: nama@email.com"
                    value={emailInput}
                    onChangeText={(text) => {
                      setEmailInput(text);
                      setError("");
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    label="Alamat email"
                    error={error && showEmailForm ? error : undefined}
                  />
                  <View className="flex-row mt-3">
                    <View className="flex-1 mr-2">
                      <Button
                        title="Batal"
                        variant="secondary"
                        onPress={() => {
                          setShowEmailForm(false);
                          setEmailInput("");
                          setError("");
                        }}
                      />
                    </View>
                    <View className="flex-1 ml-2">
                      <Button
                        title="Hubungkan"
                        onPress={handleLinkEmail}
                        loading={emailLinking}
                      />
                    </View>
                  </View>
                </View>
              )}
            </Card>
          );
        })}

        {/* Summary */}
        <Card>
          <Text className="text-xs text-grey-text mb-2">RINGKASAN</Text>
          <Text className="text-sm text-dark-text">
            {linkedMethods.length} dari {allMethods.length} metode terhubung
          </Text>
          {linkedMethods.length < allMethods.length && (
            <Text className="text-xs text-grey-text mt-1">
              Hubungkan semua metode supaya akun kamu lebih aman dan fleksibel.
            </Text>
          )}
          {linkedMethods.length === allMethods.length && (
            <Text className="text-xs text-sewa mt-1">
              Semua metode login sudah terhubung!
            </Text>
          )}
        </Card>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
