import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import VisualizationService from '../../services/VisualizationService'
import SimpleBarChart from '../Charts/SimpleBarChart/SimpleBarChart'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import Loader from '../Loader/Loader'
import { dateDiff, formatDate } from '../../helpers/date'
import useTrans from '../../hooks/useTrans'
import HelpText from '../../components/HelpText/HelpText'
import Visualization from '../../constants/Visualization'

const barColorValue = '#ABBABF'

const TotalSpending = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Total Spending',
        params,
        modalHandler,
        helpText = 'Total value of COVID related contracts'
    } = props
    const currency = useSelector((state) => state.general.currency)
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState({
        amount: '',
        percentage: '',
        areaChartDataRaw: [],
        areaChartData: [],
        barChartData: []
    })
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.TotalSpending(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
    }, [params?.country, params?.buyer, params?.supplier])

    useEffect(() => {
        const areaChartDataRaw =
            originalData &&
            lineChartData(get(originalData[currency], 'line_chart'))

        setChartData({
            amount: originalData && get(originalData[currency], 'total'),
            percentage:
                originalData && get(originalData[currency], 'increment'),
            areaChartDataRaw:
                originalData &&
                lineChartData(get(originalData[currency], 'line_chart')),
            areaChartData:
                areaChartDataRaw && convertDate(sortDate(areaChartDataRaw)),
            barChartData:
                originalData && get(originalData[currency], 'bar_chart')
        })
    }, [originalData, currency])

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

    return (
        <div className="bg-white rounded p-4 h-full">
            <div className="flex items-center">
                <h3 className="uppercase font-bold text-primary-dark inline-block">
                    {trans(label)}
                </h3>
                <HelpText helpTextInfo={helpText} />
            </div>
            {loading ? (
                <Loader sm />
            ) : (
                <div className="flex flex-wrap items-end">
                    <div className="w-full md:w-2/5">
                        <AreaChartBlock
                            chartData={chartData.areaChartData}
                            totalAmount={chartData.amount}
                            percentage={chartData.percentage}
                            colorValue={
                                chartData.percentage < 0 ? '#FE5151' : '#3EEDA4'
                            }
                            currency={currency}
                        />
                    </div>
                    <div className="md:flex-1">
                        <SimpleBarChart
                            data={chartData.barChartData}
                            barColorValue={barColorValue}
                            chartKey="method"
                            chartValue="value"
                        />
                    </div>
                </div>
            )}
            {modalHandler && (
                <span
                    className="cursor-pointer text-sm text-primary-blue block text-right"
                    onClick={() => modalHandler(Visualization.TOTAL_SPENDING)}>
                    View in detail →
                </span>
            )}
        </div>
    )
}

export default TotalSpending
