import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useRealtimeConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "CONNECTING" | "CONNECTED" | "DISCONNECTED"
  >("CONNECTING");

  useEffect(() => {
    console.log("Setting up real-time connection monitoring...");

    // Create a test channel to monitor connection status
    const testChannel = supabase
      .channel("realtime-test")
      .on("presence", { event: "sync" }, () => {
        console.log("Real-time presence sync detected");
      })
      .subscribe((status) => {
        console.log("Real-time connection status:", status);

        switch (status) {
          case "SUBSCRIBED":
            setIsConnected(true);
            setConnectionStatus("CONNECTED");
            console.log("✅ Real-time connection established");
            break;
          case "CHANNEL_ERROR":
            setIsConnected(false);
            setConnectionStatus("DISCONNECTED");
            console.error("❌ Real-time connection error");
            toast.error(
              "Real-time updates may be delayed. Please refresh if needed.",
              
            );
            break;
          case "TIMED_OUT":
            setIsConnected(false);
            setConnectionStatus("DISCONNECTED");
            console.error("⏰ Real-time connection timed out");
            break;
          case "CLOSED":
            setIsConnected(false);
            setConnectionStatus("DISCONNECTED");
            console.log("🔌 Real-time connection closed");
            break;
          default:
            setConnectionStatus("CONNECTING");
        }
      });

    return () => {
      console.log("Cleaning up real-time connection monitor...");
      supabase.removeChannel(testChannel);
    };
  }, [toast]);

  return { isConnected, connectionStatus };
};
