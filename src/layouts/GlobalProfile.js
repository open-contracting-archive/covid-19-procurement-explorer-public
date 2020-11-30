import React, { Fragment } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import GlobalDataCharts from '../components/globalProfile/GlobalDataCharts'
import GlobalMap from '../components/GlobalMap/GlobalMap'
import ChartShare from '../components/ChartShare/ChartShare'
import useTrans from '../hooks/useTrans'

function GlobalProfile() {
    const { trans } = useTrans()

    return (
        <section className="global-profile -mt-8">
            <section className="bg-blue-0 pt-20">
                <div className="container mx-auto px-4 ">
                    <h2 className="font-normal mb-5 text-2xl  text-primary-dark">
                        Global Profile
                    </h2>

                    <div className="flex flex-wrap -mx-4 -mb-4">
                        <div className="w-full px-4 mb-4">
                            <div className="bg-white rounded p-6">
                                <div className="simple-tab">
                                    <Tabs>
                                        <div className="flex">
                                            <TabList>
                                                <Tab>
                                                    {trans('By contract value')}
                                                </Tab>
                                                <Tab>
                                                    {trans(
                                                        'By number of contracts'
                                                    )}
                                                </Tab>
                                            </TabList>
                                        </div>

                                        <div>
                                            <TabPanel>
                                                <GlobalMap />
                                            </TabPanel>
                                            <TabPanel>
                                                <GlobalMap />
                                            </TabPanel>
                                        </div>
                                    </Tabs>
                                </div>
                                <ChartShare />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Tabs>
                <div className="container mx-auto px-4 ">
                    <TabList>
                        <Tab>{trans('Data')}</Tab>
                    </TabList>
                </div>
                <div
                    style={{
                        borderTop: '5px solid #1fbbec'
                    }}
                    className="py-16 bg-primary-gray">
                    <div className="container mx-auto px-4 ">
                        <TabPanel>
                            <GlobalDataCharts />
                        </TabPanel>
                    </div>
                </div>
            </Tabs>
        </section>
    )
}

export default GlobalProfile
