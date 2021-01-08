import React, { useState, useEffect } from 'react'
import useTrans from '../../hooks/useTrans'
import VisualizationServices from '../../services/visualizationServices'
import { formatDate, dateDiff } from '../../helpers/date'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import Loader from '../Loader/Loader'

function Suppliers({ label, params }) {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [supplierSummary, setSupplierSummary] = useState()
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.SupplierSummary(params).then((response) => {
            setSupplierSummary(response)
            setLoading(false)
        })
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
        supplierSummary && lineChartData(supplierSummary.trend)
    const supplierSummaryLineChartData =
        supplierSummaryLineChartDataRaw &&
        sortDate(supplierSummaryLineChartDataRaw)
    const supplierSummaryAmount = supplierSummary && supplierSummary.total
    const supplierSummaryPercentage =
        supplierSummary && supplierSummary.percentage

    return (
        <div className="bg-white rounded p-4 h-full">
            <h3 className="uppercase font-bold  text-primary-dark">
                {label ? label : 'Supplier'}
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
