import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import PieChart from '../Charts/PieChart/PieChart'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import VisualizationService from '../../services/VisualizationService'
import { formatNumber } from '../../helpers/number'
import HelpText from '../../components/HelpText/HelpText'
import ContractView from '../../constants/ContractView'
import ContractViewSwitcher from '../Utilities/ContractViewSwitcher'
import useContractTransformers from '../../hooks/useContractTransformers'
import ErrorHandler from '../ErrorHandler'
import Default from '../../constants/Default'

const colors = ['#ABBABF', '#DCEAEE']

const EquityIndicators = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Equity indicators',
        params,
        heightFull,
        helpText = 'Total value of contracts defined as equitable. More information about equity indicators can be found in the methodology.'
    } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [assignedValue, setAssignedValue] = useState(0)
    const currency = useSelector((state) => state.general.currency)
    const [error, setError] = useState(false)
    const { trans } = useTrans()
    const { valueField, currencyCode } = useContractTransformers()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.EquityIndicators(params)
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
    }, [params?.country, params?.buyer])

    useEffect(() => {
        if (originalData.length) {
            const formattedData = originalData.map((item) => {
                return {
                    value: item.type,
                    number: item[valueField(viewType)]
                }
            })
            const assignedValue = get(
                originalData.find((item) => item.type === 'assigned'),
                valueField(viewType),
                0
            )

            setChartData(formattedData)
            setAssignedValue(assignedValue)
        }

        return () => {
            setChartData([])
            setAssignedValue(0)
        }
    }, [originalData, viewType, currency])

    return (
        <div
            className={`bg-white rounded p-4 simple-tab mb-2 ${
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
                                    {trans('Assigned')}
                                </span>
                                <span className="text-xl font-bold mr-2">
                                    {currency &&
                                    currency !== Default.CURRENCY_LOCAL
                                        ? '$'
                                        : ''}
                                    {formatNumber(assignedValue)}
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
        </div>
    )
}

export default EquityIndicators
