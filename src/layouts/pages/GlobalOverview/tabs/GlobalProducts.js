import React, { useEffect, useState } from 'react'
import { ReactComponent as SortIcon } from '../../../../assets/img/icons/ic_sort.svg'
import TreeMapChart from '../../../../components/Charts/TreeMapChart/TreeMapChart'
import Loader from '../../../../components/Loader/Loader'
import VisualizationServices from '../../../../services/visualizationServices'
import useTrans from '../../../../hooks/useTrans'

const GlobalProducts = ({ params }) => {

    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [apiData, setApiData] = useState([])
    const [chartData, setChartData] = useState([])
    const [chartType, setChartType] = useState('value')
    const { trans } = useTrans()
    // const handle = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.ProductSummary(params).then((response) => {
            setApiData(response)
        })
    }, [])

    useEffect(() => {
        let chartDataFormatted = {}

        if (apiData) {
            apiData.forEach((item) => {
                chartDataFormatted[item.product_name] = {
                    [item.product_name]:
                        chartType === 'value'
                            ? item.amount_usd
                            : item.tender_count
                }
            })
        }
        setChartData(chartDataFormatted)
        setLoading(false)
    }, [apiData, chartType])

    let tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const tempTableData = tempArray.map((index) => {
        return (
            <tr key={index}>
                <td className="uppercase">SERVICIOS DE LABORATORIO CLÍNICO</td>
                <td>Mexico</td>
                <td>21</td>
                <td>3</td>
                <td>2,352,045</td>
                <td className="uppercase">1.2</td>
            </tr>
        )
    })

    return (
        <div>
            <div>
                <div className="flex flex-wrap -mx-3 mb-16">
                    <div className="w-full px-2 mb-6">
                        <div className="bg-white rounded p-4">
                            <div className="flex justify-end world-map-chart mb-4">
                                <ul className="contract-switch flex">
                                    <li
                                        className={`mr-4 cursor-pointer ${
                                            chartType === 'value'
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() => setChartType('value')}>
                                        {trans('By contract value')}
                                    </li>
                                    <li
                                        className={`cursor-pointer ${
                                            chartType === 'number'
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() => setChartType('number')}>
                                        {trans('By number of contracts')}
                                    </li>
                                </ul>
                            </div>

                            {loading ? (
                                <Loader />
                            ) : (
                                <TreeMapChart data={chartData} />
                            )}
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <span className="flex items-center">
                                    Product Category
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th>
                                <span className="flex items-center">
                                    # of contracts
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th>
                                <span className="flex items-center">
                                    # of suppliers
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th>
                                <span className="flex items-center">
                                    # of buyers
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th>
                                <span className="flex items-center">
                                    value (usd)
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{tempTableData}</tbody>
                </table>
                <div className="text-center mt-8">
                    <button className="text-primary-blue">Load more</button>
                </div>
            </div>
        </div>
    )
}

export default GlobalProducts
