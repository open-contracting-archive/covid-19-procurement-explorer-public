import React from 'react'
import PropTypes from 'prop-types'
import { ProductCategoryMap } from '../../../../components/Visualizations'
import { ProductTable } from '../../../../components/Tables'

const GlobalProducts = (props) => {
    const { disclaimerInfo = null } = props

    function renderMainVisualization() {
        return <ProductCategoryMap />
    }

    function renderTable() {
        return <ProductTable />
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

GlobalProducts.propTypes = {
    disclaimerInfo: PropTypes.element
}

export default GlobalProducts
