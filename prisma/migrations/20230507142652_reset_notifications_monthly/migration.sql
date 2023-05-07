CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE OR REPLACE FUNCTION reset_notifications()
RETURNS void AS $$
BEGIN
    TRUNCATE TABLE notifications;
END;
$$ LANGUAGE plpgsql;

SELECT cron.schedule('0 0 1 * *', 'SELECT reset_notifications();');