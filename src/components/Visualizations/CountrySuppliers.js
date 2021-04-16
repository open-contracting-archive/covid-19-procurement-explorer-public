import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { isEmpty, get } from 'lodash'
import { SankeyChart } from './Charts'
import VisualizationService from '../../services/VisualizationService'
import {
    Loader,
    ChartFooter,
    ContractViewSwitcher,
    HelpText,
    ErrorHandler
} from '../Utilities'
import ContractView from '../../constants/ContractView'
import Default from '../../constants/Default'
import { t } from '@transifex/native'

const CountrySuppliers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Country Suppliers',
        helpText = 'Top 10 suppliers in each product category according to contracts value or number of signed contracts',
        params,
        countrySlug
    } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState([])
    const [error, setError] = useState(false)
    const fullScreenHandler = useFullScreenHandle()
    const currency = useSelector((state) => state.general.currency)
    const countryCurrency = useSelector(
        (state) => state.general.countryCurrency
    )
    const selectedCurrency =
        currency === Default.CURRENCY_LOCAL ? countryCurrency : currency

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.CountrySuppliers(params)
            .then((result) => {
                setLoading(false)
                if (result) {
                    setOriginalData(result)
                } else {
                    throw new Error()
                }
            })
            .catch(() => {
                setError(true)
            })

        return () => {
            setOriginalData({})
        }
    }, [params?.country, params?.product])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let productCountry = get(
                originalData,
                `by_${viewType}.product_buyer`,
                []
            ).map((item) => {
                return {
                    from: item.product_name,
                    to: item.buyer_name,
                    value:
                        viewType === ContractView.NUMBER
                            ? item[Default.TENDER_COUNT]
                            : currency === Default.CURRENCY_LOCAL
                            ? item[Default.AMOUNT_LOCAL]
                            : item[Default.AMOUNT_USD]
                }
            })
            let supplierProduct = get(
                originalData,
                `by_${viewType}.supplier_product`,
                []
            ).map((item) => {
                return {
                    from: item.supplier_name,
                    to: item.product_name,
                    value:
                        viewType === ContractView.NUMBER
                            ? item[Default.TENDER_COUNT]
                            : currency === Default.CURRENCY_LOCAL
                            ? item[Default.AMOUNT_LOCAL]
                            : item[Default.AMOUNT_USD]
                }
            })
            setChartData([...supplierProduct, ...productCountry])
        }

        return () => {
            setChartData([])
        }
    }, [originalData, viewType, currency])

    return (
        <div>
            <FullScreen handle={fullScreenHandler}>
                <div className="p-4 bg-white rounded rounded-b-none simple-tab h-full">
                    <div className="flex flex-wrap items-center mb-4 md:mb-0 justify-start md:justify-between">
                        <div className="flex mr-2 mb-2 md:mb-0">
                            <h3 className="uppercase font-bold  text-primary-dark">
                                {t(label)}
                            </h3>
                            <HelpText helpTextInfo={helpText} />
                        </div>

                        <ContractViewSwitcher
                            viewType={viewType}
                            viewHandler={setViewType}
                        />
                    </div>

                    {loading ? (
                        <Loader />
                    ) : !error ? (
                        <div className="flex mt-4">
                            <div className="flex-1">
                                <SankeyChart
                                    data={chartData}
                                    currency={selectedCurrency}
                                />
                            </div>
                        </div>
                    ) : (
                        <ErrorHandler />
                    )}
                </div>
            </FullScreen>

            <ChartFooter
                linkText={`/country/${countrySlug}/suppliers`}
                fullScreenHandler={fullScreenHandler}
            />
        </div>
    )
}

export default CountrySuppliers
