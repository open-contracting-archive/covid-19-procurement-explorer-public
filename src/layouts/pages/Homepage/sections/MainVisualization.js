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
        <section className="px-4 pt-16 pb-8 md:px-0 bg-primary-gray md:pb-24">
            <div className="mb-6 text-center md:mb-10">
                <h3 className="text-2xl font-bold leading-none uppercase md:text-3xl">
                    <span className="block text-base font-bold">
                        {trans('Explore')}
                    </span>
                    {trans('Countries')}
                </h3>
                <p className="text-xs text-opacity-50 md:text-base text-primary-dark">
                    {trans('Government spending to fight COVID-19')}
                </p>
            </div>
            <div className="container mx-auto">
                <div className="simple-tab md:flex md:flex-col md:justify-between world-map-section">
                    <div className="flex">
                        <div className="relative flex flex-wrap w-full md:flex-no-wrap">
                            <div className="relative top-0 left-0 z-20 w-full md:absolute worldmap-tab md:w-auto md:m-5 md:ml-4">
                                <div>
                                    <div className="justify-between product-worldmap-tab md:justify-start">
                                        <div
                                            className={`product-worldmap-tablist text-center cursor-pointer mb-2 ${
                                                tabView === 'map' && 'active'
                                            }`}
                                            onClick={() => setTabView('map')}>
                                            <div>
                                                <MapIcon className="inline-block w-4 h-4" />
                                                <span className="block mt-1 text-xs md:text-sm">
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
                                                <span className="block mt-1 text-xs md:text-sm">
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
                                                <span className="block mt-1 text-xs md:text-sm">
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
                                                <span className="block mt-1 text-xs md:text-sm">
                                                    {trans('Sources')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex-1 w-full world-map-chart-section">
                                {renderTabComponent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="mt-6 text-sm text-center">
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
