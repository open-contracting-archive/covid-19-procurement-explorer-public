import React, { useEffect, useState } from 'react'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import TreeMapChart from '../../components/Charts/TreeMapChart/TreeMapChart'
import Loader from '../../components/Loader/Loader'
import VisualizationService from '../../services/VisualizationService'
import useTrans from '../../hooks/useTrans'

function ProductTreemap({ params }) {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [chartType, setChartType] = useState('value')
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================

    useEffect(() => {
        VisualizationService.ProductSummary(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData([])
        }
    }, [params])

    useEffect(() => {
        let chartDataFormatted = {}

        if (originalData) {
            originalData.forEach((item) => {
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
    }, [originalData, chartType])

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
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className="flex flex-wrap -mx-3 mb-16">
                        <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <TreeMapChart data={chartData} />
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
            )}
        </div>
    )
}

export default ProductTreemap
