import React, { useEffect, useState, useMemo, useRef } from 'react'
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
import Default from '../../../constants/Default'
import ContractView from '../../../constants/ContractView'

const ContractEquityIndicators = (props) => {
    const { params } = props
    const equities = useSelector((state) => state.general.equities)
    const currency = useSelector((state) => state.general.currency)
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [
        selectedEquityIndicators,
        setSelectedEquityIndicators
    ] = useState(() => equities.map((equity) => equity.equity_category_id))
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()

    // Fetch data
    useEffect(() => {
        let queryParameters = identity(pickBy(params))
        VisualizationService.EquitySummary(queryParameters)
            .then((result) => {
                setOriginalData(result)
                setLoading(false)
            })
            .catch((error) => console.log(error))
    }, [params])

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
                    selectedEquityIndicators.includes(equity.equity_category_id)
                )
                .forEach((equity) => {
                    let equityValue = grouped[key].find(
                        (equityItem) =>
                            equity.equity_category_id ===
                            equityItem.equity_category_id
                    )

                    if (equityValue) {
                        points[toCamelCase(equity.equity)] =
                            viewType === ContractView.VALUE
                                ? currency === Default.CURRENCY_LOCAL
                                    ? equityValue.amount_local
                                    : equityValue.amount_usd
                                : equityValue.tender_count
                        sum += points[toCamelCase(equity.equity)]
                    } else {
                        points[toCamelCase(equity.equity)] = 0
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
    }, [originalData, viewType, selectedEquityIndicators, currency])

    function switchViewType(type) {
        setViewType(type)
    }

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

    function renderChart() {
        return (
            <div className="flex flex-wrap">
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
                                                    background: item.color
                                                }}
                                            />
                                        </div>
                                        <div className="contract-text">
                                            <span>{item.equity}</span>
                                        </div>
                                    </div>
                                    <Checkbox
                                        id={`equity-category-${index}`}
                                        value={item.equity_category_id}
                                        checked={selectedEquityIndicators.includes(
                                            item.equity_category_id
                                        )}
                                        itemSelected={handleEquitySelection}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-4 md:mt-0 w-full md:w-auto md:flex-1">
                    <CompareChart
                        chartData={chartData}
                        equities={equities.filter((equity) =>
                            selectedEquityIndicators.includes(
                                equity.equity_category_id
                            )
                        )}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded p-4 pb-0 md:pb-4">
            <FullScreen handle={fullScreenHandler}>
                <div className="flex flex-wrap items-center justify-between mb-4 md:mb-6">
                    <h3 className="mb-4 md:mb-0 w-full md:w-auto uppercase font-bold  text-primary-dark">
                        {trans('Contracts and equity indicators')}
                    </h3>

                    <div className="w-full md:w-auto flex mb-4 md:mb-0">
                        <ul className="contract-switch flex">
                            <li
                                className={
                                    viewType === 'value'
                                        ? 'mr-4 cursor-pointer text-xs md:text-base active'
                                        : 'mr-4 cursor-pointer text-xs md:text-base'
                                }
                                onClick={() =>
                                    switchViewType(ContractView.VALUE)
                                }>
                                {trans('By contract value')}
                            </li>
                            <li
                                className={
                                    viewType === 'number'
                                        ? 'cursor-pointer text-xs md:text-base active'
                                        : 'cursor-pointer text-xs md:text-base'
                                }
                                onClick={() =>
                                    switchViewType(ContractView.NUMBER)
                                }>
                                {trans('By number of contracts')}
                            </li>
                        </ul>
                    </div>
                </div>

                {loading ? <Loader /> : <div>{renderChart()}</div>}
            </FullScreen>

            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}
export default ContractEquityIndicators
