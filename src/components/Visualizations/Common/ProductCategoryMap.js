import React, { useState, useEffect } from 'react'
import Loader from '../../Loader/Loader'
import TreeMapChart from '../../Charts/TreeMapChart/TreeMapChart'
import useTrans from '../../../hooks/useTrans'
import VisualizationService from '../../../services/VisualizationService'
import ContractView from '../../../constants/ContractView'
import { isEmpty } from 'lodash'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import ChartFooter from '../../Utilities/ChartFooter'
import ErrorHandler from '../../ErrorHandler'
import Default from '../../../constants/Default'
import ContractViewSwitcher from '../../Utilities/ContractViewSwitcher'

const ProductCategoryMap = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { params } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [error, setError] = useState(false)
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.ProductSummary(params)
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
    }, [params?.country])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let chartDataFormatted = originalData.map((item) => {
                return {
                    name: item.product_name,
                    value:
                        viewType === ContractView.VALUE
                            ? item[Default.AMOUNT_USD]
                            : item[Default.TENDER_COUNT]
                }
            })

            setChartData(chartDataFormatted)
        }
    }, [originalData, viewType])

    const isActiveTab = (type) => {
        return viewType === type ? 'active' : ''
    }

    return (
        <div>
            <FullScreen handle={fullScreenHandler}>
                <div className="p-4 bg-white rounded rounded-b-none h-full">
                    <div className="flex flex-wrap items-center justify-between md:mb-4">
                        <h3 className="mb-4 md:mb-0 w-full md:w-auto uppercase font-bold  text-primary-dark">
                            {trans('Product Category Map')}
                        </h3>
                        <ContractViewSwitcher
                            style={'short'}
                            viewType={viewType}
                            viewHandler={(value) => {
                                setViewType(value)
                            }}
                        />
                    </div>

                    {loading ? (
                        <Loader />
                    ) : !error ? (
                        <TreeMapChart data={chartData} />
                    ) : (
                        <ErrorHandler />
                    )}
                </div>
            </FullScreen>
            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}

export default ProductCategoryMap
