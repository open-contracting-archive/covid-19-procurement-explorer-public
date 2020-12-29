import React, {Fragment} from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import useTrans from '../../../hooks/useTrans'
import WorldMap from '../../../components/visualizations/WorldMap'
import GlobalDataTab from './tabs/GlobalDataTab'

const GlobalOverview = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {trans} = useTrans()

    return (
        <Fragment>
            <section className="global-profile -mt-8">
                <section className="bg-blue-0 pt-20 px-4">
                    <div className="container mx-auto">
                        <h2 className="font-normal mb-5 text-2xl  text-primary-dark">
                            {trans('Global Overview')}
                        </h2>
                        <WorldMap/>
                    </div>
                </section>
                <Tabs>
                    <div className="container mx-auto">
                        <TabList>
                            <Tab>{trans('Data')}</Tab>
                        </TabList>
                    </div>
                    <div
                        style={{
                            borderTop: '5px solid #1fbbec'
                        }}
                        className="py-16 bg-primary-gray px-4">
                        <div className="container mx-auto">
                            <TabPanel>
                                <GlobalDataTab/>
                            </TabPanel>
                        </div>
                    </div>
                </Tabs>
            </section>
        </Fragment>
    )
}

export default GlobalOverview
