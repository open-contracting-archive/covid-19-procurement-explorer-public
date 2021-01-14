import React from 'react'
import { TenderTable } from '../../../../components/Tables'
import ContractsIndicator from '../../../../components/ContractsIndicator/ContractsIndicator'

const GlobalContracts = () => {
    return (
        <div>
            {/* <div className="w-full px-2 mb-16 global-profile">
                <ContractsIndicator />
            </div> */}

            <TenderTable params={{}} />
        </div>
    )
}

export default GlobalContracts
