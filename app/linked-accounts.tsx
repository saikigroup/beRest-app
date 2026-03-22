import { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
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
  verifyPhoneLink,
  verifyEmailLink,
  syncLinkedMethods,
} from "@services/auth.service";
import { formatPhoneE164, formatPhoneDisplay } from "@utils/format";
import { GRADIENTS, GLASS, RADIUS, TYPO, SPACING } from "@utils/theme";
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

function BackIcon({ size = 20, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 19L8 12L15 5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ShieldIcon({ size = 20, color = "#2C7695" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CheckCircleIcon({ size = 16, color = "#00C49A" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85997" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M22 4L12 14.01L9 11.01" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

type LinkStep = "input" | "otp";

// Keep GLASS import used
const _glassBg = GLASS.card.background;

export default function LinkedAccountsScreen() {
  const insets = useSafeAreaInsets();
  const session = useAuthStore((s) => s.session);
  const profile = useAuthStore((s) => s.profile);
  const showToast = useUIStore((s) => s.showToast);

  const [linkedMethods, setLinkedMethods] = useState<AuthMethod[]>([]);
  const [linkingMethod, setLinkingMethod] = useState<AuthMethod | null>(null);

  // Link phone state
  const [phoneInput, setPhoneInput] = useState("");
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneLinking, setPhoneLinking] = useState(false);
  const [phoneStep, setPhoneStep] = useState<LinkStep>("input");
  const [phoneFormatted, setPhoneFormatted] = useState("");

  // Link email state
  const [emailInput, setEmailInput] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailLinking, setEmailLinking] = useState(false);
  const [emailStep, setEmailStep] = useState<LinkStep>("input");
  const [emailTrimmed, setEmailTrimmed] = useState("");

  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpInputs = useRef<(TextInput | null)[]>([]);

  const [error, setError] = useState("");

  const loadMethods = useCallback(async () => {
    if (!session?.user.id) return;
    const methods = await getLinkedAuthMethods(session.user.id);
    setLinkedMethods(methods);
  }, [session?.user.id]);

  useEffect(() => {
    loadMethods();
  }, [loadMethods]);

  function resetOtp() {
    setOtp(["", "", "", "", "", ""]);
    setOtpVerifying(false);
    setError("");
  }

  function resetPhoneForm() {
    setShowPhoneForm(false);
    setPhoneInput("");
    setPhoneStep("input");
    setPhoneFormatted("");
    resetOtp();
  }

  function resetEmailForm() {
    setShowEmailForm(false);
    setEmailInput("");
    setEmailStep("input");
    setEmailTrimmed("");
    resetOtp();
  }

  function startResendCooldown() {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  // OTP input handlers
  function handleOtpChange(text: string, index: number) {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError("");

    if (text && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }

    if (text && index === 5 && newOtp.every((d) => d)) {
      handleVerifyOtp(newOtp.join(""));
    }
  }

  function handleOtpKeyPress(key: string, index: number) {
    if (key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  }

  // Phone linking
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

    setPhoneFormatted(formatted);
    setPhoneStep("otp");
    resetOtp();
    startResendCooldown();
    showToast("Kode OTP dikirim ke nomor baru!", "success");
  }

  async function handleResendPhoneOtp() {
    if (resendCooldown > 0) return;
    const { error: linkError } = await linkPhone(phoneFormatted);
    if (linkError) {
      setError(linkError.message);
      return;
    }
    showToast("Kode OTP dikirim ulang!", "success");
    startResendCooldown();
  }

  // Email linking
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

    setEmailTrimmed(trimmed);
    setEmailStep("otp");
    resetOtp();
    startResendCooldown();
    showToast("Kode OTP dikirim ke email!", "success");
  }

  async function handleResendEmailOtp() {
    if (resendCooldown > 0) return;
    const { error: linkError } = await linkEmail(emailTrimmed);
    if (linkError) {
      setError(linkError.message);
      return;
    }
    showToast("Kode OTP dikirim ulang ke email!", "success");
    startResendCooldown();
  }

  // OTP verification
  async function handleVerifyOtp(code?: string) {
    const token = code ?? otp.join("");
    if (token.length < 6) {
      setError("Masukkan 6 digit kode OTP");
      return;
    }

    setOtpVerifying(true);
    setError("");

    const isPhone = showPhoneForm && phoneStep === "otp";
    const { error: verifyError } = isPhone
      ? await verifyPhoneLink(phoneFormatted, token)
      : await verifyEmailLink(emailTrimmed, token);

    setOtpVerifying(false);

    if (verifyError) {
      setError(verifyError.message);
      return;
    }

    const label = isPhone ? "Nomor HP" : "Email";
    showToast(`${label} berhasil dihubungkan!`, "success");

    if (isPhone) resetPhoneForm();
    else resetEmailForm();

    if (session?.user.id) {
      const methods = await syncLinkedMethods(session.user.id);
      setLinkedMethods(methods);
    }
  }

  // Google linking
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

  // OTP input UI
  function renderOtpInput(onResend: () => void, destination: string, channel: string) {
    return (
      <View style={{ marginTop: SPACING.lg, paddingTop: SPACING.lg, borderTopWidth: 1, borderTopColor: "#E2E8F0" }}>
        <Text style={{ ...TYPO.body, color: "#64748B", marginBottom: SPACING.md }}>
          Masukkan kode 6 digit yang dikirim via {channel} ke {destination}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: SPACING.md }}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => { otpInputs.current[i] = ref; }}
              style={{
                width: 44,
                height: 48,
                borderRadius: RADIUS.md,
                borderWidth: 1.5,
                borderColor: error ? "#EF4444" : digit ? "#2C7695" : "#E2E8F0",
                textAlign: "center",
                ...TYPO.h3,
                color: "#1E293B",
              }}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(text) => handleOtpChange(text, i)}
              onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, i)}
            />
          ))}
        </View>

        {error ? (
          <Text style={{ ...TYPO.caption, color: "#EF4444", marginBottom: SPACING.sm }}>{error}</Text>
        ) : null}

        <Text
          style={{
            ...TYPO.caption,
            marginBottom: SPACING.md,
            color: resendCooldown > 0 ? "#64748B" : "#2C7695",
            fontWeight: resendCooldown > 0 ? "400" : "700",
          }}
          onPress={onResend}
        >
          {resendCooldown > 0
            ? `Kirim ulang dalam ${resendCooldown} detik`
            : "Kirim ulang kode OTP"}
        </Text>

        <View style={{ flexDirection: "row", gap: SPACING.sm }}>
          <View style={{ flex: 1 }}>
            <Button
              title="Batal"
              variant="secondary"
              onPress={() => {
                if (showPhoneForm) resetPhoneForm();
                else resetEmailForm();
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Verifikasi"
              onPress={() => handleVerifyOtp()}
              loading={otpVerifying}
            />
          </View>
        </View>
      </View>
    );
  }

  // Render
  const isLinked = (method: AuthMethod) => linkedMethods.includes(method);
  const allMethods: AuthMethod[] = ["phone", "email", "google"];

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
          <Text style={{ ...TYPO.h3, color: "#FFFFFF" }}>Metode Login</Text>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
        {/* Info */}
        <Card variant="glass">
          <View style={{ flexDirection: "row", alignItems: "center", gap: SPACING.sm }}>
            <ShieldIcon size={20} color="#2C7695" />
            <Text style={{ ...TYPO.body, color: "#1E293B", flex: 1 }}>
              Hubungkan beberapa metode login supaya kamu tetap bisa masuk kalau salah satu metode bermasalah.
            </Text>
          </View>
        </Card>

        {/* Methods */}
        {allMethods.map((method) => {
          const linked = isLinked(method);
          return (
            <Card key={method} variant="glass">
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1, marginRight: SPACING.md }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: SPACING.sm, marginBottom: SPACING.xs }}>
                    <Text style={{ ...TYPO.bodyBold, color: "#1E293B" }}>
                      {METHOD_LABELS[method]}
                    </Text>
                    {linked && (
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                        <CheckCircleIcon size={14} color="#00C49A" />
                        <Badge label="Terhubung" variant="success" />
                      </View>
                    )}
                  </View>
                  <Text style={{ ...TYPO.caption, color: "#64748B" }}>
                    {METHOD_DESCRIPTIONS[method]}
                  </Text>
                  {linked && method === "phone" && profile?.phone && (
                    <Text style={{ ...TYPO.caption, color: "#64748B", marginTop: SPACING.xs }}>
                      {formatPhoneDisplay(profile.phone)}
                    </Text>
                  )}
                  {linked && method === "email" && profile?.email && (
                    <Text style={{ ...TYPO.caption, color: "#64748B", marginTop: SPACING.xs }}>
                      {profile.email}
                    </Text>
                  )}
                </View>
                {!linked && !(method === "phone" && showPhoneForm) && !(method === "email" && showEmailForm) && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "rgba(44,118,149,0.1)",
                      borderRadius: RADIUS.md,
                      paddingHorizontal: SPACING.md,
                      paddingVertical: SPACING.sm,
                    }}
                    onPress={() => {
                      setError("");
                      if (method === "phone") {
                        setShowPhoneForm(true);
                        setShowEmailForm(false);
                        resetEmailForm();
                      } else if (method === "email") {
                        setShowEmailForm(true);
                        setShowPhoneForm(false);
                        resetPhoneForm();
                      } else {
                        handleLinkGoogle();
                      }
                    }}
                    disabled={linkingMethod === method}
                  >
                    <Text style={{ ...TYPO.captionBold, color: "#2C7695" }}>
                      {linkingMethod === method ? "..." : "Hubungkan"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Phone: input step */}
              {method === "phone" && showPhoneForm && !linked && phoneStep === "input" && (
                <View style={{ marginTop: SPACING.lg, paddingTop: SPACING.lg, borderTopWidth: 1, borderTopColor: "#E2E8F0" }}>
                  <Input
                    placeholder="contoh: 08123456789"
                    value={phoneInput}
                    onChangeText={(text: string) => {
                      setPhoneInput(text.replace(/\D/g, ""));
                      setError("");
                    }}
                    keyboardType="phone-pad"
                    label="Nomor HP baru"
                    error={error && showPhoneForm && phoneStep === "input" ? error : undefined}
                  />
                  <View style={{ flexDirection: "row", marginTop: SPACING.md, gap: SPACING.sm }}>
                    <View style={{ flex: 1 }}>
                      <Button
                        title="Batal"
                        variant="secondary"
                        onPress={resetPhoneForm}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Button
                        title="Kirim OTP"
                        onPress={handleLinkPhone}
                        loading={phoneLinking}
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* Phone: OTP step */}
              {method === "phone" && showPhoneForm && !linked && phoneStep === "otp" &&
                renderOtpInput(handleResendPhoneOtp, phoneFormatted, "WhatsApp/SMS")
              }

              {/* Email: input step */}
              {method === "email" && showEmailForm && !linked && emailStep === "input" && (
                <View style={{ marginTop: SPACING.lg, paddingTop: SPACING.lg, borderTopWidth: 1, borderTopColor: "#E2E8F0" }}>
                  <Input
                    placeholder="contoh: nama@email.com"
                    value={emailInput}
                    onChangeText={(text: string) => {
                      setEmailInput(text);
                      setError("");
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    label="Alamat email"
                    error={error && showEmailForm && emailStep === "input" ? error : undefined}
                  />
                  <View style={{ flexDirection: "row", marginTop: SPACING.md, gap: SPACING.sm }}>
                    <View style={{ flex: 1 }}>
                      <Button
                        title="Batal"
                        variant="secondary"
                        onPress={resetEmailForm}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Button
                        title="Kirim OTP"
                        onPress={handleLinkEmail}
                        loading={emailLinking}
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* Email: OTP step */}
              {method === "email" && showEmailForm && !linked && emailStep === "otp" &&
                renderOtpInput(handleResendEmailOtp, emailTrimmed, "email")
              }
            </Card>
          );
        })}

        {/* Summary */}
        <Card variant="elevated">
          <Text style={{ ...TYPO.small, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: SPACING.sm }}>RINGKASAN</Text>
          <Text style={{ ...TYPO.body, color: "#1E293B" }}>
            {linkedMethods.length} dari {allMethods.length} metode terhubung
          </Text>
          {linkedMethods.length < allMethods.length && (
            <Text style={{ ...TYPO.caption, color: "#64748B", marginTop: SPACING.xs }}>
              Hubungkan semua metode supaya akun kamu lebih aman dan fleksibel.
            </Text>
          )}
          {linkedMethods.length === allMethods.length && (
            <Text style={{ ...TYPO.caption, color: "#00C49A", marginTop: SPACING.xs }}>
              Semua metode login sudah terhubung!
            </Text>
          )}
        </Card>

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </View>
  );
}
