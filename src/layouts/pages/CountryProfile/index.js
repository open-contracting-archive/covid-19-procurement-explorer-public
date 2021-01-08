import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import useTrans from '../../../hooks/useTrans'
import CountryData from './tabs/CountryData'
import CountryInfo from './sections/CountryInfo'
import CountryMapElement from './sections/CountryMapElement'
import { first } from 'lodash'
import CountrySelector from '../../../components/CountrySelector/CountrySelector'
import { setCountryCurrency } from '../../../store/reducers/general/action'

const CountryDetail = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const countries = useSelector((state) => state.general.countries)
    const [countryData, setCountryData] = useState({})
    const [countryCode, setCountryCode] = useState()
    const { trans } = useTrans()
    let { slug } = useParams()
    const dispatch = useDispatch()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        let country = Object.keys(countries)
            .map((key) => countries[key])
            .find((country) => country.slug === slug)

        if (country) {
            setCountryData(country)
            setCountryCode(country.country_code_alpha_2)
            dispatch(setCountryCurrency(country.currency))
        }
    }, [countries, slug])

    // useEffect(() => {
    //     // Fetch country specific data
    //     CountryServices.CountryProfileData(slug)
    //         .then((response) => {
    //             setCountryData(response)
    //             setCountryCode(response.country_code_alpha_2)
    //         })
    // }, [slug])

    return (
        <section className="pt-20 -mt-8 bg-blue-0">
            <section className="px-4">
                <div className="container mx-auto">
                    {/* <h2 className="font-normal mb-5 text-2xl text-primary-dark capitalize"> */}
                    {/* {slug} */}
                    <CountrySelector countryCode={countryCode} slug={slug} />
                    {/* </h2> */}
                    <div className="flex flex-wrap -mb-4">
                        <CountryMapElement countryCode={countryCode} />
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
                    <CountryData countryCode={countryCode} slug={slug} />
                </div>
            </div>
        </section>
    )
}

export default CountryDetail
