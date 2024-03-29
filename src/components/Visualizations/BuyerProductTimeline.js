import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { T } from '@transifex/react'
import { Loader, ChartFooter, ErrorHandler } from '../Utilities'
import { SimpleBarChart } from './Charts'
import VisualizationService from '../../services/VisualizationService'
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
    const [buyerProductTimelineType, setBuyerProductTimelineType] =
        useState('value')
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

    return (
        <div>
            <FullScreen handle={fullScreenHandler}>
                <div className="p-4 bg-white rounded rounded-b-none h-full">
                    <div className="flex justify-between">
                        <h3 className="uppercase font-bold  text-primary-dark">
                            <T _str={label} />
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
                                    }
                                >
                                    <T _str="By value" />
                                </li>
                                <li
                                    className={`cursor-pointer ${
                                        buyerProductTimelineType === 'number'
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        setBuyerProductTimelineType('number')
                                    }
                                >
                                    <T _str="By number" />
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
                            chartKey="product"
                            chartValue="value"
                            axisRotation="270"
                        />
                    ) : (
                        <ErrorHandler />
                    )}
                </div>
            </FullScreen>

            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}

BuyerProductTimeline.propTypes = {
    label: PropTypes.string,
    params: PropTypes.object
}

export default BuyerProductTimeline
