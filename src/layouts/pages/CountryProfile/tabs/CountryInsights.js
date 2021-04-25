import React from 'react'
import { T } from '@transifex/react'
import { FeaturedInsights } from '../../../../components/Utilities'
import { InsightTable } from '../../../../components/Tables'

const CountryInsights = (props) => {
    function renderFeaturedItems() {
        if (props.countryId) {
            return <FeaturedInsights params={{ country: props.countryId }} />
        }
    }

    function renderTable() {
        if (props.countryId) {
            return <InsightTable params={{ country: props.countryId }} />
        }
    }

    return (
        <div>
            {renderFeaturedItems()}

            <h2 className="font-normal text-lg mb-6">
                <T _str="Best practices and solutions from our database" />
            </h2>

            {renderTable()}
        </div>
    )
}

export default CountryInsights
