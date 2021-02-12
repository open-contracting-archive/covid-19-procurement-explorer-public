import React, { useEffect, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import PieChart from '../Charts/PieChart/PieChart'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import { formatNumber } from '../../helpers/number'
import HelpText from '../../components/HelpText/HelpText'
import Visualization from "../../constants/Visualization"
import ContractViewSwitcher from "../Utilities/ContractViewSwitcher"
import ContractView from "../../constants/ContractView"
import Default from "../../constants/Default"

const colors = ['#ABBABF', '#DCEAEE']

const DirectOpen = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Direct/Open', params, modalHandler, heightFull = false } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const currency = useSelector((state) => state.general.currency)
    const countryCurrency = useSelector((state) => state.general.countryCurrency)
    const { trans } = useTrans()
    const helpText =
        'Total value of COVID contracts signed using direct or open procurement methods'

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.DirectOpen(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData([])
        }
    }, [params?.country, params?.buyer, params?.supplier])

    useEffect(() => {
        const directOpenByValue = originalData.map((item) => {
            return {
                value: item.procedure,
                number: viewType === ContractView.NUMBER
                    ? item.tender_count
                    : currency === Default.CURRENCY_LOCAL
                        ? item.amount_local
                        : item.amount_usd
            }
        })
        setChartData(directOpenByValue)

        return () => {
            setChartData([])
        }
    }, [originalData, viewType])

    return (
        <div
            className={`bg-white rounded p-4 simple-tab ${
                heightFull ? 'h-full' : ''
            }`}>
            {loading ? (<Loader sm />) : (
                <Fragment>
                    <div className="flex flex-wrap items-center md:justify-between">
                        <div className="w-full md:w-auto mb-4 md:mb-0 flex items-center">
                            <h3 className="uppercase font-bold text-primary-dark inline-block">
                                {trans(label)}
                            </h3>
                            <HelpText helpTextInfo={helpText} />
                        </div>

                        <ContractViewSwitcher
                            style={'short'}
                            viewType={viewType}
                            viewHandler={setViewType} />
                    </div>

                    <div className={`${heightFull ? 'mt-10' : 'mt-2'}`}>
                        <div className="flex items-end">
                            <div>
                                <h3 className="mr-3">
                                    <span className="text-sm block">
                                        {trans('Open')}
                                    </span>
                                    <span className="text-xl font-bold mr-2">
                                        {formatNumber(chartData[1].number)}
                                    </span>
                                    {currency && (
                                        <span className="inline-block uppercase">
                                            {currency === 'local'
                                                ? countryCurrency
                                                : 'usd'}
                                        </span>
                                    )}
                                </h3>
                            </div>
                            <div className="flex-1">
                                <PieChart
                                    data={chartData}
                                    colors={colors}
                                    large={heightFull}
                                />
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
            {modalHandler && (
                <span
                    className="cursor-pointer text-sm text-primary-blue block text-right"
                    onClick={() => modalHandler(Visualization.DIRECT_OPEN)}>
                    View in detail →
                </span>
            )}
        </div>
    )
}

export default DirectOpen
