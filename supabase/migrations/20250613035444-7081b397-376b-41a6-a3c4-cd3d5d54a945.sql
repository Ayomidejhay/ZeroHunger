
-- Update food_listings status constraint to include new states
ALTER TABLE public.food_listings 
DROP CONSTRAINT IF EXISTS food_listings_status_check;

ALTER TABLE public.food_listings 
ADD CONSTRAINT food_listings_status_check 
CHECK (status IN ('available', 'reserved', 'expired', 'completed'));

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('food_listed', 'food_requested', 'food_confirmed')),
  food_listing_id UUID REFERENCES public.food_listings(id) ON DELETE CASCADE,
  reservation_id UUID REFERENCES public.reservations(id) ON DELETE CASCADE,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own notifications
CREATE POLICY "Users can view their own notifications" 
  ON public.notifications 
  FOR SELECT 
  USING (user_id = auth.uid());

-- Create policy for creating notifications (for system use)
CREATE POLICY "System can create notifications" 
  ON public.notifications 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy for users to update their own notifications (mark as read)
CREATE POLICY "Users can update their own notifications" 
  ON public.notifications 
  FOR UPDATE 
  USING (user_id = auth.uid());

-- Create function to notify recipients when new food is listed
CREATE OR REPLACE FUNCTION notify_recipients_new_food()
RETURNS TRIGGER AS $$
BEGIN
  -- Only notify when a new food listing is created with 'available' status
  IF NEW.status = 'available' THEN
    INSERT INTO public.notifications (user_id, title, message, type, food_listing_id)
    SELECT 
      p.id,
      'New Food Available!',
      'A new food item "' || NEW.title || '" is available in ' || NEW.location,
      'food_listed',
      NEW.id
    FROM public.profiles p
    WHERE p.user_type = 'recipient';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to notify donor when food is requested
CREATE OR REPLACE FUNCTION notify_donor_food_requested()
RETURNS TRIGGER AS $$
DECLARE
  food_record RECORD;
BEGIN
  -- Get food listing details
  SELECT fl.*, p.id as donor_id 
  INTO food_record
  FROM public.food_listings fl
  JOIN public.profiles p ON fl.donor_id = p.id
  WHERE fl.id = NEW.food_listing_id;
  
  -- Notify the donor
  INSERT INTO public.notifications (user_id, title, message, type, food_listing_id, reservation_id)
  VALUES (
    food_record.donor_id,
    'Food Request Received!',
    'Someone has requested your food item "' || food_record.title || '"',
    'food_requested',
    NEW.food_listing_id,
    NEW.id
  );
  
  -- Update food listing status to 'reserved'
  UPDATE public.food_listings 
  SET status = 'reserved', updated_at = now()
  WHERE id = NEW.food_listing_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
DROP TRIGGER IF EXISTS trigger_notify_recipients_new_food ON public.food_listings;
CREATE TRIGGER trigger_notify_recipients_new_food
  AFTER INSERT ON public.food_listings
  FOR EACH ROW
  EXECUTE FUNCTION notify_recipients_new_food();

DROP TRIGGER IF EXISTS trigger_notify_donor_food_requested ON public.reservations;
CREATE TRIGGER trigger_notify_donor_food_requested
  AFTER INSERT ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION notify_donor_food_requested();