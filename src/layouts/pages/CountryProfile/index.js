import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { setCountryCurrency } from '../../../store/reducers/general/action'
import CountrySelector from '../../../components/CountrySelector/CountrySelector'
import CountryMapElement from './sections/CountryMapElement'
import CountryInfo from './sections/CountryInfo'
import CountryData from './tabs/CountryData'
import CountryInsights from './tabs/CountryInsights'
import CountryContracts from './tabs/CountryContracts'
import TabNavigator from './sections/TabNavigator'
import CountryEquity from './tabs/CountryEquity'
import CountryBuyers from './tabs/CountryBuyers'
import CountrySuppliers from './tabs/CountrySuppliers'
import CountryProducts from './tabs/CountryProducts'
import {
    DATA,
    INSIGHTS,
    CONTRACTS,
    EQUITY,
    BUYERS,
    SUPPLIERS,
    PRODUCTS,
    METHODOLOGY
} from '../../../constants/Tab'
import CmsPageContent from "../StaticPage/CmsPageContent"

const CountryProfile = () => {
    const countries = useSelector((state) => state.general.countries)
    const [countryData, setCountryData] = useState({})
    const { countrySlug } = useParams()
    const { tabSlug } = useParams()
    const dispatch = useDispatch()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        let country = countries.find((country) => country.slug === countrySlug)

        if (country) {
            setCountryData(country)
            dispatch(setCountryCurrency(country.currency))
        }
    }, [countries, countrySlug])

    const renderTab = () => {
        switch (tabSlug) {
            case DATA:
                return (
                    <CountryData
                        countryCode={countryData.country_code_alpha_2}
                    />
                )
            case INSIGHTS:
                return <CountryInsights countryId={countryData.id} />
            case CONTRACTS:
                return (
                    <CountryContracts
                        countryCode={countryData.country_code_alpha_2}
                    />
                )
            case EQUITY:
                return (
                    <CountryEquity
                        countryCode={countryData.country_code_alpha_2}
                    />
                )
            case BUYERS:
                return (
                    <CountryBuyers
                        countryCode={countryData.country_code_alpha_2}
                    />
                )
            case SUPPLIERS:
                return (
                    <CountrySuppliers
                        countryCode={countryData.country_code_alpha_2}
                    />
                )
            case PRODUCTS:
                return (
                    <CountryProducts
                        countryCode={countryData.country_code_alpha_2}
                    />
                )
            case METHODOLOGY:
                return (
                    <CmsPageContent
                        slug={'methodology'}
                    />
                )
            default:
                return (
                    <CountryData
                        countryCode={countryData.country_code_alpha_2}
                    />
                )
        }
    }

    return (
        <section className="pt-10 md:pt-20 -mt-8 bg-blue-0">
            {!isEmpty(countryData) && (
                <section className="px-4">
                    <div className="container mx-auto">
                        <CountrySelector />
                        <div className="relative flex flex-wrap -mx-2 -mb-4">
                            <CountryMapElement
                                countryCode={countryData.country_code_alpha_2}
                            />
                            <CountryInfo country={countryData} />
                        </div>
                    </div>
                </section>
            )}

            <TabNavigator endpoint={'country'} countrySlug={countrySlug} />

            <div
                style={{
                    borderTop: '5px solid #1fbbec'
                }}
                className="py-6 md:py-16 bg-primary-gray px-4">
                <div className="container mx-auto">{renderTab()}</div>
            </div>
        </section>
    )
}
export default CountryProfile
