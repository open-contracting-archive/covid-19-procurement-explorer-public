import React, { Fragment, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import useTrans from '../../../hooks/useTrans'
import CountryServices from '../../../services/CountryServices'
import CountryInsights from './tabs/CountryInsights'
import CountryInfo from './sections/CountryInfo'
import CountryMapElement from './sections/CountryMapElement'

const CountryDetailInsights = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    // const [countries, setCountries] = useState([]) // List of all countries
    const [countryData, setCountryData] = useState({})
    const [countryCode, setCountryCode] = useState(null)
    const { trans } = useTrans()
    let { slug } = useParams()

    useEffect(() => {
        // Fetch country specific data
        CountryServices.CountryProfileData(slug).then((response) => {
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
                    <div className="flex flex-wrap -mb-4">
                        <CountryMapElement countryData={countryData} />
                        <CountryInfo country={countryData} />
                    </div>
                </div>
            </section>
            <div className="container mx-auto mt-12">
                <div className="secondary-nav">
                    <ul>
                        <li>
                            <NavLink
                                activeClassName="active"
                                to={`/country/${slug}/data`}>
                                {trans('Data')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName="active"
                                to={`/country/${slug}/insights`}>
                                {trans('Insights')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName="active"
                                to={`/country/${slug}/contracts`}>
                                {trans('Contracts')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName="active"
                                to={`/country/${slug}/equity`}>
                                {trans('Equity')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName="active"
                                to={`/country/${slug}/buyers`}>
                                {trans('Buyers')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName="active"
                                to={`/country/${slug}/suppliers`}>
                                {trans('Suppliers')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName="active"
                                to={`/country/${slug}/products`}>
                                {trans('Products')}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                style={{
                    borderTop: '5px solid #1fbbec'
                }}
                className="py-16 bg-primary-gray px-4">
                <div className="container mx-auto">
                    <CountryInsights country={countryCode} />
                </div>
            </div>
        </section>
    )
}

export default CountryDetailInsights
