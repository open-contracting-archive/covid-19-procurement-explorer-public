import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import useTrans from '../../../hooks/useTrans'
import { setCountryCurrency } from '../../../store/reducers/general/action'
import CountrySelector from "../../../components/CountrySelector/CountrySelector"
import CountryMapElement from "./sections/CountryMapElement"
import CountryInfo from "./sections/CountryInfo"
import CountryData from "./tabs/CountryData"
import CountryInsights from "./tabs/CountryInsights"
import CountryContracts from "./tabs/CountryContracts"
import TabNavigator from "./sections/TabNavigator"
import CountryEquity from "./tabs/CountryEquity"
import CountryBuyers from "./tabs/CountryBuyers"
import CountrySuppliers from "./tabs/CountrySuppliers"
import CountryProducts from "./tabs/CountryProducts"
import { DATA, INSIGHTS, CONTRACTS, EQUITY, BUYERS, SUPPLIERS, PRODUCTS, METHODOLOGY } from "../../../constants/Tab"

const CountryProfile = () => {
    const countries = useSelector((state) => state.general.countries)
    const [countryData, setCountryData] = useState({})
    const [countryCode, setCountryCode] = useState('')
    const { trans } = useTrans()
    let { countrySlug } = useParams()
    let { tabSlug } = useParams()
    const dispatch = useDispatch()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        let country = countries.find((country) => country.slug === countrySlug)

        if (country) {
            setCountryData(country)
            setCountryCode(country.country_code_alpha_2)
            dispatch(setCountryCurrency(country.currency))
        }
    }, [countries, countrySlug])

    const renderTab = () => {
        switch (tabSlug) {
            case DATA:
                return (<CountryData countryCode={countryCode} slug={countrySlug} />)
            case INSIGHTS:
                return (<CountryInsights countryId={countryData.id} />)
            case CONTRACTS:
                return (<CountryContracts countryCode={countryCode} />)
            case EQUITY:
                return (<CountryEquity countryCode={countryCode} />)
            case BUYERS:
                return (<CountryBuyers country={countryCode} />)
            case SUPPLIERS:
                return (<CountrySuppliers country={countryCode} />)
            case PRODUCTS:
                return (<CountryProducts country={countryCode} />)
            case METHODOLOGY: //to create component
                return (<div>Methodology page</div>)
            default:
                return (<CountryData countryCode={countryCode} slug={countrySlug} />)
        }
    }

    return (
        <section className="pt-20 -mt-8 bg-blue-0">
            <section className="px-4">
                <div className="container mx-auto">
                    <CountrySelector countryCode={countryCode} slug={countrySlug} />
                    <div className="flex flex-wrap -mb-4">
                        <CountryMapElement countryCode={countryCode} />
                        <CountryInfo country={countryData} />
                    </div>
                </div>
            </section>

            <TabNavigator endpoint={"country"} countrySlug={countrySlug} />

            <div
                style={{
                    borderTop: '5px solid #1fbbec'
                }}
                className="py-16 bg-primary-gray px-4">
                <div className="container mx-auto">
                    {renderTab()}
                </div>
            </div>
        </section>
    )
}
export default CountryProfile
