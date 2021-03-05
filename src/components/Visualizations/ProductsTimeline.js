import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import StackedChart from '../Charts/StackedChart/StackedChart'
import useTrans from '../../hooks/useTrans'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationService from '../../services/VisualizationService'
import { groupBy } from 'lodash'
import { dateDiff, formatDate } from '../../helpers/date'
import { slugify } from '../../helpers/general'
import ChartFooter from '../Utilities/ChartFooter'
import ErrorHandler from '../ErrorHandler'
import ContractView from '../../constants/ContractView'
import Default from '../../constants/Default'
import Visualization from '../../constants/Visualization'

const ProductsTimeline = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Products Timeline', params } = props
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [chartType, setChartType] = useState('value')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()
    const currency = useSelector((state) => state.general.currency)
    const countryCurrency = useSelector(
        (state) => state.general.countryCurrency
    )
    const selectedCurrency =
        currency === Default.CURRENCY_LOCAL ? countryCurrency : currency

    // Function to sort by date
    const sortDate = (data) => {
        return data.sort((date1, date2) => {
            return dateDiff(date1.month, date2.month)
        })
    }

    // Function to convert date format
    const convertDate = (data) => {
        return data.map((data) => {
            return { ...data, month: formatDate(data.month, 'MMM YYYY') }
        })
    }
    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.ProductTimeline(params)
            .then((result) => {
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
            setOriginalData([])
        }
    }, [])

    useEffect(() => {
        const groupedData = groupBy(originalData, (item) =>
            formatDate(item.date, 'YYYY-MM-DD')
        )
        const chartData = Object.keys(groupedData).map((key) => {
            let products = {}
            groupedData[key].forEach((item) => {
                products[slugify(item.product_name)] =
                    chartType === ContractView.NUMBER
                        ? item[Default.TENDER_COUNT]
                        : currency === Default.CURRENCY_LOCAL
                        ? item[Default.AMOUNT_LOCAL]
                        : item[Default.AMOUNT_USD]
            })

            return {
                month: key,
                ...products
            }
        })

        const finalChartData = convertDate(sortDate(chartData))

        setChartData(finalChartData)
        setLoading(false)
    }, [originalData, chartType, currency])

    return (
        <div>
            <FullScreen handle={fullScreenHandler}>
                <div className="p-4 bg-white rounded rounded-b-none h-full">
                    <div className="flex flex-wrap items-center justify-between">
                        <h3 className="mb-4 md:mb-0 w-full md:w-auto uppercase font-bold  text-primary-dark">
                            {trans(label)}
                        </h3>
                        <div className="w-full md:w-auto flex">
                            <ul className="contract-switch flex">
                                <li
                                    className={`mr-4 cursor-pointer text-xs md:text-base ${
                                        chartType === 'value' ? 'active' : ''
                                    }`}
                                    onClick={() => setChartType('value')}>
                                    {trans('By value')}
                                </li>
                                <li
                                    className={`cursor-pointer text-xs md:text-base ${
                                        chartType === 'number' ? 'active' : ''
                                    }`}
                                    onClick={() => setChartType('number')}>
                                    {trans('By number')}
                                </li>
                            </ul>
                        </div>
                    </div>
                    {!chartData ? (
                        <Loader />
                    ) : !error ? (
                        <div>
                            <StackedChart
                                data={chartData}
                                currency={selectedCurrency}
                            />
                        </div>
                    ) : (
                        <ErrorHandler />
                    )}
                </div>
            </FullScreen>

            <ChartFooter
                fullScreenHandler={fullScreenHandler}
                embeddedVisualization={{
                    key: Visualization.PRODUCTS_TIMELINE,
                    options: params
                }}
            />
        </div>
    )
}

export default ProductsTimeline
