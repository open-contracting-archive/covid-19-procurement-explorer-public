import React, { Fragment } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import useTrans from '../../../hooks/useTrans'
import WorldMap from '../../../components/Visualizations/WorldMap'
import GlobalDataTab from './tabs/GlobalDataTab'
import GlobalInsights from './tabs/GlobalInsightTab'
import GlobalContracts from './tabs/GlobalContracts'
import GlobalEquity from './tabs/GlobalEquity'
import GlobalBuyers from './tabs/GlobalBuyers'
import GlobalSuppliers from './tabs/GlobalSuppliers'
import CountryProductTab from './tabs/GlobalProductTab'

const GlobalOverview = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { trans } = useTrans()

    return (
        <Fragment>
            <section className="global-profile -mt-8">
                <section className="bg-blue-0 pt-20 px-4">
                    <div className="container mx-auto">
                        <h2 className="font-normal mb-5 text-2xl  text-primary-dark">
                            {trans('Global Overview')}
                        </h2>
                        <WorldMap />
                    </div>
                </section>
                <Tabs>
                    <div className="container mx-auto">
                        {/* <div className="secondary-nav">
                            <ul>
                                <li>
                                    <NavLink
                                        activeClassName="active"
                                        to="/global-overview/data">
                                        {trans('Data')}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName="active"
                                        to="/global-overview/insights">
                                        {trans('Insights')}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName="active"
                                        to="/global-overview/contracts">
                                        {trans('Contracts')}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName="active"
                                        to="/global-overview/equity">
                                        {trans('Equity')}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName="active"
                                        to="/global-overview/buyers">
                                        {trans('Buyers')}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName="active"
                                        to="/global-overview/suppliers">
                                        {trans('Suppliers')}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName="active"
                                        to="/global-overview/products">
                                        {trans('Products')}
                                    </NavLink>
                                </li>
                            </ul>
                        </div> */}

                        <TabList>
                            <Tab>{trans('Data')}</Tab>
                            <Tab>{trans('Insights')}</Tab>
                            <Tab>{trans('Contracts')}</Tab>
                            <Tab>{trans('Equity')}</Tab>
                            <Tab>{trans('Buyers')}</Tab>
                            <Tab>{trans('Suppliers')}</Tab>
                            <Tab>{trans('Products')}</Tab>
                        </TabList>
                    </div>
                    <div
                        style={{
                            borderTop: '5px solid #1fbbec'
                        }}
                        className="py-16 bg-primary-gray px-4">
                        <div className="container mx-auto">
                            <TabPanel>
                                <GlobalDataTab />
                            </TabPanel>
                            <TabPanel>
                                <GlobalInsights />
                            </TabPanel>
                            <TabPanel>
                                <GlobalContracts />
                            </TabPanel>
                            <TabPanel>
                                <GlobalEquity />
                            </TabPanel>
                            <TabPanel>
                                <GlobalBuyers />
                            </TabPanel>
                            <TabPanel>
                                <GlobalSuppliers />
                            </TabPanel>
                            <TabPanel>
                                <CountryProductTab />
                            </TabPanel>
                        </div>
                    </div>
                </Tabs>
            </section>
        </Fragment>
    )
}

export default GlobalOverview
