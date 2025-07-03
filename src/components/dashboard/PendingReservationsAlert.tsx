
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {Bell} from 'lucide-react';
import PendingReservationCard from './PendingReservationCard';


interface PendingReservationsAlertProps {
    pendingReservations: any[];
    onUpdate: () => void;
}

const PendingReservationsAlert = ({pendingReservations, onUpdate}: PendingReservationsAlertProps) => {
    if (pendingReservations.length === 0) return null;
  return (
        <Card className="mb-8 border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Bell className="h-5 w-5" />
          Pending Reservations ({pendingReservations.length})
        </CardTitle>
        <CardDescription className="text-orange-700">
          You have food requests waiting for your approval. Please review and respond.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingReservations.map((reservation) => (
            <PendingReservationCard
              key={reservation.id}
              reservation={reservation}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default PendingReservationsAlert