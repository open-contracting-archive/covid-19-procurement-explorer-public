import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationService from '../../services/VisualizationService'
import useTrans from '../../hooks/useTrans'
import CombinedChart from '../Charts/CombinedChart/CombinedChart'
import Loader from '../Loader/Loader'
import ChartFooter from '../Utilities/ChartFooter'
import HelpText from '../../components/HelpText/HelpText'
import ContractView from '../../constants/ContractView'
import { dateDiff } from '../../helpers/date'
import ContractViewSwitcher from '../Utilities/ContractViewSwitcher'
import Default from '../../constants/Default'
import ErrorHandler from '../ErrorHandler'

const ContractsCorrelation = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'COVID/contracts quantity correlation', params } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [error, setError] = useState(false)
    const currency = useSelector((state) => state.general.currency)
    const countryCurrency = useSelector(
        (state) => state.general.countryCurrency
    )
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()
    const helpText =
        'Correlation between number of active COVID cases and value of COVID contracts signed'
    const selectedCurrency =
        currency == Default.CURRENCY_LOCAL ? countryCurrency : currency

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.QuantityCorrelation(params)
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
        const dataSet = originalData
            .sort((item1, item2) => {
                return dateDiff(item1.month, item2.month)
            })
            .map((item) => {
                return {
                    date: item.month,
                    activeCase: item.active_cases,
                    value:
                        viewType === ContractView.NUMBER
                            ? item[Default.TENDER_COUNT]
                            : currency === Default.CURRENCY_LOCAL
                            ? item[Default.AMOUNT_LOCAL]
                            : item[Default.AMOUNT_USD],
                    deathCase: item.death_cases
                }
            })
        setChartData(dataSet)

        return () => {
            setChartData([])
        }
    }, [originalData, viewType, currency])

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
                        viewHandler={setViewType}
                    />
                </div>
                {loading ? (
                    <Loader />
                ) : !error ? (
                    <div className="flex mt-4">
                        <div className="flex-1">
                            <CombinedChart
                                data={chartData}
                                type={viewType}
                                currency={selectedCurrency}
                            />
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

export default ContractsCorrelation
