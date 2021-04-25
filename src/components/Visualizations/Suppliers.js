import React, { useState, useEffect } from 'react'
import { T } from '@transifex/react'
import VisualizationService from '../../services/VisualizationService'
import { formatDate, dateDiff } from '../../helpers/date'
import { AreaChartBlock } from './Charts'
import { Loader, HelpText, ErrorHandler } from '../Utilities'
import Visualization from '../../constants/Visualization'

const Suppliers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Suppliers',
        params,
        modalHandler,
        helpText = 'Number of suppliers who signed at least 1 COVID contract'
    } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState({})
    const [error, setError] = useState(false)

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.SupplierSummary(params)
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
    const supplierSummaryPercentage = originalData && originalData.percentage

    return (
        <div className="bg-white rounded p-4 h-full">
            <div className="flex items-center">
                <h3 className="uppercase font-bold text-primary-dark inline-block">
                    <T _str={label} />
                </h3>
                <HelpText helpTextInfo={helpText} />
            </div>
            {loading ? (
                <Loader sm />
            ) : !error ? (
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
            ) : (
                <ErrorHandler />
            )}
            {!error && modalHandler && (
                <span
                    className="cursor-pointer text-sm text-primary-blue block text-right"
                    onClick={() => modalHandler(Visualization.TOTAL_SUPPLIERS)}>
                    View in detail →
                </span>
            )}
        </div>
    )
}

export default Suppliers
