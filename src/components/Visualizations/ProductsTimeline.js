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
import ContractViewSwitcher from '../Utilities/ContractViewSwitcher'
import CardContainer from '../Utilities/CardContainer'

const ProductsTimeline = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Products Timeline', params } = props
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
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
    const [viewType, setViewType] = useState(ContractView.VALUE)
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
                    viewType === ContractView.NUMBER
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
    }, [originalData, viewType, currency])

    return (
        <div>
            <FullScreen handle={fullScreenHandler}>
                <CardContainer
                    label={label}
                    viewType={viewType}
                    loading={loading}
                    viewHandler={setViewType}>
                    <div>
                        {!error ? (
                            <StackedChart
                                data={chartData}
                                currency={selectedCurrency}
                            />
                        ) : (
                            <ErrorHandler />
                        )}
                    </div>
                </CardContainer>
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
