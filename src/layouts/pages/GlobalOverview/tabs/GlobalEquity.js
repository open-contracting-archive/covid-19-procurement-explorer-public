import React from 'react'
import { ContractEquityIndicators } from "../../../../components/Visualizations"
import { TenderTable } from "../../../../components/Tables"

const GlobalEquity = () => {
    function renderMainVisualization() {
        return (<ContractEquityIndicators />)
    }

    function renderTable() {
        return (<TenderTable />)
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

export default GlobalEquity
