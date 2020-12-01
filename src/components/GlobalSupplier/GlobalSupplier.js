import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ChartShare from '../ChartShare/ChartShare'
import SankeyChart from '../charts/SankeyChart/SankeyChart'
import useTrans from '../../hooks/useTrans'

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
    return (
        <div className="bg-white rounded p-6">
            <h3 className="uppercase font-bold  text-primary-dark mb-6">
                Global Suppliers
            </h3>
            <ul className="flex items-center mb-4">
                <li className="active text-sm bg-blue-50 mr-2 text-white rounded-full py-2 px-4">
                    Global suppliers chain
                </li>
                <li className="active text-sm bg-blue-0 mr-2 hover:bg-primary-5 rounded-full py-2 px-4">
                    Global distribution chain
                </li>
            </ul>
            <div className="flex">
                <div className="flex-1">
                    <div className="flex">
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
                                        <SankeyChart data={sankey_chart_data}/>
                                    </TabPanel>
                                    <TabPanel>
                                        <SankeyChart data={sankey_chart_data}/>
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

export default GlobalSupplier
