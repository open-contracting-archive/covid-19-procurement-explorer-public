import React, { useState, useEffect } from 'react'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import { formatDate, dateDiff } from '../../helpers/date'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import Loader from '../Loader/Loader'

const Suppliers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState({})
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.SupplierSummary(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
    }, [params])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Function to manage data for line chart
    const lineChartData = (chartData) => {
        return (
            chartData &&
            chartData.map((data) => {
                return {
                    date: formatDate(data.month, 'MMMM YYYY'),
                    value: data.supplier_count
                }
            })
        )
    }

    // Function to sort by date
    const sortDate = (data) => {
        return data.sort((date1, date2) => {
            return dateDiff(date1.date, date2.date)
        })
    }

    // Supplier summary
    const supplierSummaryLineChartDataRaw =
        originalData && lineChartData(originalData.trend)
    const supplierSummaryLineChartData =
        supplierSummaryLineChartDataRaw &&
        sortDate(supplierSummaryLineChartDataRaw)
    const supplierSummaryAmount = originalData && originalData.total
    const supplierSummaryPercentage =
        originalData && originalData.percentage

    return (
        <div className="bg-white rounded p-4 h-full">
            <h3 className="uppercase font-bold  text-primary-dark">
                {trans(label ? label : 'Suppliers')}
            </h3>
            {loading ? (
                <Loader sm />
            ) : (
                <div className="flex items-end">
                    <AreaChartBlock
                        chartData={supplierSummaryLineChartData}
                        totalAmount={supplierSummaryAmount}
                        percentage={supplierSummaryPercentage}
                        colorValue={
                            supplierSummaryPercentage < 0
                                ? '#FE5151'
                                : '#3EEDA4'
                        }
                    />
                    <div className="flex-1" />
                </div>
            )}
        </div>
    )
}

export default Suppliers
