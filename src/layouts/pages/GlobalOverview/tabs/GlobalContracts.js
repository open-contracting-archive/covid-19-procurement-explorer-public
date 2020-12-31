import React from 'react'
import ContractsIndicator from '../../../../components/ContractsIndicator/ContractsIndicator'
import { TenderTable } from "../../../../components/Tables";

const GlobalContracts = ({ selectedCountry }) => {
    return (
        <div>
            <div className="w-full px-2 mb-16 global-profile">
                <ContractsIndicator />
            </div>
            <TenderTable country={selectedCountry} />
        </div>
    )
}

export default GlobalContracts
