import React from 'react'
import { Link } from 'react-router-dom'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import useTrans from '../../../../hooks/useTrans'
import WorldTimelineMap from '../../../../components/Visualizations/WorldTimelineMap'
import WorldTimelineRaceBarMap from '../../../../components/Visualizations/WorldTimelineRaceBarMap'
import { ShortTenderTable } from '../../../../components/Tables'
import ChartFooter from '../../../../components/Utilities/ChartFooter'
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
    const fullScreenHandler = useFullScreenHandle()

    return (
        <section className="pt-16 bg-primary-gray pb-8 md:pb-24">
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
            <div className="container mx-auto px-2 md:px-0">
                <div className="md:bg-white md:rounded md:p-4 simple-tab md:flex md:flex-col md:justify-between world-map-section">
                    <FullScreen handle={fullScreenHandler}>
                        <Tabs>
                            <div className="flex">
                                <div className="flex flex-wrap md:flex-no-wrap w-full">
                                    <div className="worldmap-tab w-full md:w-auto">
                                        <TabList>
                                            <Tab>
                                                <MapIcon className="inline-block" />
                                                <span className="text-xs md:text-sm mt-1 block md:inline-block">
                                                    {trans('Map')}
                                                </span>
                                            </Tab>
                                            <Tab>
                                                <ChartsIcon className="inline-block" />
                                                <span className="text-xs md:text-sm mt-1 block md:inline-block">
                                                    {trans('Charts')}
                                                </span>
                                            </Tab>
                                            <Tab>
                                                <TableIcon className="inline-block" />
                                                <span className="text-xs md:text-sm mt-1 block md:inline-block">
                                                    {trans('Statistics')}
                                                </span>
                                            </Tab>
                                            <Tab>
                                                <SourcesIcon className="inline-block" />
                                                <span className="text-xs md:text-sm mt-1 block md:inline-block">
                                                    {trans('Sources')}
                                                </span>
                                            </Tab>
                                        </TabList>
                                    </div>
                                    <div className="bg-white world-map-chart-section py-8 px-3 md:py-0 md:px-0 flex-1 relative">
                                        <TabPanel>
                                            <WorldTimelineMap />
                                        </TabPanel>
                                        <TabPanel>
                                            <WorldTimelineRaceBarMap />
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="pb-4">
                                                <ShortTenderTable />
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <CmsPageContent slug={'sources'} />
                                        </TabPanel>
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </FullScreen>

                    <ChartFooter fullScreenHandler={fullScreenHandler} />
                </div>
                <p className="mt-6 text-center text-sm">
                    {trans('Don’t see your country data?')}
                    <Link
                        to="/pages/add-my-country-data"
                        className="inline-block ml-2 text-primary-blue">
                        {trans('Here’s how you can add your country data')}
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default MainVisualization
