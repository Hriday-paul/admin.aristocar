import React from 'react';
import AddEditModal from './AddEditModal';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { useDeletePackageMutation } from '@/redux/api/packageApi';
import toast from 'react-hot-toast';

const BillingCard = ({ cardData }) => {

    const [delefn] = useDeletePackageMutation()

    const deletePackage = async (id) => {
        const loadingToast = toast.loading('loading...')
        try {
            const res = await delefn(id).unwrap();
            SuccessModal(res?.message || "Package delete successfully");
        } catch (error) {
            ErrorModal(error?.message || error?.data?.message || "Something went wrong, try again");
        } finally {
            toast.dismiss(loadingToast)
        }
    }

    return (
        <div className="group relative overflow-hidden bg-[#F8FAFC] p-4 shadow-2 transition-all duration-300 hover:shadow-4 rounded-sm  border border-gray-300 w-80">
            <div className='z-10 relative'>
                <h4 className='text-2xl font-semibold font-satoshi text-black group-hover:text-white transition-all duration-300'>{cardData?.shortTitle}</h4>

                <h5 className='text-base font-semibold font-satoshi text-black group-hover:text-white transition-all duration-300 mt-1'>Up to {cardData?.carCreateLimit} listings</h5>

                <p className='text-sm font-medium font-satoshi text-zinc-900 group-hover:text-white transition-all duration-300 my-2'>{cardData?.shortDescription}</p>

                <h3 className='text-3xl font-semibold font-satoshi text-black group-hover:text-white transition-all duration-300 mt-1'>€ {cardData?.price}
                    <span className='text-base'> / {cardData?.durationDay}</span>
                </h3>

                <section className='grid grid-cols-2 gap-x-2 items-center'>
                    <AddEditModal isEdit={true} data={{ title: cardData?.shortTitle, details: cardData?.shortDescription, price: cardData?.price.toString(), limit: cardData?.carCreateLimit.toString(), duration: cardData?.durationDay.toString(), id: cardData?._id }}>
                        <button className='bg-[#F8FAFC] w-full px-4 py-3 border border-primary text-primary mt-4 font-poppins font-medium text-base duration-300 transition-all'>
                            Edit
                        </button>
                    </AddEditModal>
                    <CustomConfirm
                        title="Remove Package"
                        description="Are you sure remove this package?"
                        onConfirm={() => deletePackage(cardData?._id)}
                    >
                        <button className='bg-[#F8FAFC] w-full px-4 py-3 border border-primary text-primary mt-4 font-poppins font-medium text-base duration-300 transition-all'>
                            Delete
                        </button>
                    </CustomConfirm>
                </section>
            </div>
            <span className="absolute -bottom-10 -right-10 z-0 h-8 w-8  rounded-full bg-secondary transition-all duration-500 group-hover:scale-[40]"></span>
        </div>
    );
};

export default BillingCard;