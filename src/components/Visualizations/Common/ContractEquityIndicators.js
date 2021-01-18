import React, { useEffect, useState, useMemo, useRef } from "react"
import { useSelector } from 'react-redux'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { identity, pickBy, groupBy } from 'lodash'
import useTrans from "../../../hooks/useTrans"
import VisualizationServices from "../../../services/visualizationServices"
import Loader from "../../Loader/Loader"
import CompareChart from "../../Charts/CompareChart/CompareChart"
import Checkbox from "../../Checkbox/Checkbox"
import ChartFooter from "../../Utilities/ChartFooter"
import { formatDate } from "../../../helpers/date"
import { toCamelCase } from "../../../helpers/general"
import Default from "../../../constants/Default"
import ContractView from "../../../constants/ContractView"

const ContractEquityIndicators = ({ params }) => {
    const equities = useSelector((state) => state.general.equities)
    const currency = useSelector((state) => state.general.currency)
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [selectedEquityIndicators, setSelectedEquityIndicators] = useState(() => equities.map(equity => equity.equity_category_id))
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()

    // Fetch data
    useEffect(() => {
        let queryParameters = identity(pickBy(params))
        VisualizationServices.EquitySummary(queryParameters)
            .then((result) => {
                setOriginalData(result)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [params])

    // Prepare chart data
    useEffect(() => {
        console.log('processing data')
        let chartData = []
        let grouped = groupBy(originalData, (item) => {
            return formatDate(item.month, 'YYYY-MM')
        })

        Object.keys(grouped)
            .map((key) => {
                let points = {}
                let sum = 0

                equities
                    .filter((equity) => selectedEquityIndicators.includes(equity.equity_category_id))
                    .forEach((equity) => {
                        let equityValue = grouped[key].find((equityItem) => equity.equity_category_id === equityItem.equity_category_id)

                        if (equityValue) {
                            points[toCamelCase(equity.equity)] = viewType === ContractView.VALUE ?
                                (currency === Default.CURRENCY_LOCAL ? equityValue.amount_local : equityValue.amount_usd)
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
            let items = previous
            // console.log(previous.length )
            // console.log(equityId, items, items.includes(equityId), items.indexOf(equityId))

            if (items.includes(equityId)) {
                // console.log('remove', equityId)
                items.splice(items.indexOf(equityId))
            } else {
                // console.log('add', equityId)
                items[items.length] = parseInt(equityId)
            }

            return [...new Set(items)]
        })
    }

    function renderChart() {
        return (
            <div className="flex">
                <div>
                    <div className="w-80 mr-12">
                        <ul>
                            {equities.map((item, index) => (
                                <li key={index}
                                    className="active py-2 flex items-center justify-between
                                                        border-b border-blue-0 text-blue-50">
                                    <div className="flex items-center">
                                        <div className="contract-line">
                                            <span className="line" style={{ background: item.color }} />
                                        </div>
                                        <div className="contract-text">
                                            <span>{item.equity}</span>
                                        </div>
                                    </div>
                                    <Checkbox
                                        id={`equity-category-${index}`}
                                        value={item.equity_category_id}
                                        checked={selectedEquityIndicators.includes(item.equity_category_id)}
                                        itemSelected={handleEquitySelection} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex-1">
                    <CompareChart chartData={chartData} equities={equities.filter(equity => selectedEquityIndicators.includes(equity.equity_category_id))} />
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded p-6">
            <FullScreen handle={fullScreenHandler}>
                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                    {trans('Contracts and equity indicators')}
                </h3>

                {loading ? (<Loader />) : (
                    <div className="simple-tab">
                        <div className="flex justify-end world-map-chart mb-8">
                            <ul className="contract-switch flex">
                                <li className={viewType === "value" ? "mr-4 cursor-pointer active" : "mr-4 cursor-pointer"}
                                    onClick={() => switchViewType(ContractView.VALUE)}>
                                    {trans('By contract value')}
                                </li>
                                <li className={viewType === "number" ? "mr-4 cursor-pointer active" : "mr-4 cursor-pointer"}
                                    onClick={() => switchViewType(ContractView.NUMBER)}>
                                    {trans('By number of contracts')}
                                </li>
                            </ul>
                        </div>

                        {renderChart()}
                    </div>
                )}
            </FullScreen>

            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}
export default ContractEquityIndicators
