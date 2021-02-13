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
            <div className="flex flex-wrap -mx-2 mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <Suppliers
                        params={{ country: countryCode }}
                    />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <TotalContracts
                        params={{ country: countryCode, supplier: 'notnull' }}
                    />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <TotalSpending
                        helpText="Total value of COVID related contracts "
                        params={{ country: countryCode, supplier: 'notnull' }}
                    />
                </div>
            </div>
            <SupplierTable params={{ country: countryCode }} />
        </div>
    ) : (
        ''
    )
}

export default CountrySuppliers
