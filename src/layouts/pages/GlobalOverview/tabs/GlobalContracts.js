import React from 'react'
import { RedFlagSummary } from '../../../../components/Visualizations'
import { ContractTable } from '../../../../components/Tables'
import { DataDisclaimerInfo } from '../../../../components/Utilities'

const GlobalContracts = () => {
    return (
        <div>
            <DataDisclaimerInfo forwardUrl={`/global-overview/methodology`} />

            <div className="w-full mb-12 global-profile">
                <RedFlagSummary />
            </div>

            <ContractTable />
        </div>
    )
}

export default GlobalContracts
