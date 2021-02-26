import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatNumber } from '../../../../helpers/number'
import { formatDate } from '../../../../helpers/date'
import useTrans from '../../../../hooks/useTrans'
import CurrencySwitcher from '../../../../components/CurrencySwitcher/CurrencySwitcher'
import Tussell from '../../../../assets/img/tussell.png'
import ErrorHandler from '../../../../components/ErrorHandler'
import VisualizationService from '../../../../services/VisualizationService'
import { get } from 'lodash'
import Loader from '../../../../components/Loader/Loader'

const CountryInfo = (props) => {
    const { country } = props
    const countryCode = country.country_code_alpha_2
    const { trans } = useTrans()
    const [error, setError] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [countrySpendingData, setCountrySpendingData] = useState('')
    const [loading, setLoading] = useState(true)
    const currency = useSelector((state) => state.general.currency)

    useEffect(() => {
        if (countryCode !== undefined && countryCode !== null) {
            setLoading(false)
        }
    }, [countryCode])

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.TotalSpending({ country: countryCode })
            .then((result) => {
                setLoading(false)
                if (result) {
                    setOriginalData(result)
                } else {
                    throw new Error()
                }
            })
            .catch(() => {
                setError(true)
            })

        return () => {
            setOriginalData({})
        }
    }, [countryCode])

    useEffect(() => {
        setCountrySpendingData({
            amount: originalData && get(originalData[currency], 'total')
        })
    }, [originalData, currency])

    const total_spending_per_covid_case = parseInt(
        countrySpendingData.amount / country.covid_cases_total
    )

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
            {loading ? (
                <Loader />
            ) : !error ? (
                <div className="flex flex-col  text-primary-dark font-bold md:h-full">
                    <div className="p-4 md:p-8 md:py-6 bg-yellow-20 rounded-t-md h-full">
                        <div className="flex flex-wrap -mx-4 -mb-4">
                            <div className="w-1/2 px-4 mb-4 lg:mb-6">
                                <div>
                                    <span className="font-normal inline-block">
                                        {trans('$, spending per covid case')}{' '}
                                    </span>
                                    <h2 className="text-xl">
                                        $
                                        {formatNumber(
                                            country.covid_cases_total
                                                ? total_spending_per_covid_case
                                                : ''
                                        )}
                                    </h2>
                                </div>
                            </div>
                            <div className="w-1/2 px-4 mb-4 lg:mb-6">
                                <div>
                                    <span className="font-normal inline-block">
                                        {trans('GDP per capita indicator')}
                                    </span>
                                    <h2 className="text-xl">
                                        ${formatNumber(country.gdp)}
                                    </h2>
                                </div>
                            </div>
                            <div className="w-1/2 px-4 mb-4 lg:mb-6">
                                <div>
                                    <span className="font-normal inline-block">
                                        {trans('Healthcare budget')}
                                    </span>
                                    <h2 className="text-xl">
                                        $
                                        {formatNumber(
                                            country.healthcare_budget
                                        )}
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

                            {country.country_code_alpha_2 === 'GB' && (
                                <div className="w-full px-4 flex items-center justify-between mt-6 mb-5">
                                    <p className="text-xs font-normal underline w-3/5">
                                        {trans(
                                            'UK COVID Procurement data is kindly provided by Tussell'
                                        )}
                                    </p>
                                    <img src={Tussell} alt="Tussel Logo" />
                                </div>
                            )}
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
                </div>
            ) : (
                <ErrorHandler />
            )}
        </div>
    )
}

export default CountryInfo
