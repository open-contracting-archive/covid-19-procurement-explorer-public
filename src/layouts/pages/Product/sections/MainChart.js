import React, { useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { T } from '@transifex/react'
import {
    ProductMap,
    CountryProductComparisonChart,
    GlobalSuppliers,
    CountrySuppliers
} from '../../../../components/Visualizations'
import { ReactComponent as ChartsIcon } from '../../../../assets/img/icons/ic_charts.svg'
import { ReactComponent as FlowIcon } from '../../../../assets/img/icons/ic_flow.svg'
import { ReactComponent as MapIcon } from '../../../../assets/img/icons/ic_map.svg'

const MainChart = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { country, product } = props
    const [view, setView] = useState('chart')
    const handle = useFullScreenHandle()

    function renderMainChart() {
        if (country) {
            return view === 'chart' ? (
                <CountryProductComparisonChart
                    productName={product.name}
                    country={country.country_code_alpha_2}
                />
            ) : (
                <div className="rounded border border-blue-0">
                    <CountrySuppliers
                        label="Product Flow"
                        params={{
                            country: country.country_code_alpha_2,
                            product: product.id
                        }}
                    />
                </div>
            )
        } else {
            return view === 'flow' ? (
                <div className="rounded border border-blue-0">
                    <GlobalSuppliers
                        label="Product Flow"
                        params={{
                            product: product.id
                        }}
                    />
                </div>
            ) : (
                <ProductMap params={{ product: product.id }} />
            )
        }
    }

    return (
        <div className="mb-12">
            <div className="py-6 px-4 md:px-0 simple-tab">
                <FullScreen handle={handle}>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-auto">
                            <div className="product-worldmap-tab space-x-12 md:space-x-0">
                                {country ? (
                                    <div
                                        className={`product-worldmap-tablist z-10 text-center cursor-pointer mb-2 ${
                                            view === 'chart' ? 'active' : ''
                                        }`}
                                        onClick={() => setView('chart')}>
                                        <div>
                                            <ChartsIcon className="inline-block" />
                                            <span className="mt-1 md:mt-0 block text-sm">
                                                <T _str="Charts" />
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={`product-worldmap-tablist z-10 text-center cursor-pointer mb-2 ${
                                            view === 'map' || view === 'chart'
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() => setView('map')}>
                                        <div>
                                            <MapIcon className="inline-block w-4 h-4" />
                                            <span className="mt-1 md:mt-0 block text-sm">
                                                <T _str="Map" />
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`product-worldmap-tablist z-10 text-center cursor-pointer ${
                                        view === 'flow' ? 'active' : ''
                                    }`}
                                    onClick={() => setView('flow')}>
                                    <div>
                                        <FlowIcon className="inline-block" />
                                        <span className="mt-1 md:mt-0 block text-sm">
                                            <T _str="Flow" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 relative product-main-chart">
                            {renderMainChart()}
                        </div>
                    </div>
                </FullScreen>
            </div>
        </div>
    )
}

export default MainChart
