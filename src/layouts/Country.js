import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Iframe from 'react-iframe'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import CountryProfileTable from '../components/country/countryProfileTable'
import CountryDataCharts from '../components/country/CountryDataChart'
import CountryProfile from '../components/country/countryProfile'
import Loader from '../components/loader/Loader'
import CountryProfileServices from '../services/countryProfileServices'
import useTrans from '../hooks/useTrans'
import CountryServices from '../services/countryServices'
import formatNumber from '../components/formatNumber/FormatNumber'

function CountryDetail() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [countryData, setCountryData] = useState([])

    let { id } = useParams()

    useEffect(() => {
        CountryServices.CountryData().then((response) => {
            if (response) {
                const countries = response.reduce((acc, current) => {
                    return { [current.name]: current, ...acc }
                }, {})
                setCountryData(countries)
            }
        })
    }, [])

    useEffect(() => {
        CountryProfileServices.CountryProfileData(id).then((response) => {
            if (response) {
                setData(response)
            }
            setLoading(true)
        })
    }, [id])

    const { trans } = useTrans()

    return (
        <section className="pt-8">
            {loading ? (
                <Fragment>
                    <div className="container mx-auto px-4 ">
                        <div className="mb-6">
                            <ul className="flex text-sm">
                                {Object.keys(countryData).map(
                                    (country, index) => {
                                        return (
                                            <li key={index} className="mr-6">
                                                <Link
                                                    style={{ color: '#293E45' }}
                                                    className={`opacity-50 hover:opacity-100 ${
                                                        countryData[country]
                                                            .id == id
                                                            ? 'opacity-100 font-bold'
                                                            : ''
                                                    }`}
                                                    to={`/country/${countryData[country].id}`}>
                                                    {countryData[country].name}
                                                </Link>
                                            </li>
                                        )
                                    }
                                )}
                            </ul>
                        </div>
                        <h2 className="font-bold mb-5 text-3xl text-gray-900">
                            {data.name}
                        </h2>
                        <div className="flex flex-wrap -mx-4 -mb-4">
                            <div className="w-full md:w-1/2 lg:w-7/12 px-4 mb-4">
                                <div className="h-full">
                                    <Iframe
                                        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15010268.98948006!2d-111.65143694146222!3d23.293382281181213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84043a3b88685353%3A0xed64b4be6b099811!2sMexico!5e0!3m2!1sen!2snp!4v1602666699465!5m2!1sen!2snp"
                                        width="100%"
                                        height="450px"
                                        id=""
                                        className="h-full"
                                        display="initial"
                                        position="relative"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-5/12 px-4 mb-4">
                                <div className="flex flex-col text-gray-800 font-extrabold">
                                    <div
                                        style={{ backgroundColor: '#C8D419' }}
                                        className="p-8 py-6 ">
                                        <div className="flex flex-wrap -mx-4 -mb-4">
                                            <div className="w-full xs:w-1/2 px-4 mb-4">
                                                <div>
                                                    <span className="font-normal inline-block">
                                                        {trans('Population')}{' '}
                                                    </span>
                                                    <h2 className="text-3xl">
                                                        {formatNumber(
                                                            data.population
                                                        )}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="w-full xs:w-1/2 px-4 mb-4">
                                                <div>
                                                    <span className="font-normal inline-block">
                                                        {trans('GDP')}
                                                    </span>
                                                    <h2 className="text-3xl">
                                                        {formatNumber(data.gdp)}
                                                        <span className="inline-block uppercase text-xl tracking-tight">
                                                            {data.currency}
                                                        </span>
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="w-full xs:w-1/2 px-4 mb-4">
                                                <div>
                                                    <span className="font-normal inline-block">
                                                        {trans(
                                                            'Healthcare budget'
                                                        )}
                                                    </span>
                                                    <h2 className="text-3xl">
                                                        $
                                                        {formatNumber(
                                                            data.healthcare_budget
                                                        )}
                                                        <span className="inline-block uppercase text-sm tracking-tight">
                                                            {data.currency}
                                                        </span>
                                                    </h2>
                                                    <span className="block font-normal">
                                                        {trans('per capita')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-full xs:w-1/2 px-4 mb-4">
                                                <div>
                                                    <span className="font-normal inline-block">
                                                        {trans(
                                                            '% of GDP to healthcare'
                                                        )}
                                                    </span>
                                                    <h2 className="text-3xl">
                                                        {data.healthcare_gdp_pc}
                                                        <span className="inline-block uppercase text-sm tracking-tight">
                                                            %
                                                        </span>
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 mb-4">
                                                <div>
                                                    <p className="text-sm font-normal">
                                                        {trans('Source')}:
                                                        <a
                                                            href={data.source}
                                                            className="ml-1 underline font-bold"
                                                            title="John Hopkins University">
                                                            {trans(
                                                                'John Hopkins University'
                                                            )}
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{ backgroundColor: '#293E45' }}
                                        className="p-8 text-white">
                                        <div className="flex flex-wrap -mx-4 -mb-4">
                                            <div className="w-full xs:w-1/2 px-4 mb-4">
                                                <div>
                                                    <span className="font-normal inline-block">
                                                        {trans(
                                                            'Total Covid-19 cases'
                                                        )}
                                                    </span>
                                                    <h2 className="text-3xl">
                                                        {data.covid_cases_total &&
                                                            data.covid_cases_total.toLocaleString(
                                                                'en'
                                                            )}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="w-full xs:w-1/2 px-4 mb-4">
                                                <div>
                                                    <span className="font-normal inline-block">
                                                        {trans(
                                                            'Total deaths by Covid-19'
                                                        )}
                                                    </span>
                                                    <h2 className="text-3xl">
                                                        {data.covid_deaths_total &&
                                                            data.covid_deaths_total.toLocaleString(
                                                                'en'
                                                            )}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 mb-4">
                                                <div>
                                                    <p className="text-sm font-normal">
                                                        {trans('Source')}:
                                                        <a
                                                            href={data.source}
                                                            className="ml-1 text-white underline font-bold"
                                                            title="John Hopkins University">
                                                            {trans(
                                                                'John Hopkins University'
                                                            )}
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Tabs>
                        <div className="container mx-auto px-4 ">
                            <TabList>
                                <Tab>{trans('Data')}</Tab>
                                <Tab>{trans('Tenders')}</Tab>
                                <Tab>{trans('Profile')}</Tab>
                            </TabList>
                        </div>
                        <div
                            style={{
                                backgroundColor: '#E5E5E5',
                                borderTop: '5px solid #1fbbec'
                            }}
                            className="py-16">
                            <div className="container mx-auto px-4 ">
                                <TabPanel>
                                    <CountryDataCharts />
                                </TabPanel>
                                <TabPanel>
                                    <CountryProfileTable />
                                </TabPanel>
                                <TabPanel>
                                    <CountryProfile profileData={data} />
                                </TabPanel>
                            </div>
                        </div>
                    </Tabs>
                </Fragment>
            ) : (
                <Loader />
            )}
        </section>
    )
}

export default CountryDetail
