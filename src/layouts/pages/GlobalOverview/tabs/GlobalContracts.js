import React from 'react'
import { ContractsRedFlags } from "../../../../components/Visualizations"
import { TenderTable } from '../../../../components/Tables'

const GlobalContracts = () => {
    function renderMainVisualization() {
        return (<ContractsRedFlags />)
    }

    function renderTable() {
        return (<TenderTable />)
    }

    return (
        <div>
            {/* <div className="w-full mb-12 global-profile">
                {renderMainVisualization()}
            </div> */}
            {renderTable()}
        </div>
    )
}

export default GlobalContracts
