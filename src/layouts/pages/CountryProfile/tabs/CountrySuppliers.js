import React from 'react'
import PropTypes from 'prop-types'
import { SupplierTable } from '../../../../components/Tables'
import {
    Suppliers,
    TotalContracts,
    TotalSpending
} from '../../../../components/Visualizations'

const CountrySuppliers = (props) => {
    const { countryCode, disclaimerInfo = null } = props

    return countryCode ? (
        <div>
            {disclaimerInfo && disclaimerInfo}

            <div className="flex flex-wrap -mx-2 md:mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <Suppliers params={{ country: countryCode }} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <TotalContracts
                        params={{ country: countryCode, supplier: 'notnull' }}
                    />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <TotalSpending
                        label="Total Income"
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

CountrySuppliers.propTypes = {
    countryCode: PropTypes.string,
    disclaimerInfo: PropTypes.element
}

export default CountrySuppliers
