import React from 'react'
import { BuyerTable } from '../../../../components/Tables'
import {
    Buyers,
    TotalContracts,
    TotalSpending
} from '../../../../components/Visualizations'

const CountryBuyers = ({ country }) => {
    return (
        <div>
            <div className="flex flex-wrap -mx-3 mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <Buyers label="Buyers" params={{ country: `${country}` }} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalContracts
                        label="Total Contracts"
                        params={{ country: `${country}`, buyer: 'notnull' }}
                    />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalSpending
                        label="Total Spending"
                        params={{ country: `${country}`, buyer: 'notnull' }}
                    />
                </div>
            </div>
            <BuyerTable params={{ country }} />
        </div>
    )
}

export default CountryBuyers
