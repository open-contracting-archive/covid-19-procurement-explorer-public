import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Checkbox from '../Checkbox/Checkbox'
import CompareChart from '../charts/CompareChart/CompareChart'
import ChartShare from '../ChartShare/ChartShare'
import useTrans from '../../hooks/useTrans'

function ContractIndicators() {
    const { trans } = useTrans()
    return (
        <div className="bg-white rounded p-6">
            <h3 className="uppercase font-bold  text-primary-dark mb-6">
                Contracts and equity indicators
            </h3>
            <ul className="flex items-center mb-4">
                <li className="active text-sm bg-blue-50 mr-2 text-white rounded-full py-2 px-4">
                    Contracts with red flags
                </li>
                <li className="active text-sm bg-blue-0 mr-2 hover:bg-primary-5 rounded-full py-2 px-4">
                    Spending per equity groups
                </li>
            </ul>
            <div className="flex">
                <div className="flex-1">
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
                                                <span>Direct Contracts</span>
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
                                                    Contract value is higher or
                                                    lower than the average for
                                                    this item category
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
                                                    disproportionate number of
                                                    contracts of the same type
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
                                                    supplier that has similar
                                                    information
                                                </span>
                                            </div>
                                        </div>
                                        <Checkbox />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1 simple-tab -mt-10">
                            <Tabs>
                                <div className="flex justify-end">
                                    <TabList>
                                        <Tab>{trans('By contract value')}</Tab>
                                        <Tab>
                                            {trans('By number of contracts')}
                                        </Tab>
                                    </TabList>
                                </div>

                                <div className="mt-10">
                                    <TabPanel>
                                        <CompareChart />
                                    </TabPanel>
                                    <TabPanel>
                                        <CompareChart />
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                    <ChartShare />
                </div>
            </div>
        </div>
    )
}

export default ContractIndicators
