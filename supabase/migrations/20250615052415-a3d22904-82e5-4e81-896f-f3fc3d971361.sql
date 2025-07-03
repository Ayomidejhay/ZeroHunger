
-- Update notifications table constraint to include pickup_completed type
ALTER TABLE public.notifications 
DROP CONSTRAINT IF EXISTS notifications_type_check;

ALTER TABLE public.notifications 
ADD CONSTRAINT notifications_type_check 
CHECK (type IN ('food_listed', 'food_requested', 'food_confirmed', 'pickup_completed'));
