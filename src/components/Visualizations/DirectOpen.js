import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PieChart from '../Charts/PieChart/PieChart'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import VisualizationServices from '../../services/visualizationServices'

const colors = ['#ABBABF', '#DCEAEE']

const DirectOpen = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params, heightFull } = props
    const [loading, setLoading] = useState(true)
    const [directOpen, setDirectOpen] = useState()
    const currency = useSelector((state) => state.general.currency)
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.DirectOpen(params).then((response) => {
            setDirectOpen(response)
            setLoading(false)
        })
    }, [params])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Function to manage data for line chart

    // Direct open chart
    const directOpenByValue =
        directOpen &&
        directOpen.map((data) => {
            return {
                value: data.procedure,
                number: currency == 'usd' ? data.amount_usd : data.amount_local
            }
        })
    const directOpenByNumber =
        directOpen &&
        directOpen.map((data) => {
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
                        <h3 className="uppercase font-bold  text-primary-dark">
                            {trans(label ? label : 'Direct/Open')}
                        </h3>
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
                                {/* <div className=" text-primary-dark">
                                        <span>
                                            <strong className="text-xl inline-block mr-3">
                                                51
                                        </strong>
                                        </span>
                                    </div> */}
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
                                <div className="flex-1">
                                    <PieChart
                                        data={directOpenByNumber}
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

export default DirectOpen
