'use client';

import React, {Suspense} from 'react'
import RestPasswordContent from '@/components/auth/RestPasswordContent'


export default function page() {
   
  return (
     <Suspense fallback={<div>Loading...</div>}>
      <RestPasswordContent />
    </Suspense>
  )
}
