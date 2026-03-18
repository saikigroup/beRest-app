import { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { getRentalByCode } from "@services/rental.service";
import { formatRupiah, formatDate } from "@utils/format";
import type { RentalTransaction, RentalStatus } from "@app-types/sewa.types";

const STATUS_MAP: Record<RentalStatus, { label: string; variant: "success" | "error" | "warning" }> = {
  active: { label: "Dipinjam", variant: "warning" },
  returned: { label: "Dikembalikan", variant: "success" },
  overdue: { label: "Terlambat", variant: "error" },
};

export default function ConsumerRentalScreen() {
  const [code, setCode] = useState("");
  const [rental, setRental] = useState<(RentalTransaction & { rental_items?: { name: string } }) | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!code.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await getRentalByCode(code.trim());
      setRental(data);
    } catch {
      setRental(null);
    } finally {
      setLoading(false);
    }
  }, [code]);

  const days = rental
    ? Math.max(
        1,
        Math.ceil(
          (new Date(rental.actual_return ?? Date.now()).getTime() -
            new Date(rental.start_date).getTime()) /
            86400000
        )
      )
    : 0;

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={["top"]}>
      <View className="flex-row items-center px-4 py-3 border-b border-border-color bg-white">
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text className="text-lg text-navy">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-dark-text ml-3">
          Status Rental
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-3">
        {/* Search by code */}
        <Card>
          <Text className="text-xs text-grey-text mb-2">
            Masukkan kode rental untuk cek status
          </Text>
          <Input
            placeholder="contoh: RNT-15ABCD"
            value={code}
            onChangeText={(t: string) => setCode(t.toUpperCase())}
            autoCapitalize="characters"
          />
          <View className="mt-3">
            <Button
              title="Cek Status"
              onPress={handleSearch}
              loading={loading}
              disabled={!code.trim()}
            />
          </View>
        </Card>

        {/* Result */}
        {searched && !rental && !loading && (
          <View className="items-center py-8">
            <Text className="text-4xl mb-3">🔍</Text>
            <Text className="text-base font-bold text-grey-text">
              Kode tidak ditemukan
            </Text>
            <Text className="text-sm text-grey-text mt-1">
              Pastikan kode rental yang dimasukkan benar
            </Text>
          </View>
        )}

        {rental && (
          <>
            <Card>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-xs text-grey-text font-mono">
                  {rental.rental_code}
                </Text>
                <Badge
                  label={STATUS_MAP[rental.status].label}
                  variant={STATUS_MAP[rental.status].variant}
                />
              </View>

              <Text className="text-lg font-bold text-dark-text">
                {rental.rental_items?.name ?? "Barang rental"}
              </Text>
              <Text className="text-sm text-grey-text mt-1">
                Peminjam: {rental.borrower_name}
              </Text>

              <View className="flex-row mt-3 pt-3 border-t border-border-color">
                <View className="flex-1">
                  <Text className="text-xs text-grey-text">Mulai</Text>
                  <Text className="text-sm font-bold text-dark-text">
                    {formatDate(rental.start_date)}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-grey-text">
                    {rental.status === "returned" ? "Dikembalikan" : "Diharapkan"}
                  </Text>
                  <Text className="text-sm font-bold text-dark-text">
                    {rental.actual_return
                      ? formatDate(rental.actual_return)
                      : rental.expected_return
                        ? formatDate(rental.expected_return)
                        : "-"}
                  </Text>
                </View>
              </View>
            </Card>

            <Card>
              <View className="flex-row">
                <View className="flex-1">
                  <Text className="text-xs text-grey-text">Jumlah</Text>
                  <Text className="text-lg font-bold text-dark-text">
                    {rental.quantity}x
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-grey-text">Durasi</Text>
                  <Text className="text-lg font-bold text-dark-text">
                    {days} hari
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-grey-text">Biaya</Text>
                  <Text className="text-lg font-bold text-sewa">
                    {rental.total_cost
                      ? formatRupiah(rental.total_cost)
                      : formatRupiah(days * rental.daily_rate * rental.quantity)}
                  </Text>
                </View>
              </View>
            </Card>

            {rental.deposit_collected > 0 && (
              <Card>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-grey-text">Deposit</Text>
                  <Text className="text-sm font-bold text-dark-text">
                    {formatRupiah(rental.deposit_collected)}
                  </Text>
                </View>
              </Card>
            )}

            {rental.notes && (
              <Card>
                <Text className="text-xs text-grey-text mb-1">Catatan</Text>
                <Text className="text-sm text-dark-text">{rental.notes}</Text>
              </Card>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
