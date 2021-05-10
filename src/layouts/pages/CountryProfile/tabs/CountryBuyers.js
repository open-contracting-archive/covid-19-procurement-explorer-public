import React from 'react'
import { BuyerTable } from '../../../../components/Tables'
import {
    Buyers,
    TotalContracts,
    TotalSpending
} from '../../../../components/Visualizations'
import { useCountry } from '../../../../context/CountryContext'
import { DataDisclaimerInfo } from '../../../../components/Utilities'

const CountryBuyers = () => {
    const { country_code_alpha_2: countryCode, slug: countrySlug } =
        useCountry()

    return (
        <div>
            <DataDisclaimerInfo
                forwardUrl={`/country/${countrySlug}/methodology`}
            />

            <div className="flex flex-wrap -mx-2 md:mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <Buyers params={{ country: countryCode }} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <TotalContracts
                        params={{ country: countryCode, buyer: 'notnull' }}
                    />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <TotalSpending
                        params={{ country: countryCode, buyer: 'notnull' }}
                    />
                </div>
            </div>
            <BuyerTable params={{ country: countryCode }} />
        </div>
    )
}

export default CountryBuyers
