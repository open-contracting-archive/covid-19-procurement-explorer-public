import React from 'react'
import { Suppliers, TotalContracts, TotalSpending } from "../../../../components/Visualizations";
import SupplierTable from "../../../../components/Tables/SupplierTable";

const GlobalSuppliers = () => {
    return (
        <div>
            <div className="flex flex-wrap -mx-3 mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <Suppliers label="Suppliers" />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalContracts label="Total Contracts" params={{ supplier: 'notnull' }} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalSpending label="Total Income" params={{ supplier: 'notnull' }} />
                </div>
            </div>
            <SupplierTable />
        </div>
    )
}

export default GlobalSuppliers
