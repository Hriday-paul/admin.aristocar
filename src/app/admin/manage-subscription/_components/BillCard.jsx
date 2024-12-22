import React from 'react';
import AddEditModal from './AddEditModal';

const BillingCard = ({ cardData }) => {
    return (
        <div className="group relative overflow-hidden bg-[#F8FAFC] p-4 shadow-2 transition-all duration-300 hover:shadow-4 rounded-sm  border border-gray-300">
            <div className='z-10 relative'>
                <h4 className='text-2xl font-semibold font-satoshi text-black group-hover:text-white transition-all duration-300'>{cardData?.title}</h4>
                <p className='text-lg font-medium font-satoshi text-black group-hover:text-white transition-all duration-300 mt-3'>{cardData?.details}</p>
                <h3 className='text-3xl font-semibold font-satoshi text-black group-hover:text-white transition-all duration-300 mt-1'>€ {cardData?.price}</h3>

                <AddEditModal isEdit={true} data={{ title: cardData?.title, details: cardData?.details, price: cardData?.price }}>
                    <button className='bg-[#F8FAFC] w-full px-4 py-3 border border-primary text-primary mt-4 font-poppins font-medium text-base duration-300 transition-all'>
                        Edit
                    </button>
                </AddEditModal>
            </div>
            <span className="absolute -bottom-10 -right-10 z-0 h-8 w-8  rounded-full bg-secondary transition-all duration-500 group-hover:scale-[40]"></span>
        </div>
    );
};

export default BillingCard;