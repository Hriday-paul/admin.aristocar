'use client'
import React from 'react';
import BillingCard from './BillCard';
import AddEditModal from './AddEditModal';
import { useGetPackagesQuery } from '@/redux/api/packageApi';
import { ImSpinner8 } from "react-icons/im"


const ManageSubscription = () => {
    const { isLoading, data, isSuccess } = useGetPackagesQuery();

    return (
        <div className='text-white'>

            {/* ---------billing cards--------------- */}

            <div className="my-5 lg:my-8 w-fit mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
                {
                    isLoading ? <div className="min-h-80 flex justify-center items-center">
                        <ImSpinner8 className="text-4xl text-white animate-spin" />
                    </div> : isSuccess ? data?.data?.data?.map(card => {
                        return <BillingCard key={card?.id} cardData={card} />
                    }) : <></>
                }
            </div>
            {/* ---------add bill cards--------------- */}
            <center>
                <AddEditModal isEdit={false} data={{}}>
                    <button className='bg-[#F8FAFC] w-full md:w-1/2 xl:w-1/3 mx-auto px-4 py-3 border border-primary text-primary mt-4 font-poppins font-medium text-base duration-300 transition-all'>
                        Add New
                    </button>
                </AddEditModal>
            </center>
        </div>
    );
};

export default ManageSubscription;