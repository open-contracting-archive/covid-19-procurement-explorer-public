import React from 'react'
import 'react-accessible-accordion/dist/fancy-example.css'
import useTrans from '../../../../hooks/useTrans'
import formatNumber from '../../../../components/FormatNumber/FormatNumber'
import ContractsIndicator from '../../../../components/ContractsIndicator/ContractsIndicator'

const CountryEquity = ({ profileData }) => {
    const { trans } = useTrans()

    return (
        <div>
            <div className="w-full px-2 mb-12 global-profile">
                <ContractsIndicator />
            </div>

            <div className="w-full px-2 mb-12">
                <h2 className="font-normal text-lg mb-6">Equity Overview</h2>
                <div className="[ grid grid-cols-1 md:grid-cols-12 gap-6 ]">
                    <div className="rounded-md p-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-white">
                        <h4 className="font-bold mb-6 uppercase">
                            {trans('Unemployment rate')}
                        </h4>
                        <p className="text-xl font-bold text-primary-dark">
                            {profileData.equity_unemployment_rate}%
                        </p>
                    </div>
                    <div className="rounded-md p-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-white">
                        <h4 className="font-bold mb-6 uppercase">
                            {trans('Average income')}
                        </h4>
                        <p className="text-xl font-bold text-primary-dark">
                            ${profileData.equity_income_avg}
                            <span className="uppercase text-base font-normal ml-2">
                                usd
                            </span>
                        </p>
                    </div>
                    <div className="rounded-md p-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-white">
                        <h4 className="font-bold mb-6 uppercase">
                            {trans('Gender distribution')}
                        </h4>
                        <div className="flex">
                            <div className="mr-16 mb-4 md:mb-0">
                                <p className="text-xl font-bold text-primary-dark">
                                    {profileData.equity_gender_dist_male}%
                                </p>
                                <p className="uppercase text-sm">
                                    {trans('male')}
                                </p>
                            </div>
                            <div className="mr-16 mb-4 md:mb-0">
                                <p className="text-xl font-bold text-primary-dark">
                                    {profileData.equity_gender_dist_female}%
                                </p>
                                <p className="uppercase text-sm">
                                    {trans('female')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md p-4 col-span-12 lg:col-span-9 bg-white">
                        <h4 className="font-bold mb-6 uppercase">
                            {trans('Age distribution')}
                        </h4>
                        <div className="flex flex-wrap">
                            <div className="mr-16 mb-4 md:mb-0">
                                <p className="text-xl font-bold text-primary-dark">
                                    {profileData.equity_age_dist_0_14}%
                                </p>
                                <p className="uppercase text-sm">
                                    0-14 {trans('yrs')}
                                </p>
                            </div>
                            <div className="mr-16 mb-4 md:mb-0">
                                <p className="text-xl font-bold text-primary-dark">
                                    {profileData.equity_age_dist_15_24}%
                                </p>
                                <p className="uppercase text-sm">
                                    15-24 {trans('yrs')}
                                </p>
                            </div>
                            <div className="mr-16 mb-4 md:mb-0">
                                <p className="text-xl font-bold text-primary-dark">
                                    {profileData.equity_age_dist_25_54}%
                                </p>
                                <p className="uppercase text-sm">
                                    25-54 {trans('yrs')}
                                </p>
                            </div>
                            <div className="mr-16 mb-4 md:mb-0">
                                <p className="text-xl font-bold text-primary-dark">
                                    {profileData.equity_age_dist_55_64}%
                                </p>
                                <p className="uppercase text-sm">
                                    55-64 {trans('yrs')}
                                </p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-primary-dark">
                                    {profileData.equity_age_dist_65_above}%
                                </p>
                                <p className="uppercase text-sm">65 & above</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full px-2 mb-12">
                <h2 className="font-normal text-lg mb-6">Procurement</h2>
                <div className="[ grid grid-cols-1 md:grid-cols-12 gap-6 ]">
                    <div className="rounded-md p-4 col-span-3 bg-white [ flex flex-col justify-between ]">
                        <h4 className="font-bold uppercase">
                            {trans('Annual public procurement spending')}
                        </h4>
                        <p className="text-xl font-bold  text-primary-dark">
                            $
                            {formatNumber(
                                profileData.procurement_annual_public_spending
                            )}
                            <span className="uppercase text-base font-normal ml-2">
                                usd
                            </span>
                        </p>
                    </div>
                    <div className="rounded-md p-4 col-span-3 bg-white [ flex flex-col justify-between ]">
                        <h4 className="font-bold uppercase">
                            {trans('% of Procurement to GDP')}
                        </h4>
                        <p className="text-xl font-bold  text-primary-dark">
                            {profileData.procurement_gdp_pc}%
                        </p>
                    </div>
                    <div className="rounded-md p-4 col-span-3 bg-white [ flex flex-col justify-between ]">
                        <h4 className="font-bold uppercase">
                            {trans('COVID-19 spending')}
                        </h4>
                        <p className="text-xl font-bold  text-primary-dark">
                            $
                            {formatNumber(
                                profileData.procurement_covid_spending
                            )}
                            <span className="uppercase text-base font-normal ml-2">
                                usd
                            </span>
                        </p>
                    </div>
                    <div className="rounded-md p-4 col-span-3 bg-white [ flex flex-col justify-between ]">
                        <h4 className="font-bold uppercase">
                            {trans('% from total procurement market')}
                        </h4>
                        <p className="text-xl font-bold  text-primary-dark">
                            {profileData.procurement_total_market_pc}%
                        </p>
                    </div>
                </div>
                <a href="" className="text-blue-20 mt-6 block">
                    {trans("See Mexico's procurement portal ")} --&gt;
                </a>
            </div>
        </div>
    )
}

export default CountryEquity
