
-- Create storage bucket for food images
INSERT INTO storage.buckets (id, name, public)
VALUES ('food-images', 'food-images', true);

-- Create storage policies for the food-images bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'food-images');

CREATE POLICY "Allow authenticated users to upload food images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'food-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to update their own food images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'food-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Allow users to delete their own food images"
ON storage.objects FOR DELETE
USING (bucket_id = 'food-images' AND auth.uid()::text = (storage.foldername(name))[1]);