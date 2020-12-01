import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import CombinedChart from '../charts/CombinedChart/CombinedChart'
import ChartShare from '../ChartShare/ChartShare'
import useTrans from '../../hooks/useTrans'

// Add Combined Chart data
const combined_chart_data = [
    {
        date: '2013-01-16',
        market1: 71,
        market2: 75,
        sales1: 5,
        sales2: 8
    },
    {
        date: '2013-01-17',
        market1: 74,
        market2: 78,
        sales1: 4,
        sales2: 6
    },
    {
        date: '2013-01-18',
        market1: 78,
        market2: 88,
        sales1: 5,
        sales2: 2
    },
    {
        date: '2013-01-19',
        market1: 85,
        market2: 89,
        sales1: 8,
        sales2: 9
    },
    {
        date: '2013-01-20',
        market1: 82,
        market2: 89,
        sales1: 9,
        sales2: 6
    },
    {
        date: '2013-01-21',
        market1: 83,
        market2: 85,
        sales1: 3,
        sales2: 5
    },
    {
        date: '2013-01-22',
        market1: 88,
        market2: 92,
        sales1: 5,
        sales2: 7
    },
    {
        date: '2013-01-23',
        market1: 85,
        market2: 90,
        sales1: 7,
        sales2: 6
    },
    {
        date: '2013-01-24',
        market1: 85,
        market2: 91,
        sales1: 9,
        sales2: 5
    },
    {
        date: '2013-01-25',
        market1: 80,
        market2: 84,
        sales1: 5,
        sales2: 8
    },
    {
        date: '2013-01-26',
        market1: 87,
        market2: 92,
        sales1: 4,
        sales2: 8
    },
    {
        date: '2013-01-27',
        market1: 84,
        market2: 87,
        sales1: 3,
        sales2: 4
    },
    {
        date: '2013-01-28',
        market1: 83,
        market2: 88,
        sales1: 5,
        sales2: 7
    },
    {
        date: '2013-01-29',
        market1: 84,
        market2: 87,
        sales1: 5,
        sales2: 8
    },
    {
        date: '2013-01-30',
        market1: 81,
        market2: 85,
        sales1: 4,
        sales2: 7
    }
]

function QuantityCorrelation() {
    const { trans } = useTrans()
    return (
        <div className="bg-white rounded p-6">
            <h3 className="uppercase font-bold  text-primary-dark mb-6">
                Covid/contracts quantity correlation
            </h3>
            <div className="flex">
                <div className="flex-1">
                    <div className="flex">
                        <div>
                            <ul className="arrow-nav w-80">
                                <li className="active py-2 border-b border-blue-0 text-blue-50">
                                    Ukraine
                                </li>
                                <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                    Kenya
                                </li>
                                <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                    Kyrgyzstan
                                </li>
                                <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                    Moldova
                                </li>
                                <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                    United Kingdom
                                </li>
                                <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                    Mexico
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 simple-tab">
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
                                        <CombinedChart
                                            data={combined_chart_data}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <CombinedChart
                                            data={combined_chart_data}
                                        />
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

export default QuantityCorrelation
