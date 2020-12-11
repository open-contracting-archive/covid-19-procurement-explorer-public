import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import BarListChart from '../BarListSection/BarListChart'
import useTrans from '../../hooks/useTrans'

function BarListSection({ bar_data, label, byValue, byNumber }) {
    const { trans } = useTrans()
    return (
        <div className="bg-white rounded p-6 h-full">
            <h3 className="uppercase font-bold  text-primary-dark mb-6">
                {label}
            </h3>
            <div className="flex">
                <div className="flex-1">
                    <div className="flex-1 simple-tab -mt-10">
                        <Tabs>
                            <div className="flex justify-end">
                                <TabList>
                                    <Tab>{trans('By contract value')}</Tab>
                                    <Tab>{trans('By number of contracts')}</Tab>
                                </TabList>
                            </div>

                            <div className="mt-10">
                                <TabPanel>
                                    <BarListChart
                                        data={byValue || bar_data}
                                        byValue
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <BarListChart data={byNumber || bar_data} />
                                </TabPanel>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BarListSection
