import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Check, X } from 'lucide-react';

interface ReservationActionsProps {
    onConfirm: () => void;
    onDecline: () => void;
    isConfirming?: boolean;
    isDeclining?: boolean;
}

const ReservationActions = ({ onConfirm, onDecline, isConfirming, isDeclining}: ReservationActionsProps) => {
  return (
    <div className="flex items-center justify-between pt-2 border-t">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <AlertTriangle className="h-3 w-3" />
        Action required to proceed
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onDecline}
          disabled={isDeclining || isConfirming}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          <X className="h-4 w-4 mr-1" />
          {isDeclining ? "Declining..." : "Decline"}
        </Button>
        <Button
          size="sm"
          onClick={onConfirm}
          disabled={isConfirming || isDeclining}
          className="bg-green-600 hover:bg-green-700"
        >
          <Check className="h-4 w-4 mr-1" />
          {isConfirming ? "Confirming..." : "Confirm"}
        </Button>
      </div>
    </div>
  )
}

export default ReservationActions