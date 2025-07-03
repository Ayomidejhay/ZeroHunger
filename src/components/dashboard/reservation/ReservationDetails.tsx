import React from 'react'
import { Package, MapPin, Calendar} from 'lucide-react';

interface ReservationDetailsProps {
    quantity: string;
    location: string;
    reservationId: string;
}

const ReservationDetails = ({quantity, location, reservationId}: ReservationDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <Package className="h-4 w-4 text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Quantity</p>
            <p className="text-sm text-gray-600">{quantity}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Pickup Location</p>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Request ID</p>
            <p className="text-sm text-gray-600 font-mono">
              {reservationId.slice(0, 8)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationDetails