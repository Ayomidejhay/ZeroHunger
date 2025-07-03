'use client';
import RestPasswordContent from '@/components/auth/RestPasswordContent'


export default function page() {
   
  return (
     <Suspense fallback={<div>Loading...</div>}>
      <RestPasswordContent />
    </Suspense>
  )
}
