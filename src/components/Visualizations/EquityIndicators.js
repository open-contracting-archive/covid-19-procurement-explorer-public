import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PieChart from '../Charts/PieChart/PieChart'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import VisualizationServices from '../../services/visualizationServices'
import { useSelector } from 'react-redux'
import { formatNumber } from '../../helpers/number'

const colors = ['#ABBABF', '#DCEAEE']

const EquityIndicators = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params, heightFull } = props
    const [loading, setLoading] = useState(true)
    const [equity, setEquity] = useState()
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.Equity(params).then((response) => {
            setEquity(response)
            setLoading(false)
        })
    }, [params?.country, params?.buyer])

    const currency = useSelector((state) => state.general.currency)
    const countryCurrency = useSelector(
        (state) => state.general.countryCurrency
    )

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Equity chart
    const equityByValue =
        equity &&
        equity.map((data) => {
            return {
                value: data.type,
                number: currency == 'usd' ? data.amount_usd : data.amount_local
            }
        })

    const equityByNumber =
        equity &&
        equity.map((data) => {
            return { value: data.type, number: data.tender_count }
        })

    return (
        <div className="bg-white rounded p-4 mb-2 simple-tab relative z-10">
            {loading ? (
                <Loader sm />
            ) : (
                <Tabs>
                    <div className="flex items-center justify-between">
                        <h3 className="uppercase font-bold  text-primary-dark">
                            {trans(label ? label : 'Equity Indicators')}
                        </h3>
                        <div className="flex">
                            <TabList>
                                <Tab>{trans('By value')}</Tab>
                                <Tab>{trans('By number')}</Tab>
                            </TabList>
                        </div>
                    </div>

                    <div className="mt-2">
                        <TabPanel>
                            <div className="flex items-end">
                                <div>
                                    <h3 className="mr-3">
                                        <span className="text-sm block">
                                            {trans('Assigned')}
                                        </span>
                                        <span className="text-xl font-bold mr-2">
                                            {formatNumber(
                                                equityByValue[0].number
                                            )}
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
                                <PieChart
                                    data={equityByValue}
                                    colors={colors}
                                    large={heightFull ? true : false}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="flex items-end">
                                <div>
                                    <h3 className="mr-3">
                                        <span className="text-sm block">
                                            {trans('Assigned')}
                                        </span>
                                        <span className="text-xl font-bold mr-2">
                                            {formatNumber(
                                                equityByNumber[0].number
                                            )}
                                        </span>
                                    </h3>
                                </div>
                                <PieChart
                                    data={equityByNumber}
                                    colors={colors}
                                    large={heightFull ? true : false}
                                />
                            </div>
                        </TabPanel>
                    </div>
                </Tabs>
            )}
        </div>
    )
}

export default EquityIndicators
