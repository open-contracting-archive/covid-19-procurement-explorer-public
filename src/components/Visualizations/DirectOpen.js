import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { PieChart } from './Charts'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import { formatNumber } from '../../helpers/number'
import ContractView from '../../constants/ContractView'
import useContractTransformers from '../../hooks/useContractTransformers'
import Default from '../../constants/Default'
import { CardContainer, ErrorHandler } from '../Utilities'

const colors = ['#ABBABF', '#DCEAEE']

const DirectOpen = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Direct/Open',
        params,
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
                    value: item.procedure,
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
        <CardContainer
            label={label}
            viewType={viewType}
            loading={loading}
            helpText={helpText}
            viewHandler={setViewType}>
            {!error ? (
                <div className="flex items-end">
                    <div>
                        <h3 className="mr-3">
                            <span className="text-sm block">
                                {trans('Open')}
                            </span>
                            <span className="text-xl font-bold mr-2">
                                {viewType === ContractView.VALUE &&
                                currency &&
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
                        <PieChart data={chartData} colors={colors} />
                    </div>
                </div>
            ) : (
                <ErrorHandler />
            )}
        </CardContainer>
    )
}

export default DirectOpen
