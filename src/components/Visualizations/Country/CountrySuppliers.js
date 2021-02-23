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
import ErrorHandler from '../../ErrorHandler'

const CountrySuppliers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Country Suppliers', params } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState([])
    const [error, setError] = useState(false)
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()
    const helpText = ''

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.CountrySuppliers(params).then((result) => {
            setLoading(false)
            if(result){
                setOriginalData(result)
            } else{
                throw new Error()
            }
        })
        .catch(()=>{
            setError(true)
        })

        return () => {
            setOriginalData({})
        }
    }, [params?.country, params?.product])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let productCountry = get(originalData, `by_${viewType}.product_buyer`, [])
                .map((item) => {
                    return {
                        from: item.product_name,
                        to: item.buyer_name,
                        value:
                            viewType === ContractView.VALUE ? item.amount_usd : item.tender_count
                    }
                })
            let supplierProduct = get(originalData, `by_${viewType}.supplier_product`, [])
                .map((item) => {
                    return {
                        from: item.supplier_name,
                        to: item.product_name,
                        value:
                            viewType === ContractView.VALUE ? item.amount_usd : item.tender_count
                    }
                })
            setChartData([...supplierProduct, ...productCountry])
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
                ) : !error ? (
                    <div className="flex mt-4">
                        <div className="flex-1">
                            <SankeyChart data={chartData} />
                        </div>
                    </div>
                ) : (
                    <ErrorHandler />
                )}
            </FullScreen>

            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}

export default CountrySuppliers
