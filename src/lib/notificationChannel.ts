/**
 * NOTIFICATION CHANNEL SINGLETON
 *
 * Supabase realtime channels cannot be re-subscribed once subscribed —
 * calling .on() after .subscribe() throws regardless of cleanup attempts.
 * React Strict Mode's deliberate double-mount makes this unavoidable if the
 * channel lives inside a component.
 *
 * Solution: the channel lives here, at module scope, completely outside React.
 * Module scope is initialised once per browser session and never re-runs.
 * React components just register/unregister callbacks — they never touch the
 * Supabase channel API directly.
 */

import { supabase } from "@/integrations/supabase/client";

type NotificationPayload = {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  food_listing_id?: string;
  reservation_id?: string;
  user_id: string;
};

type InsertHandler = (n: NotificationPayload) => void;
type UpdateHandler = (n: NotificationPayload) => void;

// Active channel reference — null until the first user logs in
let activeChannel: ReturnType<typeof supabase.channel> | null = null;
let activeUserId: string | null = null;

// Registered React callbacks
const insertHandlers = new Set<InsertHandler>();
const updateHandlers = new Set<UpdateHandler>();

/** Subscribe to a user's notifications. Safe to call multiple times. */
export function subscribeToNotifications(userId: string) {
  // Already subscribed for this user — nothing to do
  if (activeChannel && activeUserId === userId) return;

  // Different user (e.g. after logout/login) — tear down the old channel first
  if (activeChannel) {
    supabase.removeChannel(activeChannel);
    activeChannel = null;
    activeUserId = null;
  }

  activeUserId = userId;
  activeChannel = supabase
    .channel(`notifications:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        insertHandlers.forEach((h) => h(payload.new as NotificationPayload));
      }
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        updateHandlers.forEach((h) => h(payload.new as NotificationPayload));
      }
    )
    .subscribe();
}

/** Tear down the channel entirely (call on sign-out). */
export function unsubscribeFromNotifications() {
  if (activeChannel) {
    supabase.removeChannel(activeChannel);
    activeChannel = null;
    activeUserId = null;
  }
}

/** Register a callback for INSERT events. Returns an unregister function. */
export function onNotificationInsert(handler: InsertHandler) {
  insertHandlers.add(handler);
  return () => insertHandlers.delete(handler);
}

/** Register a callback for UPDATE events. Returns an unregister function. */
export function onNotificationUpdate(handler: UpdateHandler) {
  updateHandlers.add(handler);
  return () => updateHandlers.delete(handler);
}
