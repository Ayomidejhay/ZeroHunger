'use client';

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export const useNotifications = () => {
  const { user } = useAuth();
  
  const fetchNotifications = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        food_listing:food_listings(title, category),
        reservation:reservations(status)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
    
    return data || [];
  };

  const { data: notifications = [], isLoading, error, refetch } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: fetchNotifications,
    enabled: !!user,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const markAsRead = async (notificationId: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .eq('user_id', user.id);
    
    if (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
    
    refetch();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    isLoading,
    error,
    refetch,
    markAsRead,
    unreadCount,
  };
};