import React from 'react'
import { useParams } from 'react-router-dom'
import {
    WorldTimelineMap,
    WorldTimelineRaceBarChart,
    ProductsTimeline,
    ContractsCorrelation,
    ContractEquityIndicators,
    RedFlagSummary,
    CountrySuppliers
} from '../../../components/Visualizations'
import { useQuery } from '../../../helpers/general'
import Visualization from '../../../constants/Visualization'
import { NotFound } from '../../../components/Utilities'

const EmbeddedVisualization = () => {
    const { visualizationId } = useParams()
    const queryString = useQuery()

    switch (visualizationId) {
        case Visualization.WORLD_MAP_RACE:
            return <WorldTimelineMap />
        case Visualization.WORLD_TIMELINE_RACE_BAR:
            return <WorldTimelineRaceBarChart />
        case Visualization.PRODUCTS_TIMELINE:
            return (
                <ProductsTimeline
                    params={{ country: queryString.get('country') }}
                />
            )
        case Visualization.CONTRACTS_CORRELATION:
            return (
                <ContractsCorrelation
                    params={{ country: queryString.get('country') }}
                />
            )
        case Visualization.EQUITY_INDICATORS:
            return (
                <ContractEquityIndicators
                    params={{ country: queryString.get('country') }}
                />
            )
        case Visualization.RED_FLAG_SUMMARY:
            return (
                <RedFlagSummary
                    params={{ country: queryString.get('country') }}
                />
            )
        case Visualization.COUNTRY_SUPPLIERS:
            return (
                <CountrySuppliers
                    params={{ country: queryString.get('country') }}
                />
            )
        default:
            return <NotFound />
    }
}

export default EmbeddedVisualization
