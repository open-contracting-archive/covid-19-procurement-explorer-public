import React from 'react'
import { FeaturedInsights } from '../../../../components/Utilities'
import { InsightTable } from '../../../../components/Tables'
import useTrans from '../../../../hooks/useTrans'

const CountryInsights = (props) => {
    const { trans } = useTrans()

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
                {trans('Best practices and solutions from our database')}
            </h2>

            {renderTable()}
        </div>
    )
}

export default CountryInsights
