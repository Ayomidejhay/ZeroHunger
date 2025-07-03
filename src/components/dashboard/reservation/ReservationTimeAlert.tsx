import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Clock } from 'lucide-react';

interface ReservationTimeAlertProps {
    timeAgo: string;
    isUrgent: boolean;
}

const ReservationTimeAlert = ({timeAgo, isUrgent}: ReservationTimeAlertProps) => {
  return (
    <Alert className={isUrgent ? "border-red-200 bg-red-50" : "border-blue-200 bg-blue-50"}>
      <Clock className={`h-4 w-4 ${isUrgent ? "text-red-600" : "text-blue-600"}`} />
      <AlertDescription className={isUrgent ? "text-red-800" : "text-blue-800"}>
        <strong>Requested {timeAgo}</strong>
        {isUrgent && " - Please respond soon to avoid disappointing the recipient."}
      </AlertDescription>
    </Alert>
  )
}

export default ReservationTimeAlert