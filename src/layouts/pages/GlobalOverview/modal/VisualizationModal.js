import React, { useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Select from 'react-select'
import useTrans from '../../../../hooks/useTrans'
import ChartFooter from '../../../../components/Utilities/ChartFooter'
import ContractTrend from '../../../../components/Visualizations/ContractTrend'
import Visualization from '../../../../constants/Visualization'
import ContractView from '../../../../constants/ContractView'
import { continentSelectList } from '../../../../helpers/country'
import DirectOpenContractTrend from '../../../../components/Visualizations/DirectOpenContractTrend'
import BuyerTrend from '../../../../components/Visualizations/BuyerTrend'
import SupplierTrend from '../../../../components/Visualizations/SupplierTrend'

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

    const { trans } = useTrans()

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
        <div className="bar-chart-race-modal overflow-hidden -m-8 p-4">
            <FullScreen handle={fullScreenHandler}>
                <div className="flex justify-between">
                    <h3 className="uppercase font-bold text-primary-dark">
                        {trans(getVisualizationTitle())}
                    </h3>
                    <button
                        className="icon-close"
                        title="Close"
                        onClick={closeModal}></button>
                </div>

                <div className="bg-white rounded mt-2">
                    <div className="flex">
                        <div className="flex-1">
                            <div className="w-1/5">
                                <Select
                                    className="select-filter text-sm"
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

export default VisualizationModal
