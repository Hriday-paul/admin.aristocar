'use client'
import { useReactToPrint } from "react-to-print";

import React, { useRef } from 'react';

const Print = ({ children, clicker, title, landscape = false }) => {
    const contentToPrint = useRef(null);
    // const styles = useSelector((state: RootState) => state.styles);

    const handlePrint = useReactToPrint({
        documentTitle: title,
        content: () => contentToPrint.current,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
        pageStyle: `@page { size: ${landscape ? 'landscape' : 'auto'}; margin: 10mm; }`
    });

    return (
        <div>
            <span onClick={handlePrint}>
                {clicker}
            </span>
            <div className="overflow-hidden h-0 hidden">
                <div ref={contentToPrint}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Print;