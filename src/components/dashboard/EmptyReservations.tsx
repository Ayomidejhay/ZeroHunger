import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EmptyReservations = () => {
    const router = useRouter();
  return (
    <div className="text-center py-8">
      <Search className="h-12 w-12 text-neutral400 mx-auto mb-4" />
      <p className="text-neutral600 mb-4">
        You haven't made any food requests yet
      </p>
      <Button onClick={() => router.push("/browse")}>
        Browse Available Food
      </Button>
    </div>
  )
}

export default EmptyReservations