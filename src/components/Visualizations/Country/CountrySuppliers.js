import React, { useEffect, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { isEmpty, get } from 'lodash'
import SankeyChart from '../../Charts/SankeyChart/SankeyChart'
import Loader from '../../Loader/Loader'
import useTrans from '../../../hooks/useTrans'
import VisualizationService from '../../../services/VisualizationService'
import ChartFooter from "../../Utilities/ChartFooter"
import ContractView from "../../../constants/ContractView"
import ContractViewSwitcher from "../../Utilities/ContractViewSwitcher"
import HelpText from "../../HelpText/HelpText"

const CountrySuppliers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Country Suppliers', params } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState([])
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()
    const helpText = ''

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.CountrySuppliers(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
    }, [params?.country, params?.product])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            // let productBuyer = get(originalData, 'product_buyer', [])
            //     .map((item) => {
            //         return {
            //             from: item.product_name,
            //             to: item.buyer_name,
            //             value:
            //                 viewType === ContractView.VALUE ? item.amount_usd : item.tender_count
            //         }
            //     })
            // let supplierProduct = get(originalData, 'supplier_product', [])
            //     .map((item) => {
            //         return {
            //             from: item.supplier_name,
            //             to: item.product_name,
            //             value:
            //                 viewType === ContractView.VALUE ? item.amount_usd : item.tender_count
            //         }
            //     })
            // setChartData([...supplierProduct, ...productBuyer])
        }

        return () => {
            setChartData([])
        }
    }, [originalData, viewType])

    return (
        <div className="bg-white rounded p-4 simple-tab right-direction">
            <FullScreen handle={fullScreenHandler}>
                <div className="flex items-center justify-between">
                    <div className="flex">
                        <h3 className="uppercase font-bold  text-primary-dark mb-2 md:mb-6">
                            {trans(label)}
                        </h3>
                        <HelpText helpTextInfo={helpText} />
                    </div>

                    <ContractViewSwitcher
                        viewType={viewType}
                        viewHandler={setViewType} />
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="flex mt-4">
                        <div className="flex-1">
                            <SankeyChart data={chartData} />
                        </div>
                    </div>
                )}
            </FullScreen>

            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}

export default CountrySuppliers
