import React from 'react'
import ContractsIndicator from '../../../../components/ContractsIndicator/ContractsIndicator'
import { TenderTable } from "../../../../components/Tables";

const CountryContracts = (props) => {
    return (
        <div>
            <div className="w-full px-2 mb-16 global-profile">
                <ContractsIndicator country={props.country} />
            </div>
            <TenderTable country={props.country} />
        </div>
    )
}

export default CountryContracts
