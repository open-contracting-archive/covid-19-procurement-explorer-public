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

                <div className="simple-tab">
                    <div className="flex justify-end world-map-chart mb-8">
                        <ul className="contract-switch flex">
                            <li className="mr-4 cursor-pointer active">
                                {trans('By contract value')}
                            </li>
                            <li className="mr-4 cursor-pointer">
                                {trans('By number of contracts')}
                            </li>
                        </ul>
                    </div>

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
                                                <span>Poverty</span>
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
                                                <span>Unemployment</span>
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
                                                    Prisoners/ ex-prisoners
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
                                                <span>Homelessness</span>
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
                                                <span>Disability</span>
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
                                                    Gender, Sexual orientaion,
                                                    sex
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
                                                <span>Ethnicity</span>
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
                                                <span>Religion</span>
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
                                                <span>Mental Health</span>
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
                                                <span>Age</span>
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
                                                <span>General</span>
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
                                                <span>Migration</span>
                                            </div>
                                        </div>
                                        <Checkbox />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1">
                            <CompareChart />
                        </div>
                    </div>
                </div>
            </FullScreen>
            <div
                className="flex items-center justify-between pt-4 border-t mt-10 border-blue-0 text-sm
                                             text-primary-blue -mx-6 px-6">
                <div className="flex">
                    <span className="flex items-center">
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
