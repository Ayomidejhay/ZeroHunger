
-- Create a table to track donation history for donors (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.donation_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  food_listing_id UUID REFERENCES public.food_listings(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  donated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  pickup_completed_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'picked_up', 'expired', 'cancelled'))
);

-- Enable RLS on donation_history
ALTER TABLE public.donation_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ BEGIN
  DROP POLICY IF EXISTS "Donors can view their own donation history" ON public.donation_history;
  CREATE POLICY "Donors can view their own donation history" 
    ON public.donation_history 
    FOR SELECT 
    USING (donor_id IN (SELECT id FROM public.profiles WHERE id = auth.uid()));
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Donors can create donation records" ON public.donation_history;
  CREATE POLICY "Donors can create donation records" 
    ON public.donation_history 
    FOR INSERT 
    WITH CHECK (donor_id IN (SELECT id FROM public.profiles WHERE id = auth.uid()));
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Donors can update their own donation records" ON public.donation_history;
  CREATE POLICY "Donors can update their own donation records" 
    ON public.donation_history 
    FOR UPDATE 
    USING (donor_id IN (SELECT id FROM public.profiles WHERE id = auth.uid()));
EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- Update the existing food_listings table to ensure proper RLS
ALTER TABLE public.food_listings ENABLE ROW LEVEL SECURITY;

-- Drop and recreate food_listings policies
DO $$ BEGIN
  DROP POLICY IF EXISTS "Donors can manage their own food listings" ON public.food_listings;
  CREATE POLICY "Donors can manage their own food listings" 
    ON public.food_listings 
    FOR ALL 
    USING (donor_id = auth.uid());
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Everyone can view available food listings" ON public.food_listings;
  CREATE POLICY "Everyone can view available food listings" 
    ON public.food_listings 
    FOR SELECT 
    USING (status = 'available');
EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- Update reservations table RLS
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Drop and recreate reservations policies
DO $$ BEGIN
  DROP POLICY IF EXISTS "Recipients can manage their own reservations" ON public.reservations;
  CREATE POLICY "Recipients can manage their own reservations" 
    ON public.reservations 
    FOR ALL 
    USING (recipient_id = auth.uid());
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Donors can view reservations for their listings" ON public.reservations;
  CREATE POLICY "Donors can view reservations for their listings" 
    ON public.reservations 
    FOR SELECT 
    USING (food_listing_id IN (SELECT id FROM public.food_listings WHERE donor_id = auth.uid()));
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Donors can update reservations for their listings" ON public.reservations;
  CREATE POLICY "Donors can update reservations for their listings" 
    ON public.reservations 
    FOR UPDATE 
    USING (food_listing_id IN (SELECT id FROM public.food_listings WHERE donor_id = auth.uid()));
EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- Update profiles table RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop and recreate profiles policies
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can manage their own profile" ON public.profiles;
  CREATE POLICY "Users can manage their own profile" 
    ON public.profiles 
    FOR ALL 
    USING (id = auth.uid());
EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- Update the handle_new_user function to require user_type during signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, user_type, first_name, last_name)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'user_type', 'recipient'),
    COALESCE(new.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(new.raw_user_meta_data ->> 'last_name', '')
  );
  RETURN new;
END;
$$;