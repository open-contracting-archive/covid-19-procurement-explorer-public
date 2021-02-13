import React from 'react'
import { BuyerTable } from '../../../../components/Tables'
import {
    Buyers,
    TotalContracts,
    TotalSpending
} from '../../../../components/Visualizations'

const CountryBuyers = (props) => {
    const { countryCode } = props

    return countryCode ? (
        <div>
            <div className="flex flex-wrap -mx-3 mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <Buyers
                        params={{ country: countryCode }}
                    />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalContracts
                        params={{ country: countryCode, buyer: 'notnull' }}
                    />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalSpending
                        params={{ country: countryCode, buyer: 'notnull' }}
                    />
                </div>
            </div>
            <BuyerTable params={{ country: countryCode }} />
        </div>
    ) : (
        ''
    )
}

export default CountryBuyers
