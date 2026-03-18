import { View, Text } from "react-native";
import { Modal } from "@components/ui/Modal";
import { Button } from "@components/ui/Button";
import { Card } from "@components/ui/Card";
import { getTierLabel, getTierPrice } from "@services/subscription.service";
import { formatRupiah } from "@utils/format";
import type { SubscriptionTier } from "@app-types/shared.types";

interface UpgradeModalProps {
  visible: boolean;
  onClose: () => void;
  currentTier: SubscriptionTier;
  featureName?: string;
}

const TIER_FEATURES: Record<SubscriptionTier, string[]> = {
  free: ["1 modul aktif", "30 anggota/penghuni", "5 unit", "20 produk"],
  starter: ["2 modul aktif", "100 anggota/penghuni", "20 unit", "100 produk", "Export PDF", "AI scan nota"],
  pro: ["Semua modul", "Unlimited anggota", "Unlimited unit", "Unlimited produk", "Export PDF & CSV", "AI scan nota", "Analitik lanjutan"],
};

export function UpgradeModal({ visible, onClose, currentTier, featureName }: UpgradeModalProps) {
  const tiers: SubscriptionTier[] = ["free", "starter", "pro"];
  const upgradeTiers = tiers.filter((t) => tiers.indexOf(t) > tiers.indexOf(currentTier));

  return (
    <Modal visible={visible} onClose={onClose} title="Upgrade Apick">
      {featureName && (
        <Text className="text-sm text-grey-text mb-3">
          Fitur &quot;{featureName}&quot; membutuhkan paket lebih tinggi.
        </Text>
      )}

      {upgradeTiers.map((tier) => (
        <Card key={tier}>
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-bold text-dark-text">
              {getTierLabel(tier)}
            </Text>
            <Text className="text-lg font-bold text-orange">
              {getTierPrice(tier) === 0
                ? "Gratis"
                : `${formatRupiah(getTierPrice(tier))}/bln`}
            </Text>
          </View>
          {TIER_FEATURES[tier].map((feat) => (
            <View key={feat} className="flex-row items-center mb-1">
              <Text className="text-green-600 mr-2">✓</Text>
              <Text className="text-sm text-dark-text">{feat}</Text>
            </View>
          ))}
          <View className="mt-3">
            <Button
              title={`Pilih ${getTierLabel(tier)}`}
              variant={tier === "pro" ? "primary" : "secondary"}
              onPress={() => {
                // Future: payment integration
                onClose();
              }}
            />
          </View>
        </Card>
      ))}
    </Modal>
  );
}
