import React from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import useTrans from '../../../../hooks/useTrans'
import { ReactComponent as ChartsIcon } from '../../../../assets/img/icons/ic_charts.svg'
import { ReactComponent as MapIcon } from '../../../../assets/img/icons/ic_map.svg'
import { ReactComponent as TableIcon } from '../../../../assets/img/icons/ic_table.svg'
import { ReactComponent as SourcesIcon } from '../../../../assets/img/icons/ic_sources.svg'
import WorldTimelineMap from '../../../../components/Visualizations/WorldTimelineMap'
import WorldTimelineRaceBarMap from '../../../../components/Visualizations/WorldTimelineRaceBarMap'
import { ShortTenderTable } from '../../../../components/Tables'
import ChartFooter from "../../../../components/Utilities/ChartFooter"

const WorldMapRace = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()
    const url = () => {
        window.location.href
    }

    return (
        <section className="pt-16 bg-primary-gray pb-24">
            <div className="text-center mb-10">
                <h3 className="uppercase text-3xl font-bold leading-none">
                    <span className="block text-base font-bold">
                        {trans('Explore')}
                    </span>
                    {trans('Countries')}
                </h3>
                <p className="text-base text-opacity-50  text-primary-dark">
                    {trans('Government spending to fight COVID-19')}
                </p>
            </div>
            <div className="container mx-auto">
                <div
                    className="bg-white rounded p-6 simple-tab flex flex-col justify-between"
                    style={{ minHeight: '900px' }}>
                    <FullScreen handle={fullScreenHandler}>
                        <Tabs>
                            <div className="flex">
                                <div className="flex w-full">
                                    <div className="worldmap-tab">
                                        <TabList>
                                            <Tab>
                                                <MapIcon className="inline-block" />
                                                <span className="text-sm mt-1 inline-block">
                                                    {trans('Map')}
                                                </span>
                                            </Tab>
                                            <Tab>
                                                <ChartsIcon className="inline-block" />
                                                <span className="text-sm mt-1 inline-block">
                                                    {trans('Charts')}
                                                </span>
                                            </Tab>
                                            <Tab>
                                                <TableIcon className="inline-block" />
                                                <span className="text-sm mt-1 inline-block">
                                                    {trans('Table')}
                                                </span>
                                            </Tab>
                                            <Tab>
                                                <SourcesIcon className="inline-block" />
                                                <span className="text-sm mt-1 inline-block">
                                                    {trans('Sources')}
                                                </span>
                                            </Tab>
                                        </TabList>
                                    </div>
                                    <div
                                        className="flex-1 relative"
                                        style={{
                                            width: 'calc(100% - 91px)'
                                        }}>
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
                                            Sources section coming soon !!
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
                    <a href="#" className="inline-block ml-2 text-primary-blue">
                        {trans('Here’s how you can add your country data')}
                    </a>
                </p>
            </div>
        </section>
    )
}

export default WorldMapRace
