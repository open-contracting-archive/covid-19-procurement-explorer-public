import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationService from '../../services/VisualizationService'
import CombinedChart from '../Charts/CombinedChart/CombinedChart'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import { dateDiff } from '../../helpers/date'
import ChartFooter from '../Utilities/ChartFooter'
import HelpText from '../../components/HelpText/HelpText'

const ContractsCorrelation = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
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

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================

    // Function to sort by date
    const sortDate = (data) => {
        return data.sort((date1, date2) => {
            return dateDiff(date1.date, date2.date)
        })
    }

    // Quantity correlation
    const quantityCorrelationDataByValueRaw =
        originalData &&
        originalData.map((data) => {
            return {
                date: data.month,
                activeCase: data.active_cases,
                value: data.amount_usd || 0
            }
        })
    const quantityCorrelationDataByValue =
        quantityCorrelationDataByValueRaw &&
        sortDate(quantityCorrelationDataByValueRaw)
    const quantityCorrelationDataByNumberRaw =
        originalData &&
        originalData.map((data) => {
            return {
                date: data.month,
                activeCase: data.active_cases,
                value: data.tender_count
            }
        })
    const quantityCorrelationDataByNumber =
        quantityCorrelationDataByNumberRaw &&
        sortDate(quantityCorrelationDataByNumberRaw)

    return (
        <div className="bg-white rounded p-4 simple-tab right-direction">
            <FullScreen handle={fullScreenHandler}>
                <div className="flex items-center">
                    <h3 className="uppercase font-bold text-primary-dark inline-block">
                        {trans(
                            label
                                ? label
                                : 'COVID/contracts quantity correlation'
                        )}
                    </h3>
                    <HelpText helpTextInfo={helpText} />
                </div>
                <Tabs>
                    <TabList>
                        <Tab>{trans('By contract value')}</Tab>
                        <Tab>{trans('By number of contracts')}</Tab>
                    </TabList>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="flex mt-6">
                            <div className="flex-1">
                                <TabPanel>
                                    <CombinedChart
                                        data={
                                            quantityCorrelationDataByValue &&
                                            quantityCorrelationDataByValue
                                        }
                                        type="by-value"
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <CombinedChart
                                        data={
                                            quantityCorrelationDataByNumber &&
                                            quantityCorrelationDataByNumber
                                        }
                                    />
                                </TabPanel>
                            </div>
                        </div>
                    )}
                </Tabs>
            </FullScreen>

            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}

export default ContractsCorrelation
