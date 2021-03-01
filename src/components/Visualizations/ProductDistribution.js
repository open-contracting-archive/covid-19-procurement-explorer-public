import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { isEmpty, sumBy } from 'lodash'
import VisualizationService from '../../services/VisualizationService'
import BarListChart from '../BarListSection/BarListChart'
import ContractView from '../../constants/ContractView'
import Default from '../../constants/Default'
import CardContainer from '../Utilities/CardContainer'
import ErrorHandler from '../ErrorHandler'

const ProductDistribution = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Product Distribution',
        helpText = 'Contracts distribution by type of goods & services',
        params
    } = props
    const { countrySlug } = useParams()
    const [loading, setLoading] = useState(true)
    const currency = useSelector((state) => state.general.currency)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [error, setError] = useState(false)
    const [viewType, setViewType] = useState(ContractView.VALUE)

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.ProductDistribution(params)
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
            setOriginalData([])
        }
    }, [params?.country, params?.buyer, params?.supplier])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let total = sumBy(originalData, (item) => {
                return viewType === ContractView.NUMBER
                    ? item[Default.TENDER_COUNT]
                    : currency === Default.CURRENCY_LOCAL
                    ? item[Default.AMOUNT_LOCAL]
                    : item[Default.AMOUNT_USD]
            })
            let chartDataFormatted = originalData
                .sort((a, b) => {
                    if (viewType === ContractView.NUMBER) {
                        return a[Default.TENDER_COUNT] > b[Default.TENDER_COUNT]
                            ? -1
                            : 0
                    }

                    return a[Default.AMOUNT_USD] > b[Default.AMOUNT_USD]
                        ? -1
                        : 0
                })
                .map((item) => {
                    let actualValue =
                        viewType === ContractView.NUMBER
                            ? item[Default.TENDER_COUNT]
                            : currency === Default.CURRENCY_LOCAL
                            ? item[Default.AMOUNT_LOCAL]
                            : item[Default.AMOUNT_USD]
                    return {
                        name: item.product_name,
                        value: Math.ceil((actualValue / total) * 100),
                        amount: actualValue,
                        id: item.product_id
                    }
                })
            setChartData(chartDataFormatted)
        }
    }, [originalData, viewType, currency])

    return (
        <CardContainer
            label={label}
            viewType={viewType}
            loading={loading}
            helpText={helpText}
            viewHandler={setViewType}>
            <div className="custom-horizontal-bar">
                {!error ? (
                    <BarListChart
                        data={chartData}
                        text={
                            countrySlug
                                ? `country/${countrySlug}/products`
                                : `global-overview/products`
                        }
                        currency={currency}
                        viewType={viewType}
                    />
                ) : (
                    <ErrorHandler />
                )}
            </div>
        </CardContainer>
    )
}

export default ProductDistribution
