import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { isEmpty, sumBy } from 'lodash'
import VisualizationService from '../../services/VisualizationService'
import useTrans from '../../hooks/useTrans'
import BarListChart from '../BarListSection/BarListChart'
import Default from '../../constants/Default'
import ErrorHandler from '../ErrorHandler'

const Concentration = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Concentration', params } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState([])
    const [error, setError] = useState(false)
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.TopSuppliers(params)
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
            setOriginalData({})
        }
    }, [params?.country])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let dataSet = originalData.by_buyer
            let total = sumBy(dataSet, (item) => item[Default.BUYER_COUNT])

            let chartDataFormatted = dataSet.map((item) => {
                let actualValue = item[Default.BUYER_COUNT]
                return {
                    name: item.supplier_name,
                    value: Math.ceil((actualValue / total) * 100),
                    amount: actualValue,
                    id: item.supplier_id
                }
            })
            setChartData(chartDataFormatted)
        }
    }, [originalData])

    return (
        <div className="bg-white rounded h-full">
            <div className="bg-white rounded p-4 pb-12">
                <div className="flex items-center justify-between flex-wrap mb-4">
                    <h3 className="mb-2 md:mb-0 w-full md:w-auto uppercase font-bold  text-primary-dark">
                        {trans(label)}
                    </h3>
                </div>
                {loading ? (
                    <Loader />
                ) : !error ? (
                    <div className="flex">
                        <div className="flex-1">
                            <div className="flex-1 simple-tab -mt-10">
                                <div className="mt-10">
                                    <BarListChart
                                        data={chartData}
                                        text="suppliers"
                                        viewType={'buyer'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ErrorHandler />
                )}
            </div>
        </div>
    )
}

export default Concentration
