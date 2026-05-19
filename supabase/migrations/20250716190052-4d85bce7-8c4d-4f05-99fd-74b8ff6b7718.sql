-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('admin', 'donor', 'recipient');

-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN role public.user_role DEFAULT 'recipient';

-- Update existing profiles to use proper roles based on user_type
UPDATE public.profiles 
SET role = CASE 
  WHEN user_type = 'donor' THEN 'donor'::user_role
  WHEN user_type = 'recipient' THEN 'recipient'::user_role
  ELSE 'recipient'::user_role
END;

-- Create a security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Create RLS policy for admin access
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin(auth.uid()));

-- Create policy for admins to manage user roles
CREATE POLICY "Admins can update user roles" 
ON public.profiles 
FOR UPDATE 
USING (public.is_admin(auth.uid()));