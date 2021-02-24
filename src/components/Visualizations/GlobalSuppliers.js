import React, { useEffect, useState } from 'react'
import { get, isEmpty } from 'lodash'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import SankeyChart from '../Charts/SankeyChart/SankeyChart'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import ChartFooter from '../Utilities/ChartFooter'
import ContractView from '../../constants/ContractView'
import HelpText from '../../components/HelpText/HelpText'
import ContractViewSwitcher from "../Utilities/ContractViewSwitcher"
import ErrorHandler from '../ErrorHandler'

const GlobalSuppliers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Global Suppliers', params } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState([])
    const [chartLevel, setChartLevel] = useState('global')
    const [error, setError] = useState(false)
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()
    const helpText =
        'Top 10 suppliers in each product category according to contracts value or number of signed contracts'

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.GlobalSuppliers(params).then((result) => {
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
    }, [params?.country])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let productCountry = get(originalData, `by_${viewType}.product_country`, [])
                .map((item) => {
                    return {
                        from: item.product_name,
                        to: item.country_name,
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
        <div className="bg-white rounded p-4 pb-0 md:pb-4 simple-tab right-direction">
            <FullScreen handle={fullScreenHandler}>
                <div className="flex items-center justify-between flex-wrap mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                        <h3 className="md:mb-0 w-full md:w-auto uppercase font-bold text-primary-dark">
                            {trans(label)}
                        </h3>
                        <HelpText helpTextInfo={helpText} />
                    </div>

                    <ContractViewSwitcher
                        viewType={viewType}
                        viewHandler={setViewType} />
                </div>

                <ul className="flex items-center my-4">
                    <li
                        className={`inline-block mr-2 px-4 py-2 rounded-full cursor-pointer ${chartLevel === 'global' ? 'bg-blue-50 text-white' : 'bg-blue-0'}`}
                        onClick={() => setChartLevel('global')}>
                        {trans('Global suppliers chain')}
                    </li>
                    <li
                        className={`inline-block mr-2 px-4 py-2 rounded-full cursor-pointer ${chartLevel === 'country' ? 'bg-blue-50 text-white' : 'bg-blue-0'}`}
                        onClick={() => setChartLevel('country')}>
                        {trans('Global distribution chain')}
                    </li>
                </ul>

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

export default GlobalSuppliers
