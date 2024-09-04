"use client";

import React from 'react'
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Plus } from 'lucide-react'

import { useNewAppointment } from '@/features/appointments/hookes/use-new-appointment';
import { useGetAppointments } from '@/features/appointments/api/use-get-appointment';
import { useBulkDeleteAppointments } from '@/features/appointments/api/use-bulk-delete-appointment';

function CategoryPage() {

    const newcategory = useNewAppointment();
    const categoriesQuery = useGetAppointments();
    const deleteCategories = useBulkDeleteAppointments();

    const categories = categoriesQuery.data || []

    const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;


    if(categoriesQuery.isLoading){
      return (
        <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
          <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                <Skeleton className='h-8 w-48'/>
                <Skeleton className='w-48 h-8'/>
            </CardHeader>
            <CardContent className='lg:px-auto lg:mx-auto mt-10 '>
              <div className='h-[500px] w-full flex flex-col items-start justify-start gap-4'>
                <Skeleton className='h-8 w-1/2 px-5'/>
                <Skeleton className='h-8 w-full px-5'/>
                <Skeleton className='h-8 w-full px-5'/>
                <Skeleton className='h-8 w-full px-5'/>
              </div>
            </CardContent>
        </Card>
        </div>
      )
    }

  return (
    <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                <CardTitle className='text-xl line-clamp-1'>
                    Category Page
                </CardTitle>
                <Button 
               className=' w-full lg:w-48' 
               size={'sm'}
               onClick={newcategory.onOpen}
               >
                <Plus size={16} className='mr-2' />
                    Add New
               </Button>
            </CardHeader>
            <CardContent className='lg:px-auto lg:mx-auto -m-4'>
              <div className="container mx-0 py-10">
                <DataTable 
                columns={columns} 
                data={categories} 
                filterKey='patientName'
                onDelete={(row) => {
                  const ids = row.map((r) => r.original.id);
                  deleteCategories.mutate({ids});
                }}
                disabled={isDisabled}
                />
              </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default CategoryPage