import React from 'react'
import { Link } from 'react-router-dom'
import { SupplierTable } from '../../../../components/Tables'
import { Suppliers, TotalContracts, TotalSpending } from '../../../../components/Visualizations'

const CountrySuppliers = ({ country }) => {
    return (
        <div>
            <div className="flex flex-wrap -mx-3 mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <Suppliers label="Suppliers" />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalContracts label="Total Contracts" params={{ country: `${country}`, supplier: 'notnull' }} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalSpending label="Total Income" params={{ country: `${country}`, supplier: 'notnull' }} />
                </div>
            </div>
            <SupplierTable params={{ country }} />
        </div>
    )
}

export default CountrySuppliers
