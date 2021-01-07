import React from 'react'
import ContractsIndicator from '../../../../components/ContractsIndicator/ContractsIndicator'
import { TenderTable } from '../../../../components/Tables'

const CountryContracts = ({ country }) => {
    return (
        <div>
            <div className="w-full px-2 mb-16 global-profile">
                <ContractsIndicator country={country} />
            </div>
            <TenderTable params={{ country: country }} />
        </div>
    )
}

export default CountryContracts
