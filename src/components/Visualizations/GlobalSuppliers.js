import React, { useEffect, useState } from 'react'
import { get, isEmpty } from 'lodash'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import SankeyChart from '../Charts/SankeyChart/SankeyChart'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import ChartFooter from '../Utilities/ChartFooter'
import ContractView from '../../constants/ContractView'
import ErrorHandler from '../ErrorHandler'
import Default from '../../constants/Default'
import CardContainer from '../Utilities/CardContainer'

const GlobalSuppliers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Global Suppliers',
        helpText = 'Top 10 suppliers in each product category according to contracts value or number of signed contracts',
        params
    } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState([])
    const [chartLevel, setChartLevel] = useState('global')
    const [error, setError] = useState(false)
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.GlobalSuppliers(params)
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
    }, [params?.country])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let productCountry = get(
                originalData,
                `by_${viewType}.product_country`,
                []
            ).map((item) => {
                return {
                    from: item.product_name,
                    to: item.country_name,
                    value:
                        viewType === ContractView.VALUE
                            ? item[Default.AMOUNT_USD]
                            : item[Default.TENDER_COUNT]
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
                        viewType === ContractView.VALUE
                            ? item[Default.AMOUNT_USD]
                            : item[Default.TENDER_COUNT]
                }
            })
            setChartData([...supplierProduct, ...productCountry])
        }

        return () => {
            setChartData([])
        }
    }, [originalData, viewType])

    return (
        <div>
            <FullScreen handle={fullScreenHandler}>
                <CardContainer
                    loading={loading}
                    label={label}
                    helpText={helpText}
                    viewType={viewType}
                    viewHandler={setViewType}>
                    <div>
                        <ul className="flex items-center mb-6">
                            <li
                                className={`inline-block mr-2 px-2 md:px-4 py-2 rounded-full cursor-pointer text-xs md:text-base ${
                                    chartLevel === 'global'
                                        ? 'bg-blue-50 text-white'
                                        : 'bg-blue-0'
                                }`}
                                onClick={() => setChartLevel('global')}>
                                {trans('Global suppliers chain')}
                            </li>
                            <li
                                className={`inline-block mr-2 px-2 md:px-4 py-2 rounded-full cursor-pointer text-xs md:text-base ${
                                    chartLevel === 'country'
                                        ? 'bg-blue-50 text-white'
                                        : 'bg-blue-0'
                                }`}
                                onClick={() => setChartLevel('country')}>
                                {trans('Global distribution chain')}
                            </li>
                        </ul>
                        {!error ? (
                            <div className="flex mt-4">
                                <div className="flex-1">
                                    <SankeyChart
                                        data={chartData}
                                        currency={Default.CURRENCY_USD}
                                        viewType={viewType}
                                    />
                                </div>
                            </div>
                        ) : (
                            <ErrorHandler />
                        )}
                    </div>
                </CardContainer>
            </FullScreen>
            <ChartFooter
                fullScreenHandler={fullScreenHandler}
                linkText="/global-overview/suppliers"
            />
        </div>
    )
}

export default GlobalSuppliers
