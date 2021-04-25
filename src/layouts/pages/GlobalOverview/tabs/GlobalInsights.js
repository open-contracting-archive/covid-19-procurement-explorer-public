import React from 'react'
import { T } from '@transifex/react'
import { FeaturedInsights } from '../../../../components/Utilities'
import { InsightTable } from '../../../../components/Tables'

const GlobalInsights = () => {
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
                <T _str="Best practices and solutions from our database" />
            </h2>

            {renderTable()}
        </div>
    )
}

export default GlobalInsights
