import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useTrans from '../../hooks/useTrans'
import { ReactComponent as ChartsIcon } from '../../assets/img/icons/ic_charts.svg'
import { ReactComponent as FlowIcon } from '../../assets/img/icons/ic_flow.svg'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import WorldMap from '../../components/Visualizations/WorldMap'
import TenderTable from '../../components/Tables/TenderTable'

const GlobalProductProfile = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { trans } = useTrans()
    const handle = useFullScreenHandle()
    let history = useHistory()
    window.scrollTo(0, 0)
    const previousPage = () => {
        history.goBack()
    }

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    window.scrollTo(0, 0)

    return (
        <section className="pt-8">
            <div className="container mx-auto">
                <div className="text-sm mb-4 text-blue-5">
                    <span className="text-primary-blue">Global Overview</span> /{' '}
                    <span
                        className="cursor-pointer text-primary-blue"
                        onClick={previousPage}>
                        {trans('Products')}
                    </span>
                </div>

                <h2 className="text-xl">Ventilators</h2>

                <div className="mb-12">
                    <div className="py-6 simple-tab">
                        <FullScreen handle={handle}>
                            <Tabs>
                                <div className="flex">
                                    <div className="flex w-full">
                                        <div className="worldmap-tab">
                                            <TabList>
                                                <Tab>
                                                    <ChartsIcon className="inline-block" />
                                                    <span className="text-sm mt-1 inline-block">
                                                        {trans('Charts')}
                                                    </span>
                                                </Tab>

                                                <Tab>
                                                    <FlowIcon className="inline-block" />
                                                    <span className="text-sm mt-1 inline-block">
                                                        {trans('Flow')}
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
                                                <div className="border border-blue-0 rounded bg-white pb-4">
                                                    <h2 className="uppercase font-bold text-primary-dark inline-block px-4 pt-4">
                                                        Ventilator spending
                                                        comparison with the
                                                        world
                                                    </h2>

                                                    <WorldMap />
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
                    </div>
                </div>
            </div>

            <div className="py-12 bg-primary-gray">
                <div className="container mx-auto">
                    <div>
                        {/* Table */}
                        <TenderTable params={{ product: id }} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GlobalProductProfile
