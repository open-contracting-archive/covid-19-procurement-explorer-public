import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationService from '../../services/VisualizationService'
import useTrans from '../../hooks/useTrans'
import CombinedChart from '../Charts/CombinedChart/CombinedChart'
import Loader from '../Loader/Loader'
import ChartFooter from '../Utilities/ChartFooter'
import HelpText from '../../components/HelpText/HelpText'
import ContractView from "../../constants/ContractView"
import { dateDiff } from '../../helpers/date'
import ContractViewSwitcher from "../Utilities/ContractViewSwitcher"
import Default from "../../constants/Default"

const ContractsCorrelation = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'COVID/contracts quantity correlation', params } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const currency = useSelector((state) => state.general.currency)
    const countryCurrency = useSelector((state) => state.general.countryCurrency)
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()
    const helpText =
        'Correlation between number of active COVID cases and value of COVID contracts signed'

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.QuantityCorrelation(params).then((response) => {
            if (response) {
                setOriginalData(response)
            }
            setLoading(false)
        })

        return () => {
            setOriginalData([])
        }
    }, [params?.country])

    useEffect(() => {
        const dataSet = originalData
            .sort((item1, item2) => {
                return dateDiff(item1.date, item2.date)
            })
            .map((item) => {
                return {
                    date: item.month,
                    activeCase: item.active_cases,
                    value: viewType === ContractView.NUMBER
                        ? item.tender_count
                        : currency === Default.CURRENCY_LOCAL
                            ? item.amount_local
                            : item.amount_usd
                }
            })
        setChartData(dataSet)

        return () => {
            setChartData([])
        }
    }, [originalData, viewType])

    return (
        <div className="bg-white rounded p-4 simple-tab right-direction">
            <FullScreen handle={fullScreenHandler}>
                <div className="flex items-center mb-4 md:mb-0">
                    <div className="flex">
                        <h3 className="uppercase font-bold text-primary-dark inline-block">
                            {trans(label)}
                        </h3>
                        <HelpText helpTextInfo={helpText} />
                    </div>

                    <ContractViewSwitcher
                        viewType={viewType}
                        viewHandler={setViewType} />
                </div>
                {loading ? (<Loader />
                ) : (
                    <div className="flex mt-4">
                        <div className="flex-1">
                            <CombinedChart data={chartData} />
                        </div>
                    </div>
                )}
            </FullScreen>

            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}

export default ContractsCorrelation
