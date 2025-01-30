'use client'
import { useReactToPrint } from "react-to-print";

import React, { useRef } from 'react';

const Print = ({ children, clicker, title, landscape = false }) => {
    const contentRef = useRef(null);
    // const styles = useSelector((state: RootState) => state.styles);

    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        pageStyle: `@page { margin: 10mm;`
    });

    return (
        <div>
            <span onClick={handlePrint}>
                {clicker}
            </span>
            <div className="overflow-hidden h-0 hidden">
                <div ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Print;