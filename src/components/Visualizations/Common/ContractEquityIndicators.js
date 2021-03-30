import React, { useEffect, useState, useMemo, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { identity, pickBy, groupBy } from 'lodash'
import useTrans from '../../../hooks/useTrans'
import VisualizationService from '../../../services/VisualizationService'
import Loader from '../../Loader/Loader'
import CompareChart from '../../Charts/CompareChart/CompareChart'
import Checkbox from '../../Checkbox/Checkbox'
import ChartFooter from '../../Utilities/ChartFooter'
import { formatDate } from '../../../helpers/date'
import { toCamelCase } from '../../../helpers/general'
import ContractViewSwitcher from '../../Utilities/ContractViewSwitcher'
import Visualization from '../../../constants/Visualization'
import { colors } from '../../../constants/Theme'
import ContractView from '../../../constants/ContractView'
import Default from '../../../constants/Default'

const ContractEquityIndicators = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { params } = props
    const equities = useSelector((state) =>
        state.general.equities.map((equity, index) => ({
            ...equity,
            color: colors[index]
        }))
    )
    const currency = useSelector((state) => state.general.currency)
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [
        selectedEquityIndicators,
        setSelectedEquityIndicators
    ] = useState(() => equities.map((equity) => equity.id))
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()
    const indicators = useMemo(() => {
        return equities.filter((equity) =>
            selectedEquityIndicators.includes(equity.id)
        )
    }, [equities, selectedEquityIndicators])

    // ===========================================================================
    // Hooks
    // ===========================================================================
    // Fetch data
    useEffect(() => {
        let queryParameters = identity(pickBy(params))
        VisualizationService.EquitySummary(queryParameters)
            .then((result) => {
                setOriginalData(result)
                setLoading(false)
            })
            .catch((error) => console.log(error))

        return () => {
            setOriginalData([])
        }
    }, [params?.country])

    // Prepare chart data
    useEffect(() => {
        let chartData = []
        let grouped = groupBy(originalData, (item) => {
            return formatDate(item.month, 'YYYY-MM')
        })

        Object.keys(grouped).map((key) => {
            let points = {}
            let sum = 0

            equities
                .filter((equity) =>
                    selectedEquityIndicators.includes(equity.id)
                )
                .forEach((equity) => {
                    let equityValue = grouped[key].find(
                        (equityItem) =>
                            equity.id === equityItem.equity_category_id
                    )

                    if (equityValue) {
                        points[toCamelCase(equity.name)] =
                            viewType === ContractView.VALUE
                                ? currency === Default.CURRENCY_LOCAL
                                    ? equityValue[Default.AMOUNT_LOCAL]
                                    : equityValue[Default.AMOUNT_USD]
                                : equityValue[Default.TENDER_COUNT]
                        sum += points[toCamelCase(equity.name)]
                    } else {
                        points[toCamelCase(equity.name)] = 0
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
    }, [originalData, viewType, selectedEquityIndicators, currency, equities])

    function handleEquitySelection(equityId) {
        setSelectedEquityIndicators((previous) => {
            let items = [...previous]
            if (items.includes(+equityId)) {
                items.splice(items.indexOf(+equityId), 1)
            } else {
                items[items.length] = parseInt(equityId)
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
                                    {equities.map((item, index) => (
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
                                                id={`equity-category-${index}`}
                                                value={item.id}
                                                checked={selectedEquityIndicators.includes(
                                                    item.id
                                                )}
                                                itemSelected={
                                                    handleEquitySelection
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
                <div className="p-4 bg-white rounded rounded-b-none h-full">
                    <div className="flex flex-wrap items-center justify-between mb-4 md:mb-6">
                        <h3 className="mb-4 md:mb-0 w-full md:w-auto uppercase font-bold  text-primary-dark">
                            {trans('Contracts and equity indicators')}
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
                        key: Visualization.EQUITY_INDICATORS,
                        options: params
                    }}
                />
            )}
        </div>
    )
}
export default ContractEquityIndicators
