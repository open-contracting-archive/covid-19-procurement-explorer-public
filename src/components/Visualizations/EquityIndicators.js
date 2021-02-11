import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PieChart from '../Charts/PieChart/PieChart'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import VisualizationService from '../../services/VisualizationService'
import { useSelector } from 'react-redux'
import { formatNumber } from '../../helpers/number'
import HelpText from '../../components/HelpText/HelpText'

const colors = ['#ABBABF', '#DCEAEE']

const EquityIndicators = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params, heightFull } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
    const { trans } = useTrans()
    const helpText =
        'Total value of contracts defined as equitable. More information about equity indicators can be found in the methodology.'

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.EquityIndicators(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData([])
        }
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
        originalData &&
        originalData.map((data) => {
            return {
                value: data.type,
                number: currency == 'usd' ? data.amount_usd : data.amount_local
            }
        })

    const equityByNumber =
        originalData &&
        originalData.map((data) => {
            return { value: data.type, number: data.tender_count }
        })

    return (
        <div className="bg-white rounded p-4 mb-2 simple-tab relative z-10">
            {loading ? (
                <Loader sm />
            ) : (
                <Tabs>
                    <div className="flex flex-wrap items-center md:justify-between">
                        <div className="w-full md:w-auto mb-4 md:mb-0 flex items-center">
                            <h3 className="uppercase font-bold text-primary-dark inline-block">
                                {trans(label ? label : 'Equity Indicators')}
                            </h3>
                            <HelpText helpTextInfo={helpText} />
                        </div>
                        <div className="flex flex-1 md:flex-none md:justify-start">
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
