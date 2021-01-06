import React from 'react'
import {
    Buyers,
    TotalContracts,
    TotalSpending
} from '../../../../components/Visualizations'
import BuyerTable from '../../../../components/Tables/BuyerTable'

const GlobalBuyers = () => {
    return (
        <div>
            <div className="flex flex-wrap -mx-3 mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <Buyers label="Buyers" />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalContracts label="Total Contracts" params={{ buyer: "notnull" }} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalSpending label="Total Spending" params={{ buyer: "notnull" }} />
                </div>
            </div>
            <BuyerTable />
        </div>
    )
}

export default GlobalBuyers
