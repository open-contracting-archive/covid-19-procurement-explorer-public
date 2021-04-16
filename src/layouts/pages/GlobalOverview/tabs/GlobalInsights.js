import React from 'react'
import useTrans from '../../../../hooks/useTrans'
import { FeaturedInsights } from '../../../../components/Utilities'
import { InsightTable } from '../../../../components/Tables'

const GlobalInsights = () => {
    const { trans } = useTrans()

    function renderFeaturedItems() {
        return <FeaturedInsights />
    }

    function renderTable() {
        return <InsightTable />
    }

    return (
        <div>
            {renderFeaturedItems()}

            <h2 className="text-lg font-normal md:mb-6">
                {trans('Best practices and solutions from our database')}
            </h2>

            {renderTable()}
        </div>
    )
}

export default GlobalInsights
