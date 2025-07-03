'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';

interface DonorHeaderProps {
    firstName: string;
}

const DonorHeader = ({firstName}: DonorHeaderProps) => {
    const router = useRouter();
  return (
    <div className='flex justify-between items-center mb-8'>
        <div>
            <h1 className='text-3xl font-bold text-neutral900 mb-2'>Donor Dashboard</h1>
            <p className='text-neutral600 mb-4'>Welcome back, {firstName}! Manage your food donations here.</p>
            <ConnectionStatus />
        </div>
        <Button 
            className='bg-defaultgreen hover:bg-darkgreen text-white'
            onClick={() => router.push('/donate')}
        >
            <Plus className='mr-2 h-4 w-4' />   
            List New Food
        </Button>
    </div>
  )
}

export default DonorHeader