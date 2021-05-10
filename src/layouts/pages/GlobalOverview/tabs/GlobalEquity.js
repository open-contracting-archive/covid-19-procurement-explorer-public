import React from 'react'
import { ContractEquityIndicators } from '../../../../components/Visualizations'
import { ContractTable } from '../../../../components/Tables'
import { DataDisclaimerInfo } from '../../../../components/Utilities'

const GlobalEquity = () => {
    return (
        <div>
            <DataDisclaimerInfo forwardUrl={`/global-overview/methodology`} />

            <div className="w-full mb-12 global-profile">
                <ContractEquityIndicators />
            </div>

            <ContractTable />
        </div>
    )
}

export default GlobalEquity
