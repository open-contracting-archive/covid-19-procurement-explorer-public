import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import SimpleBarListChart from './SimpleBarListChart'
import useTrans from '../../hooks/useTrans'

function SimpleBarListSection({ bar_data, label, byValue, byNumber }) {
    const { trans } = useTrans()

    return (
        <div className="simple-tab">
            <Tabs>
                <div className="flex justify-between items-center">
                    <h3 className="uppercase font-bold  text-primary-dark">
                        {label}
                    </h3>

                    <div className="flex">
                        <TabList>
                            <Tab>{trans('By value')}</Tab>
                            <Tab>{trans('By number')}</Tab>
                        </TabList>
                    </div>
                </div>
                <div className="mt-6">
                    <TabPanel>
                        <SimpleBarListChart
                            data={byValue || bar_data}
                            byValue
                        />
                    </TabPanel>
                    <TabPanel>
                        <SimpleBarListChart data={byNumber || bar_data} />
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    )
}

export default SimpleBarListSection
