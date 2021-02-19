import React from 'react'
import { RedFlagSummary } from "../../../../components/Visualizations"
import { ContractTable } from '../../../../components/Tables'

const GlobalContracts = () => {
    function renderMainVisualization() {
        return (<RedFlagSummary />)
    }

    function renderTable() {
        return (<ContractTable />)
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

export default GlobalContracts
