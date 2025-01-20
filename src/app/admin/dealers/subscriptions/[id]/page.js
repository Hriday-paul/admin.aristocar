import React from 'react';
import SubscriptionHistoryTable from './_components/SubscriptionHistoryTable';

const page = async ({ params }) => {

    const { id } = await params;

    return (
        <div>
            <SubscriptionHistoryTable id={id} />
        </div>
    );
};

export default page;