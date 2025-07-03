import React from 'react'
import { Badge } from '@/components/ui/badge';
import { CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

interface ReservationHeaderProps {
  title: string;
  recipientName: string;
}

const ReservationHeader = ({title, recipientName}: ReservationHeaderProps) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-grow">
        <CardTitle className="text-lg flex items-center gap-2">
          {title}
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Pending Approval
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
          <User className="h-3 w-3" />
          Requested by: {recipientName}
        </p>
      </div>
    </div>
  )
}

export default ReservationHeader