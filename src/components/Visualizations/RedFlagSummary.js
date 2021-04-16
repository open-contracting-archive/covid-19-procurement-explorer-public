import React, { useEffect, useMemo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { groupBy, identity, pickBy } from 'lodash'
import VisualizationService from '../../services/VisualizationService'
import ContractView from '../../constants/ContractView'
import { formatDate } from '../../helpers/date'
import { toCamelCase } from '../../helpers/general'
import Default from '../../constants/Default'
import useTrans from '../../hooks/useTrans'
import Checkbox from '../Elements/Checkbox'
import { CompareChart } from './Charts'
import { Loader, ChartFooter, ContractViewSwitcher } from '../Utilities'
import { colors } from '../../constants/Theme'
import Visualization from '../../constants/Visualization'

const RedFlagSummary = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Contracts with red flags', params } = props
    const redFlagList = useSelector((state) =>
        state.general.redFlags.map((redFlag, index) => ({
            ...redFlag,
            color: colors[index]
        }))
    )
    const currency = useSelector((state) => state.general.currency)
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState([])
    const [selectedRedFlags, setSelectedRedFlags] = useState(() =>
        redFlagList.map((redFlag) => redFlag.id)
    )
    const [chartData, setChartData] = useState([])
    const indicators = useMemo(() => {
        return redFlagList.filter((redFlag) =>
            selectedRedFlags.includes(redFlag.id)
        )
    }, [redFlagList, selectedRedFlags])
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    // Fetch data
    useEffect(() => {
        VisualizationService.RedFlagSummary(identity(pickBy(params)))
            .then((result) => {
                if (result) {
                    setOriginalData(result)
                }
                setLoading(false)
            })
            .catch((error) => console.log(error))

        return () => {
            setOriginalData([])
        }
    }, [params?.country, params?.buyer, params?.supplier])

    // Prepare chart data
    useEffect(() => {
        let chartData = []
        let grouped = groupBy(originalData, (item) => {
            return formatDate(item.month, 'YYYY-MM')
        })

        Object.keys(grouped).map((key) => {
            let points = {}
            let sum = 0

            redFlagList
                .filter((redFlag) => selectedRedFlags.includes(redFlag.id))
                .forEach((redFlag) => {
                    let redFlagData = grouped[key].find(
                        (redFlagItem) => redFlag.id === redFlagItem.red_flag_id
                    )

                    if (redFlagData) {
                        points[toCamelCase(redFlag.name)] =
                            viewType === ContractView.VALUE
                                ? currency === Default.CURRENCY_LOCAL
                                    ? redFlagData[Default.AMOUNT_LOCAL]
                                    : redFlagData[Default.AMOUNT_USD]
                                : redFlagData[Default.TENDER_COUNT]
                        sum += points[toCamelCase(redFlag.name)]
                    } else {
                        points[toCamelCase(redFlag.name)] = 0
                    }
                })

            chartData.push({
                month: key,
                sum: sum,
                ...points
            })
        })

        chartData = chartData.sort(function (a, b) {
            return new Date(a.month) - new Date(b.month)
        })

        setChartData(chartData)
        setLoading(false)
    }, [originalData, viewType, selectedRedFlags, currency])

    function handleIndicatorSelection(redFlagId) {
        setSelectedRedFlags((previous) => {
            let items = [...previous]
            if (items.includes(+redFlagId)) {
                items.splice(items.indexOf(+redFlagId), 1)
            } else {
                items[items.length] = parseInt(redFlagId)
            }

            return [...new Set(items)]
        })
    }

    function shouldRenderChart() {
        return !!chartData.length
    }

    function renderChart() {
        return (
            <div className="flex flex-wrap">
                {shouldRenderChart() ? (
                    <Fragment>
                        <div className="w-full md:w-auto">
                            <div className="md:w-80 md:mr-12">
                                <ul>
                                    {redFlagList.map((item, index) => (
                                        <li
                                            key={index}
                                            className="active text-sm md:text-base py-1 md:py-2 flex items-center justify-between
                                                        border-b border-blue-0 text-blue-50">
                                            <div className="flex items-center">
                                                <div className="contract-line">
                                                    <span
                                                        className="line"
                                                        style={{
                                                            background:
                                                                item.color
                                                        }}
                                                    />
                                                </div>
                                                <div className="contract-text">
                                                    <span>{item.name}</span>
                                                </div>
                                            </div>
                                            <Checkbox
                                                id={`red-flag-${index}`}
                                                value={item.id}
                                                checked={selectedRedFlags.includes(
                                                    item.id
                                                )}
                                                itemSelected={
                                                    handleIndicatorSelection
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 w-full md:w-auto md:flex-1">
                            <CompareChart
                                chartData={chartData}
                                indicators={indicators}
                            />
                        </div>
                    </Fragment>
                ) : (
                    <p>{trans('Not enough data')}</p>
                )}
            </div>
        )
    }

    return (
        <div>
            <FullScreen handle={fullScreenHandler}>
                <div className="p-4 bg-white rounded rounded-b-none simple-tab h-full">
                    <div className="flex flex-wrap items-center justify-between mb-4 md:mb-6">
                        <h3 className="mb-4 md:mb-0 w-full md:w-auto uppercase font-bold  text-primary-dark">
                            {trans(label)}
                        </h3>

                        {shouldRenderChart() && (
                            <ContractViewSwitcher
                                viewType={viewType}
                                viewHandler={setViewType}
                            />
                        )}
                    </div>

                    {loading ? <Loader /> : <div>{renderChart()}</div>}
                </div>
            </FullScreen>

            {shouldRenderChart() && (
                <ChartFooter
                    fullScreenHandler={fullScreenHandler}
                    embeddedVisualization={{
                        key: Visualization.RED_FLAG_SUMMARY,
                        options: params
                    }}
                />
            )}
        </div>
    )
}

export default RedFlagSummary
