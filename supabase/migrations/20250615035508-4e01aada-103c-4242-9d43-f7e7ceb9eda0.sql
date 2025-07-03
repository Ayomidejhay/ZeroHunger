-- Add allergens column to food_listings table
ALTER TABLE public.food_listings 
ADD COLUMN allergens text[] DEFAULT '{}';

-- Add dietary_restrictions column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN dietary_restrictions text[] DEFAULT '{}',
ADD COLUMN allergies text[] DEFAULT '{}';

-- Create function to update reservation status when food listing is marked completed
CREATE OR REPLACE FUNCTION public.update_reservation_on_completion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- When a food listing is marked as completed, update related reservations
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE public.reservations 
    SET status = 'completed', updated_at = now()
    WHERE food_listing_id = NEW.id AND status = 'confirmed';
    
    -- Notify recipients that their reservation is completed
    INSERT INTO public.notifications (user_id, title, message, type, food_listing_id)
    SELECT 
      r.recipient_id,
      'Food Pickup Completed!',
      'Your reserved food item "' || NEW.title || '" has been marked as completed.',
      'pickup_completed',
      NEW.id
    FROM public.reservations r
    WHERE r.food_listing_id = NEW.id AND r.status = 'completed';
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger for the completion update function
CREATE TRIGGER trigger_update_reservation_on_completion
  AFTER UPDATE ON public.food_listings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_reservation_on_completion();
