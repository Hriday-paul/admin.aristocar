import moment from 'moment';
import React from 'react';

const SheetContent = ({ payments }) => {
    console.log(payments)
    return (
        <div>
            <div className="py-10 mx-auto">
                <table className="border border-stroke min-w-32 w-full">
                    <thead>
                        <th>Serial</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company Name</th>
                        <th>Dealership</th>
                        <th>Vat Num</th>
                        <th>Amount</th>
                        <th>Vat amount</th>
                        <th>TranId</th>
                    </thead>
                    <tbody className="p-5">
                        {
                            payments?.map((payment, indx) => {
                                return <tr key={payment?._id} className={`border border-stroke ${indx % 2 == 0 ? 'bg-slate-100' : ''}`}>
                                    <td className="p-1 min-w-10 border-r border-r-stroke">{indx + 1}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{moment(payment?.createdAt).format("DD MMMM YYYY")}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{payment?.user?.name}</td>
                                    <td className="p-1 min-w-32 border-r border-r-stroke">{payment?.user?.email}</td>
                                    <td className="p-1 min-w-36 border-r border-r-stroke">{payment?.user?.companyName}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{payment?.user?.dealership}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{payment?.user?.dealer_address?.vat_id}</td>
                                    <td className="p-1 min-w-16 border-r border-r-stroke">{payment?.amount}</td>
                                    <td className="p-1 min-w-16 border-r border-r-stroke">{payment?.vatAmount}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{payment?.tranId}</td>

                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SheetContent;