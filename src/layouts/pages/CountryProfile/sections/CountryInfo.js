import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatNumber } from '../../../../helpers/number'
import { formatDate } from '../../../../helpers/date'
import useTrans from '../../../../hooks/useTrans'
import CurrencySwitcher from '../../../../components/CurrencySwitcher/CurrencySwitcher'
import ErrorHandler from '../../../../components/ErrorHandler'
import VisualizationService from '../../../../services/VisualizationService'
import { get } from 'lodash'
import Loader from '../../../../components/Loader/Loader'
import CountryService from "../../../../services/CountryService"
import { mediaUrl } from "../../../../helpers/general"

const CountryInfo = (props) => {
    const { country } = props
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()
    const [error, setError] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [countryStats, setCountryStats] = useState({})
    const [dataProviders, setDataProviders] = useState([])
    const currency = useSelector((state) => state.general.currency)

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        if (country.country_code_alpha_2) {
            const params = { country: country.country_code_alpha_2 }
            VisualizationService.TotalSpending(params)
                .then((result) => {
                    if (result) {
                        setOriginalData(result)
                    }
                })
                .catch(() => {
                    setError(true)
                })

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
                setOriginalData({})
                setDataProviders([])
            }
        }
    }, [country?.country_code_alpha_2])

    useEffect(() => {
        const spending = get(originalData[currency], 'total', 0)
        setCountryStats({
            spending: spending,
            spending_per_covid_case: spending > 0 ? Math.round(spending / country.covid_cases_total) : 0
        })
    }, [originalData, currency])

    return (
        <div className="w-full md:w-1/2 lg:w-38 px-2 my-4 mb-8 md:my-0 md:mb-0">
            <div className="-mt-10 md:-mt-20 absolute right-0 text-right top-0 mr-2">
                <CurrencySwitcher />
                <p className="mt-3 text-blue-40">
                    <span className="opacity-75">Last updated on </span>
                    <span>
                        {formatDate(
                            country.covid_data_last_updated,
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
                    <>
                        <div className="p-4 md:p-8 md:py-6 bg-yellow-20 rounded-t-md h-full">
                            <div className="flex flex-wrap -mx-4 -mb-4">
                                <div className="w-1/2 px-4 mb-4 lg:mb-6">
                                    <div>
                                    <span className="font-normal inline-block">
                                        {trans('$, spending per covid case')}{' '}
                                    </span>
                                        <h2 className="text-xl">
                                            {countryStats.spending ? '$' + countryStats.spending_per_covid_case : '-'}
                                        </h2>
                                    </div>
                                </div>
                                <div className="w-1/2 px-4 mb-4 lg:mb-6">
                                    <div>
                                    <span className="font-normal inline-block">
                                        {trans('GDP per capita indicator')}
                                    </span>
                                        <h2 className="text-xl">
                                            {country.gdp ? '$' + formatNumber(country.gdp) : '-'}
                                        </h2>
                                    </div>
                                </div>
                                <div className="w-1/2 px-4 mb-4 lg:mb-6">
                                    <div>
                                    <span className="font-normal inline-block">
                                        {trans('Healthcare budget')}
                                    </span>
                                        <h2 className="text-xl">
                                            {country.healthcare_budget ? '$' + formatNumber(country.healthcare_budget) : '-'}
                                        </h2>
                                        <span className="block font-normal">
                                        {trans('per capita')}
                                    </span>
                                    </div>
                                </div>
                                <div className="w-1/2 px-4 mb-4 lg:mb-6">
                                    <div>
                                    <span className="font-normal inline-block">
                                        {trans('% of GDP to healthcare')}
                                    </span>
                                        <h2 className="text-xl">
                                            {country.healthcare_gdp_pc}
                                            <span className="inline-block uppercase text-sm tracking-tight">
                                            %
                                        </span>
                                        </h2>
                                    </div>
                                </div>
                                {dataProviders && dataProviders.slice(0, 1).map((dataProvider, index) => (
                                    <div key={index} className="w-full px-4 flex items-center justify-between mb-5">
                                        <p className="text-xs font-normal underline w-3/5">
                                            {`${dataProvider.remark} ${dataProvider.name}`}
                                        </p>
                                        <a href={dataProvider.website} title={dataProvider.name} target="_blank" rel="noreferrer">
                                            <img src={mediaUrl(dataProvider.logo)} alt={dataProvider.name} />
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
                                        {trans('Total Covid-19 cases')}
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
                                        {trans('Deaths by Covid-19')}
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
                    </>
                ) : (
                    <ErrorHandler />
                )}
            </div>
        </div>
    )
}

export default CountryInfo
