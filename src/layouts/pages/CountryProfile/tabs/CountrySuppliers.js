import React from 'react'
import { SupplierTable } from '../../../../components/Tables'
import {
    Suppliers,
    TotalContracts,
    TotalSpending
} from '../../../../components/Visualizations'

const CountrySuppliers = (props) => {
    const { countryCode } = props

    return countryCode ? (
        <div>
            <div className="flex flex-wrap -mx-3 mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <Suppliers label="Suppliers" params={{ country: countryCode }} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalContracts
                        label="Total Contracts"
                        params={{ country: countryCode, supplier: 'notnull' }}
                    />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalSpending
                        label="Total Income"
                        params={{ country: countryCode, supplier: 'notnull' }}
                    />
                </div>
            </div>
            <SupplierTable params={{ country: countryCode }} />
        </div>
    ) : ('')
}

export default CountrySuppliers
