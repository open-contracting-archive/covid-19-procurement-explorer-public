import React from 'react'
import { ProductCategoryMap } from '../../../../components/Visualizations'
import { ProductTable } from '../../../../components/Tables'
import { useCountry } from '../../../../context/CountryContext'
import { DataDisclaimerInfo } from '../../../../components/Utilities'

const CountryProducts = () => {
    const { country_code_alpha_2: countryCode, slug: countrySlug } =
        useCountry()

    return (
        <div>
            <DataDisclaimerInfo
                forwardUrl={`/country/${countrySlug}/methodology`}
            />

            <div className="w-full mb-12 global-profile">
                <ProductCategoryMap params={{ country: countryCode }} />
            </div>

            <ProductTable params={{ country: countryCode }} />
        </div>
    )
}

export default CountryProducts
