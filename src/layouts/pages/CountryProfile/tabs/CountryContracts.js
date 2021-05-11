import React from 'react'
import { RedFlagSummary } from '../../../../components/Visualizations'
import { ContractTable } from '../../../../components/Tables'
import { useCountry } from '../../../../context/CountryContext'
import { DataDisclaimerInfo } from '../../../../components/Utilities'

const CountryContracts = () => {
    const { country_code_alpha_2: countryCode, slug: countrySlug } =
        useCountry()

    return (
        <div>
            <DataDisclaimerInfo
                forwardUrl={`/country/${countrySlug}/methodology`}
            />

            <div className="w-full mb-12 global-profile">
                <RedFlagSummary params={{ country: countryCode }} />
            </div>

            <ContractTable params={{ country: countryCode }} />
        </div>
    )
}

export default CountryContracts
