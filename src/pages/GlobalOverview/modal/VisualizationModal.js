import React, { useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import useTrans from "../../../hooks/useTrans"
import ContinentSelector from "../../../components/Visualizations/ContinentSelector"
import ChartFooter from "../../../components/Utilities/ChartFooter"
import ContractTrend from "../../../components/Visualizations/ContractTrend"
import Visualization from "../../../constants/Visualization"
import ContractView from "../../../constants/ContractView"

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
        return Object.keys(visualizations).includes(visualizationType) ? visualizations[visualizationType] : ''
    }

    const renderMainVisualization = () => {
        switch (visualizationType) {
            case Visualization.TOTAL_SPENDING:
                return (<ContractTrend viewType={ContractView.VALUE} selectedContinent={selectedContinent} />)
            case Visualization.TOTAL_CONTRACTS:
                return (<ContractTrend viewType={ContractView.NUMBER} selectedContinent={selectedContinent} />)
            case Visualization.AVERAGE_BIDS:
                return (<ContractTrend />)
            default:
                return (<ContractTrend />)
        }
    }

    return (
        <div>
            <FullScreen handle={fullScreenHandler}>
                <div className="flex justify-between">
                    <h3 className="uppercase font-bold text-primary-dark">
                        {trans(getVisualizationTitle())}
                    </h3>
                    <button
                        className="icon-close"
                        title="Close"
                        onClick={closeModal}>
                    </button>
                </div>

                <div className="bg-white rounded mt-4">
                    <div className="flex simple-tab">
                        <div className="flex-1">
                            <ContinentSelector handleContinentSelection={(value) => setSelectedContinent(value)} />

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
