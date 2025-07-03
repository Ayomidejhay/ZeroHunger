'use client'

import React, { useState, useEffect} from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';


interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
    created_at: string;
    food_listing_id?: string;
    reservation_id?: string;
}

const NotificationBar = () => {
    const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!user) return;

    fetchNotifications();

    //set up a subscription to listen for new notifications
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
            const newNotification = payload.new as Notification;
            setNotifications((prev) => [ newNotification, ...prev ]);
            setIsVisible(true);

            //show toast for new notification
            toast.custom((t) => (
                <div className={`flex items-center justify-between p-4 bg-${newNotification.type === 'success' ? 'green' : 'red'}-500 text-white rounded-lg shadow-lg`}>
                    <div>
                        <h3 className="font-bold">{newNotification.title}</h3>
                        <p>{newNotification.message}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    }
  }, [user, toast]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('read', false)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      if (data && data.length > 0) {
        // made changes here to ensure food_listing_id and reservation_id are optional
        setNotifications(
          data.map((n) => ({
            ...n,
            food_listing_id: n.food_listing_id ?? undefined,
            reservation_id: n.reservation_id ?? undefined,
          }))
        );
        setIsVisible(true);
      }
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
      
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.filter(notification => notification.id !== notificationId)
      );

      if (notifications.length <= 1) {
        setIsVisible(false);
      }
    } catch (error: any) {
      console.error("Error marking notification as read:", error);
    }
  };

  const dismissAll = () => {
    notifications.forEach(notification => {
      markAsRead(notification.id);
    });
    setIsVisible(false);
  };

  if (!isVisible || notifications.length === 0) return null;
        
    
       
  return (
    <div className="bg-defaultgreen text-white p-4 relative">
        <div className="saveplate-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5" />
            <div>
              <h4 className="font-semibold">
                {notifications.length} New Notification{notifications.length > 1 ? 's' : ''}
              </h4>
              <div className="space-y-1">
                {notifications.slice(0, 2).map((notification) => (
                  <div key={notification.id} className="text-sm opacity-90">
                    <strong>{notification.title}</strong> - {notification.message}
                  </div>
                ))}
                {notifications.length > 2 && (
                  <div className="text-sm opacity-75">
                    And {notifications.length - 2} more...
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={dismissAll}
              className="text-white hover:bg-white/20"
            >
              Mark All Read
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationBar