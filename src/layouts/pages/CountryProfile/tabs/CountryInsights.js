import React from 'react'
import { T } from '@transifex/react'
import { FeaturedInsights } from '../../../../components/Utilities'
import { InsightTable } from '../../../../components/Tables'
import { useCountry } from '../../../../context/CountryContext'

const CountryInsights = () => {
    const { id: countryId } = useCountry()

    return (
        <div>
            <FeaturedInsights params={{ country: countryId }} />

            <h2 className="font-normal text-lg mb-6">
                <T _str="Best practices and solutions from our database" />
            </h2>

            <InsightTable params={{ country: countryId }} />
        </div>
    )
}

export default CountryInsights
