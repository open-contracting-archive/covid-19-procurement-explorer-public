import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import useTrans from '../../../hooks/useTrans'
import CountryServices from '../../../services/CountryServices'
import CountryData from './tabs/CountryData'
import CountryInsights from './tabs/CountryInsights'
import CountryContracts from "./tabs/CountryContracts"
import CountryEquity from './tabs/CountryEquity'
import CountryBuyers from './tabs/CountryBuyers'
import CountrySuppliers from './tabs/CountrySuppliers'
import CountryInfo from "./sections/CountryInfo"
import CountryMapElement from "./sections/CountryMapElement"

const CountryDetail = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    // const [countries, setCountries] = useState([]) // List of all countries
    const [countryData, setCountryData] = useState({})
    const [countryCode, setCountryCode] = useState(null)
    const { trans } = useTrans()
    let { slug } = useParams()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    // useEffect(() => {
    //     // Fetch list of all countries
    //     CountryServices.Countries()
    //         .then((response) => {
    //             if (response) {
    //                 const countries = response.reduce((acc, current) => {
    //                     return { [current.name]: current, ...acc }
    //                 }, {})
    //                 setCountries(countries)
    //             }
    //         })
    // }, [])

    useEffect(() => {
        // Fetch country specific data
        CountryServices.CountryProfileData(slug)
            .then((response) => {
                setCountryData(response)
                setCountryCode(response.country_code_alpha_2)
            })
    }, [slug])

    return (
        <section className="pt-20 -mt-8 bg-blue-0">
            <section className="px-4">
                <div className="container mx-auto">
                    <h2 className="font-normal mb-5 text-2xl text-primary-dark capitalize">
                        {slug}
                    </h2>
                    <div className="flex flex-wrap -mx-4 -mb-4">
                        <CountryMapElement countryData={countryData} />
                        <CountryInfo country={countryData} />
                    </div>
                </div>
            </section>
            <Tabs>
                <div className="container mx-auto">
                    <TabList>
                        <Tab>{trans('Data')}</Tab>
                        <Tab>{trans('Insights')}</Tab>
                        <Tab>{trans('Contracts')}</Tab>
                        <Tab>{trans('Equity')}</Tab>
                        <Tab>{trans('Buyers')}</Tab>
                        <Tab>{trans('Suppliers')}</Tab>
                    </TabList>
                </div>
                <div
                    style={{
                        borderTop: '5px solid #1fbbec'
                    }}
                    className="py-16 bg-primary-gray px-4">
                    <div className="container mx-auto">
                        <TabPanel>
                            <CountryData countryCode={countryCode} />
                        </TabPanel>
                        <TabPanel>
                            <CountryInsights country={countryCode} />
                        </TabPanel>
                        <TabPanel>
                            <CountryContracts country={countryCode} />
                        </TabPanel>
                        <TabPanel>
                            <CountryEquity profileData={countryData} />
                        </TabPanel>
                        <TabPanel>
                            <CountryBuyers country={countryCode} />
                        </TabPanel>
                        <TabPanel>
                            <CountrySuppliers country={countryCode} />
                        </TabPanel>
                    </div>
                </div>
            </Tabs>
        </section>
    )
}

export default CountryDetail
