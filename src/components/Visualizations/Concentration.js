import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import BarListSection from '../BarListSection/BarListSection'
import VisualizationService from '../../services/VisualizationService'

const Concentration = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.ProductDistribution(params)
            .then((response) => {
                setOriginalData(response)
                setLoading(false)
            })

        return () => {
            setOriginalData([])
        }
    }, [params])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Product distribution
    const calculateProductChartPercentage = (data, type) => {
        if (type === 'by_value') {
            let total = data.reduce((acc, current) => {
                return acc + current.amount_usd
            }, 0)

            return data.map((data) => {
                return {
                    name: data.product_name,
                    value: Math.ceil((data.amount_usd / total) * 100),
                    amount: data.amount_usd
                }
            })
        }
        if (type === 'by_number') {
            let total = data.reduce((acc, current) => {
                return acc + current.tender_count
            }, 0)

            return data.map((data) => {
                return {
                    name: data.product_name,
                    value: Math.ceil((data.tender_count / total) * 100),
                    amount: data.tender_count
                }
            })
        }
    }
    const productDistributionDataByNumber =
        originalData &&
        calculateProductChartPercentage(originalData, 'by_number')
    const productDistributionDataByValue =
        originalData &&
        calculateProductChartPercentage(originalData, 'by_value')

    return (
        <div className="bg-white rounded h-full">
            {loading ? (<Loader />) : (
                <BarListSection
                    label={label}
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

export default Concentration
