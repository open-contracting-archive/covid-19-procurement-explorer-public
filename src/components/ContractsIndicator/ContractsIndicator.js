import React, { useCallback } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Checkbox from '../Checkbox/Checkbox'
import CompareChart from '../Charts/CompareChart/CompareChart'
import useTrans from '../../hooks/useTrans'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

function ContractIndicators() {
    const { trans } = useTrans()
    const handle = useFullScreenHandle()

    return (
        <div className="bg-white rounded p-6">
            <FullScreen handle={handle}>
                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                    Contracts and equity indicators
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
                                Contracts with red flags
                            </li>
                            <li className="active text-sm bg-blue-0 mr-2 hover:bg-primary-5 rounded-full py-2 px-4">
                                Spending per equity groups
                            </li>
                        </ul>

                        <div className="flex">
                            <div>
                                <div className="w-80 mr-12">
                                    <ul>
                                        <li
                                            className="active py-2 flex items-center justify-between
                                                        border-b border-blue-0 text-blue-50">
                                            <div className="flex items-center">
                                                <div className="contract-line">
                                                    <span className="line red"></span>
                                                </div>
                                                <div className="contract-text">
                                                    <span>
                                                        Direct Contracts
                                                    </span>
                                                </div>
                                            </div>
                                            <Checkbox />
                                        </li>
                                        <li className="py-2 border-b border-blue-0 text-blue-50 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="contract-line">
                                                    <span className="line purple"></span>
                                                </div>
                                                <div className="contract-text opacity-50">
                                                    <span>
                                                        Contract value is higher
                                                        or lower than the
                                                        average for this item
                                                        category
                                                    </span>
                                                </div>
                                            </div>
                                            <Checkbox />
                                        </li>
                                        <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="contract-line">
                                                    <span className="line mint"></span>
                                                </div>
                                                <div className="contract-text opacity-50">
                                                    <span>
                                                        Contract value is higher
                                                        tender value
                                                    </span>
                                                </div>
                                            </div>
                                            <Checkbox />
                                        </li>
                                        <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="contract-line">
                                                    <span className="line green"></span>
                                                </div>
                                                <div className="contract-text opacity-50">
                                                    <span>
                                                        Contract is awarded to
                                                        supplier that has won a
                                                        disproportionate number
                                                        of contracts of the same
                                                        type
                                                    </span>
                                                </div>
                                            </div>
                                            <Checkbox />
                                        </li>
                                        <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="contract-line">
                                                    <span className="line blue"></span>
                                                </div>
                                                <div className="contract-text opacity-50">
                                                    <span>
                                                        Contract is awarded to
                                                        supplier that has
                                                        similar information
                                                    </span>
                                                </div>
                                            </div>
                                            <Checkbox />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex-1">
                                <TabPanel>
                                    <CompareChart />
                                </TabPanel>
                                <TabPanel>
                                    <CompareChart />
                                </TabPanel>
                            </div>
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

export default ContractIndicators
