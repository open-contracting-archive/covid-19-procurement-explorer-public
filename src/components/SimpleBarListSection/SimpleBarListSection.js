import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import SimpleBarListChart from './SimpleBarListChart'
import useTrans from '../../hooks/useTrans'

function SimpleBarListSection({ bar_data, label }) {
    const { trans } = useTrans()
    return (
        <div className="bg-white rounded p-6">
            <h3 className="uppercase font-bold  text-primary-dark mb-4">
                {label}
            </h3>
            <div className="flex">
                <div className="flex-1">
                    <div className="flex-1 simple-tab -mt-10">
                        <Tabs>
                            <div className="flex justify-end">
                                <TabList>
                                    <Tab>{trans('By value')}</Tab>
                                    <Tab>{trans('By number')}</Tab>
                                </TabList>
                            </div>

                            <div className="mt-6">
                                <TabPanel>
                                    <SimpleBarListChart data={bar_data} />
                                </TabPanel>
                                <TabPanel>
                                    <SimpleBarListChart data={bar_data} />
                                </TabPanel>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimpleBarListSection
