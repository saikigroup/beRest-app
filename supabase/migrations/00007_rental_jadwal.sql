-- beRest: Rental Items + Warga Jadwal

-- ==================== RENTAL ITEMS ====================
CREATE TABLE IF NOT EXISTS rental_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL, description TEXT, photo_url TEXT,
  daily_rate BIGINT NOT NULL, deposit_amount BIGINT NOT NULL DEFAULT 0,
  total_stock INT NOT NULL DEFAULT 1, available_stock INT NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE rental_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage items" ON rental_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS rental_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL REFERENCES rental_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rental_code TEXT NOT NULL UNIQUE,
  borrower_name TEXT NOT NULL, borrower_phone TEXT,
  consumer_id UUID REFERENCES profiles(id),
  quantity INT NOT NULL DEFAULT 1, daily_rate BIGINT NOT NULL,
  deposit_collected BIGINT NOT NULL DEFAULT 0,
  start_date TIMESTAMPTZ NOT NULL, expected_return TIMESTAMPTZ,
  actual_return TIMESTAMPTZ, return_photo TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','returned','overdue')),
  total_cost BIGINT, notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_rental_tx_user ON rental_transactions(user_id, status);
ALTER TABLE rental_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage rentals" ON rental_transactions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public lookup by code" ON rental_transactions FOR SELECT USING (TRUE);

CREATE OR REPLACE FUNCTION decrease_rental_stock(p_item_id UUID, p_qty INT) RETURNS VOID AS $$
BEGIN UPDATE rental_items SET available_stock = available_stock - p_qty WHERE id = p_item_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increase_rental_stock(p_item_id UUID, p_qty INT) RETURNS VOID AS $$
BEGIN UPDATE rental_items SET available_stock = available_stock + p_qty WHERE id = p_item_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==================== WARGA JADWAL ====================
CREATE TABLE IF NOT EXISTS warga_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('piket','ronda','kebersihan','custom')),
  date DATE NOT NULL, member_id UUID NOT NULL, member_name TEXT NOT NULL,
  is_swapped BOOLEAN NOT NULL DEFAULT FALSE,
  swap_with_id UUID, swap_with_name TEXT, notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_warga_schedules_org ON warga_schedules(org_id, date);
ALTER TABLE warga_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Org owners manage schedules" ON warga_schedules FOR ALL
  USING (EXISTS (SELECT 1 FROM organizations o WHERE o.id = warga_schedules.org_id AND o.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM organizations o WHERE o.id = warga_schedules.org_id AND o.user_id = auth.uid()));
CREATE POLICY "Members view schedules" ON warga_schedules FOR SELECT USING (TRUE);
CREATE POLICY "Members can swap" ON warga_schedules FOR UPDATE USING (TRUE);
