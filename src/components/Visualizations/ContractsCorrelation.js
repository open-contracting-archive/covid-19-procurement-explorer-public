import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationServices from '../../services/visualizationServices'
import CombinedChart from '../Charts/CombinedChart/CombinedChart'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import { dateDiff } from '../../helpers/date'

const ContractsCorrelation = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
    const [loading, setLoading] = useState(true)
    const [quantityCorrelation, setQuantityCorrelation] = useState()
    const { trans } = useTrans()
    const handle = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.QuantityCorrelation(params).then((response) => {
            if (response) {
                setQuantityCorrelation(response)
            }
            setLoading(false)
        })
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
        quantityCorrelation &&
        quantityCorrelation.map((data) => {
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
        quantityCorrelation &&
        quantityCorrelation.map((data) => {
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
            <FullScreen handle={handle}>
                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                    {label}
                </h3>
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

            <div
                className="flex items-center justify-between pt-4 border-t border-blue-0 text-sm
                                text-primary-blue -mx-4 px-6">
                <div className="flex items-center">
                    <div className="flex items-center mr-6">
                        <DownloadIcon className="mr-2 inline-block" />
                        <span>Download</span>
                    </div>
                    <span className="flex items-center">
                        <ShareIcon className="mr-2 inline-block" />{' '}
                        <span className="cursor-pointer">Share</span>
                    </span>
                </div>

                <div>
                    <span className="flex items-center">
                        <button onClick={handle.enter}>
                            <span className="cursor-pointer">
                                View full screen
                            </span>
                            <FullViewIcon className="ml-2 inline-block" />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ContractsCorrelation
