import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { StackedChart } from './Charts'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationService from '../../services/VisualizationService'
import { groupBy } from 'lodash'
import { dateDiff, formatDate } from '../../helpers/date'
import { slugify } from '../../helpers/general'
import { ChartFooter, CardContainer, ErrorHandler } from '../Utilities'
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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
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
    }, [params?.country, params?.buyer, params?.supplier])

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
                    viewHandler={setViewType}
                >
                    <div>
                        {!error ? (
                            <StackedChart
                                data={chartData}
                                currency={selectedCurrency}
                                viewType={viewType}
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

ProductsTimeline.propTypes = {
    label: PropTypes.string,
    params: PropTypes.object
}

export default ProductsTimeline
