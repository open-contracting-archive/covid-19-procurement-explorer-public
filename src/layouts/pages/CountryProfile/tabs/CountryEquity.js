import React from 'react'
import PropTypes from 'prop-types'
import { ContractEquityIndicators } from '../../../../components/Visualizations'
import { ContractTable } from '../../../../components/Tables'

const CountryEquity = (props) => {
    const { countryCode, disclaimerInfo = null } = props

    function renderMainVisualization() {
        if (countryCode) {
            return (
                <ContractEquityIndicators params={{ country: countryCode }} />
            )
        }
    }

    function renderTable() {
        if (countryCode) {
            return <ContractTable params={{ country: countryCode }} />
        }
    }

    return (
        <div>
            {disclaimerInfo && disclaimerInfo}

            <div className="w-full mb-12 global-profile">
                {renderMainVisualization()}
            </div>

            {renderTable()}
        </div>
    )
}

CountryEquity.propTypes = {
    countryCode: PropTypes.string,
    disclaimerInfo: PropTypes.element
}

export default CountryEquity
