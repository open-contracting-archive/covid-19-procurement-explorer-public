import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import useTrans from '../../../hooks/useTrans'
import TabNavigator from '../CountryProfile/sections/TabNavigator'
import WorldMap from '../../../components/Visualizations/WorldMap'
import GlobalData from './tabs/GlobalData'
import GlobalInsights from './tabs/GlobalInsights'
import GlobalContracts from './tabs/GlobalContracts'
import GlobalEquity from './tabs/GlobalEquity'
import GlobalBuyers from './tabs/GlobalBuyers'
import GlobalSuppliers from './tabs/GlobalSuppliers'
import GlobalProducts from './tabs/GlobalProducts'
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
import CountrySelector from '../../../components/CountrySelector/CountrySelector'

const GlobalOverview = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { trans } = useTrans()
    let { tabSlug } = useParams()

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
            case METHODOLOGY: //to create component
                return <div>Methodology page</div>
            default:
                return <GlobalData />
        }
    }

    return (
        <Fragment>
            <section className="global-profile -mt-8">
                <section className="bg-blue-0 pt-20 px-4">
                    <div className="container mx-auto">
                        {/* <h2 className="font-normal mb-5 text-2xl  text-primary-dark">
                            {trans('Global Overview')}
                        </h2> */}
                        <CountrySelector />
                        <WorldMap />
                    </div>
                </section>

                <TabNavigator endpoint={'global-overview'} />
                <div
                    style={{
                        borderTop: '5px solid #1fbbec'
                    }}
                    className="py-16 bg-primary-gray px-4">
                    <div className="container mx-auto">{renderTab()}</div>
                </div>
            </section>
        </Fragment>
    )
}

export default GlobalOverview
