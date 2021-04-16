import React from 'react'
import { ProductCategoryMap } from '../../../../components/Visualizations'
import { ProductTable } from '../../../../components/Tables'

const CountryProducts = (props) => {
    const { countryCode, disclaimerInfo = null } = props

    function renderMainVisualization() {
        if (countryCode) {
            return <ProductCategoryMap params={{ country: countryCode }} />
        }
    }

    function renderTable() {
        if (countryCode) {
            return <ProductTable params={{ country: countryCode }} />
        }
    }

    return (
        <div>
            {disclaimerInfo && disclaimerInfo}

            <div className="w-full mb-12 global-profile">
                {renderMainVisualization()}
            </div>

            {renderTable()}
        </div>
    )
}

export default CountryProducts
