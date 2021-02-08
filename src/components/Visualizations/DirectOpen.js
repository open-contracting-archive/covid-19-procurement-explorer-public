import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PieChart from '../Charts/PieChart/PieChart'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import { formatNumber } from '../../helpers/number'
import HelpText from '../../components/HelpText/HelpText'

const colors = ['#ABBABF', '#DCEAEE']

const DirectOpen = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params, heightFull } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
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

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Direct open chart
    const directOpenByValue =
        originalData &&
        originalData.map((data) => {
            return {
                value: data.procedure,
                number: currency === 'usd' ? data.amount_usd : data.amount_local
            }
        })

    const directOpenByNumber =
        originalData &&
        originalData.map((data) => {
            return { value: data.procedure, number: data.tender_count }
        })

    return (
        <div
            className={`bg-white rounded p-4 simple-tab ${
                heightFull ? 'h-full' : ''
            }`}>
            {loading ? (
                <Loader sm />
            ) : (
                <Tabs>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <h3 className="uppercase font-bold text-primary-dark inline-block">
                                {trans(label ? label : 'Direct/Open')}
                            </h3>
                            <HelpText helpTextInfo={helpText} />
                        </div>
                        <div className="flex">
                            <TabList>
                                <Tab>{trans('By value')}</Tab>
                                <Tab>{trans('By number')}</Tab>
                            </TabList>
                        </div>
                    </div>

                    <div className={`${heightFull ? 'mt-10' : 'mt-2'}`}>
                        <TabPanel>
                            <div className="flex items-end">
                                <div>
                                    <h3 className="mr-3">
                                        <span className="text-sm block">
                                            {trans('Open')}
                                        </span>
                                        <span className="text-xl font-bold mr-2">
                                            {formatNumber(
                                                directOpenByValue[1].number
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
                                <div className="flex-1">
                                    <PieChart
                                        data={directOpenByValue}
                                        colors={colors}
                                        large={heightFull ? true : false}
                                    />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="flex items-end">
                                <div>
                                    <h3 className="mr-3">
                                        <span className="text-sm block">
                                            {trans('Open')}
                                        </span>
                                        <span className="text-xl font-bold mr-2">
                                            {formatNumber(
                                                directOpenByNumber[1].number
                                            )}
                                        </span>
                                    </h3>
                                </div>
                                <PieChart
                                    data={directOpenByNumber}
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

export default DirectOpen
