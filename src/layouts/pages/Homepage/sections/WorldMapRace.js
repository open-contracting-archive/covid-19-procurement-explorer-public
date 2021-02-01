import React from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import useTrans from '../../../../hooks/useTrans'
import { ReactComponent as ShareIcon } from '../../../../assets/img/icons/ic_share.svg'
import { ReactComponent as DownloadIcon } from '../../../../assets/img/icons/ic_download.svg'
import { ReactComponent as FullViewIcon } from '../../../../assets/img/icons/ic_fullscreen.svg'
import { ReactComponent as ChartsIcon } from '../../../../assets/img/icons/ic_charts.svg'
import { ReactComponent as MapIcon } from '../../../../assets/img/icons/ic_map.svg'
import { ReactComponent as TableIcon } from '../../../../assets/img/icons/ic_table.svg'
import { ReactComponent as SourcesIcon } from '../../../../assets/img/icons/ic_sources.svg'
import ShareButtons from '../../../../components/Library/ShareButtons'
import WorldTimelineMap from '../../../../components/Visualizations/WorldTimelineMap'
import WorldTimelineRaceBarMap from '../../../../components/Visualizations/WorldTimelineRaceBarMap'
import { ShortTenderTable } from "../../../../components/Tables"

const WorldMapRace = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { trans } = useTrans()
    const handle = useFullScreenHandle()
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
                <div className="bg-white rounded p-6 simple-tab">
                    <FullScreen handle={handle}>
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
                    <div
                        className="flex items-center justify-between pt-4 border-t border-blue-0 text-sm
                                             text-primary-blue -mx-6 px-6">
                        <div className="flex items-center">
                            <div className="flex items-center mr-6">
                                <DownloadIcon className="mr-2 inline-block" />
                                <span>Download</span>
                            </div>

                            <div className="flex">
                                <span className="worldmap-share flex items-center relative">
                                    <ShareIcon className="mr-2 inline-block" />{' '}
                                    <span className="cursor-pointer">
                                        Share
                                    </span>
                                    <div className="worldmap-share--buttons absolute px-6 py-6 rounded bg-white">
                                        <ShareButtons url={url} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="flex items-center">
                                <button onClick={handle.enter}>
                                    <span className="cursor-pointer">
                                        View full screen
                                    </span>
                                    <FullViewIcon className="ml-2 inline-block" />
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <p className="mt-6 text-center text-sm">
                    Don’t see your country data?{' '}
                    <a href="#" className="text-primary-blue">
                        Here’s how you can add your country data
                    </a>
                </p>
            </div>
        </section>
    )
}

export default WorldMapRace
