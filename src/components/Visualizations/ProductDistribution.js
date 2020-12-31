import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import BarListSection from '../BarListSection/BarListSection'
import VisualizationServices from '../../services/visualizationServices'

function ProductDistribution(params) {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [productDistribution, setProductDistribution] = useState()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.ProductDistribution(params).then((response) => {
            setProductDistribution(response)
            setLoading(false)
        })
    }, [])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Product distribution
    const calculateProductChartPercentage = (data, type) => {
        if (type == 'by_value') {
            let total = data.reduce((acc, current) => {
                return acc + current.amount_usd
            }, 0)

            let productDistributionChartData = data.map((data) => {
                return {
                    name: data.product_name,
                    value: Math.ceil((data.amount_usd / total) * 100),
                    amount: data.amount_usd
                }
            })
            return productDistributionChartData
        }
        if (type == 'by_number') {
            let total = data.reduce((acc, current) => {
                return acc + current.tender_count
            }, 0)

            let productDistributionChartData = data.map((data) => {
                return {
                    name: data.product_name,
                    value: Math.ceil((data.tender_count / total) * 100),
                    amount: data.tender_count
                }
            })
            return productDistributionChartData
        }
    }
    const productDistributionDataByNumber =
        productDistribution &&
        calculateProductChartPercentage(productDistribution, 'by_number')
    const productDistributionDataByValue =
        productDistribution &&
        calculateProductChartPercentage(productDistribution, 'by_value')

    return (
        <div className="bg-white rounded h-full">
            {loading ? (
                <Loader />
            ) : (
                <BarListSection
                    label="Product distribution"
                    byNumber={
                        productDistributionDataByNumber &&
                        productDistributionDataByNumber
                    }
                    byValue={
                        productDistributionDataByValue &&
                        productDistributionDataByValue
                    }
                />
            )}
        </div>
    )
}

export default ProductDistribution
