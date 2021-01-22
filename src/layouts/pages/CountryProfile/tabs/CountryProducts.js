import React from 'react'
import ProductCategoryMap from "../../../../components/Visualizations/Common/ProductCategoryMap"
import { ProductTable } from "../../../../components/Tables"

const CountryProducts = (props) => {
    function renderMainVisualization() {
        if (props.countryCode) {
            return (<ProductCategoryMap params={{ country: props.countryCode }} />)
        }
    }

    function renderTable() {
        if (props.countryCode) {
            return (<ProductTable params={{ country: props.countryCode }} />)
        }
    }

    return (
        <div>
            <div className="w-full mb-12 global-profile">
                {renderMainVisualization()}
            </div>

            {renderTable()}
        </div>
    )
}

export default CountryProducts
