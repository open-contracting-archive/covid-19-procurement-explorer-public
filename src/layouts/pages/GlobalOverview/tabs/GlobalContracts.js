import React from 'react'
import PropTypes from 'prop-types'
import { RedFlagSummary } from '../../../../components/Visualizations'
import { ContractTable } from '../../../../components/Tables'

const GlobalContracts = (props) => {
    const { disclaimerInfo = null } = props

    function renderMainVisualization() {
        return <RedFlagSummary />
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

GlobalContracts.propTypes = {
    disclaimerInfo: PropTypes.element
}

export default GlobalContracts
