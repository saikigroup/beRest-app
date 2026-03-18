-- beRest Hajat Module Migration
-- Tables: hajat_events, event_guests, gift_records

CREATE TABLE IF NOT EXISTS hajat_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('nikah','khitan','aqiqah','ultah','syukuran','duka','custom')),
  slug TEXT,
  event_date DATE NOT NULL,
  event_time TEXT,
  location_name TEXT,
  location_address TEXT,
  location_maps_url TEXT,
  template_id TEXT,
  custom_message TEXT,
  cover_photo TEXT,
  settings JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_hajat_events_user ON hajat_events(user_id, status);
CREATE INDEX idx_hajat_events_slug ON hajat_events(slug) WHERE slug IS NOT NULL;
ALTER TABLE hajat_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage events" ON hajat_events FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public view published events" ON hajat_events FOR SELECT USING (status = 'published');

CREATE TABLE IF NOT EXISTS event_guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES hajat_events(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id),
  consumer_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  phone TEXT,
  guest_code TEXT,
  invitation_sent BOOLEAN NOT NULL DEFAULT FALSE,
  invitation_opened BOOLEAN NOT NULL DEFAULT FALSE,
  rsvp_status TEXT NOT NULL DEFAULT 'pending' CHECK (rsvp_status IN ('pending','attending','not_attending','maybe')),
  rsvp_count INT NOT NULL DEFAULT 1,
  checked_in BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_guests_event ON event_guests(event_id);
CREATE INDEX idx_guests_code ON event_guests(guest_code) WHERE guest_code IS NOT NULL;
ALTER TABLE event_guests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Event owners manage guests" ON event_guests FOR ALL
  USING (EXISTS (SELECT 1 FROM hajat_events e WHERE e.id = event_guests.event_id AND e.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM hajat_events e WHERE e.id = event_guests.event_id AND e.user_id = auth.uid()));
CREATE POLICY "Public can view and update own guest entry" ON event_guests FOR SELECT USING (TRUE);
CREATE POLICY "Public can update RSVP" ON event_guests FOR UPDATE USING (TRUE);

CREATE TABLE IF NOT EXISTS gift_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES hajat_events(id),
  contact_id UUID REFERENCES contacts(id),
  person_name TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('given','received')),
  amount BIGINT,
  event_type TEXT,
  event_description TEXT,
  event_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_gifts_user ON gift_records(user_id, direction);
ALTER TABLE gift_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own gifts" ON gift_records FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE event_guests;
