import React, { useEffect, useState } from 'react'
import { isEmpty, sumBy } from 'lodash'
import VisualizationService from '../../services/VisualizationService'
import { BarListChart } from './Charts'
import Default from '../../constants/Default'
import { CardContainer, ErrorHandler } from '../Utilities'

const Concentration = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Concentration', params } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState([])
    const [error, setError] = useState(false)

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.TopSuppliers(params)
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
            let dataSet = originalData.by_buyer
            let total = sumBy(dataSet, (item) => item[Default.BUYER_COUNT])

            let chartDataFormatted = dataSet.map((item) => {
                let actualValue = item[Default.BUYER_COUNT]
                return {
                    name: item.supplier_name,
                    value: Math.ceil((actualValue / total) * 100),
                    amount: actualValue,
                    id: item.supplier_id
                }
            })
            setChartData(chartDataFormatted)
        }
    }, [originalData])

    return (
        <CardContainer label={label} loading={loading}>
            <div className="-mt-4 md:mt-0 custom-horizontal-bar">
                {!error ? (
                    <BarListChart
                        data={chartData}
                        text="suppliers"
                        viewType={'buyer'}
                    />
                ) : (
                    <ErrorHandler />
                )}
            </div>
        </CardContainer>
    )
}

export default Concentration
