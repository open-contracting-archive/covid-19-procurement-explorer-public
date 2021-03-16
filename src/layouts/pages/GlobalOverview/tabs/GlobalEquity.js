import React from 'react'
import { ContractEquityIndicators } from '../../../../components/Visualizations'
import { ContractTable } from '../../../../components/Tables'
import { Link } from 'react-router-dom'

const GlobalEquity = (props) => {
    const { disclaimerInfo = null } = props

    function renderMainVisualization() {
        return <ContractEquityIndicators />
    }

    function renderTable() {
        return <ContractTable />
    }

    return (
        <div>
            {disclaimerInfo && disclaimerInfo}

            <div className="hidden md:-mt-10 mb-6">
                <p>
                    Data displayed on the COVID Contract Explorer can be
                    incomplete.
                </p>
                <p>
                    Please, check the Caveats and Limitations section of the{' '}
                    <Link
                        to="/global-overview/methodology"
                        className="text-primary-blue">
                        data harvesting methodology
                    </Link>
                </p>
            </div>
            <div className="w-full mb-12 global-profile">
                {renderMainVisualization()}
            </div>

            {renderTable()}
        </div>
    )
}

export default GlobalEquity
