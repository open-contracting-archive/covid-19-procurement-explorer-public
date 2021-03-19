import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useTrans from '../../../../hooks/useTrans'
import WorldTimelineMap from '../../../../components/Visualizations/WorldTimelineMap'
import WorldTimelineRaceBarChart from '../../../../components/Visualizations/WorldTimelineRaceBarChart'
import { OverallStatisticsTable } from '../../../../components/Tables'
import CmsPageContent from '../../StaticPage/CmsPageContent'
import { ReactComponent as ChartsIcon } from '../../../../assets/img/icons/ic_charts.svg'
import { ReactComponent as MapIcon } from '../../../../assets/img/icons/ic_map.svg'
import { ReactComponent as TableIcon } from '../../../../assets/img/icons/ic_table.svg'
import { ReactComponent as SourcesIcon } from '../../../../assets/img/icons/ic_sources.svg'

const MainVisualization = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { trans } = useTrans()
    const [tabView, setTabView] = useState('map')

    const renderTabComponent = () => {
        switch (tabView) {
            case 'map':
                return <WorldTimelineMap />
            case 'chart':
                return <WorldTimelineRaceBarChart />
            case 'table':
                return <OverallStatisticsTable />
            case 'sources':
                return <CmsPageContent slug={'sources'} />
            default:
                return <WorldTimelineMap />
        }
    }

    return (
        <section className="px-4 md:px-0 pt-16 bg-primary-gray pb-8 md:pb-24">
            <div className="text-center mb-6 md:mb-10">
                <h3 className="uppercase text-2xl md:text-3xl font-bold leading-none">
                    <span className="block text-base font-bold">
                        {trans('Explore')}
                    </span>
                    {trans('Countries')}
                </h3>
                <p className="text-xs md:text-base text-opacity-50 text-primary-dark">
                    {trans('Government spending to fight COVID-19')}
                </p>
            </div>
            <div className="container mx-auto">
                <div className="simple-tab md:flex md:flex-col md:justify-between world-map-section">
                    <div className="flex">
                        <div className="flex flex-wrap md:flex-no-wrap w-full relative">
                            <div className="relative md:absolute left-0 top-0 z-20 worldmap-tab w-full md:w-auto md:m-5 md:ml-4">
                                <div>
                                    <div className="product-worldmap-tab justify-between md:justify-start">
                                        <div
                                            className={`product-worldmap-tablist text-center cursor-pointer mb-2 ${
                                                tabView === 'map' && 'active'
                                            }`}
                                            onClick={() => setTabView('map')}>
                                            <div>
                                                <MapIcon className="w-4 h-4 inline-block" />
                                                <span className="text-xs md:text-sm mt-1 block">
                                                    {trans('Map')}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`product-worldmap-tablist text-center cursor-pointer mb-2 ${
                                                tabView === 'chart' && 'active'
                                            }`}
                                            onClick={() => setTabView('chart')}>
                                            <div>
                                                <ChartsIcon className="inline-block" />
                                                <span className="text-xs md:text-sm mt-1 block">
                                                    {trans('Chart')}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`product-worldmap-tablist text-center cursor-pointer mb-2 ${
                                                tabView === 'table' && 'active'
                                            }`}
                                            onClick={() => setTabView('table')}>
                                            <div>
                                                <TableIcon className="inline-block" />
                                                <span className="text-xs md:text-sm mt-1 block">
                                                    {trans('Statistics')}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`product-worldmap-tablist text-center cursor-pointer mb-2 ${
                                                tabView === 'sources' &&
                                                'active'
                                            }`}
                                            onClick={() =>
                                                setTabView('sources')
                                            }>
                                            <div>
                                                <SourcesIcon className="inline-block" />
                                                <span className="text-xs md:text-sm mt-1 block">
                                                    {trans('Sources')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-auto world-map-chart-section flex-1 relative">
                                {renderTabComponent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="mt-6 text-center text-sm">
                {trans('Don’t see your country data?')}
                <Link
                    to="/pages/add-my-country-data"
                    className="inline-block ml-2 text-primary-blue">
                    {trans('Here’s how you can add your country data')}
                </Link>
            </p>
        </section>
    )
}

export default MainVisualization
