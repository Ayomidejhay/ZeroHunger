'use client'

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
//import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  Check, 
  Trash2, 
  Package, 
  Heart, 
  Clock, 
  AlertCircle,
  MoreHorizontal
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string; // Changed from union type to string to match database
  read: boolean;
  created_at: string;
  food_listing_id?: string;
  reservation_id?: string;
}

const NotificationCenter = () => {
     const { user } = useAuth();
  //const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    if (user) {
      fetchNotifications();
      
      // Set up real-time subscription
      const subscription = supabase
        .channel('notifications')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, () => {
          fetchNotifications();
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setNotifications(
        (data || []).map((notif) => ({
          ...notif,
          food_listing_id: notif.food_listing_id ?? undefined,
          reservation_id: notif.reservation_id ?? undefined,
        }))
      );
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
      toast.error("Error loading notifications", {
  description: "Could not load your notifications. Please try again.",
});
    } finally {
      setIsLoading(false);
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
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, read: true }
            : notif
        )
      );
    } catch (error: any) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      );

      toast.success("All notifications marked as read", {
  description: "Your notification center has been updated.",
});
    } catch (error: any) {
      console.error('Error marking all as read:', error);
      toast.error("Error updating notifications", {
  description: "Could not mark all notifications as read.",
});
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.filter(notif => notif.id !== notificationId)
      );

      toast.success("Notification deleted", {
  description: "The notification has been removed.",
});
    } catch (error: any) {
      console.error('Error deleting notification:', error);
      toast.error("Error deleting notification", {
  description: "Could not delete the notification.",
});
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'food_listed':
        return <Package className="h-4 w-4 text-defaultgreen" />;
      case 'food_requested':
        return <Heart className="h-4 w-4 text-defaultorange" />;
      case 'pickup_completed':
        return <Check className="h-4 w-4 text-defaultgreen" />;
      case 'reminder':
        return <Clock className="h-4 w-4 text-defaultorange" />;
      case 'system':
        return <AlertCircle className="h-4 w-4 text-neutral600" />;
      default:
        return <Bell className="h-4 w-4 text-neutral600" />;
    }
  };

  const filteredNotifications = notifications.filter(notif => 
    filter === 'all' || !notif.read
  );

  const unreadCount = notifications.filter(notif => !notif.read).length;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading notifications...</div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread
            </Button>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
              >
                Mark All Read
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 text-neutral600">
            {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {filteredNotifications.map((notification, index) => (
                <div key={notification.id}>
                  <div 
                    className={`p-3 rounded-lg border transition-colors ${
                      notification.read 
                        ? 'bg-white border-saveplate-neutral-200' 
                        : 'bg-defaultgreen/5 border-defaultgreen/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-defaultorange rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-neutral600 mb-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-saveplate-neutral-500">
                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < filteredNotifications.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

export default NotificationCenter