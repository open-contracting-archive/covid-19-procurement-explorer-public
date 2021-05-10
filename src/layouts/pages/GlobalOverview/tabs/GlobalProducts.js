import React from 'react'
import { ProductCategoryMap } from '../../../../components/Visualizations'
import { ProductTable } from '../../../../components/Tables'
import { DataDisclaimerInfo } from '../../../../components/Utilities'

const GlobalProducts = () => {
    return (
        <div>
            <DataDisclaimerInfo forwardUrl={`/global-overview/methodology`} />

            <div className="w-full mb-12 global-profile">
                <ProductCategoryMap />
            </div>

            <ProductTable />
        </div>
    )
}

export default GlobalProducts
