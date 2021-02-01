import React, { useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import ProductMap from '../../../../components/Visualizations/ProductMap'
import CountryProductComparisonChart from '../../../../components/Visualizations/CountryProductComparisonChart'
import GlobalSuppliers from '../../../../components/Visualizations/GlobalSuppliers'
import CountrySuppliers from '../../../../components/Visualizations/Country/CountrySuppliers'
import useTrans from '../../../../hooks/useTrans'
import { ReactComponent as ChartsIcon } from '../../../../assets/img/icons/ic_charts.svg'
import { ReactComponent as FlowIcon } from '../../../../assets/img/icons/ic_flow.svg'
import { ReactComponent as MapIcon } from '../../../../assets/img/icons/ic_map.svg'

const MainChart = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { country, product } = props
    const [view, setView] = useState('chart')
    const { trans } = useTrans()
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
            <div className="py-6 simple-tab">
                <FullScreen handle={handle}>
                    <div>
                        <div className="flex">
                            <div className="flex w-full">
                                <div>
                                    <div className="product-worldmap-tab">
                                        {country ? (
                                            <div
                                                className={`product-worldmap-tablist text-center cursor-pointer mb-2 ${
                                                    view === 'chart'
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    setView('chart')
                                                }>
                                                <div>
                                                    <ChartsIcon className="inline-block" />
                                                    <span className="text-sm inline-block">
                                                        {trans('Charts')}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className={`product-worldmap-tablist text-center cursor-pointer mb-2 ${
                                                    view === 'map' || view === 'chart'
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onClick={() => setView('map')}>
                                                <div>
                                                    <MapIcon className="inline-block" />
                                                    <span className="text-sm inline-block">
                                                        {trans('Map')}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        <div
                                            className={`product-worldmap-tablist text-center cursor-pointer ${
                                                view === 'flow' ? 'active' : ''
                                            }`}
                                            onClick={() => setView('flow')}>
                                            <div>
                                                <FlowIcon className="inline-block" />
                                                <span className="text-sm inline-block">
                                                    {trans('Flow')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex-1 relative"
                                    style={{ width: 'calc(100% - 91px)' }}>
                                    {renderMainChart()}
                                </div>
                            </div>
                        </div>
                    </div>
                </FullScreen>
            </div>
        </div>
    )
}

export default MainChart
