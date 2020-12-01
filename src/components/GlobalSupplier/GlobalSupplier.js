import React, { useCallback } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import SankeyChart from '../charts/SankeyChart/SankeyChart'
import useTrans from '../../hooks/useTrans'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

// Add Sankey Chart data
const sankey_chart_data = [
    { from: 'A', to: 'D', value: 10 },
    { from: 'B', to: 'D', value: 8 },
    { from: 'B', to: 'E', value: 4 },
    { from: 'C', to: 'E', value: 3 },
    { from: 'D', to: 'G', value: 5 },
    { from: 'D', to: 'I', value: 2 },
    { from: 'D', to: 'H', value: 3 },
    { from: 'E', to: 'H', value: 6 },
    { from: 'G', to: 'J', value: 5 },
    { from: 'I', to: 'J', value: 1 },
    { from: 'H', to: 'J', value: 9 }
]

function GlobalSupplier() {
    const { trans } = useTrans()
    const handle = useFullScreenHandle()
    return (
        <div className="bg-white rounded p-6">
            <FullScreen handle={handle}>
                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                    Global Suppliers
                </h3>
                <div className="flex simple-tab">
                    <Tabs>
                        <div className="flex mb-5">
                            <TabList>
                                <Tab>{trans('By contract value')}</Tab>
                                <Tab>{trans('By number of contracts')}</Tab>
                            </TabList>
                        </div>
                        <ul className="flex items-center mb-8">
                            <li className="active text-sm bg-blue-50 mr-2 text-white rounded-full py-2 px-4">
                                Global suppliers chain
                            </li>
                            <li className="active text-sm bg-blue-0 mr-2 hover:bg-primary-5 rounded-full py-2 px-4">
                                Global distribution chain
                            </li>
                        </ul>
                        <div>
                            <TabPanel>
                                <SankeyChart data={sankey_chart_data} />
                            </TabPanel>
                            <TabPanel>
                                <SankeyChart data={sankey_chart_data} />
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </FullScreen>
            <div
                className="flex items-center justify-between pt-4 border-t mt-10 border-blue-0 text-sm
                                             text-primary-blue -mx-6 px-6">
                <div className="flex">
                    <span className="flex items-center">
                        <DownloadIcon className="mr-2 inline-block" />{' '}
                        <span className="cursor-pointer">Download</span>
                    </span>
                    <span className="ml-8 flex items-center">
                        <ShareIcon className="mr-2 inline-block" />{' '}
                        <span className="cursor-pointer">Share</span>
                    </span>
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
    )
}

export default GlobalSupplier
