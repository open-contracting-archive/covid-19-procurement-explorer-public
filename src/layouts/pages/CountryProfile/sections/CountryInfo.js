import React from 'react'
import { formatNumber } from '../../../../helpers/number'
import { formatDate } from '../../../../helpers/date'
import useTrans from '../../../../hooks/useTrans'
import CurrencySwitcher from '../../../../components/CurrencySwitcher/CurrencySwitcher'

const CountryInfo = ({ country }) => {
    const { trans } = useTrans()

    return (
        <div className="w-full md:w-1/2 lg:w-38 px-4 mb-4 relative">
            <div className="flex flex-col  text-primary-dark font-bold h-full">
                <div className="p-8 py-6 bg-yellow-20 rounded-t-md h-full">
                    <div className="flex flex-wrap -mx-4 -mb-4">
                        <div className="w-full xs:w-1/2 px-4 mb-4 lg:mb-6">
                            <div>
                                <span className="font-normal inline-block">
                                    {trans('Population')}{' '}
                                </span>
                                <h2 className="text-xl">
                                    {formatNumber(country.population)}
                                </h2>
                            </div>
                        </div>
                        <div className="w-full xs:w-1/2 px-4 mb-4 lg:mb-6">
                            <div>
                                <span className="font-normal inline-block">
                                    {trans('GDP')}
                                </span>
                                <h2 className="text-xl">
                                    ${formatNumber(country.gdp)}
                                </h2>
                            </div>
                        </div>
                        <div className="w-full xs:w-1/2 px-4 mb-4 lg:mb-6">
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
                        <div className="w-full xs:w-1/2 px-4 mb-4 lg:mb-6">
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
                    </div>
                </div>
                <div className="px-8 py-16 text-white bg-primary-dark rounded-b-md">
                    <div className="flex flex-wrap -mx-4 -mb-4">
                        <div className="w-full xs:w-1/2 px-4 mb-12">
                            <div>
                                <span className="font-normal inline-block mb-4">
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
                        <div className="w-full xs:w-1/2 px-4 mb-12">
                            <div>
                                <span className="font-normal inline-block mb-4">
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
            <div
                className="md:absolute static mt-2 md:mt-0 inline-flex items-center"
                style={{ top: '-50px', right: '25px', width: 'fit-content' }}>
                <p className="text-blue-40">
                    <span className="opacity-75">Last updated on </span>
                    <span>
                        {formatDate(
                            country.covid_data_last_updated,
                            'h:mm a MMM D, YYYY'
                        )}
                    </span>
                </p>
                <CurrencySwitcher />
            </div>
        </div>
    )
}

export default CountryInfo
