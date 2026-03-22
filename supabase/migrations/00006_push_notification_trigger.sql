-------------------------------------------------------
-- Push Notification via pg_net
-- Otomatis kirim push ke device setiap ada INSERT di notifications
-- Setup: jalankan SQL ini di Supabase Dashboard → SQL Editor
-------------------------------------------------------

-- 1. Aktifkan pg_net extension (HTTP requests dari PostgreSQL)
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- 2. Function: kirim push ke Expo Push API
CREATE OR REPLACE FUNCTION send_push_notification()
RETURNS TRIGGER AS $$
DECLARE
  push_token RECORD;
  payload JSONB;
BEGIN
  -- Loop semua push token milik user yang dapat notifikasi
  FOR push_token IN
    SELECT token FROM push_tokens WHERE user_id = NEW.user_id
  LOOP
    -- Buat payload Expo Push API
    payload := jsonb_build_object(
      'to', push_token.token,
      'sound', 'default',
      'title', NEW.title,
      'body', COALESCE(NEW.body, ''),
      'data', jsonb_build_object(
        'notification_id', NEW.id,
        'module', NEW.module,
        'type', NEW.type,
        'deep_link', COALESCE(NEW.deep_link, '')
      )
    );

    -- Kirim via pg_net (async HTTP POST, non-blocking)
    PERFORM net.http_post(
      url := 'https://exp.host/--/api/v2/push/send',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Accept', 'application/json'
      ),
      body := payload
    );
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Trigger: jalankan setiap INSERT ke notifications
DROP TRIGGER IF EXISTS trigger_push_notification ON notifications;

CREATE TRIGGER trigger_push_notification
  AFTER INSERT ON notifications
  FOR EACH ROW
  EXECUTE FUNCTION send_push_notification();
