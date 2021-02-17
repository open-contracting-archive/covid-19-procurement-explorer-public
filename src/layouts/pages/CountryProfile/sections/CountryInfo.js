import React from 'react'
import { formatNumber } from '../../../../helpers/number'
import { formatDate } from '../../../../helpers/date'
import useTrans from '../../../../hooks/useTrans'
import CurrencySwitcher from '../../../../components/CurrencySwitcher/CurrencySwitcher'
import Tussell from '../../../../assets/img/tussell.png'

const CountryInfo = ({ country }) => {
    const { trans } = useTrans()

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
            <div className="flex flex-col  text-primary-dark font-bold md:h-full">
                <div className="p-4 md:p-8 md:py-6 bg-yellow-20 rounded-t-md h-full">
                    <div className="flex flex-wrap -mx-4 -mb-4">
                        <div className="w-1/2 px-4 mb-4 lg:mb-6">
                            <div>
                                <span className="font-normal inline-block">
                                    {trans('Population')}{' '}
                                </span>
                                <h2 className="text-xl">
                                    {formatNumber(country.population)}
                                </h2>
                            </div>
                        </div>
                        <div className="w-1/2 px-4 mb-4 lg:mb-6">
                            <div>
                                <span className="font-normal inline-block">
                                    {trans('GDP')}
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
                                    ${formatNumber(country.healthcare_budget)}
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
                        <div className="w-full px-4 flex items-center justify-between mt-6 mb-5">
                            <p className="text-xs font-normal underline w-3/5">
                                UK COVID Procurement data is kindly provided by
                                Tussell
                            </p>
                            <img src={Tussell} alt="" />
                        </div>
                    </div>
                </div>
                <div className="p-4 md:p-8 text-white bg-primary-dark rounded-b-md">
                    <div className="flex flex-wrap -mx-4 -mb-4">
                        <div className="w-full xs:w-1/2 px-4 mb-6 md:mb-12">
                            <div>
                                <span className="text-sm md:text-base font-normal inline-block md:mb-4">
                                    {trans('Covid-19 cases')}
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
        </div>
    )
}

export default CountryInfo
