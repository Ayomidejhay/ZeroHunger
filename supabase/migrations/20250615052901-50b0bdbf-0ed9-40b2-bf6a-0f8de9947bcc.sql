
-- Add 'expired' status to the reservations status constraint
ALTER TABLE public.reservations 
DROP CONSTRAINT IF EXISTS reservations_status_check;

ALTER TABLE public.reservations 
ADD CONSTRAINT reservations_status_check 
CHECK (status IN ('pending', 'confirmed', 'completed', 'expired'));
