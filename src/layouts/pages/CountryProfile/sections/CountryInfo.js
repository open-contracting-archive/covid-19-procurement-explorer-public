import React, { useEffect, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { T } from '@transifex/react'
import { formatNumber } from '../../../../helpers/number'
import { formatDate } from '../../../../helpers/date'
import {
    Loader,
    CurrencySwitcher,
    ErrorHandler
} from '../../../../components/Utilities'
import CountryService from '../../../../services/CountryService'
import { mediaUrl } from '../../../../helpers/general'
import { useCountry } from '../../../../context/CountryContext'

const CountryInfo = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [countryStats, setCountryStats] = useState({})
    const [dataProviders, setDataProviders] = useState([])
    const currency = useSelector((state) => state.general.currency)
    const country = useCountry()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        if (country.country_code_alpha_2) {
            const params = { country: country.country_code_alpha_2 }
            CountryService.DataProviders(params)
                .then((result) => {
                    if (result) {
                        setDataProviders(result)
                    }
                })
                .catch(() => {
                    setError(true)
                })

            setLoading(false)

            return () => {
                setDataProviders([])
            }
        }
    }, [country])

    useEffect(() => {
        const spending = get(country, `amount_${currency}`, 0)
        setCountryStats({
            spending: spending,
            spending_per_covid_case:
                spending > 0
                    ? Math.round(spending / country.covid_cases_total)
                    : 0
        })
    }, [country, currency])

    return (
        <div className="w-full md:w-1/2 lg:w-38 px-2 my-4 mb-8 md:my-0 md:mb-0">
            <div className="-mt-10 md:-mt-20 absolute right-0 text-right top-0 mr-2">
                <CurrencySwitcher />
                <p className="mt-3 text-blue-40">
                    <span className="opacity-75">Last updated on </span>
                    <span>
                        {formatDate(
                            country.last_contract_date,
                            'h:mm a MMM D, YYYY'
                        )}
                    </span>
                </p>
            </div>

            <div className="flex flex-col text-primary-dark font-bold md:h-full">
                {loading ? (
                    <div className="p-4 md:p-8 md:py-6 bg-yellow-20 rounded-t-md h-full">
                        <Loader />
                    </div>
                ) : !error ? (
                    <Fragment>
                        <div className="p-4 md:p-8 md:py-6 bg-yellow-20 rounded-t-md h-full">
                            <div className="flex flex-wrap -mx-4 -mb-4">
                                <div className="w-1/2 px-4 mb-4 lg:mb-6">
                                    <div>
                                        <span className="font-normal inline-block">
                                            <T _str="$, spending per covid case" />{' '}
                                        </span>
                                        <h2 className="text-xl">
                                            {countryStats.spending
                                                ? '$' +
                                                  countryStats.spending_per_covid_case
                                                : '-'}
                                        </h2>
                                    </div>
                                </div>
                                <div className="w-1/2 px-4 mb-4 lg:mb-6">
                                    <div>
                                        <span className="font-normal inline-block">
                                            <T _str="GDP per capita indicator" />
                                        </span>
                                        <h2 className="text-xl">
                                            {country.gdp
                                                ? '$' +
                                                  formatNumber(country.gdp)
                                                : '-'}
                                        </h2>
                                    </div>
                                </div>
                                <div className="w-1/2 px-4 mb-4 lg:mb-6">
                                    <div>
                                        <span className="font-normal inline-block">
                                            <T _str="Healthcare budget" />
                                        </span>
                                        <h2 className="text-xl">
                                            {country.healthcare_budget
                                                ? '$' +
                                                  formatNumber(
                                                      country.healthcare_budget
                                                  )
                                                : '-'}
                                        </h2>
                                        <span className="block font-normal">
                                            <T _str="per capita" />
                                        </span>
                                    </div>
                                </div>
                                <div className="w-1/2 px-4 mb-4 lg:mb-6">
                                    <div>
                                        <span className="font-normal inline-block">
                                            <T _str="% of GDP to healthcare" />
                                        </span>
                                        <h2 className="text-xl">
                                            {country.healthcare_gdp_pc}
                                            <span className="inline-block uppercase text-sm tracking-tight">
                                                %
                                            </span>
                                        </h2>
                                    </div>
                                </div>
                                {dataProviders.length > 0 &&
                                    dataProviders
                                        .slice(0, 1)
                                        .map((dataProvider, index) => (
                                            <div
                                                key={index}
                                                className="w-full px-4 flex items-center justify-between mb-5"
                                            >
                                                <p className="text-xs font-normal underline w-3/5">
                                                    {`${dataProvider.remark} ${dataProvider.name}`}
                                                </p>
                                                <a
                                                    href={dataProvider.website}
                                                    title={dataProvider.name}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <img
                                                        src={mediaUrl(
                                                            dataProvider.logo
                                                        )}
                                                        alt={dataProvider.name}
                                                    />
                                                </a>
                                            </div>
                                        ))}
                            </div>
                        </div>
                        <div className="p-4 md:p-8 text-white bg-primary-dark rounded-b-md">
                            <div className="flex flex-wrap -mx-4 -mb-4">
                                <div className="w-full xs:w-1/2 px-4 mb-6 md:mb-12">
                                    <div>
                                        <span className="text-sm md:text-base font-normal inline-block md:mb-4">
                                            <T _str="Total Covid-19 cases" />
                                        </span>
                                        <h2 className="text-xl">
                                            {country.covid_cases_total &&
                                                country.covid_cases_total.toLocaleString(
                                                    'en'
                                                )}
                                        </h2>
                                    </div>
                                </div>
                                <div className="w-full xs:w-1/2 px-4 mb-6 md:mb-12">
                                    <div>
                                        <span className="text-sm md:text-base font-normal inline-block md:mb-4">
                                            <T _str="Deaths by Covid-19" />
                                        </span>
                                        <h2 className="text-xl">
                                            {country.covid_deaths_total &&
                                                country.covid_deaths_total.toLocaleString(
                                                    'en'
                                                )}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <ErrorHandler />
                )}
            </div>
        </div>
    )
}

export default CountryInfo
