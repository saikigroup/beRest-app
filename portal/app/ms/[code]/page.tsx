import { supabase } from "@/lib/supabase";
import { SmartBanner } from "@/components/SmartBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal Jamaah - Apick",
  description: "Cek status kontribusi dan informasi mesjid Anda",
};

interface Props {
  params: Promise<{ code: string }>;
}

async function getJamaahData(code: string) {
  const { data: member } = await supabase
    .from("org_members")
    .select("*, organizations(*)")
    .eq("member_code", code)
    .single();

  if (!member) return null;

  // Verify this is a mesjid organization
  if (member.organizations?.type !== "mesjid") return null;

  // Get dues (iuran) for this member
  const { data: dues } = await supabase
    .from("org_dues")
    .select("*")
    .eq("member_id", member.id)
    .order("period", { ascending: false })
    .limit(6);

  // Get infaq contributions by this member
  const { data: infaqHistory } = await supabase
    .from("org_transactions")
    .select("*")
    .eq("org_id", member.org_id)
    .eq("category", "infaq")
    .eq("donor_name", member.name)
    .order("transaction_date", { ascending: false })
    .limit(10);

  // Get latest announcements
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .eq("org_id", member.org_id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Total infaq from this member
  const totalInfaq = (infaqHistory ?? []).reduce(
    (sum: number, tx: { amount: number }) => sum + tx.amount,
    0
  );

  return {
    org: member.organizations,
    member,
    dues: dues ?? [],
    infaqHistory: infaqHistory ?? [],
    announcements: announcements ?? [],
    totalInfaq,
  };
}

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  unpaid: "bg-red-100 text-red-700",
  partial: "bg-yellow-100 text-yellow-700",
  exempt: "bg-gray-100 text-gray-700",
};

const STATUS_LABELS: Record<string, string> = {
  paid: "Lunas",
  unpaid: "Belum Bayar",
  partial: "Sebagian",
  exempt: "Dibebaskan",
};

export default async function MesjidMemberPage({ params }: Props) {
  const { code } = await params;
  const data = await getJamaahData(code);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-xl font-bold text-gray-800">
            Kode tidak ditemukan
          </h1>
          <p className="text-gray-500 mt-2">
            Pastikan kode jamaah yang kamu masukkan benar.
          </p>
        </div>
      </main>
    );
  }

  const { org, member, dues, infaqHistory, announcements, totalInfaq } = data;

  return (
    <>
      <SmartBanner />
      <main className="max-w-md mx-auto p-4 pb-20">
        {/* Header */}
        <div className="text-center mb-6 pt-4">
          <p className="text-4xl mb-2">🕌</p>
          <h1 className="text-xl font-bold text-gray-900">{org.name}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {member.name} • {member.member_code}
          </p>
        </div>

        {/* Infaq Summary */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6 text-center">
          <p className="text-xs text-gray-500">Total Kontribusi Infaq Anda</p>
          <p className="text-3xl font-bold text-[#8B5CF6]">
            Rp {totalInfaq.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {infaqHistory.length} kali berinfaq
          </p>
        </div>

        {/* Dues Status */}
        {dues.length > 0 && (
          <>
            <h2 className="text-sm font-bold text-gray-500 mb-2">
              STATUS IURAN
            </h2>
            <div className="space-y-2 mb-6">
              {dues.map(
                (d: {
                  id: string;
                  period: string;
                  amount: number;
                  status: string;
                }) => (
                  <div
                    key={d.id}
                    className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm text-gray-500">{d.period}</p>
                      <p className="text-lg font-bold text-gray-900">
                        Rp {d.amount.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_COLORS[d.status] ?? ""}`}
                    >
                      {STATUS_LABELS[d.status] ?? d.status}
                    </span>
                  </div>
                )
              )}
            </div>
          </>
        )}

        {/* Infaq History */}
        <h2 className="text-sm font-bold text-gray-500 mb-2">
          RIWAYAT INFAQ ANDA
        </h2>
        <div className="space-y-2 mb-6">
          {infaqHistory.map(
            (tx: {
              id: string;
              amount: number;
              transaction_date: string;
              notes: string | null;
            }) => (
              <div
                key={tx.id}
                className="bg-white rounded-xl p-4 border border-gray-200 flex items-center"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <span className="text-sm">🤲</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">
                    Rp {tx.amount.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(tx.transaction_date).toLocaleDateString("id-ID")}
                  </p>
                </div>
                {tx.notes && (
                  <p className="text-xs text-gray-400 max-w-[120px] truncate">
                    {tx.notes}
                  </p>
                )}
              </div>
            )
          )}
          {infaqHistory.length === 0 && (
            <p className="text-gray-400 text-center py-4">
              Belum ada riwayat infaq
            </p>
          )}
        </div>

        {/* Announcements */}
        <h2 className="text-sm font-bold text-gray-500 mb-2">PENGUMUMAN</h2>
        <div className="space-y-2">
          {announcements.map(
            (a: {
              id: string;
              title: string;
              body: string;
              created_at: string;
            }) => (
              <div
                key={a.id}
                className="bg-white rounded-xl p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900">{a.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{a.body}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(a.created_at).toLocaleDateString("id-ID")}
                </p>
              </div>
            )
          )}
          {announcements.length === 0 && (
            <p className="text-gray-400 text-center py-4">
              Belum ada pengumuman
            </p>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Dibuat dengan Apick • {new Date().toLocaleDateString("id-ID")}
        </p>
      </main>
    </>
  );
}
