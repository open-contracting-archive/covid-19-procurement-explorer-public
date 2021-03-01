import React, { useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import useTrans from '../../hooks/useTrans'
import Loader from '../../components/Loader/Loader'
import SimpleBarChart from '../Charts/SimpleBarChart/SimpleBarChart'
import VisualizationService from '../../services/VisualizationService'
import ChartFooter from '../Utilities/ChartFooter'
import ErrorHandler from '../ErrorHandler'
import Default from '../../constants/Default'

const BuyerProductTimeline = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [error, setError] = useState(false)
    const [buyerProductTimelineType, setBuyerProductTimelineType] = useState(
        'value'
    )
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.ProductTimelineRace(params)
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
    }, [params])

    useEffect(() => {
        const groupedData = originalData.slice(-1).pop()

        if (groupedData) {
            const formattedData = groupedData.details.map((detail) => {
                return {
                    product: detail.product_name,
                    value:
                        buyerProductTimelineType === 'value'
                            ? detail[Default.AMOUNT_USD]
                            : detail[Default.TENDER_COUNT]
                }
            })
            setChartData(formattedData)
            setLoading(false)
        }
    }, [originalData, buyerProductTimelineType])

    const barColorValue = '#ABBABF'

    return (
        <div className="bg-white rounded p-4 h-full">
            <FullScreen handle={fullScreenHandler}>
                <div className="flex justify-between">
                    <h3 className="uppercase font-bold  text-primary-dark">
                        {label}
                    </h3>

                    <div className="flex justify-end">
                        <ul className="contract-switch flex">
                            <li
                                className={`mr-4 cursor-pointer ${
                                    buyerProductTimelineType === 'value'
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() =>
                                    setBuyerProductTimelineType('value')
                                }>
                                {trans('By value')}
                            </li>
                            <li
                                className={`cursor-pointer ${
                                    buyerProductTimelineType === 'number'
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() =>
                                    setBuyerProductTimelineType('number')
                                }>
                                {trans('By number')}
                            </li>
                        </ul>
                    </div>
                </div>
                {loading ? (
                    <Loader />
                ) : !error ? (
                    <SimpleBarChart
                        data={chartData}
                        height="600px"
                        className="chart-full"
                        barColorValue={barColorValue}
                        chartKey="product"
                        chartValue="value"
                        axisRotation="270"
                    />
                ) : (
                    <ErrorHandler />
                )}
            </FullScreen>

            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}

export default BuyerProductTimeline
