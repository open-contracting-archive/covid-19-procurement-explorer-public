import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Select from 'react-select'
import { T } from '@transifex/react'
import { ChartFooter } from '../../../../components/Utilities'
import {
    ContractTrend,
    DirectOpenContractTrend,
    BuyerTrend,
    SupplierTrend
} from '../../../../components/Visualizations'
import Visualization from '../../../../constants/Visualization'
import ContractView from '../../../../constants/ContractView'
import { continentSelectList } from '../../../../helpers/country'

const options = continentSelectList

const visualizations = {
    [Visualization.TOTAL_SPENDING]: 'Total Spending',
    [Visualization.TOTAL_CONTRACTS]: 'Total Contracts',
    [Visualization.TOTAL_BUYERS]: 'Total Buyers',
    [Visualization.TOTAL_SUPPLIERS]: 'Total Suppliers',
    [Visualization.AVERAGE_BIDS]: 'Average Bids per Contract',
    [Visualization.DIRECT_OPEN]: 'Direct / Open',
    [Visualization.MONOPOLIZATION]: 'Monopolization'
}

const VisualizationModal = (props) => {
    const { visualizationType, closeModal } = props
    const [selectedContinent, setSelectedContinent] = useState(null)
    const fullScreenHandler = useFullScreenHandle()
    const getVisualizationTitle = () => {
        return Object.keys(visualizations).includes(visualizationType)
            ? visualizations[visualizationType]
            : ''
    }

    const renderMainVisualization = () => {
        switch (visualizationType) {
            case Visualization.TOTAL_SPENDING:
                return (
                    <ContractTrend
                        viewType={ContractView.VALUE}
                        selectedContinent={selectedContinent}
                    />
                )
            case Visualization.TOTAL_CONTRACTS:
                return (
                    <ContractTrend
                        viewType={ContractView.NUMBER}
                        selectedContinent={selectedContinent}
                    />
                )
            case Visualization.DIRECT_OPEN:
                return (
                    <DirectOpenContractTrend
                        selectedContinent={selectedContinent}
                    />
                )
            case Visualization.TOTAL_BUYERS:
                return <BuyerTrend selectedContinent={selectedContinent} />
            case Visualization.TOTAL_SUPPLIERS:
                return <SupplierTrend selectedContinent={selectedContinent} />
            default:
                return <ContractTrend />
        }
    }

    const handleContinentSelection = (selectedOption) => {
        setSelectedContinent(selectedOption)
    }

    return (
        <div className="p-4 -m-8 overflow-y-auto bar-chart-race-modal">
            <FullScreen handle={fullScreenHandler}>
                <div className="flex justify-between">
                    <h3 className="font-bold uppercase text-primary-dark">
                        <T _str={getVisualizationTitle()} />
                    </h3>
                    <button
                        className="icon-close"
                        title="Close"
                        onClick={closeModal}
                    />
                </div>

                <div className="mt-2 bg-white rounded">
                    <div className="flex">
                        <div className="flex-1">
                            <div className="relative z-10 w-2/3 md:w-1/5">
                                <Select
                                    className="text-sm select-filter"
                                    classNamePrefix="select-filter"
                                    options={options}
                                    defaultValue={options[0]}
                                    isSearchable={false}
                                    onChange={(selectedOption) =>
                                        handleContinentSelection(selectedOption)
                                    }
                                />
                            </div>

                            {renderMainVisualization()}
                        </div>
                    </div>
                </div>
            </FullScreen>

            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}
VisualizationModal.propTypes = {
    visualizationType: PropTypes.string,
    closeModal: PropTypes.func
}

export default VisualizationModal
