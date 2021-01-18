import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import VisualizationServices from '../../services/visualizationServices'
import SimpleBarChart from '../Charts/SimpleBarChart/SimpleBarChart'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import Loader from '../Loader/Loader'
import Checkbox from '../Checkbox/Checkbox'
import { dateDiff, formatDate } from '../../helpers/date'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import CompareChart from '../Charts/CompareChart/CompareChart'
import useTrans from '../../hooks/useTrans'
import 'react-simple-hook-modal/dist/styles.css'
import { Modal, useModal, ModalTransition } from 'react-simple-hook-modal'
import HelpText from '../../components/HelpText/HelpText'

const TotalSpending = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Total Spending', params, helpText } = props
    const [totalSpending, setTotalSpending] = useState([])
    const [loading, setLoading] = useState(true)
    const currency = useSelector((state) => state.general.currency)
    const countryCurrency = useSelector((state) => state.general.countryCurrency)
    const { isModalOpen, openModal, closeModal } = useModal()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.TotalSpending(params)
            .then((response) => {
                setTotalSpending(response)
                setLoading(false)
            })
    }, [params])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Function to manage data for line chart
    const lineChartData = (chartData) => {
        return (
            chartData &&
            chartData.map((data) => {
                return {
                    date: formatDate(data.date, 'MMMM YYYY'),
                    value: data.value
                }
            })
        )
    }

    // Function to sort by date
    const sortDate = (data) => {
        return data.sort((date1, date2) => {
            return dateDiff(date1.date, date2.date)
        })
    }

    // Total spending data
    const totalSpendingAreaChartDataRaw =
        totalSpending &&
        lineChartData(get(totalSpending[currency], 'line_chart'))
    const totalSpendingAreaChartData =
        totalSpendingAreaChartDataRaw && sortDate(totalSpendingAreaChartDataRaw)

    const totalSpendingAmount =
        totalSpending && get(totalSpending[currency], 'total')
    const totalSpendingPercentage =
        totalSpending && get(totalSpending[currency], 'increment')
    const totalSpendingBarChartData =
        totalSpending && get(totalSpending[currency], 'bar_chart')

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    const barColorValue = '#ABBABF'
    const { trans } = useTrans()
    const handle = useFullScreenHandle()

    return (
        <div
            // onClick={openModal}
            className="bg-white rounded p-4 h-full cursor-pointer">
            <div className="flex items-center">
                <h3 className="uppercase font-bold text-primary-dark inline-block">
                    {trans(label ? label : 'Total Spending')}
                </h3>
                <HelpText helpTextInfo={helpText} />
            </div>
            {loading ? (
                <Loader sm />
            ) : (
                <div className="flex items-end">
                    {/* Line area chart */}
                    <AreaChartBlock
                        chartData={totalSpendingAreaChartData}
                        totalAmount={totalSpendingAmount}
                        percentage={totalSpendingPercentage}
                        colorValue={
                            totalSpendingPercentage < 0 ? '#FE5151' : '#3EEDA4'
                        }
                        currency={currency}
                    />
                    <div className="flex-1">
                        <SimpleBarChart
                            data={totalSpendingBarChartData}
                            barColorValue={barColorValue}
                            chartKey="method"
                            chartValue="value"
                        />
                    </div>
                </div>
            )}
            <Modal
                id="any-unique-identifier"
                isOpen={isModalOpen}
                transition={ModalTransition.NONE}>
                <button
                    className="absolute top-0 right-0 mt-3 mr-4"
                    onClick={closeModal}>
                    close
                </button>
                <div>
                    <h3 className="uppercase font-bold text-primary-dark">
                        {trans(label ? label : 'Total Spending')}
                    </h3>

                    <div className="bg-white rounded mt-4">
                        <FullScreen handle={handle}>
                            <div className="flex simple-tab">
                                <div className="flex-1">
                                    <div>
                                        <div className="flex mb-5">
                                            <ul>
                                                <li>
                                                    {trans('By contract value')}
                                                </li>
                                                <li>
                                                    {trans(
                                                        'By number of contracts'
                                                    )}
                                                </li>
                                            </ul>
                                        </div>

                                        <ul className="flex items-center mb-8">
                                            <li className="active text-sm bg-blue-50 mr-2 text-white rounded-full py-2 px-4">
                                                Contracts with red flags
                                            </li>
                                            <li className="active text-sm bg-blue-0 mr-2 hover:bg-primary-5 rounded-full py-2 px-4">
                                                Spending per equity groups
                                            </li>
                                        </ul>

                                        <div className="flex">
                                            <div>
                                                <div className="w-80 mr-12">
                                                    <ul>
                                                        <li
                                                            className="active py-2 flex items-center justify-between
                                                        border-b border-blue-0 text-blue-50">
                                                            <div className="flex items-center">
                                                                <div className="contract-line">
                                                                    <span className="line red"></span>
                                                                </div>
                                                                <div className="contract-text">
                                                                    <span>
                                                                        Direct
                                                                        Contracts
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Checkbox />
                                                        </li>
                                                        <li className="py-2 border-b border-blue-0 text-blue-50 flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="contract-line">
                                                                    <span className="line purple"></span>
                                                                </div>
                                                                <div className="contract-text opacity-50">
                                                                    <span>
                                                                        Contract
                                                                        value is
                                                                        higher
                                                                        or lower
                                                                        than the
                                                                        average
                                                                        for this
                                                                        item
                                                                        category
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Checkbox />
                                                        </li>
                                                        <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50 flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="contract-line">
                                                                    <span className="line mint"></span>
                                                                </div>
                                                                <div className="contract-text opacity-50">
                                                                    <span>
                                                                        Contract
                                                                        value is
                                                                        higher
                                                                        tender
                                                                        value
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Checkbox />
                                                        </li>
                                                        <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50 flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="contract-line">
                                                                    <span className="line green"></span>
                                                                </div>
                                                                <div className="contract-text opacity-50">
                                                                    <span>
                                                                        Contract
                                                                        is
                                                                        awarded
                                                                        to
                                                                        supplier
                                                                        that has
                                                                        won a
                                                                        disproportionate
                                                                        number
                                                                        of
                                                                        contracts
                                                                        of the
                                                                        same
                                                                        type
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Checkbox />
                                                        </li>
                                                        <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50 flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="contract-line">
                                                                    <span className="line blue"></span>
                                                                </div>
                                                                <div className="contract-text opacity-50">
                                                                    <span>
                                                                        Contract
                                                                        is
                                                                        awarded
                                                                        to
                                                                        supplier
                                                                        that has
                                                                        similar
                                                                        information
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Checkbox />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <CompareChart />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FullScreen>
                        <div
                            className="flex items-center justify-between pt-4 border-t mt-4 border-blue-0 text-sm
                                             text-primary-blue -mx-6 px-6">
                            <div className="flex">
                                <span className="flex items-center">
                                    <DownloadIcon className="mr-2 inline-block" />{' '}
                                    <span className="cursor-pointer">
                                        Download
                                    </span>
                                </span>
                                <span className="ml-8 flex items-center">
                                    <ShareIcon className="mr-2 inline-block" />{' '}
                                    <span className="cursor-pointer">
                                        Share
                                    </span>
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
                </div>
            </Modal>
        </div>
    )
}

export default TotalSpending
