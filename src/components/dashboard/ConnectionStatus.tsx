"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Test connection periodically
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from("profiles").select("id").limit(1);
        if (error) throw error;
        setIsConnected(true);
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Connection check failed:", error);
        setIsConnected(false);
      }
    };
    // Initial check
    checkConnection();

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!isConnected) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <WifiOff className="h-3 w-3" />
        Connection Lost
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1 text-green-600 border-green-200"
    >
      <Wifi className="h-3 w-3" />
      Live Updates Active
    </Badge>
  );
};

export default ConnectionStatus;
