import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PieChart from '../Charts/PieChart/PieChart'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import VisualizationServices from '../../services/visualizationServices'
import { useSelector } from 'react-redux'

// Add Pie Chart data
const pie_chart_data = [
    {
        value: 'Value',
        number: 30
    },
    {
        value: 'Number',
        number: 70
    }
]

const colors = ['#ABBABF', '#DCEAEE']

function EquityIndicators({ label, params, heightFull }) {
    // ===========================================================================
    // State and variables
    // ===========================================================================
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
    }, [])

    const currency = useSelector((state) => state.general.currency)

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
                                <div className="flex-1">
                                    <PieChart
                                        data={equityByValue}
                                        colors={colors}
                                        large={heightFull ? true : false}
                                    />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="flex items-end">
                                <div className="flex-1">
                                    <PieChart
                                        data={equityByNumber}
                                        colors={colors}
                                        large={heightFull ? true : false}
                                    />
                                </div>
                            </div>
                        </TabPanel>
                    </div>
                </Tabs>
            )}
        </div>
    )
}

export default EquityIndicators
