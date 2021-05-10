import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { t } from '@transifex/native'
import { useLocale } from '@transifex/react'
import useCountries from '../../../hooks/useCountries'
import { WorldMap } from '../../../components/Visualizations'
import {
    BUYERS,
    CONTRACTS,
    DATA,
    EQUITY,
    INSIGHTS,
    METHODOLOGY,
    PRODUCTS,
    SUPPLIERS
} from '../../../constants/Tab'
import { CountrySelector, MetaInformation } from '../../../components/Utilities'
import {
    GlobalData,
    GlobalInsights,
    GlobalContracts,
    GlobalEquity,
    GlobalBuyers,
    GlobalSuppliers,
    GlobalProducts
} from './tabs'
import { CountryMethodology } from '../CountryProfile/tabs'

const TabNavigator = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ '../CountryProfile/sections/TabNavigator'
    )
)

const GlobalOverview = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    let { tabSlug } = useParams()
    const { globalCountryItem } = useCountries()
    const [metaInfo, setMetaInfo] = useState({ title: '', description: '' })
    const locale = useLocale()

    useEffect(() => {
        setMetaInfo({
            title: t('Global Overview'),
            description: t('Welcome Covid-19 Contract Explorer')
        })
    }, [locale])

    const renderTab = () => {
        switch (tabSlug) {
            case DATA:
                return <GlobalData />
            case INSIGHTS:
                return <GlobalInsights />
            case CONTRACTS:
                return <GlobalContracts />
            case EQUITY:
                return <GlobalEquity />
            case BUYERS:
                return <GlobalBuyers />
            case SUPPLIERS:
                return <GlobalSuppliers />
            case PRODUCTS:
                return <GlobalProducts />
            case METHODOLOGY:
                return <CountryMethodology countryId={globalCountryItem().id} />
            default:
                return <GlobalData />
        }
    }

    return (
        <Fragment>
            <MetaInformation
                title={metaInfo.title}
                description={metaInfo.description}
            />
            <section className="global-profile -mt-8">
                <section className="bg-blue-0 pt-12 md:pt-20 px-4">
                    <div className="container mx-auto">
                        <CountrySelector />
                        <WorldMap />
                    </div>
                </section>
                <TabNavigator endpoint={'global-overview'} />
                <div
                    style={{
                        borderTop: '5px solid #1fbbec'
                    }}
                    className="py-6 md:py-16 bg-primary-gray px-4">
                    <div className="container mx-auto">{renderTab()}</div>
                </div>
            </section>
        </Fragment>
    )
}

export default GlobalOverview
