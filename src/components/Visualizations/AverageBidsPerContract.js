import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import { dateDiff, formatDate } from '../../helpers/date'
import ErrorHandler from '../ErrorHandler'

const AverageBidsPerContract = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Average bids per contract', params } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState({})
    const [error, setError] = useState(false)
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.AverageBids(params).then((result) => {
            setLoading(false)
            if(result){
                setOriginalData(result)
            } else{
                throw new Error()
            }
        })
        .catch(()=>{
            setError(true)
        })

        return () => {
            setOriginalData({})
        }
    }, [params?.country, params?.buyer])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Function to manage data for line chart
    const lineChartData = (chartData) => {
        return (
            chartData &&
            chartData.map((data) => {
                return {
                    date: formatDate(data.date, 'YYYY-MM-DD'),
                    value: data.value
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

    // Function to convert date format
    const convertDate = (data) => {
        return data.map((data) => {
            return {
                ...data,
                date: formatDate(data.date, 'MMMM YYYY')
            }
        })
    }

    // Average bids
    const averageBidsLineChartDataRaw =
        originalData && lineChartData(originalData.line_chart)
    const averageBidsLineChartData =
        averageBidsLineChartDataRaw &&
        convertDate(sortDate(averageBidsLineChartDataRaw))
    const averageBidsAmount = originalData && originalData.average
    const averageBidsPercentage = originalData && originalData.difference

    return (
        <div className="bg-white rounded p-4 h-full">
            <h3 className="uppercase font-bold  text-primary-dark">
                {label || trans('Average bids per contract')}
            </h3>
            {loading ? (
                <Loader sm />
            ) : !error ?  (
                <div className="flex items-end">
                    <AreaChartBlock
                        chartData={averageBidsLineChartData}
                        totalAmount={averageBidsAmount}
                        percentage={averageBidsPercentage}
                        colorValue={
                            averageBidsPercentage < 0 ? '#FE5151' : '#3EEDA4'
                        }
                    />
                </div>
            ) : (
                <ErrorHandler />
            )}
        </div>
    )
}

export default AverageBidsPerContract
