import React from 'react'
import { RedFlagSummary } from "../../../../components/Visualizations"
import { ContractTable } from '../../../../components/Tables'

const CountryContracts = (props) => {
    const { countryCode, disclaimerInfo = null } = props

    function renderMainVisualization() {
        if (countryCode) {
            return (<RedFlagSummary params={{ country: countryCode }} />)
        }
    }

    function renderTable() {
        if (countryCode) {
            return (<ContractTable params={{ country: countryCode }} />)
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

export default CountryContracts
