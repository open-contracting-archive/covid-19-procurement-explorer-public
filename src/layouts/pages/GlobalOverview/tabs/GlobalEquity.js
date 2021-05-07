import React from 'react'
import PropTypes from 'prop-types'
import { ContractEquityIndicators } from '../../../../components/Visualizations'
import { ContractTable } from '../../../../components/Tables'

const GlobalEquity = (props) => {
    const { disclaimerInfo = null } = props

    function renderMainVisualization() {
        return <ContractEquityIndicators />
    }

    function renderTable() {
        return <ContractTable />
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

GlobalEquity.propTypes = {
    disclaimerInfo: PropTypes.element
}
export default GlobalEquity
