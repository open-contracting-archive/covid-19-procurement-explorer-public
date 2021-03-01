import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import PieChart from '../Charts/PieChart/PieChart'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import { formatNumber } from '../../helpers/number'
import HelpText from '../../components/HelpText/HelpText'
import Visualization from '../../constants/Visualization'
import ContractViewSwitcher from '../Utilities/ContractViewSwitcher'
import ContractView from '../../constants/ContractView'
import useContractTransformers from '../../hooks/useContractTransformers'
import ErrorHandler from '../ErrorHandler'
import Default from '../../constants/Default'

const colors = ['#ABBABF', '#DCEAEE']

const DirectOpen = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Direct/Open',
        params,
        modalHandler,
        heightFull = false,
        helpText = 'Total value of COVID contracts signed using direct or open procurement methods'
    } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [openValue, setOpenValue] = useState(0)
    const currency = useSelector((state) => state.general.currency)
    const [error, setError] = useState(false)
    const { trans } = useTrans()
    const { valueField, currencyCode } = useContractTransformers()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.DirectOpen(params)
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
    }, [params?.country, params?.buyer, params?.supplier])

    useEffect(() => {
        if (originalData.length) {
            const formattedData = originalData.map((item) => {
                return {
                    value: item.type,
                    number: item[valueField(viewType)]
                }
            })
            const openValue = get(
                originalData.find((item) => item.procedure === 'open'),
                valueField(viewType),
                0
            )

            setChartData(formattedData)
            setOpenValue(openValue)
        }

        return () => {
            setChartData([])
            setOpenValue(0)
        }
    }, [originalData, viewType, currency])

    return (
        <div
            className={`bg-white rounded p-4 simple-tab ${
                heightFull ? 'h-full' : ''
            }`}>
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
                    viewHandler={setViewType}
                />
            </div>
            {loading ? (
                <Loader sm />
            ) : !error ? (
                <div className={`${heightFull ? 'mt-10' : 'mt-2'}`}>
                    <div className="flex items-end">
                        <div>
                            <h3 className="mr-3">
                                <span className="text-sm block">
                                    {trans('Open')}
                                </span>
                                <span className="text-xl font-bold mr-2">
                                    {currency &&
                                    currency !== Default.CURRENCY_LOCAL
                                        ? '$'
                                        : ''}
                                    {formatNumber(openValue)}
                                </span>
                                <span className="inline-block uppercase">
                                    {currencyCode(viewType)}
                                </span>
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
            ) : (
                <ErrorHandler />
            )}
            {!error && modalHandler && (
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
