import React from 'react'
import { RedFlagSummary } from "../../../../components/Visualizations"
import { TenderTable } from '../../../../components/Tables'

const CountryContracts = (props) => {
    function renderMainVisualization() {
        if (props.countryCode) {
            return (<RedFlagSummary params={{ country: props.countryCode }} />)
        }
    }

    function renderTable() {
        if (props.countryCode) {
            return (<TenderTable params={{ country: props.countryCode }} />)
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

export default CountryContracts
